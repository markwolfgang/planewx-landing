import { Suspense } from "react"
import { LandingPage } from "@/components/landing-page"

export default function V2Archive() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingPage />
    </Suspense>
  )
}
