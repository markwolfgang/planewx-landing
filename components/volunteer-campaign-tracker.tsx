"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"
import {
  buildVolunteerSignupHrefForOrg,
  normalizeVolunteerCallSignForOrg,
  resolveVolunteerOrg,
  SKYHOPE_CAMPAIGN_CODE,
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_LP,
} from "@/lib/volunteer-landing"

/**
 * Records visits on /volunteer as ACA by default.
 * Explicit ?ref= still wins (stored for signup CTAs).
 * On non-production deploys, skip entirely (no campaign-visit POST, no gtag/fbq).
 */
export function VolunteerCampaignTracker({
  allowNetworkWrites = true,
}: {
  allowNetworkWrites?: boolean
}) {
  if (!allowNetworkWrites) return null
  return (
    <VariantTracker variant={VOLUNTEER_LP} defaultCode={VOLUNTEER_CAMPAIGN_CODE} />
  )
}

function readUrlRef(): string | null {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("ref")?.trim()
    return fromUrl ? fromUrl.toUpperCase() : null
  } catch {
    return null
  }
}

function readStoredReferral(): string | null {
  try {
    return localStorage.getItem("planewx_referral")
  } catch {
    return null
  }
}

/**
 * Resolve signup `ref` for the active gate.
 * URL wins. Stale SKYHOPE storage must not take over the ACA/CMF gate
 * (and the reverse), so a wrong-org call sign never rides into the link.
 */
function resolveSignupRef(gateOrgRef?: string): string {
  const urlRef = readUrlRef()
  if (urlRef) return urlRef

  const gate = resolveVolunteerOrg(gateOrgRef ?? VOLUNTEER_CAMPAIGN_CODE)
  if (gate.ref === SKYHOPE_CAMPAIGN_CODE) return SKYHOPE_CAMPAIGN_CODE

  const stored = readStoredReferral()
  if (stored && stored.toUpperCase() === SKYHOPE_CAMPAIGN_CODE) {
    return VOLUNTEER_CAMPAIGN_CODE
  }
  return stored || VOLUNTEER_CAMPAIGN_CODE
}

function resolveCallSignForGate(gateOrgRef?: string): string | null {
  const org = resolveVolunteerOrg(gateOrgRef ?? VOLUNTEER_CAMPAIGN_CODE)
  try {
    const saved = localStorage.getItem(org.storageKey)
    if (!saved) return null
    return normalizeVolunteerCallSignForOrg(saved, org)
  } catch {
    return null
  }
}

/**
 * Build app signup URL with ref and the active org's call-sign param.
 * ACA: ?cmf=CALLSIGN. SkyHope: ?callsign=CALLSIGN (never ?cmf=).
 * Pass gateOrgRef from the gate so the active page org wins over stale storage.
 */
export function buildVolunteerSignupHref(
  callSign?: string | null,
  gateOrgRef?: string
): string {
  const gate = resolveVolunteerOrg(gateOrgRef ?? readUrlRef())
  const ref = resolveSignupRef(gate.ref)

  const resolved =
    callSign != null && callSign !== ""
      ? normalizeVolunteerCallSignForOrg(callSign, gate)
      : resolveCallSignForGate(gate.ref)

  return buildVolunteerSignupHrefForOrg({
    ref,
    callSign: resolved,
    gateOrg: gate,
  })
}

/**
 * Primary CTA: app signup with ref (and org call-sign param when stored).
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
