-- Add event attendance for dual giveaways (meetup + forum talk)
-- Run in Supabase SQL Editor for the landing-site project

ALTER TABLE oshkosh_raffle_entries
  ADD COLUMN IF NOT EXISTS event_attendance text;

UPDATE oshkosh_raffle_entries
SET event_attendance = 'both'
WHERE event_attendance IS NULL;

ALTER TABLE oshkosh_raffle_entries
  ALTER COLUMN event_attendance SET DEFAULT 'both',
  ALTER COLUMN event_attendance SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'oshkosh_raffle_entries_event_attendance_check'
  ) THEN
    ALTER TABLE oshkosh_raffle_entries
      ADD CONSTRAINT oshkosh_raffle_entries_event_attendance_check
      CHECK (event_attendance IN ('meetup', 'talk', 'both'));
  END IF;
END $$;

ALTER TABLE oshkosh_raffle_draws
  ADD COLUMN IF NOT EXISTS event text;

UPDATE oshkosh_raffle_draws
SET event = 'meetup'
WHERE event IS NULL;

ALTER TABLE oshkosh_raffle_draws
  ALTER COLUMN event SET DEFAULT 'meetup',
  ALTER COLUMN event SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'oshkosh_raffle_draws_event_check'
  ) THEN
    ALTER TABLE oshkosh_raffle_draws
      ADD CONSTRAINT oshkosh_raffle_draws_event_check
      CHECK (event IN ('meetup', 'talk'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS oshkosh_raffle_entries_event_attendance_idx
  ON oshkosh_raffle_entries (event_attendance);

CREATE INDEX IF NOT EXISTS oshkosh_raffle_draws_event_idx
  ON oshkosh_raffle_draws (event);
