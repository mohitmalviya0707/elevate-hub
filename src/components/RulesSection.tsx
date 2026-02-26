import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rules = [
  {
    icon: "⚠️",
    title: "IMPORTANT INFORMATION",
    items: [
      "💻 Bring Your Own Laptop: Each participant MUST bring their own laptop with necessary software installed",
      "⚡ Power & Charging: Please ensure your laptop is fully charged. Limited charging points will be available",
      "🔌 Internet Access: WiFi will be provided at the venue",
      "📱 WhatsApp Community: Joining our WhatsApp group is MANDATORY for all participants for updates",
    ],
  },
  {
    icon: "👥",
    title: "Team Composition",
    items: [
      "Eligibility: Class 12 & UG students from ANY college",
      "Team Size: 3-4 members (Minimum 3, Maximum 4)",
      "Registration Fee: ₹150 per team",
      "Important: One participant can join only ONE team",
      "Required: Must bring your own laptop",
    ],
  },
  {
    icon: "📋",
    title: "Submission Guidelines",
    items: [
      "All code must be original work",
      "Projects must be submitted before the deadline",
      "Use of open-source libraries is allowed",
      "Plagiarism will lead to disqualification",
      "Submit project documentation & presentation",
    ],
  },
  {
    icon: "🏅",
    title: "Judging Criteria",
    items: [
      "Innovation & Creativity (30%)",
      "Technical Implementation (30%)",
      "Problem Solving (20%)",
      "Presentation & Demo (15%)",
      "Social Impact (5%)",
    ],
  },
];

const RulesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rules" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold">Rules & Guidelines</h2>
          <div className="section-title-bar" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card-hover p-7 ${i === 0 ? "md:col-span-2 alert-box animate-pulse-border" : ""}`}
            >
              <div className="text-3xl mb-3">{rule.icon}</div>
              <h3 className={`font-display text-lg font-bold mb-4 ${i === 0 ? "text-accent" : "text-primary"}`}>
                {rule.title}
              </h3>
              <ul className="space-y-2">
                {rule.items.map((item) => (
                  <li
                    key={item}
                    className={`text-sm text-muted-foreground py-2.5 ${
                      i === 0
                        ? "bg-background/30 rounded-lg px-4 border-l-4 border-accent"
                        : "border-b border-border/30 last:border-0"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
