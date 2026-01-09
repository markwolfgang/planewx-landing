-- Add status column to waitlist table
-- Run this in your Supabase SQL Editor

-- Add status column (default to 'pending')
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add invited_at timestamp
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS invited_at TIMESTAMPTZ;

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);

-- Update existing entries based on signed_up_at
UPDATE waitlist 
SET status = 'joined' 
WHERE signed_up_at IS NOT NULL AND (status IS NULL OR status = 'pending');

-- Verify the changes
SELECT 
  id,
  email,
  status,
  created_at,
  invited_at,
  signed_up_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 10;

