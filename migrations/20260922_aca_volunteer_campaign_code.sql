-- Air Care Alliance / volunteer pilots -> PlaneWX inbound leads
-- Marketing URL: https://www.planewx.ai/volunteer?ref=ACA
-- Landing also attributes bare /volunteer visits to ACA.
-- Apply in Supabase SQL editor if the row is not present yet.
-- Visit recording validates against campaign_codes.active.
-- Renamed from 20260922_cmf_volunteer_campaign_code.sql (campaign code CMF → ACA).

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'ACA',
  'Air Care Alliance / Volunteer Pilots',
  'Welcome volunteer pilots. PlaneWX is proud to support your missions.',
  true,
  'aca',
  'email',
  'volunteer-air-care-alliance'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
