import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VenueSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="venue" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">Event Venue</h2>
          <div className="section-title-bar" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-primary mb-3">
            📍 Shri Balaji Institute of Technology & Management (SBITM)
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Khasra No. 238, 8th Mile Stone, NH-69, Betul-Bhopal Highway, Gram Gohchi, Post-Sakadehi, Betul, Madhya Pradesh - 460005
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm">
            <p className="font-semibold text-foreground mb-2">Event Details:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>📅 Date: March 24, 2026</li>
              <li>⏰ Time: 10:00 AM - 4:30 PM</li>
              <li>📍 Venue: SBITM Campus</li>
              <li>🏛️ Main Hall: Convocation Hall</li>
              <li>💻 Lab Sessions: Advanced Computer Lab</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border-2 border-border h-[400px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.5!2d77.9037!3d21.9083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397d5ef6a4b4c4c1%3A0x8a7b2e2f1c3d4e5f!2sShri%20Balaji%20Institute%20of%20Technology%20%26%20Management%20(SBITM)!5e0!3m2!1sen!2sin!4v1709000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SBITM Betul Location"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
