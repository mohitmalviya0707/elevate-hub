import { supabase } from "@/integrations/supabase/client";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_RETRIES = 3;
const COMPRESSED_MAX_WIDTH = 1200;
const COMPRESSED_QUALITY = 0.7;

export type UploadResult =
  | { success: true; path: string }
  | { success: false; error: string };

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PNG, JPG, and PDF files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB.";
  }
  return null;
}

function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    if (file.type === "application/pdf") {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > COMPRESSED_MAX_WIDTH) {
        height = Math.round((height * COMPRESSED_MAX_WIDTH) / width);
        width = COMPRESSED_MAX_WIDTH;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
            return;
          }
          const compressed = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        file.type,
        COMPRESSED_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for compression."));
    };

    img.src = url;
  });
}

async function uploadWithRetry(
  bucket: string,
  path: string,
  file: File
): Promise<UploadResult> {
  let lastError = "";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (!error) {
      return { success: true, path };
    }

    lastError = error.message;
    console.warn(`Upload attempt ${attempt}/${MAX_RETRIES} failed:`, error.message);

    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }

  return { success: false, error: `Upload failed after ${MAX_RETRIES} attempts: ${lastError}` };
}

export async function processAndUpload(
  file: File,
  filePath: string
): Promise<UploadResult> {
  const validationError = validateFile(file);
  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    const compressed = await compressImage(file);
    return await uploadWithRetry("payment-screenshots", filePath, compressed);
  } catch (err: any) {
    return { success: false, error: err.message || "Upload processing failed." };
  }
}
