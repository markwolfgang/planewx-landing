-- Oshkosh 2026 meetup raffle entries + draw log
-- Run in Supabase SQL Editor for the landing-site project

CREATE TABLE IF NOT EXISTS oshkosh_raffle_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  marketing_opt_in boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'page',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT oshkosh_raffle_entries_email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS oshkosh_raffle_entries_created_at_idx
  ON oshkosh_raffle_entries (created_at DESC);

CREATE TABLE IF NOT EXISTS oshkosh_raffle_draws (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid NOT NULL REFERENCES oshkosh_raffle_entries(id) ON DELETE CASCADE,
  prize text NOT NULL CHECK (prize IN ('sunglasses', 'merch')),
  status text NOT NULL DEFAULT 'won'
    CHECK (status IN ('won', 'skipped_not_present')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS oshkosh_raffle_draws_entry_id_idx
  ON oshkosh_raffle_draws (entry_id);

CREATE INDEX IF NOT EXISTS oshkosh_raffle_draws_status_idx
  ON oshkosh_raffle_draws (status);

ALTER TABLE oshkosh_raffle_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE oshkosh_raffle_draws ENABLE ROW LEVEL SECURITY;

-- Public inserts go through the service-role API route (validated server-side).
-- No anon policies — keeps the table closed to direct client access.
