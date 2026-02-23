import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const admins = [
  { name: "Prof. Nilesh Mishra", role: "IIC President", whatsapp: "#" },
  { name: "Mohit Malviya", role: "Community Admin", whatsapp: "#", linkedin: "#" },
  { name: "Vishal Sable", role: "Community Admin", whatsapp: "#", linkedin: "#" },
  { name: "Kunal Patwari", role: "Community Admin", whatsapp: "#" },
];

const CommunitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="community" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">Join Our Community 🌟</h2>
          <div className="section-title-bar" />
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="community-box mb-10"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-secondary mb-4">
            ⚠️ MANDATORY - Join Our WhatsApp Community
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay updated with InnovateX details, internship opportunities, job postings, and more exciting events! Joining this community is MANDATORY for all participants.
          </p>
          <a href="#" className="btn-whatsapp text-lg">📱 Join WhatsApp Community</a>
          <p className="text-xs text-muted-foreground mt-4">
            Get real-time updates, hackathon details, networking opportunities, and career resources!
          </p>
        </motion.div>

        {/* Admin Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-display text-xl font-bold text-center mb-8">Community Admins & Coordinators</h3>
          <div className="glass-card p-6 md:p-8 space-y-4">
            {admins.map((admin, i) => (
              <motion.div
                key={admin.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-5 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-primary glow-blue flex-shrink-0">
                  <span className="font-display text-sm font-bold text-primary">
                    {admin.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-display text-base font-bold text-primary">{admin.name}</h4>
                  <p className="text-sm text-muted-foreground">{admin.role}</p>
                </div>
                <div className="flex gap-2">
                  <a href={admin.whatsapp} className="btn-whatsapp text-sm px-4 py-2 rounded-lg">📱 WhatsApp</a>
                  {admin.linkedin && (
                    <a href={admin.linkedin} className="btn-linkedin">LinkedIn</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
