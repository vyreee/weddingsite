"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { BookingFormData, IMAGE_SECTIONS } from "@/types/booking";

interface StepContentDetailsProps {
  formData: BookingFormData;
  onUpdate: (data: Partial<BookingFormData>) => void;
}

export default function StepContentDetails({ formData, onUpdate }: StepContentDetailsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ [e.target.name]: e.target.value });
  };

  const handleImageSectionChange = (sectionKey: string, value: string) => {
    onUpdate({
      imageSections: {
        ...formData.imageSections,
        [sectionKey]: value,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-powder/20 mb-4">
          <FileText className="size-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Content & Details
        </h2>
        <p className="text-brand-dark/70">
          Share your love story and wedding venue information
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-6">
        <div>
          <label htmlFor="coupleStory" className="block text-sm font-medium text-brand-dark mb-2">
            Your Love Story *
          </label>
          <textarea
            id="coupleStory"
            name="coupleStory"
            required
            rows={5}
            value={formData.coupleStory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none"
            placeholder="Tell us how you met, your journey together, and what makes your love special..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="venueName" className="block text-sm font-medium text-brand-dark mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              required
              value={formData.venueName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="Grand Ballroom Hotel"
            />
          </div>

          <div>
            <label htmlFor="venueAddress" className="block text-sm font-medium text-brand-dark mb-2">
              Venue Address *
            </label>
            <input
              type="text"
              id="venueAddress"
              name="venueAddress"
              required
              value={formData.venueAddress}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="123 Main St, City"
            />
          </div>

          <div>
            <label htmlFor="ceremonyTime" className="block text-sm font-medium text-brand-dark mb-2">
              Ceremony Time *
            </label>
            <input
              type="time"
              id="ceremonyTime"
              name="ceremonyTime"
              required
              value={formData.ceremonyTime}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="receptionTime" className="block text-sm font-medium text-brand-dark mb-2">
              Reception Time *
            </label>
            <input
              type="time"
              id="receptionTime"
              name="receptionTime"
              required
              value={formData.receptionTime}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-brand-dark mb-2">
            Special Requests or Additional Notes
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none"
            placeholder="Any special design requests, color preferences, or additional information..."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon className="size-6 text-brand-primary" />
          <h3 className="text-lg font-semibold text-brand-primary">
            Image Requirements
          </h3>
        </div>
        <p className="text-sm text-brand-dark/70 mb-4">
          After booking, we&apos;ll share a Google Drive folder where you can upload your photos. 
          Please note the requirements for each section below:
        </p>

        <div className="space-y-4">
          {IMAGE_SECTIONS.map((section, index) => {
            const sectionKey = section.sectionName.toLowerCase().replace(/\s+/g, "") + "Photos";
            const sectionKey2 = sectionKey.charAt(0).toLowerCase() + sectionKey.slice(1);
            
            return (
              <div key={index} className="border border-brand-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold text-brand-dark mb-1">
                  {section.sectionName}
                  {section.minImages > 0 && <span className="text-red-500 ml-1">*</span>}
                </h4>
                <p className="text-sm text-brand-dark/70 mb-2">{section.description}</p>
                <p className="text-xs text-brand-dark/60">
                  {section.minImages > 0 
                    ? `Required: ${section.minImages}-${section.maxImages === 999 ? "unlimited" : section.maxImages} photos`
                    : `Optional: Up to ${section.maxImages === 999 ? "unlimited" : section.maxImages} photos`
                  }
                </p>
                <input
                  type="text"
                  value={formData.imageSections[sectionKey2 as keyof typeof formData.imageSections] || ""}
                  onChange={(e) => handleImageSectionChange(sectionKey2, e.target.value)}
                  placeholder="Add any specific notes for this section (optional)"
                  className="mt-2 w-full px-3 py-2 text-sm rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
                />
              </div>
            );
          })}
        </div>

        <div className="bg-brand-powder/10 border border-brand-secondary/30 rounded-lg p-4 mt-4">
          <p className="text-sm text-brand-dark/80">
            <strong>Note:</strong> You&apos;ll receive a Google Drive folder link via email after completing your booking. 
            Please upload all photos there, organized by section.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
