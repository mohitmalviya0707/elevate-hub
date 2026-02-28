import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { icon: "🎯", q: "Who can participate?", a: "Class 12 students and UG students from ANY college across India can participate. Just form a team of 3-4 members!" },
  { icon: "💻", q: "Do I need to bring my own laptop?", a: "Yes! Each participant MUST bring their own laptop with necessary software pre-installed. Make sure it's fully charged as charging points are limited." },
  { icon: "💰", q: "What's the registration fee?", a: "Just ₹300 per team (that's only ₹75 per person for a 4-member team). This covers the entire event including networking opportunities and certificates!" },
  { icon: "🏆", q: "What can I win?", a: "Winners get cash prizes (1st: ₹7,000, 2nd: ₹3,000), certificates, and networking opportunities with industry experts. All participants receive participation certificates!" },
  { icon: "📱", q: "Is joining the WhatsApp community mandatory?", a: "Yes! The WhatsApp community is MANDATORY for all participants. You'll get real-time updates, event details, and exclusive opportunities there." },
  { icon: "⏰", q: "What's the event schedule?", a: "InnovateX 2026 will be held on March 24, 2026, from 10:00 AM to 4:30 PM at SBITM Betul campus. Registration closes on March 23, 2026." },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold">FAQs 💬</h2>
          <div className="section-title-bar" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card border border-border/50 rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-body font-medium text-foreground hover:text-primary transition-colors py-5 hover:no-underline gap-3">
                  <span>{faq.icon} {faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
