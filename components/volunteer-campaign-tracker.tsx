"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"
import {
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_LP,
} from "@/lib/volunteer-landing"

/**
 * Records visits on /volunteer as CMF by default.
 * Explicit ?ref= still wins (stored for signup CTAs).
 */
export function VolunteerCampaignTracker() {
  return (
    <VariantTracker variant={VOLUNTEER_LP} defaultCode={VOLUNTEER_CAMPAIGN_CODE} />
  )
}

function signupHref(): string {
  const base = `https://app.planewx.ai/auth/sign-up?lp=${VOLUNTEER_LP}`
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("ref")?.trim()
    const stored = localStorage.getItem("planewx_referral")
    const code =
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      VOLUNTEER_CAMPAIGN_CODE
    return `${base}&ref=${encodeURIComponent(code)}`
  } catch {
    return `${base}&ref=${VOLUNTEER_CAMPAIGN_CODE}`
  }
}

/** Primary CTA: app signup with ref=CMF preserved (or explicit ?ref=). */
export function VolunteerSignUpLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={`https://app.planewx.ai/auth/sign-up?lp=${VOLUNTEER_LP}&ref=${VOLUNTEER_CAMPAIGN_CODE}`}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = signupHref()
      }}
    >
      {children}
    </a>
  )
}
