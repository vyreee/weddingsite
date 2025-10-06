"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Layout, Eye, Smartphone, Sliders, Zap, Mail, QrCode } from "lucide-react";

const features = [
  { 
    id: 1, 
    title: "10+ Stunning Templates", 
    desc: "From romantic blush to classic elegance—find your perfect match",
    gradient: "from-brand-accent to-brand-secondary",
    size: "large",
    Icon: Layout
  },
  { 
    id: 2, 
    title: "Always in Sync", 
    desc: "Location, dress code, gift registry—all in one beautiful place",
    gradient: "from-brand-secondary to-brand-primary",
    size: "small",
    Icon: Eye
  },
  { 
    id: 3, 
    title: "Mobile Magic", 
    desc: "Gorgeous on any device your guests use",
    gradient: "from-brand-primary to-brand-deep",
    size: "small",
    Icon: Smartphone
  },
  { 
    id: 4, 
    title: "Fully Customizable", 
    desc: "We build it for you. Choose your colors, photos, and content—we handle the rest",
    gradient: "from-brand-accent via-brand-secondary to-brand-primary",
    size: "medium",
    Icon: Sliders
  },
  { 
    id: 5, 
    title: "Live in 48 Hours", 
    desc: "From idea to online faster than you can say 'I do'",
    gradient: "from-brand-deep to-brand-primary",
    size: "small",
    Icon: Zap
  },
  { 
    id: 6, 
    title: "The Modern Way", 
    desc: "One elegant digital invitation that replaces confusing group texts",
    gradient: "from-brand-primary to-brand-deep",
    size: "small",
    Icon: Mail
  },
  { 
    id: 7, 
    title: "Free QR Code Invites", 
    desc: "Share your wedding site instantly on WhatsApp, Instagram, Facebook & more",
    gradient: "from-brand-secondary to-brand-accent",
    size: "small",
    Icon: QrCode
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 relative">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-br from-brand-accent/10 via-brand-secondary/10 to-transparent blur-3xl"
        />
      </div>

      {/* Header with animated backdrop */}
      <div className="relative mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-brand-primary text-center relative z-10"
        >
          Everything Your Wedding Website Needs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-brand-dark/80 mt-2 relative z-10"
        >
          Modern invitations • Zero hassle • Guest delight
        </motion.p>
      </div>

      {/* Bento Grid Layout */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Large Hero Card - Takes 2x2 */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="col-span-2 row-span-2 rounded-2xl p-6 bg-gradient-to-br from-brand-accent to-brand-secondary relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -right-8 -bottom-8 size-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="size-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <Layout className="size-7 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">{features[0].title}</h3>
            <p className="text-white/90 text-sm">{features[0].desc}</p>
          </div>
        </motion.div>

        {/* Small Cards */}
        {features.slice(1, 3).map((feature) => {
          const FeatureIcon = feature.Icon;
          return (
            <motion.div
              key={feature.id}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`rounded-2xl p-5 bg-gradient-to-br ${feature.gradient} relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <FeatureIcon className="size-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-white/80 text-xs mt-auto">{feature.desc}</p>
              </div>
            </motion.div>
          );
        })}

        {/* Medium Card - 2 columns wide */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="col-span-2 rounded-2xl p-5 bg-gradient-to-r from-brand-accent via-brand-secondary to-brand-primary relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute right-0 top-0 size-24 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10 flex items-center gap-4 h-full">
            <div className="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Sliders className="size-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{features[3].title}</h3>
              <p className="text-white/90 text-sm">{features[3].desc}</p>
            </div>
          </div>
        </motion.div>

        {/* Small Card - Live in 48 Hours */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`col-span-2 md:col-span-1 rounded-2xl p-5 bg-gradient-to-br ${features[4].gradient} relative overflow-hidden group cursor-pointer`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <Zap className="size-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{features[4].title}</h3>
            <p className="text-white/80 text-xs mt-auto">{features[4].desc}</p>
          </div>
        </motion.div>

        {/* Small Card - The Modern Way */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`col-span-2 md:col-span-1 rounded-2xl p-5 bg-gradient-to-br ${features[5].gradient} relative overflow-hidden group cursor-pointer`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <Mail className="size-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{features[5].title}</h3>
            <p className="text-white/80 text-xs mt-auto">{features[5].desc}</p>
          </div>
        </motion.div>

        {/* Small Card - Free QR Code */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`col-span-2 md:col-span-1 rounded-2xl p-5 bg-gradient-to-br ${features[6].gradient} relative overflow-hidden group cursor-pointer`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <QrCode className="size-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{features[6].title}</h3>
            <p className="text-white/80 text-xs mt-auto">{features[6].desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FeaturesSection;
