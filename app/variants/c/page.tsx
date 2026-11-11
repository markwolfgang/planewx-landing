import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingVariantC } from "@/components/landing-variant-c"

// A/B variant: canonicalize to the homepage, not /variants/c.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function VariantCPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantC />
    </Suspense>
  )
}
