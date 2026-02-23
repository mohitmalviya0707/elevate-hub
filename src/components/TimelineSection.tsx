import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  { time: "Day 0 — Eve", title: "Check-in & Kickoff", desc: "Team registration, orientation, and opening ceremony." },
  { time: "Day 1 — 9 AM", title: "Hacking Begins", desc: "Start building! Mentors available for guidance." },
  { time: "Day 1 — 6 PM", title: "Checkpoint 1", desc: "First progress check with organizers." },
  { time: "Day 2 — 9 AM", title: "Checkpoint 2", desc: "Mid-hackathon review and mentor feedback." },
  { time: "Day 2 — 3 PM", title: "Submissions Due", desc: "Final code submission and demo prep." },
  { time: "Day 2 — 5 PM", title: "Demo & Awards", desc: "Top teams present. Winners announced!" },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Event <span className="text-gradient-cyan">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-cyan z-10 mt-2" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass-card p-5">
                    <div className="text-xs font-display text-primary font-semibold mb-1 uppercase tracking-wider">
                      {event.time}
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
