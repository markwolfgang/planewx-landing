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
    if (window.gtag) {
      window.gtag("event", "landing_variant_view", { variant })
    }
    if (window.fbq) {
      window.fbq("trackCustom", "LandingVariantView", { variant })
    }
  }, [variant])

  return null
}
