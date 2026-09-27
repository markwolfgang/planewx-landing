"use client"

import { useEffect } from "react"
import { partnerCodeFromPathname } from "@/lib/partner-paths"
import { GTAG_READY_EVENT } from "@/lib/tracking-runtime"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Records campaign visits via POST /api/campaign-visit.
 * Fires landing_variant_view once after gtag is ready (queued if gtag loads later).
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

    let fired = false
    const fireVariantView = () => {
      if (fired) return
      if (typeof window.gtag !== "function") return
      fired = true
      window.gtag("event", "landing_variant_view", { variant })
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "LandingVariantView", { variant })
      }
    }

    fireVariantView()
    window.addEventListener(GTAG_READY_EVENT, fireVariantView)
    return () => window.removeEventListener(GTAG_READY_EVENT, fireVariantView)
  }, [variant, defaultCode])

  return null
}
