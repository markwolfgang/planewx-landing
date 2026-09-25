/**
 * Volunteer landing constants and per-org call-sign registry.
 *
 * Campaign code ACA attributes Air Care Alliance / volunteer-pilot inbound leads.
 * Visit recording validates against campaign_codes.active
 * (see migrations/20260922_aca_volunteer_campaign_code.sql).
 *
 * Call signs are format-checked only. We do NOT look up membership lists.
 * Validated signs are stored (API + localStorage) and passed into app signup.
 *
 * SkyHope (ref=SKYHOPE) uses its own SYH call-sign gate, same UX as CMF.
 * Bare /volunteer and ?ref=ACA stay on the Compassion Flight (CMF) path.
 * SKYHOPE campaign seed lives only in the app repo (not this landing repo).
 */

export const VOLUNTEER_CAMPAIGN_CODE = "ACA"

/** SkyHope campaign code. Gated by SYH call sign; not listed on /partners. */
export const SKYHOPE_CAMPAIGN_CODE = "SKYHOPE"

/** lp variant; must be <=8 chars (campaign-visit truncates to 8). */
export const VOLUNTEER_LP = "vol"

/** Default app origin for signup links. Override with NEXT_PUBLIC_APP_URL. */
export const DEFAULT_APP_URL = "https://app.planewx.ai"

/**
 * App base URL for volunteer signup links.
 * Preview deployments can point at an app PR preview via NEXT_PUBLIC_APP_URL.
 * When unset, production behavior is identical (https://app.planewx.ai).
 */
export function getVolunteerAppBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, "")
  return DEFAULT_APP_URL
}

/** Signup query param used for the validated call sign. */
export type VolunteerCallSignSignupParam = "cmf" | "callsign"

/**
 * Per-org call-sign gate config.
 * To change the SYH pattern, edit only the `pattern` line on the SKYHOPE entry.
 */
export type VolunteerOrgCallSignConfig = {
  /** Campaign / referral code (uppercase). */
  ref: string
  /** Letter prefix shown only in code comments, never in user-facing format hints. */
  prefix: string
  /**
   * Format pattern (ONE-LINE EDIT for format changes).
   * Case-insensitive; digits after the prefix.
   */
  pattern: RegExp
  /** Field label. */
  label: string
  /** Placeholder that must fail format validation. */
  placeholder: string
  /** Helper under the field. Do not mention digit counts or the letter prefix rule. */
  hint: string
  /** Inline error when format validation fails. */
  error: string
  /** Locked-panel copy before a valid sign is accepted. */
  lockedHint: string
  /** sr-only hint text. */
  srHint: string
  /** Success line after accept (device-only suffix is appended by the gate). */
  acceptedLead: string
  /** Discount blurb inside the unlocked signup card. */
  unlockBody: string
  /** localStorage key for this org only (never shared across orgs). */
  storageKey: string
  /** App signup query param for this org's call sign. */
  signupParam: VolunteerCallSignSignupParam
}

/**
 * Org call-sign registry. ACA (CMF) is the default for bare /volunteer and ?ref=ACA.
 * SkyHope is activated only via ?ref=SKYHOPE (case-insensitive).
 */
export const VOLUNTEER_ORG_CALL_SIGN_REGISTRY: Record<
  string,
  VolunteerOrgCallSignConfig
> = {
  ACA: {
    ref: VOLUNTEER_CAMPAIGN_CODE,
    prefix: "CMF",
    /** ONE-LINE EDIT: CMF format. */
    pattern: /^CMF\d{1,4}$/i,
    label: "Your Compassion Flight call sign",
    placeholder: "WWW",
    hint: "Enter your Compassion Flight call sign. We'll validate it, then unlock signup.",
    error: "That doesn't look like a valid Compassion Flight call sign.",
    lockedHint:
      "Enter your Compassion Flight call sign. We'll validate it, then unlock signup",
    srHint: "Enter your Compassion Flight call sign.",
    acceptedLead:
      "Call sign accepted. Sign up below for your 2-week Pro Plus trial. At purchase, PlaneWX applies the volunteer discount from the call sign you entered",
    unlockBody:
      "Full access to Pro Plus, our highest tier. No credit card required to start the trial. When you continue after the trial, PlaneWX applies 30% off the annual plan at purchase from the call sign you entered here. You do not type a separate coupon code.",
    storageKey: "planewx_cmf_call_sign",
    signupParam: "cmf",
  },
  SKYHOPE: {
    ref: SKYHOPE_CAMPAIGN_CODE,
    prefix: "SYH",
    /** ONE-LINE EDIT: SYH format (exact SkyHope format not yet confirmed). */
    pattern: /^SYH\d{1,4}$/i,
    label: "Your SkyHope call sign",
    placeholder: "WWW",
    hint: "Enter your SkyHope call sign. We'll validate it, then unlock signup.",
    error:
      "That doesn't look like a valid SkyHope call sign. Use your SkyHope call sign, not a Compassion Flight one.",
    lockedHint:
      "Enter your SkyHope call sign. We'll validate it, then unlock signup",
    srHint: "Enter your SkyHope call sign.",
    acceptedLead:
      "Call sign accepted. Sign up below for your 2-week Pro Plus trial. At purchase, PlaneWX applies the volunteer discount from the call sign you entered",
    unlockBody:
      "Full access to Pro Plus, our highest tier. No credit card required to start the trial. When you continue after the trial, PlaneWX applies 30% off the first year of an annual plan from the SkyHope call sign you entered here. You remain PIC.",
    storageKey: "planewx_syh_call_sign",
    signupParam: "callsign",
  },
}

/** @deprecated Prefer org.storageKey from the registry. Kept for existing ACA key name. */
export const VOLUNTEER_CALL_SIGN_STORAGE_KEY =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.storageKey

/** @deprecated Prefer org.pattern from the registry. */
export const VOLUNTEER_CALL_SIGN_FORMAT =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.pattern

/** @deprecated Prefer org.hint from the registry. */
export const VOLUNTEER_CALL_SIGN_FORMAT_HINT =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.hint

/** @deprecated Prefer org.error from the registry. */
export const VOLUNTEER_CALL_SIGN_FORMAT_ERROR =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.error

/** @deprecated Prefer org.placeholder from the registry. */
export const VOLUNTEER_CALL_SIGN_PLACEHOLDER =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.placeholder

/**
 * Founder welcome YouTube ID (Mark Wolfgang). Env override for swaps without
 * a code change; defaults to the recorded welcome video.
 * https://youtu.be/6QOZJUoMlLA
 */
export const VOLUNTEER_FOUNDER_VIDEO_ID =
  process.env.NEXT_PUBLIC_VOLUNTEER_FOUNDER_VIDEO_ID?.trim() || "6QOZJUoMlLA"

export const VOLUNTEER_FOUNDER_VIDEO_TITLE =
  "Welcome from PlaneWX founder Mark Wolfgang"

/** Resolve org gate config from a referral code. Non-SKYHOPE refs use ACA/CMF. */
export function resolveVolunteerOrg(
  ref?: string | null
): VolunteerOrgCallSignConfig {
  const normalized = (ref ?? "").trim().toUpperCase()
  if (normalized === SKYHOPE_CAMPAIGN_CODE) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
  }
  return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
}

export function isSkyHopeRef(ref?: string | null): boolean {
  return (ref ?? "").trim().toUpperCase() === SKYHOPE_CAMPAIGN_CODE
}

/** Normalize raw input against an org pattern, or null if invalid. */
export function normalizeVolunteerCallSignForOrg(
  raw: string,
  org: VolunteerOrgCallSignConfig
): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "")
  if (!org.pattern.test(cleaned)) return null
  return cleaned
}

/** Normalize raw input to uppercase CMF + digits, or null if format-invalid. */
export function normalizeVolunteerCallSign(raw: string): string | null {
  return normalizeVolunteerCallSignForOrg(
    raw,
    VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
  )
}

/**
 * Build the app signup href for a volunteer org.
 * ACA uses ?cmf=; SkyHope uses ?callsign= only (not ?cmf=).
 * Never attaches a call sign that fails the gate org's pattern
 * (prevents stale localStorage from the other org leaking into the link).
 *
 * `ref` is the campaign attribution. `gateOrg` selects pattern + signup param
 * (defaults to resolveVolunteerOrg(ref)).
 */
export function buildVolunteerSignupHrefForOrg(options: {
  ref: string
  callSign?: string | null
  gateOrg?: VolunteerOrgCallSignConfig
}): string {
  const org = options.gateOrg ?? resolveVolunteerOrg(options.ref)
  const ref = options.ref.trim().toUpperCase() || org.ref
  const params = new URLSearchParams({
    lp: VOLUNTEER_LP,
    ref,
  })

  const rawSign = options.callSign?.trim() ?? null
  if (rawSign) {
    const normalized = normalizeVolunteerCallSignForOrg(rawSign, org)
    if (normalized) {
      params.set(org.signupParam, normalized)
    }
  }

  return `${getVolunteerAppBaseUrl()}/auth/sign-up?${params.toString()}`
}
