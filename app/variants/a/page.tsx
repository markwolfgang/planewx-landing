import { Suspense } from "react"
import type { Metadata } from "next"
import { LandingVariantA } from "@/components/landing-variant-a"
import { HOME_MARKDOWN_ALTERNATES } from "@/lib/markdown-pages"

// "/" is rewritten here by middleware, so this is the homepage <head>.
export const metadata: Metadata = {
  alternates: HOME_MARKDOWN_ALTERNATES,
}

export default function VariantAPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
      <LandingVariantA />
    </Suspense>
  )
}
