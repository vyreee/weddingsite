"use client";

import * as React from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { Booking } from "@/types/booking";
import { getCalendarDates } from "@/lib/calendar-utils";
import Link from "next/link";
import BrandButton from "@/components/BrandButton";

export default function CalendarPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

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

  const dates = getCalendarDates(currentMonth.getFullYear(), currentMonth.getMonth(), bookings);

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative isolate py-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#98C1D9] via-[#6969B3] to-[#533A7B] opacity-10" />
          
          <div className="mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-semibold text-brand-primary mb-4">
                Booking Calendar
              </h1>
              <p className="text-brand-dark/80 max-w-2xl mx-auto mb-6">
                View available dates for your wedding website launch. 
                Green dates are booked, yellow are reserved (pending payment confirmation).
              </p>
              <Link href="/book">
                <BrandButton>Book Your Date</BrandButton>
              </Link>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingCalendar
                  dates={dates}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  currentMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                />

                <div className="mt-8 bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-brand-primary mb-4">
                    Booking Information
                  </h3>
                  <ul className="space-y-2 text-sm text-brand-dark/70">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span><strong>Minimum Notice:</strong> Launch date must be at least 5 days from today</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span><strong>Site Duration:</strong> Your wedding website will be live for 45 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span><strong>Reserved (🟡):</strong> Payment pending confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span><strong>Booked (🟢):</strong> Payment confirmed, date secured</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
