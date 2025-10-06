"use client";

import * as React from "react";
import BrandButton from "@/components/BrandButton";
import { motion } from "motion/react";
import Link from "next/link";

export default function TemplateShowcaseSection() {
  const templates = [
    { name: "Bella & James", desc: "Romantic / Elegant", gradient: "from-[#98C1D9] via-[#6969B3] to-[#533A7B]" },
    { name: "Classic Elegance", desc: "Traditional", gradient: "from-[#6969B3] to-[#533A7B]" },
    { name: "Garden Party", desc: "Floral / Natural", gradient: "from-[#98C1D9] to-[#6969B3]" },
  ];
  
  return (
    <section id="templates" className="mx-auto max-w-6xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-brand-primary text-center"
      >
        Stunning Templates for Every Style
      </motion.h2>
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {templates.map((t) => (
          <motion.div
            key={t.name}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group relative rounded-xl overflow-hidden border border-brand-secondary/30 bg-white cursor-pointer"
          >
            <div className={`h-40 bg-gradient-to-br ${t.gradient} opacity-70`} />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-brand-primary">{t.name}</h3>
              <p className="text-sm text-brand-dark/70">{t.desc}</p>
              <div className="mt-4">
                <Link href="/preview">
                  <BrandButton variant="ghost" className="group-hover:bg-brand-accent/20">Try in Preview</BrandButton>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
