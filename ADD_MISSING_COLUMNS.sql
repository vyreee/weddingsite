-- Add only missing columns to bookings table
-- Run this in Supabase SQL Editor
-- This script is safe to run multiple times (uses IF NOT EXISTS)

-- Per-section "Leave to Vows" flags
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_hero_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_love_story_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_venue_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_wedding_party_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_rsvp_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_gift_registry_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_additional_to_vows BOOLEAN DEFAULT FALSE;

-- Template selection
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS template TEXT DEFAULT '1';

-- Image requirements
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS image_requirements_acknowledged BOOLEAN DEFAULT FALSE;

-- Church/ceremony venue fields
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_google_maps_link TEXT;

-- Reception venue fields (if they don't exist)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_venue_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_google_maps_link TEXT;

-- Dress code inspiration link
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS dresscode_image_link TEXT;

-- Gift registry fields
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_registry_items TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_notification_contact TEXT;

-- Verify columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
  AND column_name IN (
    'leave_hero_to_vows',
    'leave_love_story_to_vows', 
    'leave_venue_to_vows',
    'leave_wedding_party_to_vows',
    'leave_rsvp_to_vows',
    'leave_gift_registry_to_vows',
    'leave_additional_to_vows',
    'template',
    'image_requirements_acknowledged',
    'church_venue_name',
    'church_venue_address',
    'church_google_maps_link',
    'reception_venue_name',
    'reception_venue_address',
    'reception_google_maps_link',
    'dresscode_image_link',
    'gift_registry_items',
    'gift_notification_contact'
  )
ORDER BY column_name;
