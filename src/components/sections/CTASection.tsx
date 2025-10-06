"use client";

import * as React from "react";
import BrandButton from "@/components/BrandButton";
import { motion } from "motion/react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative isolate mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#98C1D9] via-[#6969B3] to-[#533A7B] opacity-15" />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-semibold text-brand-primary"
      >
        Ready to Create Your Perfect Wedding Website?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-3 text-brand-dark/80"
      >
        Join hundreds of couples who made planning easier.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <Link href="/#contact">
          <BrandButton>Get Started Now</BrandButton>
        </Link>
        <Link href="/#pricing">
          <BrandButton variant="ghost">View Pricing</BrandButton>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-3 text-xs text-brand-dark/70"
      >
        No credit card required • 30-day money-back guarantee
      </motion.div>
    </section>
  );
}
