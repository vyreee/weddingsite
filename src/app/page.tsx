"use client";

import BrandButton from "@/components/BrandButton";
import Link from "next/link";
import BrandCard from "@/components/BrandCard";
import Header from "@/components/Header";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import HeroDevices from "@/components/HeroDevices";
import TemplateShowcaseSection from "@/components/sections/TemplateShowcaseSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#98C1D9] via-[#6969B3] to-[#533A7B] opacity-20" />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-brand-primary"
          >
            Beautiful Wedding Websites Made Simple
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-brand-dark/80 max-w-2xl mx-auto"
          >
            One source of truth for all your wedding information.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link href="/preview">
              <BrandButton>Try Interactive Preview</BrandButton>
            </Link>
            <Link href="/#pricing">
              <BrandButton variant="ghost">View Pricing</BrandButton>
            </Link>
          </motion.div>
          <div className="mt-6">
            <HeroDevices />
          </div>
        </div>
      </section>

      {/* Demo Card */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-2">
        <BrandCard title="Everything You Need" subtitle="Fast setup • Beautiful templates • Guest friendly">
          <p className="text-sm/6">
            Build and preview your site in minutes. Choose a template, customize your details, and go live.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/preview">
              <BrandButton variant="secondary">Explore Templates</BrandButton>
            </Link>
            <Link href="/#how">
              <BrandButton variant="accent">How It Works</BrandButton>
            </Link>
          </div>
        </BrandCard>
        <BrandCard title="Simple, Transparent Pricing" subtitle="Starting at $100 / ₱4,999">
          <ul className="text-sm/6 list-disc pl-5">
            <li>Elegant designs</li>
            <li>Mobile responsive</li>
            <li>Live preview</li>
          </ul>
          <div className="mt-6">
            <Link href="/#pricing">
              <BrandButton>Choose Your Plan</BrandButton>
            </Link>
          </div>
        </BrandCard>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Template Showcase */}
      <TemplateShowcaseSection />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Contact Form */}
      <ContactFormSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
