import { Suspense } from "react"
import { LandingVariantC } from "@/components/landing-variant-c"

export default function VariantCPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantC />
    </Suspense>
  )
}
