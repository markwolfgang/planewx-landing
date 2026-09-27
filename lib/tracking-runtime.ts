/**
 * Imperative tracking apply logic (Consent Mode updates, configs, downgrade reload).
 * next/script does not unload tags, so choice changes are handled here in JS.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = "G-FKM0TMPH4M"
export const GOOGLE_ADS_IDS = ["AW-18011683791", "AW-18016407179"] as const
export const META_PIXEL_ID = "1236857811920781"
export const REDDIT_PIXEL_ID = "a2_iy53y8iesnik"

export const GTAG_READY_EVENT = "planewx:gtag-ready"
export const META_READY_EVENT = "planewx:meta-ready"
export const GTAG_SCRIPT_DOM_ID = "planewx-gtag-js"

let gtagReadyFlag = false
let metaReadyFlag = false

/** True after consent update and config (or Meta pixel init) for this page load. */
export function isGtagReady(): boolean {
  return gtagReadyFlag
}

export function isMetaReady(): boolean {
  return metaReadyFlag
}

/** Test helper: reset ready flags between vitest cases. */
export function resetTrackingReadyFlags(): void {
  gtagReadyFlag = false
  metaReadyFlag = false
}

export type ActiveTrackers = {
  ga: boolean
  marketing: boolean
}

export type ConsentUpdatePayload = {
  analytics_storage: "granted" | "denied"
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
}

/** True when any previously granted tracker becomes denied. */
export function isTrackerDowngrade(prev: ActiveTrackers, next: ActiveTrackers): boolean {
  return (prev.ga && !next.ga) || (prev.marketing && !next.marketing)
}

/** Categories that flipped from off to on. */
export function newlyGrantedTrackers(
  prev: ActiveTrackers,
  next: ActiveTrackers,
): ActiveTrackers {
  return {
    ga: !prev.ga && next.ga,
    marketing: !prev.marketing && next.marketing,
  }
}

export function buildConsentUpdatePayload(active: ActiveTrackers): ConsentUpdatePayload {
  const analyticsStorage = active.ga ? "granted" : "denied"
  const adState = active.marketing ? "granted" : "denied"
  return {
    analytics_storage: analyticsStorage,
    ad_storage: adState,
    ad_user_data: adState,
    ad_personalization: adState,
  }
}

export const CONSENT_DEFAULT_DENIED: ConsentUpdatePayload = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
}

export type TrackingTransition =
  | { type: "noop" }
  | {
      type: "apply"
      active: ActiveTrackers
      consent: ConsentUpdatePayload
      /** Load or reuse the single gtag.js tag. */
      ensureGtag: boolean
      gtagId: string
      /** Call gtag('js') only on first bootstrap. */
      callGtagJs: boolean
      configGa: boolean
      configAds: boolean
      loadMetaReddit: boolean
      debugMode: boolean
    }
  | {
      type: "downgrade_reload"
      consent: ConsentUpdatePayload
    }

/**
 * Decide what to do when the active tracker set changes.
 * Sequences covered by tests:
 * - Accept all then Essential only result: downgrade_reload
 * - Analytics then Marketing result: apply with configAds + Meta/Reddit
 * - Marketing then Analytics result: apply with configGa (gtag already present)
 * - Any grant to deny (Do not sell, GPC) result: downgrade_reload
 */
export function planTrackingTransition(opts: {
  prev: ActiveTrackers
  next: ActiveTrackers
  gtagAlreadyLoaded: boolean
  debugMode: boolean
}): TrackingTransition {
  const { prev, next, gtagAlreadyLoaded, debugMode } = opts
  const nextAny = next.ga || next.marketing
  const prevAny = prev.ga || prev.marketing

  if (!nextAny) {
    if (!prevAny) return { type: "noop" }
    return {
      type: "downgrade_reload",
      consent: buildConsentUpdatePayload(next),
    }
  }

  if (isTrackerDowngrade(prev, next)) {
    return {
      type: "downgrade_reload",
      consent: buildConsentUpdatePayload(next),
    }
  }

  const granted = newlyGrantedTrackers(prev, next)
  const firstBootstrap = !gtagAlreadyLoaded
  const gtagId = next.ga ? GA_MEASUREMENT_ID : GOOGLE_ADS_IDS[0]

  return {
    type: "apply",
    active: next,
    consent: buildConsentUpdatePayload(next),
    ensureGtag: true,
    gtagId,
    callGtagJs: firstBootstrap,
    configGa: firstBootstrap ? next.ga : granted.ga,
    configAds: firstBootstrap ? next.marketing : granted.marketing,
    loadMetaReddit: firstBootstrap ? next.marketing : granted.marketing,
    debugMode: debugMode && next.ga,
  }
}

/**
 * Install the gtag stub that pushes an Arguments object into dataLayer.
 * gtag.js ignores plain arrays, so rest-args array pushes never fire /g/collect.
 */
export function ensureGtagStub(): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== "function") {
    // Non-arrow so `arguments` is an Arguments object gtag.js accepts.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  }
}

/** Consent Mode ignores ads_data_redaction inside consent payloads; set it separately. */
export function applyAdsDataRedaction(adStorage: "granted" | "denied"): void {
  if (typeof window === "undefined") return
  ensureGtagStub()
  if (adStorage === "denied") {
    window.gtag!("set", "ads_data_redaction", true)
  }
}

export function signalGtagReady(): void {
  if (typeof window === "undefined") return
  gtagReadyFlag = true
  try {
    window.dispatchEvent(new CustomEvent(GTAG_READY_EVENT))
  } catch {
    /* ignore */
  }
}

export function signalMetaReady(): void {
  if (typeof window === "undefined") return
  metaReadyFlag = true
  try {
    window.dispatchEvent(new CustomEvent(META_READY_EVENT))
  } catch {
    /* ignore */
  }
}
