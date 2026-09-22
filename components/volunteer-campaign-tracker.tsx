"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"
import {
  VOLUNTEER_CALL_SIGN_STORAGE_KEY,
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_LP,
} from "@/lib/volunteer-landing"

/**
 * Records visits on /volunteer as ACA by default.
 * Explicit ?ref= still wins (stored for signup CTAs).
 */
export function VolunteerCampaignTracker() {
  return (
    <VariantTracker variant={VOLUNTEER_LP} defaultCode={VOLUNTEER_CAMPAIGN_CODE} />
  )
}

function resolveRef(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("ref")?.trim()
    const stored = localStorage.getItem("planewx_referral")
    return (
      (fromUrl ? fromUrl.toUpperCase() : null) ||
      stored ||
      VOLUNTEER_CAMPAIGN_CODE
    )
  } catch {
    return VOLUNTEER_CAMPAIGN_CODE
  }
}

function resolveCallSign(): string | null {
  try {
    return localStorage.getItem(VOLUNTEER_CALL_SIGN_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Build app signup URL with ref=ACA and optional cmf=CALLSIGN. */
export function buildVolunteerSignupHref(callSign?: string | null): string {
  const params = new URLSearchParams({
    lp: VOLUNTEER_LP,
    ref: VOLUNTEER_CAMPAIGN_CODE,
  })
  try {
    params.set("ref", resolveRef())
    const cmf = callSign ?? resolveCallSign()
    if (cmf) params.set("cmf", cmf)
  } catch {
    if (callSign) params.set("cmf", callSign)
  }
  return `https://app.planewx.ai/auth/sign-up?${params.toString()}`
}

/**
 * Primary CTA: app signup with ref=ACA (and cmf= when a call sign is stored).
 * Prefer VolunteerCallSignGate for the locked flow; this link is for unlocked CTAs.
 */
export function VolunteerSignUpLink({
  className,
  children,
  callSign,
}: {
  className?: string
  children: ReactNode
  /** Optional pre-resolved call sign; otherwise reads localStorage on click. */
  callSign?: string | null
}) {
  return (
    <a
      href={buildVolunteerSignupHref(callSign ?? null)}
      className={className}
      onClick={(e) => {
        e.currentTarget.href = buildVolunteerSignupHref(callSign ?? null)
      }}
    >
      {children}
    </a>
  )
}
