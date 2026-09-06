"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

export const BOLDFACE_CAMPAIGN_CODE = "BOLDFACE"
/** lp variant — must be ≤8 chars (campaign-visit truncates to 8). */
export const BOLDFACE_LP = "boldface"

const PLANEWX_HOME = "https://www.planewx.ai/"

/** Landing → PlaneWX home UTMs (web attribution). */
const BOLDFACE_UTM = {
  utm_source: "planewx_web",
  utm_medium: "landing",
  utm_campaign: "tbm-boldface",
} as const

/** Records visits on /boldface (with or without ?ref=) as BOLDFACE. */
export function BoldfaceCampaignTracker() {
  return (
    <VariantTracker variant={BOLDFACE_LP} defaultCode={BOLDFACE_CAMPAIGN_CODE} />
  )
}

function buildPlaneWxHref(refCode: string): string {
  const params = new URLSearchParams({
    ref: refCode,
    ...BOLDFACE_UTM,
  })
  return `${PLANEWX_HOME}?${params.toString()}`
}

/**
 * Marketing homepage with referral + UTMs preserved
 * (not app.planewx.ai signup).
 */
function planeWxHref(): string {
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      BOLDFACE_CAMPAIGN_CODE
    return buildPlaneWxHref(code)
  } catch {
    return buildPlaneWxHref(BOLDFACE_CAMPAIGN_CODE)
  }
}

/**
 * Secondary CTA — leaves /boldface for the PlaneWX marketing homepage
 * with ?ref=BOLDFACE (or the visitor's ?ref= / stored planewx_referral)
 * plus landing UTMs.
 */
export function BoldfacePlaneWxLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={buildPlaneWxHref(BOLDFACE_CAMPAIGN_CODE)}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = planeWxHref()
      }}
    >
      {children}
    </a>
  )
}
