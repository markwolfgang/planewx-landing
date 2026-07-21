-- Partner booth leave-behind QR → Campaign Referrals
-- QR URL: https://www.planewx.ai/osh?ref=OSH-PARTNER
-- (Applied to production 2026-07-20)

INSERT INTO campaign_codes (code, name, utm_source, utm_medium, utm_campaign)
VALUES (
  'OSH-PARTNER',
  'Oshkosh Partner Booth Leave-Behind 2026',
  'oshkosh',
  'print',
  'oshkosh-partner-booth-2026'
)
ON CONFLICT (code) DO NOTHING;
