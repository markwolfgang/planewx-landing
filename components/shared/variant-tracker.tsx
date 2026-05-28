"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function VariantTracker({ variant }: { variant: string }) {
  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
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
  }, [variant])

  return null
}
