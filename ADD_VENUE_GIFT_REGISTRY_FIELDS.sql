-- Add new venue fields (separate church and reception), dress code link, and gift registry fields
-- Run this in Supabase SQL Editor after ADD_PER_SECTION_FLAGS.sql

-- Add church/ceremony venue fields
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_google_maps_link TEXT;

-- Rename existing venue fields to reception venue
ALTER TABLE bookings RENAME COLUMN venue_name TO reception_venue_name;
ALTER TABLE bookings RENAME COLUMN venue_address TO reception_venue_address;
ALTER TABLE bookings RENAME COLUMN venue_google_maps_link TO reception_google_maps_link;

-- Add dress code inspiration link
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS dresscode_image_link TEXT;

-- Add gift registry fields (separate from RSVP)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_registry_items TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_notification_contact TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_gift_registry_to_vows BOOLEAN DEFAULT FALSE;

-- Remove old gift_registry_info column if it exists
ALTER TABLE bookings DROP COLUMN IF EXISTS gift_registry_info;
