"use client";

import * as React from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { Booking } from "@/types/booking";
import Link from "next/link";
import BrandButton from "@/components/BrandButton";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { getCalendarDates } from "@/lib/calendar-utils";

export default function CalendarPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const dates = React.useMemo(() => {
    return getCalendarDates(currentMonth.getFullYear(), currentMonth.getMonth(), bookings);
  }, [currentMonth, bookings]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

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
                Booking Calendar
              </h1>
              <p className="text-lg text-brand-dark/80 mb-6">
                View available dates and existing bookings
              </p>
              <Link href="/book">
                <BrandButton variant="primary">
                  Make a Booking
                </BrandButton>
              </Link>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-brand-primary">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-primary border-t-transparent" />
                  <span>Loading calendar...</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-brand-powder/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="size-6 text-brand-primary" />
                  </button>
                  <h2 className="text-2xl font-semibold text-brand-primary">{monthYear}</h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-brand-powder/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="size-6 text-brand-primary" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-brand-dark/70 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {dates.map((dateInfo, index) => {
                    const isCurrentMonth = dateInfo.date.getMonth() === currentMonth.getMonth();
                    const hasBookings = dateInfo.bookings && dateInfo.bookings.length > 0;
                    
                    return (
                      <div
                        key={index}
                        className={`relative min-h-[80px] p-2 rounded-lg border transition-all ${
                          !isCurrentMonth
                            ? "bg-gray-50 text-gray-400 border-gray-200"
                            : dateInfo.status === "available"
                            ? "bg-white border-brand-secondary/30 hover:border-brand-primary/50"
                            : dateInfo.status === "reserved" || dateInfo.status === "booked"
                            ? "bg-brand-primary/10 border-brand-primary/30"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        <div className="text-sm font-medium text-brand-dark">
                          {dateInfo.date.getDate()}
                        </div>
                        
                        {hasBookings && (
                          <div className="mt-1 space-y-1">
                            {dateInfo.bookings!.map((booking, idx) => (
                              <div
                                key={idx}
                                className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded truncate"
                                title={`${booking.groomName} & ${booking.brideName}`}
                              >
                                {booking.groomName.split(' ')[0]} & {booking.brideName.split(' ')[0]}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white border border-brand-secondary/30"></div>
                    <span className="text-brand-dark/70">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-brand-primary/10 border border-brand-primary/30"></div>
                    <span className="text-brand-dark/70">Reserved/Booked</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
