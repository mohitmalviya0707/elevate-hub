import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-secondary/6 blur-[100px]" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl sm:text-4xl md:text-7xl font-black tracking-tight leading-tight mb-4"
        >
          🚀 <span className="text-gradient-brand">INNOVATEX 2026</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-base md:text-2xl text-primary mb-6"
        >
          Code. Innovate. Transform.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-8"
        >
          Join the ultimate hackathon at SBITM Betul! Showcase your skills, win amazing prizes, and network with the best minds.
        </motion.p>

        {/* Event info chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <div className="glass-card px-5 py-3 flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-primary" />
            <span>March 24, 2026</span>
          </div>
          <div className="glass-card px-5 py-3 flex items-center gap-2 text-sm">
            <Clock size={16} className="text-secondary" />
            <span>10 AM - 4:30 PM</span>
          </div>
          <div className="glass-card px-5 py-3 flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-accent" />
            <span>SBITM Betul</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <a href="#register" className="btn-primary text-base">
            Register Now →
          </a>
          <p className="text-sm text-muted-foreground">
            ⚡ Registration closes March 23, 2026
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { icon: "💰", value: "₹1600+", label: "Prize Pool" },
            { icon: "👥", value: "100+", label: "Expected Participants" },
            { icon: "⏱️", value: "6.5 hrs", label: "Intense Coding" },
            { icon: "🏆", value: "TOP 2", label: "Winning Teams" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
