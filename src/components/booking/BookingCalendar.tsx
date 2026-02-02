"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarDate } from "@/types/booking";
import { formatDate } from "@/lib/calendar-utils";

interface BookingCalendarProps {
  dates: CalendarDate[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function BookingCalendar({
  dates,
  selectedDate,
  onSelectDate,
  currentMonth,
  onMonthChange,
}: BookingCalendarProps) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const getStatusColor = (status: CalendarDate["status"]) => {
    switch (status) {
      case "available":
        return "bg-white hover:bg-brand-powder/20 border-brand-secondary/30 cursor-pointer";
      case "reserved":
        return "bg-yellow-100 border-yellow-300 cursor-not-allowed";
      case "booked":
        return "bg-green-100 border-green-300 cursor-not-allowed";
      case "unavailable":
        return "bg-gray-100 border-gray-300 cursor-not-allowed text-gray-400";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: CalendarDate["status"]) => {
    switch (status) {
      case "reserved":
        return "🟡";
      case "booked":
        return "🟢";
      case "unavailable":
        return "⚫";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-brand-powder/20 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-5 text-brand-primary" />
        </button>
        
        <h3 className="text-xl font-semibold text-brand-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-brand-powder/20 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="size-5 text-brand-primary" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-brand-dark/70 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((dateObj, index) => {
          const dateStr = formatDate(dateObj.date);
          const isSelected = selectedDate === dateStr;
          const isCurrentMonth = dateObj.date.getMonth() === currentMonth.getMonth();
          const isAvailable = dateObj.status === "available";

          return (
            <motion.button
              key={index}
              whileHover={isAvailable ? { scale: 1.05 } : {}}
              whileTap={isAvailable ? { scale: 0.95 } : {}}
              onClick={() => isAvailable && onSelectDate(dateStr)}
              disabled={!isAvailable}
              className={`
                relative aspect-square rounded-lg border-2 p-2 text-sm font-medium transition-all
                ${getStatusColor(dateObj.status)}
                ${isSelected ? "ring-2 ring-brand-primary ring-offset-2" : ""}
                ${!isCurrentMonth ? "opacity-40" : ""}
              `}
            >
              <span className={isCurrentMonth ? "text-brand-dark" : "text-brand-dark/50"}>
                {dateObj.date.getDate()}
              </span>
              {dateObj.status !== "available" && (
                <span className="absolute top-0.5 right-0.5 text-xs">
                  {getStatusIcon(dateObj.status)}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-brand-secondary/30 bg-white"></div>
          <span className="text-brand-dark/70">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-yellow-300 bg-yellow-100"></div>
          <span className="text-brand-dark/70">🟡 Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-300 bg-green-100"></div>
          <span className="text-brand-dark/70">🟢 Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-gray-300 bg-gray-100"></div>
          <span className="text-brand-dark/70">⚫ Unavailable</span>
        </div>
      </div>
    </div>
  );
}
