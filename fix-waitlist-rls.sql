-- Fix RLS policy for waitlist table
-- Run this in your Supabase SQL Editor if the insert policy isn't working

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;

-- Create a more permissive insert policy
-- This allows anyone (including anonymous users) to insert into the waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Verify the policy exists
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'waitlist';



