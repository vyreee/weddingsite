"use client";

import * as React from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { Calendar, Clock } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative isolate py-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#98C1D9] via-[#6969B3] to-[#533A7B] opacity-10" />
          
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-powder/20 mb-6">
                <Clock className="size-10 text-brand-primary" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-semibold text-brand-primary mb-4">
                Coming Soon
              </h1>
              
              <p className="text-lg text-brand-dark/80 mb-6">
                We&apos;re currently working on our booking calendar to bring you the best experience.
              </p>
              
              <div className="bg-white rounded-xl border border-brand-secondary/30 p-8 shadow-lg">
                <Calendar className="size-12 text-brand-secondary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-brand-dark mb-2">
                  Calendar Under Development
                </h2>
                <p className="text-brand-dark/70">
                  Our team is finalizing the calendar view. Check back soon to see available dates!
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
