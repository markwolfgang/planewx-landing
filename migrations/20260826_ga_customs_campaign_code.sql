-- GA Customs iOS app → PlaneWX inbound leads
-- Marketing URL (App Store): https://www.planewx.ai/ga-customs?ref=GACUSTOMS
-- Landing also attributes bare /ga-customs visits to GACUSTOMS.
-- Apply in Supabase SQL editor (or migration runner) if the row is not present yet.

INSERT INTO campaign_codes (code, name, greeting, active, utm_source, utm_medium, utm_campaign)
VALUES (
  'GACUSTOMS',
  'GA Customs iOS App',
  'Welcome from GA Customs',
  true,
  'ga-customs',
  'app',
  'ga-customs-inbound'
)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  greeting = EXCLUDED.greeting,
  active = true,
  utm_source = EXCLUDED.utm_source,
  utm_medium = EXCLUDED.utm_medium,
  utm_campaign = EXCLUDED.utm_campaign;
