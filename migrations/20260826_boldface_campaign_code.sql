-- TBM Boldface iOS app → PlaneWX inbound leads
-- Marketing URL: https://www.planewx.ai/boldface?ref=BOLDFACE
-- Landing also attributes bare /boldface visits to BOLDFACE.
-- Apply in Supabase SQL editor (or migration runner) if the row is not present yet.
-- Visit recording validates against campaign_codes.active.

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'BOLDFACE',
  'TBM Boldface iOS App',
  'Welcome from TBM Boldface',
  true,
  'boldface',
  'app',
  'boldface-inbound'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
