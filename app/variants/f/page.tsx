import { Suspense } from "react"
import { LandingVariantF } from "@/components/landing-variant-f"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PlaneWX — From Chaos to Clarity",
  description:
    "Six tabs. Four apps. One decision. PlaneWX synthesizes your weather against your aircraft, minimums, and route — and delivers a single WX Score, days before you need to decide.",
  openGraph: {
    title: "PlaneWX — From Chaos to Clarity",
    description:
      "Six tabs. Four apps. One decision. PlaneWX synthesizes your weather against your aircraft, minimums, and route — and delivers a single WX Score, days before you need to decide.",
  },
}

export default function VariantFPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090a]" />}>
      <LandingVariantF />
    </Suspense>
  )
}
