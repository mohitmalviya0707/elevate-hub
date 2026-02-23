import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Award } from "lucide-react";

const prizes = [
  { icon: Trophy, place: "1st Place", amount: "₹25,000", color: "text-primary", glow: "glow-cyan" },
  { icon: Medal, place: "2nd Place", amount: "₹15,000", color: "text-secondary", glow: "glow-magenta" },
  { icon: Award, place: "3rd Place", amount: "₹10,000", color: "text-neon-purple", glow: "" },
];

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
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-magenta">Prizes</span> & Rewards
          </h2>
          <p className="text-muted-foreground">
            Compete for amazing prizes and recognition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {prizes.map((p, i) => (
            <motion.div
              key={p.place}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-card-hover p-8 text-center ${i === 0 ? "md:scale-105" : ""}`}
            >
              <div className={`${p.glow} inline-block rounded-full p-4 mb-4`}>
                <p.icon className={`w-10 h-10 ${p.color}`} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.place}</h3>
              <div className={`font-display text-3xl font-black ${p.color}`}>{p.amount}</div>
              <p className="text-sm text-muted-foreground mt-3">
                + Certificates, Swag & Mentorship
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
