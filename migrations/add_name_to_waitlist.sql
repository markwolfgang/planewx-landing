-- Add first_name and last_name columns to waitlist table
-- Run this on your Supabase database

ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add comment for documentation
COMMENT ON COLUMN waitlist.first_name IS 'First name of the waitlist signup (optional)';
COMMENT ON COLUMN waitlist.last_name IS 'Last name of the waitlist signup (optional)';

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'waitlist' 
AND column_name IN ('first_name', 'last_name');
