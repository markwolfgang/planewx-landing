"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Records campaign visits via POST /api/campaign-visit.
 * - `?ref=` wins when present (stored in localStorage for signup CTAs).
 * - Dedicated campaign landings may pass `defaultCode` so bare path visits
 *   (e.g. /ga-customs, /boldface) are still attributed without requiring ?ref=.
 */
export function VariantTracker({
  variant,
  defaultCode,
}: {
  variant: string
  defaultCode?: string
}) {
  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get("ref")
    const code = (refParam || defaultCode || "").trim().toUpperCase() || null

    if (code) {
      try {
        localStorage.setItem("planewx_referral", code)
      } catch {}

      // Fire one anonymous visit event per browser session per campaign code.
      // sessionStorage resets on tab close, so returning visitors on a new
      // session are counted again (intentional — each ad click = one visit).
      const sessionKey = `planewx_visit_fired_${code}`
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, "1")
          fetch("/api/campaign-visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, lp: variant }),
          }).catch(() => {})
        }
      } catch {}
    }

    if (window.gtag) {
      window.gtag("event", "landing_variant_view", { variant })
    }
    if (window.fbq) {
      window.fbq("trackCustom", "LandingVariantView", { variant })
    }
  }, [variant, defaultCode])

  return null
}
