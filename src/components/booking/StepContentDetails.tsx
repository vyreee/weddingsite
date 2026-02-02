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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ [e.target.name]: e.target.checked });
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

      {/* Leave it to Vows Option */}
      <div className="bg-gradient-to-r from-brand-powder/20 to-brand-secondary/20 rounded-xl border-2 border-brand-primary/30 p-6 shadow-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="leaveContentToVows"
            checked={formData.leaveContentToVows}
            onChange={handleCheckboxChange}
            className="mt-1 w-5 h-5 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
          <div>
            <span className="text-lg font-semibold text-brand-primary block mb-1">
              Leave content creation to Vows team
            </span>
            <p className="text-sm text-brand-dark/70">
              Check this if you&apos;d like our team to craft the website copy based on the basic information you provide. 
              We&apos;ll create suitable content for all sections using our expertise and the details you share.
            </p>
            <p className="text-xs text-brand-dark/60 mt-2 italic">
              <strong>Disclaimer:</strong> We will do our best to create beautiful and appropriate content based on your information. 
              You can always request revisions after reviewing the initial draft.
            </p>
          </div>
        </label>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
          <span className="text-2xl">💍</span> Hero Section
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="heroTagline" className="block text-sm font-medium text-brand-dark mb-2">
              Tagline {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
            </label>
            <input
              type="text"
              id="heroTagline"
              name="heroTagline"
              disabled={formData.leaveContentToVows}
              value={formData.heroTagline || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g., 'Two Hearts, One Love'"
            />
          </div>
          <div>
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-brand-dark mb-2">
              Subtitle {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
            </label>
            <input
              type="text"
              id="heroSubtitle"
              name="heroSubtitle"
              disabled={formData.leaveContentToVows}
              value={formData.heroSubtitle || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g., 'Join us as we celebrate our love'"
            />
          </div>
        </div>
      </div>

      {/* Love Story Section */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
          <span className="text-2xl">❤️</span> Our Love Story
        </h3>
        <div>
          <label htmlFor="coupleStory" className="block text-sm font-medium text-brand-dark mb-2">
            Love Story Overview *
          </label>
          <textarea
            id="coupleStory"
            name="coupleStory"
            required
            rows={4}
            disabled={formData.leaveContentToVows}
            value={formData.coupleStory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Tell us about your journey together..."
          />
        </div>
        <div>
          <label htmlFor="howWeMet" className="block text-sm font-medium text-brand-dark mb-2">
            How We Met {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="howWeMet"
            name="howWeMet"
            rows={3}
            disabled={formData.leaveContentToVows}
            value={formData.howWeMet || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Share the story of your first meeting..."
          />
        </div>
        <div>
          <label htmlFor="proposalStory" className="block text-sm font-medium text-brand-dark mb-2">
            The Proposal {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="proposalStory"
            name="proposalStory"
            rows={3}
            disabled={formData.leaveContentToVows}
            value={formData.proposalStory || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Tell us about the proposal..."
          />
        </div>
        <div>
          <label htmlFor="relationshipHighlights" className="block text-sm font-medium text-brand-dark mb-2">
            Relationship Highlights {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="relationshipHighlights"
            name="relationshipHighlights"
            rows={3}
            disabled={formData.leaveContentToVows}
            value={formData.relationshipHighlights || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Special moments, milestones, or memories you'd like to share..."
          />
        </div>
      </div>

      {/* Venue & Event Details */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
          <span className="text-2xl">🏛️</span> Venue & Event Details
        </h3>

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
          <label htmlFor="venueDescription" className="block text-sm font-medium text-brand-dark mb-2">
            Venue Description {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="venueDescription"
            name="venueDescription"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.venueDescription || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Describe the venue atmosphere, special features, etc..."
          />
        </div>
        <div>
          <label htmlFor="dresscode" className="block text-sm font-medium text-brand-dark mb-2">
            Dress Code {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <input
            type="text"
            id="dresscode"
            name="dresscode"
            disabled={formData.leaveContentToVows}
            value={formData.dresscode || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., Formal, Semi-Formal, Cocktail Attire"
          />
        </div>
        <div>
          <label htmlFor="directionsTransport" className="block text-sm font-medium text-brand-dark mb-2">
            Directions & Transportation {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="directionsTransport"
            name="directionsTransport"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.directionsTransport || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Parking info, shuttle service, nearby landmarks..."
          />
        </div>
      </div>

      {/* Wedding Party */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
          <span className="text-2xl">👥</span> Wedding Party
        </h3>
        <div>
          <label htmlFor="groomsmen" className="block text-sm font-medium text-brand-dark mb-2">
            Groomsmen {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="groomsmen"
            name="groomsmen"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.groomsmen || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="List names and roles (e.g., Best Man: John Doe, Groomsman: Mike Smith)"
          />
        </div>
        <div>
          <label htmlFor="bridesmaids" className="block text-sm font-medium text-brand-dark mb-2">
            Bridesmaids {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="bridesmaids"
            name="bridesmaids"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.bridesmaids || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="List names and roles (e.g., Maid of Honor: Jane Doe, Bridesmaid: Sarah Lee)"
          />
        </div>
        <div>
          <label htmlFor="parents" className="block text-sm font-medium text-brand-dark mb-2">
            Parents & Sponsors {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="parents"
            name="parents"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.parents || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Parents' names, principal sponsors, etc..."
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
          <span className="text-2xl">📋</span> Additional Information
        </h3>
        <div>
          <label htmlFor="scheduleOfEvents" className="block text-sm font-medium text-brand-dark mb-2">
            Schedule of Events {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="scheduleOfEvents"
            name="scheduleOfEvents"
            rows={3}
            disabled={formData.leaveContentToVows}
            value={formData.scheduleOfEvents || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Timeline of the day (e.g., 2:00 PM - Ceremony, 3:00 PM - Cocktail Hour, 4:00 PM - Reception)"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="rsvpDeadline" className="block text-sm font-medium text-brand-dark mb-2">
              RSVP Deadline {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
            </label>
            <input
              type="date"
              id="rsvpDeadline"
              name="rsvpDeadline"
              disabled={formData.leaveContentToVows}
              value={formData.rsvpDeadline || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="giftRegistryInfo" className="block text-sm font-medium text-brand-dark mb-2">
              Gift Registry {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
            </label>
            <input
              type="text"
              id="giftRegistryInfo"
              name="giftRegistryInfo"
              disabled={formData.leaveContentToVows}
              value={formData.giftRegistryInfo || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Registry link or cash gift details"
            />
          </div>
        </div>
        <div>
          <label htmlFor="accommodationInfo" className="block text-sm font-medium text-brand-dark mb-2">
            Accommodation Information {!formData.leaveContentToVows && <span className="text-xs text-brand-dark/60">(Optional)</span>}
          </label>
          <textarea
            id="accommodationInfo"
            name="accommodationInfo"
            rows={2}
            disabled={formData.leaveContentToVows}
            value={formData.accommodationInfo || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Nearby hotels, room blocks, special rates for guests..."
          />
        </div>
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-brand-dark mb-2">
            Special Requests or Design Preferences
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none"
            placeholder="Color preferences, design style, special features you'd like..."
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
