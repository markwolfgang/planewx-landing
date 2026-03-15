import { Suspense } from "react"
import { LandingVariantB } from "@/components/landing-variant-b"

export default function VariantBPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantB />
    </Suspense>
  )
}
