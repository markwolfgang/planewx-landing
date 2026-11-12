import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingVariantB } from "@/components/landing-variant-b"

// A/B variant: canonicalize to the homepage, not /variants/b.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function VariantBPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantB />
    </Suspense>
  )
}
