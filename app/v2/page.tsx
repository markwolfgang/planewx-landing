import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function V2Archive() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingPage />
    </Suspense>
  )
}
