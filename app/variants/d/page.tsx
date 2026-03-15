import { Suspense } from "react"
import { LandingVariantD } from "@/components/landing-variant-d"

export default function VariantDPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantD />
    </Suspense>
  )
}
