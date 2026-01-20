"use client";

import * as React from "react";
import BrandButton from "@/components/BrandButton";
import { motion } from "motion/react";
import Link from "next/link";

export default function PricingSection() {
  const tiers = [
    { 
      name: "Elegant", 
      price: "$100 / ₱4,999", 
      duration: "45 days (can be extended - additional fees may apply)", 
      features: [
        "Choose from 5 beautiful templates",
        "All sections included: Header, Our Story, Gallery, Dress Code, Location, Gifts, Contact, Countdown, FAQs",
        "Fixed template design - only your details, photos, and text change",
        "Free QR code invitation for social media",
        "2 revisions (pictures and copy changes only)",
        "Site live within 3 days",
        "Domain: bridesname&groomsname.withvows.com",
        "Priority support",
        "Additional revisions: ₱500 per request"
      ], 
      popular: true 
    },
    { 
      name: "Custom", 
      price: "Custom Quote", 
      duration: "Consultation Required", 
      features: [
        "Fully custom layout and design",
        "Custom color schemes and branding",
        "Your own custom domain (e.g., yournames.com)",
        "All sections with custom modifications",
        "Free QR code invitation for social media",
        "Unlimited revisions",
        "Dedicated support",
        "Extended hosting",
        "We'll create a personalized price quotation"
      ], 
      popular: false 
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-brand-primary text-center"
      >
        Simple, Transparent Pricing
      </motion.h2>
      <motion.div
        className="mt-10 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {tiers.map((t) => (
          <motion.div
            key={t.name}
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={t.popular ? { y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(83,58,123,0.3)" } : { y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className={`rounded-xl border p-6 bg-white/90 ${t.popular ? "border-brand-primary shadow-lg" : "border-brand-secondary/30"}`}
          >
            {t.popular && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                className="mb-3 inline-flex items-center rounded-full bg-brand-primary text-white text-xs px-2 py-0.5"
              >
                Most Popular
              </motion.div>
            )}
            <h3 className="text-xl font-semibold text-brand-primary">{t.name}</h3>
            <div className="mt-2 text-3xl font-bold text-brand-dark">{t.price}</div>
            <div className="text-sm text-brand-dark/70">{t.duration}</div>
            <ul className="mt-4 text-sm text-brand-dark/80 list-disc pl-5 space-y-1">
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="#contact">
                <BrandButton className="w-full">Choose {t.name}</BrandButton>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
