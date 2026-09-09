-- FLYTE Sunglasses — Sara review share → PlaneWX inbound leads
-- Apply in Supabase SQL editor — already applied on prod 2026-09-09 via Supabase SQL editor (record-only seed).
-- Visit recording validates against campaign_codes.active.

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'FLYTE',
  'FLYTE Sunglasses — Sara review share',
  'Welcome from FLYTE',
  true,
  'flyte',
  'review',
  'sara-review-2026'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
