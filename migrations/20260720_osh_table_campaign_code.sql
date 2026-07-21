-- Oshkosh booth table iPad QR → Campaign Referrals
-- QR URL: https://www.planewx.ai/osh?ref=OSH-TABLE
-- (Already applied to production 2026-07-20; kept for repo history.)

INSERT INTO campaign_codes (code, name, utm_source, utm_medium, utm_campaign)
VALUES (
  'OSH-TABLE',
  'Oshkosh Booth Table QR 2026',
  'oshkosh',
  'print',
  'oshkosh-table-qr-2026'
)
ON CONFLICT (code) DO NOTHING;
