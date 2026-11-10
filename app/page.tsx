import type { Metadata } from "next"
import { Suspense } from "react"
import { LandingVariantA } from "@/components/landing-variant-a"
import { HOME_MARKDOWN_ALTERNATES } from "@/lib/markdown-pages"

export const metadata: Metadata = {
  alternates: HOME_MARKDOWN_ALTERNATES,
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantA />
    </Suspense>
  )
}
