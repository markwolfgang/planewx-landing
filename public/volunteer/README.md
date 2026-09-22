# Volunteer landing assets

Optional drop-ins for `/volunteer`:

- `coupon-checkout.png`: checkout screenshot showing where to enter a Compassion Flight call sign as the coupon.

Then set either:

- `NEXT_PUBLIC_VOLUNTEER_COUPON_SCREENSHOT=/volunteer/coupon-checkout.png`, or
- update `VOLUNTEER_COUPON_SCREENSHOT_SRC` in `lib/volunteer-landing.ts`

For the founder welcome video, set `NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID` to the YouTube ID.
