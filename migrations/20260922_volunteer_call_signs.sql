-- Compassion Flight call signs captured on /volunteer (format-only validation).
-- No membership-list lookup. Normalized as uppercase CMF + 1–4 digits.
-- Apply in Supabase SQL editor if the table is not present yet.
-- API: POST /api/volunteer/call-sign

CREATE TABLE IF NOT EXISTS volunteer_call_signs (
  id bigserial PRIMARY KEY,
  call_sign text NOT NULL,
  ref text NOT NULL DEFAULT 'ACA',
  lp text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS volunteer_call_signs_call_sign_idx
  ON volunteer_call_signs (call_sign);

CREATE INDEX IF NOT EXISTS volunteer_call_signs_created_at_idx
  ON volunteer_call_signs (created_at DESC);

COMMENT ON TABLE volunteer_call_signs IS
  'Format-validated Compassion Flight call signs from /volunteer (CMF + 1-4 digits). Used later at signup/checkout for the volunteer discount. No ACA list lookup.';
