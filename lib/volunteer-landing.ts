/**
 * Volunteer landing constants and per-org call-sign registry.
 *
 * Campaign code ACA attributes Air Care Alliance / volunteer-pilot inbound leads.
 * Visit recording validates against campaign_codes.active
 * (see migrations/20260922_aca_volunteer_campaign_code.sql).
 *
 * Call signs are validated on this page, then stored (API + localStorage) and
 * passed into app signup. Membership confirmation for the discount happens in
 * the app, not from a public membership list on this landing page.
 *
 * SkyHope (ref=SKYHOPE) uses its own SYH call-sign gate.
 * Bare /volunteer, ?ref=ACA, and ?ref=ANGELFLIGHT share one generic gate that
 * accepts CMF or NGF call signs from the pilot's volunteer organization.
 * NGF is shared across multiple orgs, so NGF alone never implies Angel Flight.
 * ref=ANGELFLIGHT still attributes tracking and signup when that ref is present.
 * SKYHOPE and ANGELFLIGHT campaign seeds live only in the app repo
 * (not this landing repo).
 */

export const VOLUNTEER_CAMPAIGN_CODE = "ACA"

/** SkyHope campaign code. Gated by SYH call sign; not listed on /partners. */
export const SKYHOPE_CAMPAIGN_CODE = "SKYHOPE"

/** Angel Flight campaign tracking code. Same generic CMF/NGF gate as bare /volunteer. */
export const ANGEL_FLIGHT_CAMPAIGN_CODE = "ANGELFLIGHT"

/** lp variant; must be <=8 chars (campaign-visit truncates to 8). */
export const VOLUNTEER_LP = "vol"

/** Default app origin for production signup links. Override with NEXT_PUBLIC_APP_URL. */
export const DEFAULT_APP_URL = "https://app.planewx.ai"

/**
 * App base URL for volunteer signup links (production only).
 * Preview never links to the app (see isVolunteerProductionDeploy).
 * When unset, production uses https://app.planewx.ai.
 */
export function getVolunteerAppBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, "")
  return DEFAULT_APP_URL
}

/**
 * True only when Vercel reports production.
 * Preview and local (VERCEL_ENV unset or "preview" / "development") must not
 * link to signup or write volunteer attribution data. Relies on Vercel setting
 * VERCEL_ENV=production on the production deploy; if that is missing, signups
 * stay blocked by design.
 */
export function isVolunteerProductionDeploy(
  vercelEnv: string | undefined = process.env.VERCEL_ENV
): boolean {
  return vercelEnv === "production"
}

/** Shown under the unlocked Sign up control on non-production deploys. */
export const VOLUNTEER_PREVIEW_SIGNUP_NOTICE =
  "Preview. Please don't create an account."

export type VolunteerUnlockedSignupControl =
  | { kind: "link"; href: string }
  | { kind: "preview"; notice: string }

/** Signup query param used for the validated call sign. */
export type VolunteerCallSignSignupParam = "cmf" | "callsign"

/**
 * Per-org call-sign gate config.
 * To change the SYH pattern, edit only the `pattern` line on the SKYHOPE entry.
 * To change the NGF pattern, edit only the `pattern` line on the ANGELFLIGHT entry.
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

const GENERIC_VOLUNTEER_CALL_SIGN_COPY = {
  label: "Your volunteer call sign",
  hint: "Enter your CMF or NGF call sign from your volunteer pilot organization. We'll validate it, then unlock signup.",
  error:
    "That doesn't look like a valid volunteer call sign. Use your CMF or NGF call sign from your volunteer pilot organization.",
  lockedHint:
    "Enter your CMF or NGF call sign from your volunteer pilot organization. We'll validate it, then unlock signup",
  srHint:
    "Enter your CMF or NGF call sign from your volunteer pilot organization.",
  acceptedLead:
    "Call sign accepted. Sign up below for your 2-week Pro Plus trial. PlaneWX applies the volunteer discount from the call sign you entered",
  unlockBody:
    "Full access to Pro Plus, our highest tier. No credit card required to start the trial. When you continue after the trial, PlaneWX applies 30% off the annual plan for each year you're an active volunteer pilot, from the call sign you entered here. You do not type a separate coupon code.",
} as const

/**
 * Org call-sign registry. ACA (CMF) is the default for bare /volunteer and ?ref=ACA.
 * SkyHope is activated only via ?ref=SKYHOPE (case-insensitive).
 * ?ref=ANGELFLIGHT uses the same generic CMF/NGF gate; the ref is for tracking only.
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
    ...GENERIC_VOLUNTEER_CALL_SIGN_COPY,
    placeholder: "WWW",
    storageKey: "planewx_cmf_call_sign",
    signupParam: "cmf",
  },
  SKYHOPE: {
    ref: SKYHOPE_CAMPAIGN_CODE,
    prefix: "SYH",
    /** ONE-LINE EDIT: SYH format (same shape as CMF: prefix + 1-4 digits). */
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
      "Call sign accepted. Sign up below for your 2-week Pro Plus trial. PlaneWX applies the volunteer discount from the call sign you entered",
    unlockBody:
      "Full access to Pro Plus, our highest tier. No credit card required to start the trial. When you continue after the trial, PlaneWX applies 30% off the annual plan for each year you're an active volunteer pilot, from the SkyHope call sign you entered here. You do not type a separate coupon code. You remain PIC.",
    storageKey: "planewx_syh_call_sign",
    signupParam: "callsign",
  },
  ANGELFLIGHT: {
    ref: ANGEL_FLIGHT_CAMPAIGN_CODE,
    prefix: "NGF",
    /**
     * ONE-LINE EDIT: NGF format (same shape as SYH: prefix + 1-4 digits).
     * Requester described NGFxxxx; tighten to exactly 4 digits here if wanted.
     */
    pattern: /^NGF\d{1,4}$/i,
    ...GENERIC_VOLUNTEER_CALL_SIGN_COPY,
    placeholder: "WWW",
    storageKey: "planewx_ngf_call_sign",
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

/** Resolve org gate config from a referral code. Non-SKYHOPE / non-ANGELFLIGHT refs use ACA/CMF. */
export function resolveVolunteerOrg(
  ref?: string | null
): VolunteerOrgCallSignConfig {
  const normalized = (ref ?? "").trim().toUpperCase()
  if (normalized === SKYHOPE_CAMPAIGN_CODE) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
  }
  if (normalized === ANGEL_FLIGHT_CAMPAIGN_CODE) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT
  }
  return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
}

export function isSkyHopeRef(ref?: string | null): boolean {
  return (ref ?? "").trim().toUpperCase() === SKYHOPE_CAMPAIGN_CODE
}

export function isAngelFlightRef(ref?: string | null): boolean {
  return (ref ?? "").trim().toUpperCase() === ANGEL_FLIGHT_CAMPAIGN_CODE
}

/**
 * Bare /volunteer, ?ref=ACA, and ?ref=ANGELFLIGHT accept CMF or NGF:
 * /^(CMF|NGF)\d{1,4}$/i
 * NGF does not imply Angel Flight; ref=ANGELFLIGHT only when that ref is on the URL.
 */
export const BARE_VOLUNTEER_CALL_SIGN_PATTERN = /^(CMF|NGF)\d{1,4}$/i

export const BARE_VOLUNTEER_CALL_SIGN_ERROR =
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA.error

/** True when the page gate should accept both CMF and NGF (bare / ACA / ANGELFLIGHT). */
export function isBareVolunteerGate(ref?: string | null): boolean {
  return !isSkyHopeRef(ref)
}

/** Gate config for a normalized call sign prefix (signup param + storage), not attribution. */
export function resolveVolunteerOrgFromCallSign(
  callSign: string
): VolunteerOrgCallSignConfig | null {
  const cleaned = callSign.trim().toUpperCase().replace(/\s+/g, "")
  if (/^SYH\d{1,4}$/i.test(cleaned)) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
  }
  if (/^NGF\d{1,4}$/i.test(cleaned)) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT
  }
  if (/^CMF\d{1,4}$/i.test(cleaned)) {
    return VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
  }
  return null
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

/**
 * Normalize for the page gate.
 * SkyHope page: SYH only.
 * Generic page (bare / ACA / ANGELFLIGHT): CMF or NGF.
 * Attribution ref for NGF is ANGELFLIGHT only when that ref is on the page;
 * otherwise NGF attributes to ACA. CMF always uses the cmf signup param.
 */
export function normalizeVolunteerCallSignForPage(
  raw: string,
  pageOrgRef?: string | null
): { callSign: string; org: VolunteerOrgCallSignConfig } | null {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "")
  if (!cleaned) return null

  if (isSkyHopeRef(pageOrgRef)) {
    const org = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
    if (!org.pattern.test(cleaned)) return null
    return { callSign: cleaned, org }
  }

  if (!BARE_VOLUNTEER_CALL_SIGN_PATTERN.test(cleaned)) return null

  const trackingRef = isAngelFlightRef(pageOrgRef)
    ? ANGEL_FLIGHT_CAMPAIGN_CODE
    : VOLUNTEER_CAMPAIGN_CODE

  if (/^CMF\d{1,4}$/i.test(cleaned)) {
    const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
    return {
      callSign: cleaned,
      org: trackingRef === ANGEL_FLIGHT_CAMPAIGN_CODE
        ? { ...aca, ref: trackingRef }
        : aca,
    }
  }

  if (/^NGF\d{1,4}$/i.test(cleaned)) {
    const ngf = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT
    return {
      callSign: cleaned,
      org: { ...ngf, ref: trackingRef },
    }
  }

  return null
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
 * ACA uses ?cmf=; SkyHope and NGF use ?callsign= only (not ?cmf=).
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

/**
 * Production: real app signup link with the org call-sign param.
 * Preview: unlocked look only; no href, no navigation target.
 */
export function buildVolunteerUnlockedSignupControl(options: {
  isProduction: boolean
  ref: string
  callSign: string
  gateOrg?: VolunteerOrgCallSignConfig
}): VolunteerUnlockedSignupControl {
  if (!options.isProduction) {
    return { kind: "preview", notice: VOLUNTEER_PREVIEW_SIGNUP_NOTICE }
  }
  return {
    kind: "link",
    href: buildVolunteerSignupHrefForOrg({
      ref: options.ref,
      callSign: options.callSign,
      gateOrg: options.gateOrg,
    }),
  }
}
