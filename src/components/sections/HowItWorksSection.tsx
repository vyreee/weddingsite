"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Palette, Sparkles, Rocket, ArrowRight } from "lucide-react";

const steps = [
  { 
    num: 1, 
    title: "Choose Template", 
    desc: "Pick from 3 demo templates (10+ in full). Browse elegant designs tailored for your wedding style.",
    Icon: Palette
  },
  { 
    num: 2, 
    title: "Customize", 
    desc: "Add names, date, venue, and your story. Personalize colors, fonts, and layout in real-time.",
    Icon: Sparkles
  },
  { 
    num: 3, 
    title: "Go Live", 
    desc: "Share your wedding website instantly. Get a custom URL and share with guests via QR code or link.",
    Icon: Rocket
  },
];

export default function HowItWorksSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" ref={ref} className="mx-auto max-w-6xl px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-brand-primary text-center mb-4"
      >
        Get Started in 3 Simple Steps
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center text-brand-dark/70 mb-16"
      >
        From selection to live in minutes
      </motion.p>

      {/* Horizontal Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-[72px] left-0 right-0 h-1 bg-brand-accent/20 hidden md:block">
          <motion.div 
            style={{ width: lineWidth }}
            className="h-full bg-gradient-to-r from-brand-accent via-brand-secondary to-brand-primary"
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100, damping: 20 }}
              className="relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl border-2 border-brand-secondary/20 p-6 shadow-lg hover:shadow-2xl hover:border-brand-secondary/40 transition-all duration-300 cursor-pointer relative z-10"
              >
                {/* Step Number Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 size-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-deep flex items-center justify-center text-white font-bold text-xl shadow-lg"
                >
                  {step.num}
                </motion.div>

                {/* Icon */}
                <div className="text-center mt-6 mb-4">
                  <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 mb-3">
                    <step.Icon className="size-8 text-brand-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-brand-primary text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-dark/70 text-center leading-relaxed">
                  {step.desc}
                </p>

                {/* Decorative gradient blob */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: i * 0.5 
                  }}
                  className="absolute -z-10 -bottom-4 -right-4 size-24 rounded-full bg-gradient-to-br from-brand-accent/40 to-brand-secondary/40 blur-2xl"
                />
              </motion.div>

              {/* Arrow (desktop only) */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 200 }}
                  className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 items-center justify-center size-10 rounded-full bg-brand-secondary/10"
                >
                  <ArrowRight className="size-5 text-brand-secondary" strokeWidth={2} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
