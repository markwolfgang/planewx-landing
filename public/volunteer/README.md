# Volunteer landing assets

Founder welcome video on `/volunteer` defaults to YouTube ID `6QOZJUoMlLA`
(Mark Wolfgang). Override with `NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID` if needed.

## Call sign flow

Pilots enter a Compassion Flight call sign on the page. Format is validated
server-side only (not described in UI). No ACA membership list lookup.

Validated signs are:

1. Saved in `localStorage`
2. Posted to `POST /api/volunteer/call-sign` (Supabase table `volunteer_call_signs` — see `migrations/20260922_volunteer_call_signs.sql`)
3. Passed into app signup as query params so the app can persist on account create

Apply the migration in Supabase before relying on durable storage. Signup still works via the query param if the insert fails.
