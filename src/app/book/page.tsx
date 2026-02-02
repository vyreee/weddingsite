"use client";

import * as React from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import BookingWizard from "@/components/booking/BookingWizard";
import { Booking } from "@/types/booking";

export default function BookPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

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
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-semibold text-brand-primary mb-4">
                Book Your Wedding Website
              </h1>
              <p className="text-brand-dark/80 max-w-2xl mx-auto">
                Follow the simple steps below to reserve your wedding website. 
                We&apos;ll guide you through selecting your launch date, providing details, and completing payment.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
              </div>
            ) : (
              <BookingWizard bookings={bookings} />
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
