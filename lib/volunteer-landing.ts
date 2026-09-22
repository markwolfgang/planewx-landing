/**
 * Volunteer / Compassion Flight (CMF) landing constants.
 *
 * Campaign code CMF attributes ACA / volunteer-pilot inbound leads.
 * Visit recording validates against campaign_codes.active
 * (see migrations/20260922_cmf_volunteer_campaign_code.sql).
 *
 * Call signs are format-checked only (CMF + 1–4 digits). We do NOT look up
 * Barbara's ACA membership list. Validated signs are stored (API + localStorage)
 * and passed to app signup as ?cmf=CMF42&ref=CMF.
 */

export const VOLUNTEER_CAMPAIGN_CODE = "CMF"

/** lp variant; must be <=8 chars (campaign-visit truncates to 8). */
export const VOLUNTEER_LP = "vol"

/** localStorage key for the normalized Compassion Flight call sign. */
export const VOLUNTEER_CALL_SIGN_STORAGE_KEY = "planewx_cmf_call_sign"

/**
 * Format only: CMF + 1–4 digits, case-insensitive.
 * Examples: CMF1, cmf42, Cmf9999. Rejects CMF, CMF12345, ABC1, CMF-12.
 */
export const VOLUNTEER_CALL_SIGN_FORMAT = /^CMF\d{1,4}$/i

export const VOLUNTEER_CALL_SIGN_FORMAT_HINT =
  "Use your Compassion Flight call sign: CMF followed by 1 to 4 digits (for example CMF42)."

export const VOLUNTEER_CALL_SIGN_FORMAT_ERROR =
  "That does not look like a Compassion Flight call sign. Enter CMF followed by 1 to 4 digits (for example CMF42)."

/**
 * Founder welcome YouTube ID. Prefer env so we can drop a video in without
 * a code change; leave empty for the on-page placeholder.
 */
export const VOLUNTEER_FOUNDER_VIDEO_ID =
  process.env.NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID?.trim() || ""

/**
 * Optional checkout screenshot path under /public.
 * Example when ready: "/volunteer/coupon-checkout.png"
 * Empty string keeps the "screenshot coming soon" placeholder.
 */
export const VOLUNTEER_COUPON_SCREENSHOT_SRC =
  process.env.NEXT_PUBLIC_VOLUNTEER_COUPON_SCREENSHOT?.trim() || ""

export const VOLUNTEER_FOUNDER_VIDEO_TITLE =
  "Founder welcome: Mark Wolfgang for volunteer pilots"

/** Normalize raw input to uppercase CMF + digits, or null if format-invalid. */
export function normalizeVolunteerCallSign(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "")
  if (!VOLUNTEER_CALL_SIGN_FORMAT.test(cleaned)) return null
  return cleaned
}
