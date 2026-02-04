-- Add per-section "Leave to Vows" flags, Google Maps link, and template selection
-- Run this in Supabase SQL Editor after ADD_NEW_COLUMNS.sql

-- Add template selection
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS template TEXT DEFAULT '1' CHECK (template IN ('1', '2', '3', '4', '5'));

-- Add per-section Leave to Vows flags
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_hero_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_love_story_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_venue_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_wedding_party_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_rsvp_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_additional_to_vows BOOLEAN DEFAULT FALSE;

-- Add Google Maps link for venue
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS venue_google_maps_link TEXT;

-- Add image requirements acknowledgment flag
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS image_requirements_acknowledged BOOLEAN DEFAULT FALSE;

-- Remove old global leave_content_to_vows column if it exists
ALTER TABLE bookings DROP COLUMN IF EXISTS leave_content_to_vows;
