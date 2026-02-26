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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.leader_email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const phoneDigits = form.leader_phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const uniqueId = generateUniqueId();
      const fileExt = file.name.split(".").pop();
      const filePath = `${uniqueId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, file);
      if (uploadError) throw new Error("Failed to upload screenshot. Please try again.");

      const membersArray = form.members.split(",").map((m) => m.trim()).filter(Boolean);

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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">Registration Details 📝</h2>
          <div className="section-title-bar" />
        </motion.div>

        {/* Limited spots alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="registration-gradient mb-8"
        >
          <h3 className="font-display text-xl font-bold mb-2">⚡ Limited Spots Available!</h3>
          <p className="text-muted-foreground">Register before March 23, 2026 to secure your team's spot!</p>
        </motion.div>

        {/* Fee info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          <div className="glass-card p-5 text-center">
            <div className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Registration Fee</div>
            <div className="font-display text-2xl font-bold text-foreground">₹150/team</div>
            <div className="text-xs text-muted-foreground mt-1">Only ₹37.5 per person!</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Team Size</div>
            <div className="font-display text-2xl font-bold text-foreground">3-4 Members</div>
            <div className="text-xs text-muted-foreground mt-1">Min 3, Max 4</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Prize Pool</div>
            <div className="font-display text-2xl font-bold text-foreground">₹1600+</div>
            <div className="text-xs text-muted-foreground mt-1">+ Certificates!</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 sticky top-28">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">💳 Payment Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Registration Fee</div>
                  <div className="font-display text-2xl font-bold text-primary">₹150</div>
                  <div className="text-muted-foreground text-xs">per team</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-muted-foreground mb-1">UPI ID</div>
                  <div className="font-mono text-foreground bg-muted/50 px-3 py-2 rounded-lg text-sm">
                    mohitmalviya0107-1@okaxis
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-muted-foreground mb-2">Scan QR Code</div>
                  <div className="w-40 h-40 mx-auto bg-white rounded-xl flex items-center justify-center border border-border shadow-inner overflow-hidden">
                  <img
                    src="https://raw.githubusercontent.com/mohitmalviya0707/hacthone-2026-college-/main/WhatsApp%20Image%202026-02-23%20at%2016.36.06.jpeg"
                    alt="InnovateX 2026 Payment QR Code"
                    className="w-full h-full object-contain p-3"
                   />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload payment screenshot after paying ₹150 via UPI.
                </p>
              </div>

              {/* What to submit */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-display text-sm font-bold text-foreground mb-3">📝 What You Need to Submit</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {[
                    "Team Name - Choose a creative team name",
                    "Team Leader Details - Name, Email, Phone",
                    "Team Member Details - Names of all 3-4 members",
                    "College/School Name - Your institution name",
                    "Payment Proof - Screenshot of ₹150 payment",
                    "WhatsApp Community - Confirmation of joining",
                  ].map((item) => (
                    <li key={item} className="py-1.5 border-b border-border/30 last:border-0">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <h3 className="font-display text-lg font-bold text-center text-foreground mb-2">
                🚀 Complete Registration
              </h3>

              {[
                { name: "team_name", label: "Team Name", type: "text", placeholder: "e.g. Code Crusaders" },
                { name: "leader_name", label: "Leader Name", type: "text", placeholder: "Full name" },
                { name: "leader_email", label: "Leader Email", type: "email", placeholder: "email@example.com" },
                { name: "leader_phone", label: "Leader Phone", type: "tel", placeholder: "10-digit number", maxLength: 10 },
                { name: "members", label: "Team Members (comma separated)", type: "text", placeholder: "Name1, Name2, Name3" },
                { name: "college", label: "College / School Name", type: "text", placeholder: "Your institution name" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    maxLength={(field as any).maxLength}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                   />
                </div>
              ))}

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Payment Screenshot</label>
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <Upload size={18} className="text-muted-foreground flex-shrink-0" />
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
                <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 rounded-xl disabled:opacity-50 disabled:hover:transform-none"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Registering...</>
                ) : (
                  "🚀 Complete Registration"
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                ⏰ Registration closes on March 23, 2026
              </p>
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
              <button onClick={() => setSuccess(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
              <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Registration Successful!</h3>
              <p className="text-muted-foreground mb-6">Your team has been registered for InnovateX 2026.</p>
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Your Registration ID</div>
                <div className="font-display text-2xl font-black text-primary">{success.id}</div>
              </div>
              <p className="text-xs text-muted-foreground">Save this ID for future reference.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RegistrationForm;
