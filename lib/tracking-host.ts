/**
 * Production hostname allowlist for GA, Google Ads, Meta, and Reddit.
 * Check at runtime in the browser. Do not rely only on NEXT_PUBLIC_VERCEL_ENV.
 *
 * Allowed (exact match only):
 *   www.planewx.ai
 *   planewx.ai
 *   app.planewx.ai
 *
 * Excluded examples: any *.vercel.app, localhost, 127.0.0.1, dev2.planewx.ai,
 * and anything not on the list (including lookalike hosts).
 */

export const PRODUCTION_TRACKING_HOSTS = [
  "www.planewx.ai",
  "planewx.ai",
  "app.planewx.ai",
] as const

export type ProductionTrackingHost = (typeof PRODUCTION_TRACKING_HOSTS)[number]

/** Session flag so SEO can keep GA DebugView on for the tab after ?ga_debug=1. */
export const GA_DEBUG_SESSION_KEY = "planewx_ga_debug"

export function isProductionTrackingHost(hostname: string): boolean {
  return (PRODUCTION_TRACKING_HOSTS as readonly string[]).includes(hostname)
}

/**
 * Opt-in for preview verification in GA DebugView.
 * When the URL has ?ga_debug=1, persist for this tab session.
 * Returns true if the flag is active (URL or sessionStorage).
 */
export function resolveGaDebugOptIn(
  search: string,
  session: Pick<Storage, "getItem" | "setItem"> | null | undefined,
): boolean {
  let fromUrl = false
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`)
    fromUrl = params.get("ga_debug") === "1"
  } catch {
    fromUrl = false
  }

  if (fromUrl && session) {
    try {
      session.setItem(GA_DEBUG_SESSION_KEY, "1")
    } catch {
      /* ignore quota / private mode */
    }
    return true
  }

  if (!session) return fromUrl
  try {
    return session.getItem(GA_DEBUG_SESSION_KEY) === "1"
  } catch {
    return fromUrl
  }
}

export type TrackingLoadPlan = {
  /** Load gtag and GA4 config (G-FKM0TMPH4M). */
  loadGa: boolean
  /** Load Google Ads, Meta Pixel, and Reddit Pixel. */
  loadMarketing: boolean
  /** Pass debug_mode: true on the GA config (preview opt-in only). */
  debugMode: boolean
  /** Host is on the production allowlist. */
  hostAllowed: boolean
  /** Preview / local SEO opt-in is active. */
  gaDebug: boolean
}

/**
 * Decide which trackers may load.
 * No analytics or marketing scripts before a valid cookie choice.
 * ga_debug loads GA only (with debug_mode), still behind analytics consent,
 * and never loads Ads, Meta, or Reddit.
 */
export function resolveTrackingLoad(opts: {
  hostname: string
  gaDebug: boolean
  analytics: boolean
  marketing: boolean
  hasChoice: boolean
}): TrackingLoadPlan {
  const hostAllowed = isProductionTrackingHost(opts.hostname)
  const gaDebug = opts.gaDebug === true
  const canMeasure = hostAllowed || gaDebug

  if (!canMeasure || !opts.hasChoice) {
    return {
      loadGa: false,
      loadMarketing: false,
      debugMode: false,
      hostAllowed,
      gaDebug,
    }
  }

  const loadGa = opts.analytics === true
  const loadMarketing = hostAllowed && opts.marketing === true
  const debugMode = gaDebug && !hostAllowed && loadGa

  return {
    loadGa,
    loadMarketing,
    debugMode,
    hostAllowed,
    gaDebug,
  }
}
