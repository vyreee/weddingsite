"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import phonePng from "@/cellphone.png";
import laptopPng from "@/laptop.png";

const laptopFeatures = [
  { label: "Choose Your Template", position: "top-left" },
  { label: "Real-time Preview", position: "top-right" },
  { label: "Easy Customization", position: "bottom" },
];

const phoneFeatures = [
  { label: "Mobile Responsive", position: "top" },
  { label: "Guest Friendly", position: "bottom" },
];

export default function HeroDevices() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showBadges, setShowBadges] = React.useState(false);

  // Simplified scroll animations
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  // Smooth parallax - container
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  
  // Device-specific parallax (subtle depth)
  const laptopY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  // Gentle glow movement
  const glowX = useTransform(scrollYProgress, [0, 1], ["40%", "60%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  const getBadgePosition = (position: string, device: "laptop" | "phone") => {
    if (device === "laptop") {
      switch (position) {
        case "top-left": return "top-16 md:top-32 left-2 md:left-12 text-[10px] md:text-xs";
        case "top-right": return "top-24 md:top-[152px] right-2 md:right-[125px] text-[10px] md:text-xs";
        case "bottom": return "bottom-4 md:bottom-[32px] left-1/2 -translate-x-1/2 text-[10px] md:text-xs";
        default: return "";
      }
    } else {
      switch (position) {
        case "top": return "top-2 md:top-4 left-[calc(50%+15px)] md:left-[calc(50%+30px)] -translate-x-1/2 text-[10px] md:text-xs";
        case "bottom": return "-bottom-4 md:-bottom-[30px] left-[calc(50%+15px)] md:left-[calc(50%+30px)] -translate-x-1/2 text-[10px] md:text-xs";
        default: return "";
      }
    }
  };

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity }} 
      className="relative mx-auto max-w-6xl px-4 pb-2 pt-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
    >
      {/* Simplified glows */}
      <div className="pointer-events-none absolute -inset-x-4 md:-inset-x-16 -top-10 h-56 -z-10 overflow-hidden">
        <motion.div 
          style={{ left: glowX, scale: glowScale }}
          className="absolute top-0 size-32 md:size-52 rounded-full bg-brand-accent blur-3xl opacity-30" 
        />
        <div className="absolute left-2/3 top-6 size-28 md:size-44 rounded-full bg-brand-secondary blur-3xl opacity-30" />
        <div className="absolute left-1/2 top-10 size-40 md:size-64 -translate-x-1/2 rounded-full bg-brand-primary blur-3xl opacity-20" />
      </div>

      {/* Devices - clean and simple */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[420px] lg:h-[460px]">
        {/* Laptop */}
        <motion.div
          style={{ y: laptopY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          onViewportEnter={() => setShowBadges(true)}
          viewport={{ once: true, amount: 0.5 }}
          className="group absolute left-1/2 top-1/2 -translate-x-[55%] sm:-translate-x-[60%] -translate-y-1/2 drop-shadow-2xl w-[85%] sm:w-[80%] md:w-auto"
        >
          <div className="relative">
            <Image
              src={laptopPng}
              alt="Laptop preview"
              width={800}
              height={500}
              className="select-none animate-float-slow will-change-transform w-full h-auto"
              priority
              quality={100}
            />
            
            {/* Laptop Feature Badges - Hidden on mobile */}
            <AnimatePresence>
              {showBadges && laptopFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -4,
                    boxShadow: "0 10px 30px rgba(83,58,123,0.5)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 500, damping: 30 }}
                  className={`hidden md:block absolute ${getBadgePosition(feature.position, "laptop")} whitespace-nowrap rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-2 md:px-3 py-1 md:py-1.5 font-medium text-white shadow-lg backdrop-blur-sm cursor-pointer`}
                >
                  {feature.label}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div
          style={{ y: phoneY }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.15, type: "spring", stiffness: 100 }}
          className="group absolute left-1/2 top-1/2 translate-x-[15px] sm:translate-x-[25px] md:translate-x-[40px] -translate-y-[48%] drop-shadow-xl w-[28%] sm:w-[30%] md:w-auto"
        >
          <div className="relative">
            <Image
              src={phonePng}
              alt="Phone preview"
              width={300}
              height={600}
              className="select-none animate-float-slower will-change-transform w-full h-auto"
              priority
              quality={100}
              unoptimized={false}
            />
            
            {/* Phone Feature Badges - Hidden on mobile */}
            <AnimatePresence>
              {showBadges && phoneFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -4,
                    boxShadow: "0 10px 30px rgba(152,193,217,0.5)",
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 500, damping: 30 }}
                  className={`hidden md:block absolute ${getBadgePosition(feature.position, "phone")} whitespace-nowrap rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary px-2 md:px-3 py-1 md:py-1.5 font-medium text-white shadow-lg backdrop-blur-sm cursor-pointer`}
                >
                  {feature.label}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
