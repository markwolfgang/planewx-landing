"use client"

import { useEffect, useState } from "react"
import { Check, Crown, Minus, Shield } from "lucide-react"

export function PricingSection({ variant }: { variant: string }) {
  const baseUrl = `https://app.planewx.ai?lp=${variant}`
  const [appUrl, setAppUrl] = useState(baseUrl)

  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
      localStorage.setItem("planewx_referral", code)
      setAppUrl(`${baseUrl}&ref=${code}`)
    } else {
      const stored = localStorage.getItem("planewx_referral")
      if (stored) setAppUrl(`${baseUrl}&ref=${stored}`)
    }
  }, [baseUrl])

  return (
    <section id="pricing" className="relative py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start with full Pro access.{" "}
            <span className="text-sky-400">Free for 14 days.</span>
          </h2>
          <p className="text-white/50">No credit card required. Cancel anytime.</p>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-10 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-emerald-300 mb-2">
            Safety is not a premium feature.
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Every free briefing uses the same AI engine, the same weather models, and the same
            scoring methodology as a Pro briefing. We limit how much you can use PlaneWX,
            not how well it works. Paid plans unlock convenience and scale &mdash; not the
            quality of the analysis that keeps you safe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-xl font-bold mb-1">Free</h3>
            <p className="text-white/40 text-sm mb-4">For students and occasional flyers</p>
            <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <p className="text-xs text-emerald-300 font-medium text-center">
                Full safety analysis &mdash; same engine as Pro
              </p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-white/30 ml-2">/forever</span>
            </div>
            <a
              href={appUrl}
              className="block text-center py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors mb-8 font-medium"
            >
              Get Started
            </a>
            <div className="space-y-3 text-sm">
              {[
                "2 active flights",
                "1 aircraft profile",
                "Full WX Score breakdown",
                "Per-aircraft personal minimums",
                "PAVE Risk Assessment",
                "14-day planning horizon",
                "Synoptic Intelligence™",
                "Need Help Now — mentor broadcast",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/60">{f}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-white/5 space-y-3">
                {["Auto-refresh", "Email alerts", "Trip Watchers", "Corridor Watch", "Browse Mentors"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Minus className="h-4 w-4 text-white/20 shrink-0" />
                    <span className="text-white/25">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border-2 border-sky-500/40 shadow-xl shadow-sky-500/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500 text-white text-xs font-semibold">
                <Crown className="h-3 w-3" />
                Most Popular
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">Pro</h3>
            <p className="text-white/40 text-sm mb-6">For active GA pilots</p>
            <div className="mb-2">
              <span className="text-5xl font-bold">$14.99</span>
              <span className="text-white/30 ml-2">/month</span>
            </div>
            <p className="text-sm text-sky-400 mb-6">
              or $119/year{" "}
              <span className="text-emerald-400 font-medium">(4 months free)</span>
            </p>
            <a
              href={appUrl}
              className="block text-center py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold transition-colors mb-8 shadow-lg shadow-sky-500/25"
            >
              Start 14-Day Free Trial
            </a>
            <div className="space-y-3 text-sm">
              <p className="text-xs text-white/30 uppercase tracking-wider font-medium mb-4">Everything in Free, plus</p>
              {[
                ["10 active flights", false],
                ["5 aircraft profiles", false],
                ["Auto-refresh — briefings update automatically", true],
                ["Email alerts — weather changes to your inbox", true],
                ["Trip Watchers — share live trip status", true],
                ["Corridor Watch — route-specific monitoring", true],
                ["Multi-City Optimizer — up to 6 destinations", true],
                ["Browse Mentors — find and connect directly", true],
              ].map(([f, bold], i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className={bold ? "text-white" : "text-white/70"}>{f as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          All plans include WX Score, PAVE Risk Assessment, Synoptic Intelligence™, mentor broadcast, and 14-day planning.
        </p>
      </div>
    </section>
  )
}
