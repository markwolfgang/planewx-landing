import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingPageV3 } from "@/components/landing-page-v3"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function V3Preview() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingPageV3 />
    </Suspense>
  )
}
