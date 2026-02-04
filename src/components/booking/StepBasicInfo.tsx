"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { BookingFormData } from "@/types/booking";

interface StepBasicInfoProps {
  formData: BookingFormData;
  onUpdate: (data: Partial<BookingFormData>) => void;
}

export default function StepBasicInfo({ formData, onUpdate }: StepBasicInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({ [e.target.name]: e.target.value });
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
          <Users className="size-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Basic Information
        </h2>
        <p className="text-brand-dark/70">
          Tell us about the happy couple and your wedding details
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="groomName" className="block text-sm font-medium text-brand-dark mb-2">
              Groom&apos;s Full Name *
            </label>
            <input
              type="text"
              id="groomName"
              name="groomName"
              required
              value={formData.groomName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="brideName" className="block text-sm font-medium text-brand-dark mb-2">
              Bride&apos;s Full Name *
            </label>
            <input
              type="text"
              id="brideName"
              name="brideName"
              required
              value={formData.brideName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="couple@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              placeholder="+63 912 345 6789"
            />
          </div>

          <div>
            <label htmlFor="weddingDate" className="block text-sm font-medium text-brand-dark mb-2">
              Wedding Date *
            </label>
            <input
              type="date"
              id="weddingDate"
              name="weddingDate"
              required
              value={formData.weddingDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="package" className="block text-sm font-medium text-brand-dark mb-2">
              Package Selection *
            </label>
            <select
              id="package"
              name="package"
              required
              value={formData.package}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors bg-white"
            >
              <option value="Elegant">Elegant - $100 / ₱4,999</option>
              <option value="Custom">Custom - Price Quotation</option>
            </select>
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-brand-dark mb-2">
              Template Selection *
            </label>
            <select
              id="template"
              name="template"
              required
              value={formData.template}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors bg-white"
            >
              <option value="1">Template 1 - Classic Elegance</option>
              <option value="2">Template 2 - Modern Minimalist</option>
              <option value="3">Template 3 - Garden Romance</option>
              <option value="4">Template 4 - Royal Bliss</option>
              <option value="5">Template 5 - Editorial Minimalism</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
