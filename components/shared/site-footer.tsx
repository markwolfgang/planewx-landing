"use client"

import { Plane } from "lucide-react"

export function SiteFooter({ variant }: { variant: string }) {
  return (
    <footer className="relative py-10 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-sky-400" />
          <span className="font-semibold text-white/50">PlaneWX</span>
          <span>· The Pilot&apos;s Decision Support System</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://app.planewx.ai/help/faqs" className="hover:text-white/60 transition-colors">FAQ</a>
          <a href="/research/turbulence-safety" className="hover:text-white/60 transition-colors">Research</a>
          <a href="mailto:hello@planewx.ai" className="hover:text-white/60 transition-colors">Contact</a>
          <span>© 2026 PlaneWX, LLC</span>
        </div>
      </div>
    </footer>
  )
}
