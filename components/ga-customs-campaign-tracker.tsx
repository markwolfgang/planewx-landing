"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

export const GA_CUSTOMS_CAMPAIGN_CODE = "GACUSTOMS"
export const GA_CUSTOMS_LP = "gacus"

const PLANEWX_HOME = "https://www.planewx.ai"

/** Landing → PlaneWX home UTMs (web attribution). */
const GA_CUSTOMS_UTM = {
  utm_source: "planewx_web",
  utm_medium: "landing",
  utm_campaign: "ga-customs",
} as const

/** Records visits on /ga-customs (with or without ?ref=) as GACUSTOMS. */
export function GaCustomsCampaignTracker() {
  return (
    <VariantTracker variant={GA_CUSTOMS_LP} defaultCode={GA_CUSTOMS_CAMPAIGN_CODE} />
  )
}

function buildPlanewxHref(refCode: string): string {
  const params = new URLSearchParams({
    ref: refCode,
    ...GA_CUSTOMS_UTM,
  })
  return `${PLANEWX_HOME}?${params.toString()}`
}

/** PlaneWX marketing home with campaign ref + UTMs for attribution. */
function planewxHref(): string {
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      GA_CUSTOMS_CAMPAIGN_CODE
    return buildPlanewxHref(code)
  } catch {
    return buildPlanewxHref(GA_CUSTOMS_CAMPAIGN_CODE)
  }
}

/** Secondary CTA — attributes to GACUSTOMS (or ?ref= when present) + landing UTMs. */
export function GaCustomsSignUpLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={buildPlanewxHref(GA_CUSTOMS_CAMPAIGN_CODE)}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = planewxHref()
      }}
    >
      {children}
    </a>
  )
}
