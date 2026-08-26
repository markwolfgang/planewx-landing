"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

export const GA_CUSTOMS_CAMPAIGN_CODE = "GACUSTOMS"
export const GA_CUSTOMS_LP = "gacus"

/** Records visits on /ga-customs (with or without ?ref=) as GACUSTOMS. */
export function GaCustomsCampaignTracker() {
  return (
    <VariantTracker variant={GA_CUSTOMS_LP} defaultCode={GA_CUSTOMS_CAMPAIGN_CODE} />
  )
}

function signupHref(): string {
  let url = `https://app.planewx.ai/auth/sign-up?lp=${GA_CUSTOMS_LP}`
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      GA_CUSTOMS_CAMPAIGN_CODE
    if (code) url += `&ref=${encodeURIComponent(code)}`
  } catch {
    url += `&ref=${GA_CUSTOMS_CAMPAIGN_CODE}`
  }
  return url
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
      href={`https://app.planewx.ai/auth/sign-up?lp=${GA_CUSTOMS_LP}&ref=${GA_CUSTOMS_CAMPAIGN_CODE}`}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = signupHref()
      }}
    >
      {children}
    </a>
  )
}
