import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    icon: "📝",
    title: "Registration Opens",
    date: "February 10, 2026",
    desc: "Registration portal goes live. Start forming your teams and join our WhatsApp community!",
  },
  {
    icon: "⏰",
    title: "Registration Closes",
    date: "March 23, 2026",
    desc: "Last date to register. Pay ₹150 and secure your spot!",
  },
  {
    icon: "🚀",
    title: "InnovateX Day - Main Event",
    date: "March 24, 2026",
    time: "10:00 AM - 4:30 PM",
    venue: "SBITM Campus",
    desc: "Opening ceremony, coding session, mentorship, presentations, and awards!",
  },
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
          <h2 className="font-display text-3xl md:text-4xl font-bold">Event Timeline</h2>
          <div className="section-title-bar" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(180deg, hsl(var(--neon-blue)), hsl(var(--neon-orange)))" }}
          />

          <div className="space-y-12">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex items-start ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary glow-blue z-10 animate-pulse-dot mt-6" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-10 md:text-right md:mr-auto" : "md:pl-10 md:ml-auto"}`}>
                  <div className="glass-card p-6">
                    <div className="text-2xl mb-2">{event.icon}</div>
                    <h3 className="font-display text-base font-bold text-primary mb-1">{event.title}</h3>
                    <p className="text-sm font-semibold text-secondary mb-1">Date: {event.date}</p>
                    {event.time && <p className="text-sm text-muted-foreground">Time: {event.time}</p>}
                    {event.venue && <p className="text-sm text-muted-foreground">Venue: {event.venue}</p>}
                    <p className="text-sm text-muted-foreground mt-2">{event.desc}</p>
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
