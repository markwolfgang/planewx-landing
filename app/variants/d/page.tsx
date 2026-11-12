import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingVariantD } from "@/components/landing-variant-d"

// A/B variant: canonicalize to the homepage, not /variants/d.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function VariantDPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantD />
    </Suspense>
  )
}
