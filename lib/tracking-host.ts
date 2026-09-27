/**
 * Production hostname allowlist for GA, Google Ads, Meta, and Reddit.
 * Check at runtime in the browser. Do not rely only on NEXT_PUBLIC_VERCEL_ENV.
 *
 * Allowed (exact match only):
 *   www.planewx.ai
 *   planewx.ai
 *
 * Excluded examples: any *.vercel.app, localhost, 127.0.0.1, app.planewx.ai,
 * dev2.planewx.ai, and anything not on the list (including lookalike hosts).
 */

export const PRODUCTION_TRACKING_HOSTS = ["www.planewx.ai", "planewx.ai"] as const

export type ProductionTrackingHost = (typeof PRODUCTION_TRACKING_HOSTS)[number]

/** Session flag so SEO can keep GA DebugView on for the tab after ?ga_debug=1. */
export const GA_DEBUG_SESSION_KEY = "planewx_ga_debug"

export function isProductionTrackingHost(hostname: string): boolean {
  return (PRODUCTION_TRACKING_HOSTS as readonly string[]).includes(hostname)
}

/**
 * Opt-in for preview verification in GA DebugView.
 * ?ga_debug=1 persists for this tab session.
 * ?ga_debug=0 clears the session flag.
 */
export function resolveGaDebugOptIn(
  search: string,
  session:
    | Pick<Storage, "getItem" | "setItem" | "removeItem">
    | null
    | undefined,
): boolean {
  let param: string | null = null
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`)
    param = params.get("ga_debug")
  } catch {
    param = null
  }

  if (param === "0") {
    if (session) {
      try {
        session.removeItem(GA_DEBUG_SESSION_KEY)
      } catch {
        /* ignore */
      }
    }
    return false
  }

  if (param === "1") {
    if (session) {
      try {
        session.setItem(GA_DEBUG_SESSION_KEY, "1")
      } catch {
        /* ignore */
      }
    }
    return true
  }

  if (!session) return false
  try {
    return session.getItem(GA_DEBUG_SESSION_KEY) === "1"
  } catch {
    return false
  }
}

export type TrackingLoadPlan = {
  loadGa: boolean
  loadMarketing: boolean
  debugMode: boolean
  hostAllowed: boolean
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
