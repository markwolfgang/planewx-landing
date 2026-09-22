/**
 * Volunteer / Compassion Flight (CMF) landing constants.
 *
 * Campaign code CMF attributes ACA / volunteer-pilot inbound leads.
 * Visit recording validates against campaign_codes.active
 * (see migrations/20260922_cmf_volunteer_campaign_code.sql).
 */

export const VOLUNTEER_CAMPAIGN_CODE = "CMF"

/** lp variant; must be <=8 chars (campaign-visit truncates to 8). */
export const VOLUNTEER_LP = "vol"

/**
 * Founder welcome YouTube ID. Prefer env so we can drop a video in without
 * a code change; leave empty for the on-page placeholder.
 */
export const VOLUNTEER_FOUNDER_VIDEO_ID =
  process.env.NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID?.trim() || ""

/**
 * Optional checkout-coupon screenshot path under /public.
 * Example when ready: "/volunteer/coupon-checkout.png"
 * Empty string keeps the "screenshot coming soon" placeholder.
 */
export const VOLUNTEER_COUPON_SCREENSHOT_SRC =
  process.env.NEXT_PUBLIC_VOLUNTEER_COUPON_SCREENSHOT?.trim() || ""

export const VOLUNTEER_FOUNDER_VIDEO_TITLE =
  "Founder welcome: Mark Wolfgang for volunteer pilots"
