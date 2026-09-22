/**
 * Volunteer / Compassion Flight landing constants.
 *
 * Campaign code ACA attributes Air Care Alliance / volunteer-pilot inbound leads.
 * Visit recording validates against campaign_codes.active
 * (see migrations/20260922_aca_volunteer_campaign_code.sql).
 *
 * Call signs are format-checked only (CMF + 1–4 digits). We do NOT look up
 * Barbara's ACA membership list. Validated signs are stored (API + localStorage)
 * and passed to app signup as ?cmf=CMF42&ref=ACA.
 */

export const VOLUNTEER_CAMPAIGN_CODE = "ACA"

/** lp variant; must be <=8 chars (campaign-visit truncates to 8). */
export const VOLUNTEER_LP = "vol"

/** localStorage key for the normalized Compassion Flight call sign. */
export const VOLUNTEER_CALL_SIGN_STORAGE_KEY = "planewx_cmf_call_sign"

/**
 * Format only: CMF + 1–4 digits, case-insensitive.
 * Examples: CMF1, cmf42, Cmf9999. Rejects CMF, CMF12345, ABC1, CMF-12.
 */
export const VOLUNTEER_CALL_SIGN_FORMAT = /^CMF\d{1,4}$/i

/** User-facing helper under the call-sign field. Do not mention format rules. */
export const VOLUNTEER_CALL_SIGN_FORMAT_HINT =
  "Enter your Compassion Flight call sign. We'll validate it, then unlock signup."

/**
 * User-facing error when format validation fails.
 * Do not reveal the CMF + digits rule in this string.
 */
export const VOLUNTEER_CALL_SIGN_FORMAT_ERROR =
  "That doesn't look like a valid Compassion Flight call sign."

/** Placeholder that fails format validation (never use a real call-sign example). */
export const VOLUNTEER_CALL_SIGN_PLACEHOLDER = "WWW"

/**
 * Founder welcome YouTube ID (Mark Wolfgang). Env override for swaps without
 * a code change; defaults to the recorded welcome video.
 * https://youtu.be/6QOZJUoMlLA
 */
export const VOLUNTEER_FOUNDER_VIDEO_ID =
  process.env.NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID?.trim() || "6QOZJUoMlLA"

export const VOLUNTEER_FOUNDER_VIDEO_TITLE =
  "Welcome from PlaneWX founder Mark Wolfgang"

/** Normalize raw input to uppercase CMF + digits, or null if format-invalid. */
export function normalizeVolunteerCallSign(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "")
  if (!VOLUNTEER_CALL_SIGN_FORMAT.test(cleaned)) return null
  return cleaned
}
