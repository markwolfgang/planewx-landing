-- Phone remote control for the Oshkosh forum talk deck
-- Run in Supabase SQL Editor for the landing-site project

CREATE TABLE IF NOT EXISTS talk_remote_sessions (
  room_code text PRIMARY KEY,
  control_token text NOT NULL,
  slide_index int NOT NULL DEFAULT 0 CHECK (slide_index >= 0),
  slide_count int NOT NULL DEFAULT 0 CHECK (slide_count >= 0),
  section_label text,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS talk_remote_sessions_updated_at_idx
  ON talk_remote_sessions (updated_at DESC);

ALTER TABLE talk_remote_sessions ENABLE ROW LEVEL SECURITY;

-- Public access goes through the service-role API route only.
-- No anon policies.

NOTIFY pgrst, 'reload schema';
