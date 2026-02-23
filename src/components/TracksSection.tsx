import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Leaf, Gamepad2, Heart, Globe } from "lucide-react";

const tracks = [
  { icon: Brain, title: "AI / ML", desc: "Build intelligent solutions using artificial intelligence and machine learning." },
  { icon: Shield, title: "Cybersecurity", desc: "Develop tools to protect data, networks, and systems from threats." },
  { icon: Leaf, title: "Sustainability", desc: "Create tech solutions for environmental and social sustainability." },
  { icon: Gamepad2, title: "Gaming & AR/VR", desc: "Design immersive experiences with gaming, AR, or VR technologies." },
  { icon: Heart, title: "HealthTech", desc: "Innovate at the intersection of technology and healthcare." },
  { icon: Globe, title: "Open Innovation", desc: "Build anything that solves a real-world problem. No limits." },
];

const TracksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tracks" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Hackathon <span className="text-gradient-magenta">Tracks</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your battlefield. Each track is an opportunity to create impact.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-7 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <track.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                {track.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {track.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
