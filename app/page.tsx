import { Suspense } from "react"
import { LandingVariantA } from "@/components/landing-variant-a"

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantA />
    </Suspense>
  )
}
