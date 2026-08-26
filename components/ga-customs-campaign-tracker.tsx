"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

export const GA_CUSTOMS_CAMPAIGN_CODE = "GACUSTOMS"
export const GA_CUSTOMS_LP = "gacus"

const PLANEWX_HOME = "https://www.planewx.ai"

/** Records visits on /ga-customs (with or without ?ref=) as GACUSTOMS. */
export function GaCustomsCampaignTracker() {
  return (
    <VariantTracker variant={GA_CUSTOMS_LP} defaultCode={GA_CUSTOMS_CAMPAIGN_CODE} />
  )
}

/** PlaneWX marketing home with campaign ref preserved for attribution. */
function planewxHref(): string {
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      GA_CUSTOMS_CAMPAIGN_CODE
    return `${PLANEWX_HOME}?ref=${encodeURIComponent(code)}`
  } catch {
    return `${PLANEWX_HOME}?ref=${GA_CUSTOMS_CAMPAIGN_CODE}`
  }
}

/** Primary CTA — always attributes to GACUSTOMS (or ?ref= when present). */
export function GaCustomsSignUpLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={`${PLANEWX_HOME}?ref=${GA_CUSTOMS_CAMPAIGN_CODE}`}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = planewxHref()
      }}
    >
      {children}
    </a>
  )
}
