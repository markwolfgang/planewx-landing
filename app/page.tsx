import type { Metadata } from "next"
import { Suspense } from "react"
import { LandingVariantA } from "@/components/landing-variant-a"
import { withMarkdownAlternate } from "@/lib/markdown-pages"

export const metadata: Metadata = {
  alternates: withMarkdownAlternate({ canonical: "/" }, "/index.md"),
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantA />
    </Suspense>
  )
}
