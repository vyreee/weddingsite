"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { BookingFormData } from "@/types/booking";
import { calculateSiteEndDate, parseDate } from "@/lib/calendar-utils";

interface StepReviewProps {
  formData: BookingFormData;
}

export default function StepReview({ formData }: StepReviewProps) {
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
          <CheckCircle2 className="size-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Review Your Booking
        </h2>
        <p className="text-brand-dark/70">
          Please review all details before proceeding to payment
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-secondary/30 pb-2">
            Site Launch Details
          </h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Launch Date:</span>
              <span className="font-medium text-brand-dark">
                {new Date(formData.launchDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {siteEndDate && (
              <div className="flex justify-between">
                <span className="text-brand-dark/70">Site End Date:</span>
                <span className="font-medium text-brand-dark">
                  {siteEndDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Duration:</span>
              <span className="font-medium text-brand-dark">45 days</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-secondary/30 pb-2">
            Couple Information
          </h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Groom:</span>
              <span className="font-medium text-brand-dark">{formData.groomName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Bride:</span>
              <span className="font-medium text-brand-dark">{formData.brideName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Email:</span>
              <span className="font-medium text-brand-dark">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Phone:</span>
              <span className="font-medium text-brand-dark">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Wedding Date:</span>
              <span className="font-medium text-brand-dark">
                {new Date(formData.weddingDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Package:</span>
              <span className="font-medium text-brand-dark">{formData.package}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-secondary/30 pb-2">
            Venue & Event Details
          </h3>
          <div className="grid gap-3 text-sm">
            {formData.churchVenueName && (
              <>
                <div className="flex justify-between">
                  <span className="text-brand-dark/70">Church Venue:</span>
                  <span className="font-medium text-brand-dark">{formData.churchVenueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dark/70">Church Address:</span>
                  <span className="font-medium text-brand-dark">{formData.churchVenueAddress}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Reception Venue:</span>
              <span className="font-medium text-brand-dark">{formData.receptionVenueName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Reception Address:</span>
              <span className="font-medium text-brand-dark">{formData.receptionVenueAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Ceremony Time:</span>
              <span className="font-medium text-brand-dark">{formData.ceremonyTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-dark/70">Reception Time:</span>
              <span className="font-medium text-brand-dark">{formData.receptionTime}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-secondary/30 pb-2">
            Your Love Story
          </h3>
          <p className="text-sm text-brand-dark/80 whitespace-pre-wrap">
            {formData.coupleStory}
          </p>
        </div>

        {formData.specialRequests && (
          <div>
            <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-secondary/30 pb-2">
              Special Requests
            </h3>
            <p className="text-sm text-brand-dark/80 whitespace-pre-wrap">
              {formData.specialRequests}
            </p>
          </div>
        )}
      </div>

      <div className="bg-brand-powder/10 border border-brand-secondary/30 rounded-lg p-4">
        <p className="text-sm text-brand-dark/80">
          <strong>Next Step:</strong> After reviewing your details, you&apos;ll proceed to payment. 
          Once payment is confirmed, we&apos;ll send you a Google Drive folder link to upload your photos.
        </p>
      </div>
    </motion.div>
  );
}
