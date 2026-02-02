-- Add new content fields to bookings table
-- Run this in Supabase SQL Editor to fix the 500 error

-- Hero Section
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS hero_tagline TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT;

-- Love Story
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS how_we_met TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS proposal_story TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS relationship_highlights TEXT;

-- Venue & Event
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS venue_description TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS dresscode TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS directions_transport TEXT;

-- Wedding Party
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS groomsmen TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bridesmaids TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS parents TEXT;

-- Additional Details
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS schedule_of_events TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS rsvp_deadline DATE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_registry_info TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS accommodation_info TEXT;

-- Leave content to Vows flag
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_content_to_vows BOOLEAN DEFAULT FALSE;
