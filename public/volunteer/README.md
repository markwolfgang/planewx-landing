# Volunteer landing assets

Optional drop-ins for `/volunteer`:

- `coupon-checkout.png`: checkout screenshot showing the volunteer discount applied from a Compassion Flight call sign.

Then set either:

- `NEXT_PUBLIC_VOLUNTEER_COUPON_SCREENSHOT=/volunteer/coupon-checkout.png`, or
- update `VOLUNTEER_COUPON_SCREENSHOT_SRC` in `lib/volunteer-landing.ts`

For the founder welcome video, set `NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID` to the YouTube ID.

## Call sign flow

Pilots enter a Compassion Flight call sign on the page. Format only: `CMF` + 1-4 digits (case-insensitive). No ACA membership list lookup.

Validated signs are:

1. Saved in `localStorage` (`planewx_cmf_call_sign`)
2. Posted to `POST /api/volunteer/call-sign` (Supabase table `volunteer_call_signs` — see `migrations/20260922_volunteer_call_signs.sql`)
3. Passed into app signup as `?cmf=CMF42&ref=CMF` so the app can persist on account create

Apply the migration in Supabase before relying on durable storage. Signup still works via the query param if the insert fails.
