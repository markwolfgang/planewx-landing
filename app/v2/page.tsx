import { Suspense } from "react"
import { LandingPageV2 } from "@/components/landing-page-v2"

export default function V2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LandingPageV2 />
    </Suspense>
  )
}
