import { Suspense } from "react"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50" />}>
      <LandingPage />
    </Suspense>
  )
}
