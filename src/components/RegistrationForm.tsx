import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Upload, CheckCircle, Loader2, X } from "lucide-react";

const generateUniqueId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `INX2026-${num}`;
};

const RegistrationForm = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    team_name: "",
    leader_name: "",
    leader_email: "",
    leader_phone: "",
    members: "",
    college: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!paid) {
      setError("Please confirm that you have paid the registration fee.");
      return;
    }
    if (!file) {
      setError("Please upload your payment screenshot.");
      return;
    }

    // Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.leader_email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.leader_phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const uniqueId = generateUniqueId();

      // Upload screenshot
      const fileExt = file.name.split(".").pop();
      const filePath = `${uniqueId}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, file);

      if (uploadError) throw new Error("Failed to upload screenshot. Please try again.");

      // Parse members
      const membersArray = form.members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      // Insert registration
      const { error: dbError } = await supabase.from("registrations").insert({
        team_name: form.team_name.trim(),
        leader_name: form.leader_name.trim(),
        leader_email: form.leader_email.trim(),
        leader_phone: form.leader_phone.trim(),
        members: membersArray,
        college: form.college.trim(),
        payment_screenshot_path: filePath,
        unique_id: uniqueId,
      });

      if (dbError) throw new Error("Registration failed. Please try again.");

      setSuccess({ id: uniqueId });
      setForm({ team_name: "", leader_name: "", leader_email: "", leader_phone: "", members: "", college: "" });
      setFile(null);
      setPaid(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">Register</span> Your Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in the details below to secure your spot at INNOVEX 2026.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 sticky top-28">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                💳 Payment Details
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Registration Fee</div>
                  <div className="font-display text-2xl font-bold text-primary">₹150</div>
                  <div className="text-muted-foreground text-xs">per team</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-muted-foreground mb-1">UPI ID</div>
                  <div className="font-mono text-foreground bg-muted/50 px-3 py-2 rounded-lg text-sm">
                    innovex2026@upi
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-muted-foreground mb-2">Scan QR Code</div>
                  <div className="w-full aspect-square bg-muted/30 rounded-xl flex items-center justify-center border border-dashed border-border">
                    <span className="text-muted-foreground text-xs text-center px-4">
                      QR Code will be<br />added soon
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload payment screenshot after paying ₹150 via UPI.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              {[
                { name: "team_name", label: "Team Name", type: "text", placeholder: "e.g. Code Crusaders" },
                { name: "leader_name", label: "Leader Name", type: "text", placeholder: "Full name" },
                { name: "leader_email", label: "Leader Email", type: "email", placeholder: "email@example.com" },
                { name: "leader_phone", label: "Leader Phone", type: "tel", placeholder: "10-digit number" },
                { name: "members", label: "Team Members", type: "text", placeholder: "Name1, Name2, Name3 (comma separated)" },
                { name: "college", label: "College Name", type: "text", placeholder: "Your college name" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                  />
                </div>
              ))}

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Screenshot
                </label>
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <Upload size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">
                    {file ? file.name : "Click to upload screenshot"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={(e) => setPaid(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I have paid the registration fee of ₹150
                </span>
              </label>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-sm uppercase tracking-wider bg-primary text-primary-foreground glow-cyan hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-transform duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card p-8 md:p-10 max-w-md w-full text-center relative glow-green"
            >
              <button
                onClick={() => setSuccess(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
              <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Registration Successful!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your team has been registered for INNOVEX 2026.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Your Registration ID
                </div>
                <div className="font-display text-2xl font-black text-primary">
                  {success.id}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Save this ID for future reference. You'll also receive a confirmation email.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RegistrationForm;
