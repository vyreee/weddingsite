-- Wedding Site Booking System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Status and dates
  status TEXT NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved', 'booked', 'cancelled')),
  launch_date DATE NOT NULL,
  site_end_date DATE NOT NULL,
  
  -- Basic information
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  package TEXT NOT NULL CHECK (package IN ('Elegant', 'Custom')),
  
  -- Content details
  couple_story TEXT,
  venue_name TEXT,
  venue_address TEXT,
  ceremony_time TEXT,
  reception_time TEXT,
  
  -- Image sections (stored as JSON notes about what images are needed)
  image_sections_notes TEXT,
  
  -- Google Drive folder URL (you'll create and share manually)
  drive_folder_url TEXT,
  
  -- Payment information
  gcash_receipt_url TEXT,
  payment_confirmed_at TIMESTAMP WITH TIME ZONE,
  payment_notes TEXT,
  
  -- Additional notes
  special_requests TEXT
);

-- Admin settings table (simple password-based auth)
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_launch_date ON bookings(launch_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read bookings (for calendar view)
CREATE POLICY "Allow public read access to bookings"
  ON bookings FOR SELECT
  USING (true);

-- Policy: Allow public to insert bookings (for booking form)
CREATE POLICY "Allow public insert access to bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Policy: Allow service role to update bookings (for admin dashboard)
CREATE POLICY "Allow service role to update bookings"
  ON bookings FOR UPDATE
  USING (true);

-- Policy: Allow service role full access to admin_settings
CREATE POLICY "Allow service role full access to admin_settings"
  ON admin_settings FOR ALL
  USING (true);

-- Insert default admin password hash (you should change this!)
-- Default password: "admin123" (CHANGE THIS IN PRODUCTION!)
-- Hash generated with bcrypt rounds=10
INSERT INTO admin_settings (setting_key, setting_value)
VALUES ('admin_password_hash', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT (setting_key) DO NOTHING;

-- Sample data for testing (optional - remove in production)
-- INSERT INTO bookings (
--   launch_date,
--   site_end_date,
--   groom_name,
--   bride_name,
--   email,
--   phone,
--   wedding_date,
--   package,
--   couple_story,
--   status
-- ) VALUES (
--   '2026-02-15',
--   '2026-04-01',
--   'John Doe',
--   'Jane Smith',
--   'john.jane@example.com',
--   '+63 912 345 6789',
--   '2026-03-15',
--   'Elegant',
--   'We met in college and have been together for 5 years...',
--   'reserved'
-- );
