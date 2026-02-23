import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <div className="section-title-bar mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="text-4xl mb-4">📧</div>
          <h3 className="font-display text-lg font-bold text-primary mb-2">Email Us</h3>
          <a href="mailto:ecell@sbitm.edu.in" className="text-foreground hover:text-primary transition-colors">
            ecell@sbitm.edu.in
          </a>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Follow SBITM</p>
            <a
              href="https://instagram.com/betulsbitm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              📸 Instagram - @betulsbitm
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
