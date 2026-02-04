-- Complete schema update for booking form improvements
-- Run this in Supabase SQL Editor to update your bookings table

-- Step 1: Add per-section "Leave to Vows" flags
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_hero_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_love_story_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_venue_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_wedding_party_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_rsvp_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_gift_registry_to_vows BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS leave_additional_to_vows BOOLEAN DEFAULT FALSE;

-- Step 2: Add template selection
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS template TEXT DEFAULT '1' CHECK (template IN ('1', '2', '3', '4', '5'));

-- Step 3: Add image requirements acknowledgment
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS image_requirements_acknowledged BOOLEAN DEFAULT FALSE;

-- Step 4: Add church/ceremony venue fields
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS church_google_maps_link TEXT;

-- Step 5: Rename existing venue fields to reception venue (if they exist)
-- Note: If you get an error that the column doesn't exist, skip these lines
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='bookings' AND column_name='venue_name') THEN
        ALTER TABLE bookings RENAME COLUMN venue_name TO reception_venue_name;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='bookings' AND column_name='venue_address') THEN
        ALTER TABLE bookings RENAME COLUMN venue_address TO reception_venue_address;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='bookings' AND column_name='venue_google_maps_link') THEN
        ALTER TABLE bookings RENAME COLUMN venue_google_maps_link TO reception_google_maps_link;
    END IF;
END $$;

-- Step 6: Add new reception venue columns if they don't exist (in case rename failed)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_venue_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_venue_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reception_google_maps_link TEXT;

-- Step 7: Add dress code inspiration link
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS dresscode_image_link TEXT;

-- Step 8: Add gift registry fields (separate from RSVP)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_registry_items TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS gift_notification_contact TEXT;

-- Step 9: Remove old columns if they exist
ALTER TABLE bookings DROP COLUMN IF EXISTS leave_content_to_vows;
ALTER TABLE bookings DROP COLUMN IF EXISTS gift_registry_info;

-- Step 10: Verify the schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
ORDER BY ordinal_position;
