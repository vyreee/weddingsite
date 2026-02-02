-- Wedding Site Booking System - Schema Update
-- Run this to add new fields to existing bookings table
-- This is safe to run multiple times

-- Add new content fields to bookings table (if they don't exist)
DO $$ 
BEGIN
  -- Hero Section
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='hero_tagline') THEN
    ALTER TABLE bookings ADD COLUMN hero_tagline TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='hero_subtitle') THEN
    ALTER TABLE bookings ADD COLUMN hero_subtitle TEXT;
  END IF;
  
  -- Love Story
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='how_we_met') THEN
    ALTER TABLE bookings ADD COLUMN how_we_met TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='proposal_story') THEN
    ALTER TABLE bookings ADD COLUMN proposal_story TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='relationship_highlights') THEN
    ALTER TABLE bookings ADD COLUMN relationship_highlights TEXT;
  END IF;
  
  -- Venue & Event
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='venue_description') THEN
    ALTER TABLE bookings ADD COLUMN venue_description TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='dresscode') THEN
    ALTER TABLE bookings ADD COLUMN dresscode TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='directions_transport') THEN
    ALTER TABLE bookings ADD COLUMN directions_transport TEXT;
  END IF;
  
  -- Wedding Party
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='groomsmen') THEN
    ALTER TABLE bookings ADD COLUMN groomsmen TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='bridesmaids') THEN
    ALTER TABLE bookings ADD COLUMN bridesmaids TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='parents') THEN
    ALTER TABLE bookings ADD COLUMN parents TEXT;
  END IF;
  
  -- Additional Details
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='schedule_of_events') THEN
    ALTER TABLE bookings ADD COLUMN schedule_of_events TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='rsvp_deadline') THEN
    ALTER TABLE bookings ADD COLUMN rsvp_deadline DATE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='gift_registry_info') THEN
    ALTER TABLE bookings ADD COLUMN gift_registry_info TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='accommodation_info') THEN
    ALTER TABLE bookings ADD COLUMN accommodation_info TEXT;
  END IF;
  
  -- Leave content to Vows flag
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='leave_content_to_vows') THEN
    ALTER TABLE bookings ADD COLUMN leave_content_to_vows BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Schema update completed successfully! New content fields added to bookings table.';
END $$;
