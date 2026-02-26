import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    icon: "💡",
    title: "What is InnovateX?",
    content: "InnovateX is a competitive hackathon where teams collaborate to solve real-world problems, build innovative solutions, and showcase their technical prowess. It's more than just coding – it's a platform to learn, network, and win!",
  },
  {
    icon: "🎯",
    title: "Who Can Participate?",
    content: "ALL STUDENTS WELCOME! Class 12 students and UG students from ANY college can participate. Form teams of 3-4 members and get ready to compete. One participant can only be part of ONE team.",
  },
  {
    icon: "⚡",
    title: "Why Participate?",
    list: [
      "💰 Win cash prizes worth ₹1,600+",
      "🏆 Earn certificates of participation",
      "🎤 Learn from industry experts",
      "🤝 Networking opportunities",
      "✨ Boost your resume & portfolio",
    ],
  },
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
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold">About InnovateX 🚀</h2>
          <div className="section-title-bar" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-muted-foreground text-sm md:text-lg max-w-3xl mx-auto mb-12"
        >
          InnovateX is not just a hackathon—it's a launchpad for your ideas. Join India's brightest young minds in an intense, rewarding coding marathon that challenges you to innovate, collaborate, and create solutions that matter.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-7"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-display text-lg font-bold text-primary mb-3">{card.title}</h3>
              {card.content && (
                <p className="text-muted-foreground leading-relaxed text-sm">{card.content}</p>
              )}
              {card.list && (
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {card.list.map((item) => (
                    <li key={item} className="py-1.5 border-b border-border/30 last:border-0">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
