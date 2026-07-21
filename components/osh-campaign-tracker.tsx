"use client"

import type { ReactNode } from "react"
import { VariantTracker } from "@/components/shared/variant-tracker"

/** Records ?ref= campaign visits on /osh and stores code for signup links. */
export function OshCampaignTracker() {
  return <VariantTracker variant="osh" />
}

function signupHref(): string {
  let url = "https://app.planewx.ai/auth/sign-up?lp=osh"
  try {
    const stored = localStorage.getItem("planewx_referral")
    const fromUrl = new URLSearchParams(window.location.search).get("ref")
    const code = stored || (fromUrl ? fromUrl.toUpperCase() : null)
    if (code) url += `&ref=${encodeURIComponent(code)}`
  } catch {
    /* ignore */
  }
  return url
}

/** Trial CTA that preserves campaign ?ref= into app signup. */
export function OshSignUpLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href="https://app.planewx.ai/auth/sign-up?lp=osh"
      className={className}
      onClick={(e) => {
        e.currentTarget.href = signupHref()
      }}
    >
      {children}
    </a>
  )
}
