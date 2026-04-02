import { Suspense } from "react"
import { LandingVariantE } from "@/components/landing-variant-e"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PlaneWX — For the Pilot Who Wants to Do Everything in Their Power to Come Home",
  description:
    "Built by a pilot who felt the full weight of the left seat. Weather intelligence, PAVE risk assessment, and a mentor network — for the pilot who holds themselves to a higher standard.",
  openGraph: {
    title: "PlaneWX — For the Pilot Who Takes the Left Seat Seriously",
    description:
      "Built by a pilot who felt the full weight of the left seat. For the pilot who holds themselves to a standard above what's required.",
  },
}

export default function VariantEPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantE />
    </Suspense>
  )
}
