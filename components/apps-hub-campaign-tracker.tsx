"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

/** lp variant — must be ≤8 chars (campaign-visit truncates to 8). */
export const APPS_HUB_LP = "apps"

const PLANEWX_APP = "https://app.planewx.ai"

/** Hub → PlaneWX app UTMs (web attribution). */
const APPS_HUB_UTM = {
  utm_source: "planewx_web",
  utm_medium: "landing",
  utm_campaign: "apps",
} as const

/** Records visits on /apps when ?ref= is present (no invented default campaign code). */
export function AppsHubCampaignTracker() {
  return <VariantTracker variant={APPS_HUB_LP} />
}

function buildAppHref(refCode: string | null): string {
  const params = new URLSearchParams({
    lp: APPS_HUB_LP,
    ...APPS_HUB_UTM,
  })
  if (refCode) params.set("ref", refCode)
  return `${PLANEWX_APP}?${params.toString()}`
}

function resolveRef(): string | null {
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    return (fromUrl ? fromUrl.toUpperCase() : null) || stored || null
  } catch {
    return null
  }
}

function appHref(): string {
  return buildAppHref(resolveRef())
}

/**
 * Browser CTA — app.planewx.ai with landing UTMs + preserved ?ref=
 * (same pattern as companion LPs; no default campaign code without a
 * campaign_codes row).
 */
export function AppsHubPlaneWxLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={buildAppHref(null)}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = appHref()
      }}
    >
      {children}
    </a>
  )
}
