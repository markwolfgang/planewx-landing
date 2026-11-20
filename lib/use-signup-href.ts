"use client"

import { useEffect, useState } from "react"
import { CAMPAIGN_VISIT_LOGGED_EVENT, signupHrefForCurrentPage } from "@/lib/signup-attribution"

/**
 * Sign-up href with utm_*, ref and ref_logged for the current page.
 * Recomputes when VariantTracker logs a visit, because effect order between the
 * tracker and a CTA is not guaranteed.
 */
export function useSignupHref(baseUrl: string): string {
  const [href, setHref] = useState(baseUrl)
  useEffect(() => {
    const update = () => setHref(signupHrefForCurrentPage(baseUrl))
    update()
    window.addEventListener(CAMPAIGN_VISIT_LOGGED_EVENT, update)
    return () => window.removeEventListener(CAMPAIGN_VISIT_LOGGED_EVENT, update)
  }, [baseUrl])
  return href
}
