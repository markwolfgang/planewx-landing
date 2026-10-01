"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"
import {
  buildVolunteerSignupHrefForOrg,
  isBareVolunteerGate,
  normalizeVolunteerCallSignForPage,
  resolveVolunteerOrg,
  ANGEL_FLIGHT_CAMPAIGN_CODE,
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
 * URL wins. Stale SKYHOPE or ANGELFLIGHT storage must not take over the ACA gate
 * (and the reverse), so a wrong-org call sign never rides into the link.
 * NGF on the generic gate attributes to ACA unless the URL carries ref=ANGELFLIGHT.
 */
function resolveSignupRef(gateOrgRef?: string): string {
  const urlRef = readUrlRef()
  if (urlRef) return urlRef

  const gate = resolveVolunteerOrg(gateOrgRef ?? VOLUNTEER_CAMPAIGN_CODE)
  if (gate.ref === SKYHOPE_CAMPAIGN_CODE) return SKYHOPE_CAMPAIGN_CODE
  if (gate.ref === ANGEL_FLIGHT_CAMPAIGN_CODE) return ANGEL_FLIGHT_CAMPAIGN_CODE

  const stored = readStoredReferral()
  if (stored) {
    const upper = stored.toUpperCase()
    if (upper === SKYHOPE_CAMPAIGN_CODE || upper === ANGEL_FLIGHT_CAMPAIGN_CODE) {
      return VOLUNTEER_CAMPAIGN_CODE
    }
  }
  return stored || VOLUNTEER_CAMPAIGN_CODE
}

function resolveCallSignForGate(gateOrgRef?: string): string | null {
  const pageRef = gateOrgRef ?? VOLUNTEER_CAMPAIGN_CODE
  try {
    const keys = isBareVolunteerGate(pageRef)
      ? [
          resolveVolunteerOrg(VOLUNTEER_CAMPAIGN_CODE).storageKey,
          resolveVolunteerOrg(ANGEL_FLIGHT_CAMPAIGN_CODE).storageKey,
          resolveVolunteerOrg(SKYHOPE_CAMPAIGN_CODE).storageKey,
        ]
      : [resolveVolunteerOrg(pageRef).storageKey]
    for (const key of keys) {
      const saved = localStorage.getItem(key)
      if (!saved) continue
      const parsed = normalizeVolunteerCallSignForPage(saved, pageRef)
      if (parsed) return parsed.callSign
    }
    return null
  } catch {
    return null
  }
}

/**
 * Build app signup URL with ref and the active org's call-sign param.
 * ACA CMF: ?cmf=CALLSIGN. NGF and SkyHope: ?callsign=CALLSIGN (never ?cmf=).
 * On the generic page, SYH routes to ref=SKYHOPE; NGF keeps ACA attribution
 * unless the URL has ref=ANGELFLIGHT.
 * Pass gateOrgRef from the gate so the active page org wins over stale storage.
 */
export function buildVolunteerSignupHref(
  callSign?: string | null,
  gateOrgRef?: string
): string {
  const pageRef = gateOrgRef ?? readUrlRef() ?? VOLUNTEER_CAMPAIGN_CODE
  const raw =
    callSign != null && callSign !== ""
      ? callSign
      : resolveCallSignForGate(pageRef)

  const parsed = raw
    ? normalizeVolunteerCallSignForPage(raw, pageRef)
    : null

  const gate = parsed?.org ?? resolveVolunteerOrg(pageRef)
  const ref = parsed?.org.ref ?? resolveSignupRef(pageRef)

  return buildVolunteerSignupHrefForOrg({
    ref,
    callSign: parsed?.callSign ?? null,
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
