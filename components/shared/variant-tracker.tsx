"use client"

import { useEffect } from "react"
import { partnerCodeFromPathname } from "@/lib/partner-paths"
import {
  GTAG_READY_EVENT,
  META_READY_EVENT,
  isGtagReady,
  isMetaReady,
} from "@/lib/tracking-runtime"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Records campaign visits via POST /api/campaign-visit.
 * Fires landing_variant_view once after gtag is ready (after js, consent update, config).
 * Fires Meta LandingVariantView once after the Meta pixel is loaded with marketing consent.
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
    const pathCode = partnerCodeFromPathname(window.location.pathname)
    const code =
      (refParam?.trim() || pathCode || defaultCode || "").trim().toUpperCase() ||
      null

    if (code) {
      try {
        localStorage.setItem("planewx_referral", code)
      } catch {
        /* ignore */
      }

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
      } catch {
        /* ignore */
      }
    }

    let gaFired = false
    let metaFired = false

    const fireGaVariantView = () => {
      if (gaFired) return
      // Gate on the ready signal (after js, update, config), not on the stub alone.
      if (!isGtagReady()) return
      if (typeof window.gtag !== "function") return
      gaFired = true
      window.gtag("event", "landing_variant_view", { variant })
    }

    const fireMetaVariantView = () => {
      if (metaFired) return
      if (!isMetaReady()) return
      if (typeof window.fbq !== "function") return
      metaFired = true
      window.fbq("trackCustom", "LandingVariantView", { variant })
    }

    fireGaVariantView()
    fireMetaVariantView()
    window.addEventListener(GTAG_READY_EVENT, fireGaVariantView)
    window.addEventListener(META_READY_EVENT, fireMetaVariantView)
    return () => {
      window.removeEventListener(GTAG_READY_EVENT, fireGaVariantView)
      window.removeEventListener(META_READY_EVENT, fireMetaVariantView)
    }
  }, [variant, defaultCode])

  return null
}
