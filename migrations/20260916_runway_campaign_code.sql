-- Runway to Oshkosh — Sara partnership → PlaneWX inbound leads
-- Apply in Supabase SQL editor — record-only seed (same pattern as FLYTE).
-- Mark may need to paste this in the Supabase SQL editor if not auto-applied.
-- Visit recording validates against campaign_codes.active.
-- Partner short link: https://www.planewx.ai/runway → homepage funnel with ref=RUNWAY

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'RUNWAY',
  'Runway to Oshkosh',
  'Welcome from Runway to Oshkosh',
  true,
  'runway',
  'partner',
  'runway-to-oshkosh-2026'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
