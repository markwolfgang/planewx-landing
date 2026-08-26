"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

export const BOLDFACE_CAMPAIGN_CODE = "BOLDFACE"
/** lp variant — must be ≤8 chars (campaign-visit truncates to 8). */
export const BOLDFACE_LP = "boldface"

/** Records visits on /boldface (with or without ?ref=) as BOLDFACE. */
export function BoldfaceCampaignTracker() {
  return (
    <VariantTracker variant={BOLDFACE_LP} defaultCode={BOLDFACE_CAMPAIGN_CODE} />
  )
}

/** Marketing homepage with referral preserved (not app.planewx.ai signup). */
function planeWxHref(): string {
  let url = "https://www.planewx.ai/"
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      BOLDFACE_CAMPAIGN_CODE
    if (code) url += `?ref=${encodeURIComponent(code)}`
  } catch {
    url += `?ref=${BOLDFACE_CAMPAIGN_CODE}`
  }
  return url
}

/**
 * Secondary CTA — leaves /boldface for the PlaneWX marketing homepage
 * with ?ref=BOLDFACE (or the visitor's ?ref= / stored planewx_referral).
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
      href={`https://www.planewx.ai/?ref=${BOLDFACE_CAMPAIGN_CODE}`}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = planeWxHref()
      }}
    >
      {children}
    </a>
  )
}
