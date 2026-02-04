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


      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">💍</span> Hero Section
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveHeroToVows"
              checked={formData.leaveHeroToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="heroTagline" className="block text-sm font-medium text-brand-dark mb-2">
              Tagline <span className="text-xs text-brand-dark/60">(Optional)</span>
            </label>
            <input
              type="text"
              id="heroTagline"
              name="heroTagline"
              disabled={formData.leaveHeroToVows}
              value={formData.heroTagline || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g., 'Two Hearts, One Love'"
            />
          </div>
          <div>
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-brand-dark mb-2">
              Subtitle <span className="text-xs text-brand-dark/60">(Optional)</span>
            </label>
            <input
              type="text"
              id="heroSubtitle"
              name="heroSubtitle"
              disabled={formData.leaveHeroToVows}
              value={formData.heroSubtitle || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="e.g., 'Join us as we celebrate our love'"
            />
          </div>
        </div>
        {formData.leaveHeroToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will craft compelling hero section content based on your basic information.
          </p>
        )}
      </div>

      {/* Love Story Section */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">❤️</span> Our Love Story
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveLoveStoryToVows"
              checked={formData.leaveLoveStoryToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div>
          <label htmlFor="coupleStory" className="block text-sm font-medium text-brand-dark mb-2">
            Love Story Overview {!formData.leaveLoveStoryToVows && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id="coupleStory"
            name="coupleStory"
            required={!formData.leaveLoveStoryToVows}
            rows={4}
            disabled={formData.leaveLoveStoryToVows}
            value={formData.leaveLoveStoryToVows ? "" : formData.coupleStory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Tell us about your journey together..."
          />
        </div>
        <div>
          <label htmlFor="howWeMet" className="block text-sm font-medium text-brand-dark mb-2">
            How We Met <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="howWeMet"
            name="howWeMet"
            rows={3}
            disabled={formData.leaveLoveStoryToVows}
            value={formData.howWeMet || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Share the story of your first meeting..."
          />
        </div>
        <div>
          <label htmlFor="proposalStory" className="block text-sm font-medium text-brand-dark mb-2">
            The Proposal <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="proposalStory"
            name="proposalStory"
            rows={3}
            disabled={formData.leaveLoveStoryToVows}
            value={formData.proposalStory || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Tell us about the proposal..."
          />
        </div>
        <div>
          <label htmlFor="relationshipHighlights" className="block text-sm font-medium text-brand-dark mb-2">
            Relationship Highlights <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="relationshipHighlights"
            name="relationshipHighlights"
            rows={3}
            disabled={formData.leaveLoveStoryToVows}
            value={formData.relationshipHighlights || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Special moments, milestones, or memories you'd like to share..."
          />
        </div>
        {formData.leaveLoveStoryToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will craft your love story based on your basic information and any details you share with us.
          </p>
        )}
      </div>

      {/* Venue & Event Details */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">🏛️</span> Venue & Event Details
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveVenueToVows"
              checked={formData.leaveVenueToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>

        <h4 className="text-sm font-semibold text-brand-dark mt-4">Church/Ceremony Venue <span className="text-xs font-normal text-brand-dark/60">(Optional if same as reception)</span></h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="churchVenueName" className="block text-sm font-medium text-brand-dark mb-2">
              Church/Ceremony Venue Name
            </label>
            <input
              type="text"
              id="churchVenueName"
              name="churchVenueName"
              disabled={formData.leaveVenueToVows}
              value={formData.churchVenueName || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="St. Mary's Cathedral"
            />
          </div>
          <div>
            <label htmlFor="churchVenueAddress" className="block text-sm font-medium text-brand-dark mb-2">
              Church/Ceremony Address
            </label>
            <input
              type="text"
              id="churchVenueAddress"
              name="churchVenueAddress"
              disabled={formData.leaveVenueToVows}
              value={formData.churchVenueAddress || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="456 Church St, City"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="churchGoogleMapsLink" className="block text-sm font-medium text-brand-dark mb-2">
              Church Google Maps Link
            </label>
            <input
              type="url"
              id="churchGoogleMapsLink"
              name="churchGoogleMapsLink"
              disabled={formData.leaveVenueToVows}
              value={formData.churchGoogleMapsLink || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        <h4 className="text-sm font-semibold text-brand-dark mt-4">Reception Venue *</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="receptionVenueName" className="block text-sm font-medium text-brand-dark mb-2">
              Reception Venue Name {!formData.leaveVenueToVows && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="receptionVenueName"
              name="receptionVenueName"
              required={!formData.leaveVenueToVows}
              disabled={formData.leaveVenueToVows}
              value={formData.leaveVenueToVows ? "" : formData.receptionVenueName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Grand Ballroom Hotel"
            />
          </div>
          <div>
            <label htmlFor="receptionVenueAddress" className="block text-sm font-medium text-brand-dark mb-2">
              Reception Address {!formData.leaveVenueToVows && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="receptionVenueAddress"
              name="receptionVenueAddress"
              required={!formData.leaveVenueToVows}
              disabled={formData.leaveVenueToVows}
              value={formData.leaveVenueToVows ? "" : formData.receptionVenueAddress}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="123 Main St, City"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="receptionGoogleMapsLink" className="block text-sm font-medium text-brand-dark mb-2">
              Reception Google Maps Link
            </label>
            <input
              type="url"
              id="receptionGoogleMapsLink"
              name="receptionGoogleMapsLink"
              disabled={formData.leaveVenueToVows}
              value={formData.receptionGoogleMapsLink || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="https://maps.google.com/..."
            />
          </div>
          <div>
            <label htmlFor="ceremonyTime" className="block text-sm font-medium text-brand-dark mb-2">
              Ceremony Time {!formData.leaveVenueToVows && <span className="text-red-500">*</span>}
            </label>
            <input
              type="time"
              id="ceremonyTime"
              name="ceremonyTime"
              required={!formData.leaveVenueToVows}
              disabled={formData.leaveVenueToVows}
              value={formData.leaveVenueToVows ? "" : formData.ceremonyTime}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="receptionTime" className="block text-sm font-medium text-brand-dark mb-2">
              Reception Time {!formData.leaveVenueToVows && <span className="text-red-500">*</span>}
            </label>
            <input
              type="time"
              id="receptionTime"
              name="receptionTime"
              required={!formData.leaveVenueToVows}
              disabled={formData.leaveVenueToVows}
              value={formData.leaveVenueToVows ? "" : formData.receptionTime}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label htmlFor="venueDescription" className="block text-sm font-medium text-brand-dark mb-2">
            Venue Description <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="venueDescription"
            name="venueDescription"
            rows={2}
            disabled={formData.leaveVenueToVows}
            value={formData.venueDescription || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Describe the venue atmosphere, special features, etc..."
          />
        </div>
        <div>
          <label htmlFor="dresscode" className="block text-sm font-medium text-brand-dark mb-2">
            Dress Code <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <input
            type="text"
            id="dresscode"
            name="dresscode"
            disabled={formData.leaveVenueToVows}
            value={formData.dresscode || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., Formal, Semi-Formal, Cocktail Attire"
          />
        </div>
        <div>
          <label htmlFor="dresscodeImageLink" className="block text-sm font-medium text-brand-dark mb-2">
            Dress Code Inspiration Link <span className="text-xs text-brand-dark/60">(Optional - if you have a photo/peg in mind)</span>
          </label>
          <input
            type="url"
            id="dresscodeImageLink"
            name="dresscodeImageLink"
            disabled={formData.leaveVenueToVows}
            value={formData.dresscodeImageLink || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Link to Pinterest, Instagram, or any image URL"
          />
          <p className="text-xs text-brand-dark/60 mt-1">Share a link to your dress code inspiration photo if you have one</p>
        </div>
        <div>
          <label htmlFor="directionsTransport" className="block text-sm font-medium text-brand-dark mb-2">
            Directions & Transportation <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="directionsTransport"
            name="directionsTransport"
            rows={2}
            disabled={formData.leaveVenueToVows}
            value={formData.directionsTransport || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Parking info, shuttle service, nearby landmarks..."
          />
        </div>
        {formData.leaveVenueToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will add venue details and directions based on the information you provide.
          </p>
        )}
      </div>

      {/* Important People */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">👥</span> Important People in Your Wedding
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveWeddingPartyToVows"
              checked={formData.leaveWeddingPartyToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div>
          <label htmlFor="groomsmen" className="block text-sm font-medium text-brand-dark mb-2">
            Groomsmen <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="groomsmen"
            name="groomsmen"
            rows={2}
            disabled={formData.leaveWeddingPartyToVows}
            value={formData.groomsmen || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="List names and roles (e.g., Best Man: John Doe, Groomsman: Mike Smith)"
          />
        </div>
        <div>
          <label htmlFor="bridesmaids" className="block text-sm font-medium text-brand-dark mb-2">
            Bridesmaids <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="bridesmaids"
            name="bridesmaids"
            rows={2}
            disabled={formData.leaveWeddingPartyToVows}
            value={formData.bridesmaids || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="List names and roles (e.g., Maid of Honor: Jane Doe, Bridesmaid: Sarah Lee)"
          />
        </div>
        <div>
          <label htmlFor="parents" className="block text-sm font-medium text-brand-dark mb-2">
            Parents & Sponsors <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="parents"
            name="parents"
            rows={2}
            disabled={formData.leaveWeddingPartyToVows}
            value={formData.parents || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Parents' names, principal sponsors, etc..."
          />
        </div>
        {formData.leaveWeddingPartyToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will format the wedding party section based on the information you provide.
          </p>
        )}
      </div>

      {/* RSVP */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">💌</span> RSVP
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveRsvpToVows"
              checked={formData.leaveRsvpToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div>
          <label htmlFor="rsvpDeadline" className="block text-sm font-medium text-brand-dark mb-2">
            RSVP Deadline <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <input
            type="date"
            id="rsvpDeadline"
            name="rsvpDeadline"
            disabled={formData.leaveRsvpToVows}
            value={formData.rsvpDeadline || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        {formData.leaveRsvpToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will set up RSVP functionality for your website.
          </p>
        )}
      </div>

      {/* Gift Registry */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">🎁</span> Gift Registry
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveGiftRegistryToVows"
              checked={formData.leaveGiftRegistryToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900">
            <strong>📝 Note:</strong> We&apos;ll add a feature on your website where guests can notify you when they want to gift an item. This helps prevent duplicate gifts!
          </p>
        </div>
        <div>
          <label htmlFor="giftRegistryItems" className="block text-sm font-medium text-brand-dark mb-2">
            Gift Items & Links <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="giftRegistryItems"
            name="giftRegistryItems"
            rows={4}
            disabled={formData.leaveGiftRegistryToVows}
            value={formData.giftRegistryItems || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="List your desired gifts with links (one per line):

Example:
KitchenAid Mixer - https://example.com/mixer
Luggage Set - https://example.com/luggage
Honeymoon Fund - Cash/GCash"
          />
        </div>
        <div>
          <label htmlFor="giftNotificationContact" className="block text-sm font-medium text-brand-dark mb-2">
            Contact for Gift Notifications <span className="text-xs text-brand-dark/60">(Optional - Messenger/Phone)</span>
          </label>
          <input
            type="text"
            id="giftNotificationContact"
            name="giftNotificationContact"
            disabled={formData.leaveGiftRegistryToVows}
            value={formData.giftNotificationContact || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Facebook Messenger link, phone number, or email"
          />
          <p className="text-xs text-brand-dark/60 mt-1">Guests will use this to inform you when they want to gift an item, so you can coordinate and avoid duplicates</p>
        </div>
        {formData.leaveGiftRegistryToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will help you set up your gift registry with the notification feature.
          </p>
        )}
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
            <span className="text-2xl">📋</span> Additional Information
          </h3>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="leaveAdditionalToVows"
              checked={formData.leaveAdditionalToVows || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
            />
            <span className="text-brand-dark/70">Leave to Vows team</span>
          </label>
        </div>
        <div>
          <label htmlFor="scheduleOfEvents" className="block text-sm font-medium text-brand-dark mb-2">
            Schedule of Events <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="scheduleOfEvents"
            name="scheduleOfEvents"
            rows={3}
            disabled={formData.leaveAdditionalToVows}
            value={formData.scheduleOfEvents || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Timeline of the day (e.g., 2:00 PM - Ceremony, 3:00 PM - Cocktail Hour, 4:00 PM - Reception)"
          />
        </div>
        <div>
          <label htmlFor="accommodationInfo" className="block text-sm font-medium text-brand-dark mb-2">
            Accommodation Information <span className="text-xs text-brand-dark/60">(Optional)</span>
          </label>
          <textarea
            id="accommodationInfo"
            name="accommodationInfo"
            rows={2}
            disabled={formData.leaveAdditionalToVows}
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
        {formData.leaveAdditionalToVows && (
          <p className="text-xs text-brand-dark/60 italic bg-brand-powder/10 p-3 rounded-lg">
            Our team will add RSVP, registry, and accommodation details based on your information.
          </p>
        )}
      </div>

      {/* Image Requirements Notification */}
      <div className="bg-gradient-to-r from-brand-powder/20 to-brand-secondary/20 rounded-xl border-2 border-brand-primary/30 p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <ImageIcon className="size-6 text-brand-primary" />
          <h3 className="text-lg font-semibold text-brand-primary">
            Image Requirements
          </h3>
        </div>
        
        <div className="bg-white rounded-lg p-4 space-y-3">
          <p className="text-sm text-brand-dark/80">
            <strong>📁 Google Drive Folder:</strong> After booking confirmation, we&apos;ll provide you with a Google Drive folder link via email.
          </p>
          <p className="text-sm text-brand-dark/80">
            <strong>⏰ Timeline:</strong> Please upload all required images within <span className="font-semibold text-brand-primary">24-48 hours</span> of receiving the folder link.
          </p>
          <p className="text-sm text-brand-dark/80">
            <strong>⚠️ Important:</strong> If images are not provided within the timeframe, we&apos;ll send you a reminder notification.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-brand-dark">Required Images:</h4>
          {IMAGE_SECTIONS.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-brand-secondary/20">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-brand-dark">
                  {section.sectionName}
                  {section.minImages > 0 && <span className="text-red-500 ml-1">*</span>}
                </h5>
                <span className="text-xs text-brand-dark/60 bg-brand-powder/20 px-2 py-1 rounded">
                  {section.minImages > 0 
                    ? `${section.minImages}-${section.maxImages === 999 ? "∞" : section.maxImages} photos`
                    : `Up to ${section.maxImages === 999 ? "∞" : section.maxImages} photos`
                  }
                </span>
              </div>
              <p className="text-sm text-brand-dark/70">{section.description}</p>
            </div>
          ))}
        </div>

        <label className="flex items-start gap-3 cursor-pointer bg-white rounded-lg p-4">
          <input
            type="checkbox"
            name="imageRequirementsAcknowledged"
            checked={formData.imageRequirementsAcknowledged}
            onChange={handleCheckboxChange}
            required
            className="mt-1 w-5 h-5 rounded border-brand-secondary/30 text-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
          <div>
            <span className="text-sm font-semibold text-brand-dark block mb-1">
              I understand the image requirements <span className="text-red-500">*</span>
            </span>
            <p className="text-xs text-brand-dark/70">
              I acknowledge that I will receive a Google Drive folder link and will upload all required images within 24-48 hours.
            </p>
          </div>
        </label>
      </div>
    </motion.div>
  );
}
