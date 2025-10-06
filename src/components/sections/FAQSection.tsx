"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long does my website stay active?", a: "Preview plans include 30–90 days depending on tier. Prestige offers custom durations." },
  { q: "Can I customize the templates?", a: "Yes. Colors, typography, names, date, venue, story and more can be customized. " },
  { q: "Do you offer refunds?", a: "30-day money-back guarantee on paid tiers." },
  { q: "What's included in each tier?", a: "Luxury (30 days), Elegant (90 days + priority), Prestige (custom/bespoke)." },
  { q: "Can I add more sections later?", a: "Absolutely. Unlock RSVP, gallery, travel details, and more in the full version." },
];

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-brand-primary text-center"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-8"
      >
        <Accordion type="single" collapsible className="rounded-xl border border-brand-secondary/30 bg-white/90">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="px-5">
              <AccordionTrigger className="text-base font-medium text-brand-dark hover:text-brand-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-brand-dark/80">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
