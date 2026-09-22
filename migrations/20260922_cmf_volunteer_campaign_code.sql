-- Compassion Flight / volunteer pilots (Air Care Alliance) -> PlaneWX inbound leads
-- Marketing URL: https://www.planewx.ai/volunteer?ref=CMF
-- Landing also attributes bare /volunteer visits to CMF.
-- Apply in Supabase SQL editor if the row is not present yet.
-- Visit recording validates against campaign_codes.active.

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'CMF',
  'Compassion Flight / Volunteer Pilots',
  'Welcome volunteer pilots. PlaneWX is proud to support your missions.',
  true,
  'aca',
  'email',
  'volunteer-compassion-flight'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
