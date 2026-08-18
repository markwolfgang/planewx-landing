"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { STATS } from "@/components/shared/landing-data"

export function FooterCTA({ variant }: { variant: string }) {
  const baseUrl = `https://app.planewx.ai?lp=${variant}`
  const [href, setHref] = useState(baseUrl)

  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.trim().toUpperCase()
      localStorage.setItem("planewx_referral", code)
      setHref(`${baseUrl}&ref=${code}`)
    } else {
      const stored = localStorage.getItem("planewx_referral")
      if (stored) setHref(`${baseUrl}&ref=${stored}`)
    }
  }, [baseUrl])

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Get to the decision —{" "}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
            with confidence.
          </span>
        </h2>
        <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
          Join {STATS.totalPilots} pilots — from students to 35,000-hour ATP captains — who use PlaneWX
          to make better decisions.
        </p>
        <a
          href={href}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-12 py-5 text-xl font-semibold shadow-2xl shadow-sky-500/30 transition-all"
        >
          Start Your Free 14-Day Trial
          <ArrowRight className="ml-3 h-6 w-6" />
        </a>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            Full Pro Plus access for 14 days
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            Then choose: Free, Casual, Pro, or Pro Plus
          </div>
        </div>
      </div>
    </section>
  )
}
