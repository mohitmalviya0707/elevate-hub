import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PrizesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="prizes" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">Prizes & Rewards 🎁</h2>
          <div className="section-title-bar" />
          <p className="text-primary font-display font-bold text-lg mt-6">Total Prize Pool Worth ₹1,600+</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {/* 1st Prize */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 text-center border-2 relative overflow-hidden"
            style={{ borderColor: "#ffd700" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="text-5xl mb-3">🥇</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">First Prize</h3>
            <div className="font-display text-4xl font-black" style={{ color: "#ffd700" }}>₹1100</div>
            <p className="text-sm text-muted-foreground mt-3">+ Certificate + Special Recognition</p>
            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
              🎯 <strong className="text-primary">Winner's Benefits:</strong> Exclusive networking opportunity with industry experts!
            </div>
          </motion.div>

          {/* 2nd Prize */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 text-center border-2 relative overflow-hidden"
            style={{ borderColor: "#c0c0c0" }}
          >
            <div className="text-5xl mb-3">🥈</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Second Prize</h3>
            <div className="font-display text-4xl font-black" style={{ color: "#c0c0c0" }}>₹500</div>
            <p className="text-sm text-muted-foreground mt-3">+ Certificate of Excellence</p>
          </motion.div>
        </div>

        {/* All participants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8 text-center"
        >
          <h3 className="font-display text-lg font-bold mb-6">🎁 All Participants Will Receive</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📜", label: "Participation Certificate" },
              { icon: "🤝", label: "Networking Opportunities" },
              { icon: "🎤", label: "Guest Speaker Session" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizesSection;
