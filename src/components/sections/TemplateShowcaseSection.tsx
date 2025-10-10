"use client";

import * as React from "react";
import BrandButton from "@/components/BrandButton";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import tp1Screenshot from "@/tp1-ss.png";
import tp2Screenshot from "@/tp2-ss.png";

export default function TemplateShowcaseSection() {
  const templates = [
    { 
      name: "Classic Elegance", 
      desc: "Timeless & Romantic", 
      gradient: "from-[#98C1D9] via-[#6969B3] to-[#533A7B]",
      preview: "/templates/template-1.html",
      image: tp1Screenshot
    },
    { 
      name: "Royal Bliss", 
      desc: "Royalty Bliss", 
      gradient: "from-[#6969B3] to-[#533A7B]",
      preview: "/templates/template-2.html",
      image: tp2Screenshot
    },
  ];

  const [currentTemplate, setCurrentTemplate] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemplate((prev) => (prev + 1) % templates.length);
    }, 3000); // Switch every 3 seconds
    return () => clearInterval(interval);
  }, [templates.length]);
  
  return (
    <section id="templates" className="mx-auto max-w-5xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary/5 via-brand-secondary/10 to-brand-accent/5 border-2 border-brand-primary/20 p-8 md:p-12"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(83,58,123,0.3),transparent_50%)]" />
        </div>

        <div className="relative z-10 text-center">
          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-brand-primary mb-3"
          >
            Want to See Your Website Live?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-dark/70 mb-8 max-w-2xl mx-auto"
          >
            Try our interactive preview! Type in your names and see your wedding website come to life instantly.
          </motion.p>

          {/* Animated Template Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto max-w-4xl bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTemplate}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={templates[currentTemplate].image}
                    alt={`${templates[currentTemplate].name} template preview`}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  
                  {/* Overlay with template name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                    <motion.h3 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-3xl font-serif text-white mb-1"
                    >
                      {templates[currentTemplate].name}
                    </motion.h3>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-base md:text-lg text-white/90"
                    >
                      {templates[currentTemplate].desc}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Template Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {templates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTemplate(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentTemplate 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`View template ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/preview">
              <BrandButton 
                className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                ✨ See Your Website Now
              </BrandButton>
            </Link>
            <p className="text-sm text-brand-dark/60 mt-4">
              No signup required • Try it free • Takes 30 seconds
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
