import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Clock, Trophy, Code } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Clock, value: "36", label: "Hours" },
  { icon: Trophy, value: "₹50K+", label: "In Prizes" },
  { icon: Code, value: "100+", label: "Projects" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient-cyan">INNOVEX</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            INNOVEX 2026 is a national-level hackathon designed to push boundaries.
            Bring your wildest ideas, form teams, and build something extraordinary
            in just 36 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-6 md:p-8 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
