"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import { Booking, BookingFormData } from "@/types/booking";
import { getCalendarDates, calculateSiteEndDate, parseDate } from "@/lib/calendar-utils";

interface StepSelectDateProps {
  formData: BookingFormData;
  onUpdate: (data: Partial<BookingFormData>) => void;
  bookings: Booking[];
}

export default function StepSelectDate({ formData, onUpdate, bookings }: StepSelectDateProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const dates = getCalendarDates(currentMonth.getFullYear(), currentMonth.getMonth(), bookings);

  const handleSelectDate = (date: string) => {
    onUpdate({ launchDate: date });
  };

  const siteEndDate = formData.launchDate 
    ? calculateSiteEndDate(parseDate(formData.launchDate))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-powder/20 mb-4">
          <Calendar className="size-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Select Your Site Launch Date
        </h2>
        <p className="text-brand-dark/70">
          Choose when you want your wedding website to go live. Your site will be active for 45 days.
        </p>
        <p className="text-sm text-brand-dark/60 mt-2">
          Note: Launch date must be at least 5 days from today to allow for site preparation.
        </p>
      </div>

      <BookingCalendar
        dates={dates}
        selectedDate={formData.launchDate}
        onSelectDate={handleSelectDate}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />

      {formData.launchDate && siteEndDate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-powder/10 border border-brand-secondary/30 rounded-lg p-4"
        >
          <h4 className="font-semibold text-brand-primary mb-2">Selected Date Summary</h4>
          <div className="space-y-1 text-sm text-brand-dark/80">
            <p>
              <strong>Launch Date:</strong>{" "}
              {new Date(formData.launchDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>Site End Date:</strong>{" "}
              {siteEndDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-brand-dark/60 mt-2">
              Your wedding website will be live for 45 days, giving your guests plenty of time to access all the information.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
