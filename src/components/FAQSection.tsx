import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Who can participate?", a: "Any college student from India can participate. Teams of 2–4 members are allowed." },
  { q: "Is there a registration fee?", a: "Yes, a nominal fee of ₹150 per team. Payment details are in the registration section." },
  { q: "Do I need a team?", a: "Yes, you need a team of 2–4 members. Solo participation is not allowed." },
  { q: "What should I bring?", a: "Your laptop, charger, and lots of energy! We'll provide food, Wi-Fi, and workspace." },
  { q: "Is it online or offline?", a: "INNOVEX 2026 is an offline hackathon. You'll be hacking on campus!" },
  { q: "Can I use pre-built projects?", a: "No. All code must be written during the hackathon. You can use frameworks and libraries." },
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
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient-cyan">Questions</span>
          </h2>
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
                <AccordionTrigger className="text-left font-body font-medium text-foreground hover:text-primary transition-colors py-5 hover:no-underline">
                  {faq.q}
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
