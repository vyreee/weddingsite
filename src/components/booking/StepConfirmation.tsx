"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Mail, Calendar, Image as ImageIcon } from "lucide-react";
import { BookingFormData } from "@/types/booking";
import BrandButton from "@/components/BrandButton";
import Link from "next/link";

interface StepConfirmationProps {
  formData: BookingFormData;
  bookingId?: string;
}

export default function StepConfirmation({ formData, bookingId }: StepConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
        >
          <CheckCircle2 className="size-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-semibold text-brand-primary mb-2">
          Booking Submitted! 🎉
        </h2>
        <p className="text-brand-dark/70 text-lg">
          Thank you, {formData.groomName} & {formData.brideName}!
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-6">
        <div className="bg-brand-powder/10 border border-brand-secondary/30 rounded-lg p-4">
          <p className="text-sm text-brand-dark/80 mb-2">
            <strong>Booking Reference:</strong> {bookingId || "Processing..."}
          </p>
          <p className="text-sm text-brand-dark/80">
            <strong>Status:</strong> <span className="text-yellow-600 font-semibold">🟡 Reserved</span>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-4">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-powder/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-brand-primary">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Payment Verification</h4>
                <p className="text-sm text-brand-dark/70">
                  We&apos;ll verify your GCash payment within 24 hours. Your booking status will change from 
                  <span className="text-yellow-600 font-semibold"> Reserved 🟡</span> to 
                  <span className="text-green-600 font-semibold"> Booked 🟢</span>.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-powder/20 flex items-center justify-center">
                <Mail className="size-4 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Confirmation Email</h4>
                <p className="text-sm text-brand-dark/70">
                  Once payment is confirmed, you&apos;ll receive an email at <strong>{formData.email}</strong> with 
                  detailed next steps and timeline.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-powder/20 flex items-center justify-center">
                <ImageIcon className="size-4 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Photo Upload</h4>
                <p className="text-sm text-brand-dark/70">
                  We&apos;ll share a Google Drive folder link where you can upload your wedding photos 
                  (couple photos, venue photos, entourage, and extras).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-powder/20 flex items-center justify-center">
                <Calendar className="size-4 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Site Development</h4>
                <p className="text-sm text-brand-dark/70">
                  Your beautiful wedding website will be ready within 3 days and will go live on{" "}
                  <strong>
                    {new Date(formData.launchDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-secondary/30 pt-4">
          <h4 className="font-semibold text-brand-dark mb-3">Important Reminders:</h4>
          <ul className="space-y-2 text-sm text-brand-dark/70">
            <li className="flex items-start gap-2">
              <span className="text-brand-primary mt-0.5">•</span>
              <span>Check your email (including spam folder) for updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-primary mt-0.5">•</span>
              <span>Your site will be live for 45 days from the launch date</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-primary mt-0.5">•</span>
              <span>Prepare your photos according to the sections we discussed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-primary mt-0.5">•</span>
              <span>Contact us on Instagram @luredexigns or Facebook @luredexigns for any questions</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Link href="/">
          <BrandButton variant="primary">
            Back to Home
          </BrandButton>
        </Link>
        <Link href="/book/calendar">
          <BrandButton variant="ghost">
            View Calendar
          </BrandButton>
        </Link>
      </div>
    </motion.div>
  );
}
