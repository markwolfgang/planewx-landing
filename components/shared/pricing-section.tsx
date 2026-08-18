"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Check, Crown, Plane, Shield } from "lucide-react"

const APP_HELP = "https://app.planewx.ai"
const TWO_YEAR_OFFER_ENDS_AT_MS = Date.parse("2026-10-02T05:00:00.000Z")

const PLUS_BULLETS: { name: string; detail: string; helpPath?: string; href?: string }[] = [
  {
    name: "Ground Protection",
    detail:
      "We watch the weather at your parked aircraft and text you before hail, wind, or freezing rain arrives.",
    helpPath: "/help/ground-protection",
  },
  {
    name: "Auto-Brief",
    detail: "File a flight plan and your briefing is waiting before you ask for it.",
    helpPath: "/help/auto-brief",
  },
  {
    name: "Pre-Flight Text",
    detail:
      "Your WX Score by text 30 minutes before departure, with a link that opens the briefing without a login. Requires a verified phone number.",
    helpPath: "/help/preflight-text",
  },
  {
    name: "Contract Fuel Pricing",
    detail: "Your negotiated vendor prices, applied to every fuel stop recommendation.",
    helpPath: "/help/contract-fuel",
  },
  {
    name: "Briefed Fuel Stops",
    detail:
      "Your fuel stops get NOTAM-screened, so a closed runway — or an outage of the fuel you actually burn — rules a stop out before you plan around it.",
    helpPath: "/help/briefed-fuel-stops",
  },
  {
    name: "On-Demand Refresh",
    detail:
      "Take complete control of your briefing refresh schedule. Refresh your briefing anytime you want. *15-minute cooldown between refreshes (5 minutes in the last hour).",
    helpPath: "/help/on-demand-refresh",
  },
  {
    name: "5x5 Insurance Discount",
    detail:
      "Eligible for up to 10% off your aircraft insurance premium through our partner 5x5. Terms are set by 5x5.",
    href: "https://www.5x5insurance.com",
  },
  {
    name: "PlaneWX Labs",
    detail:
      "Early access to features still in development. Altitude Profile cross-section, Route Map Forecast models, and Pilot Self Debrief.",
    helpPath: "/help/planewx-labs",
  },
]

function TrialLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export function PricingSection({ variant }: { variant: string }) {
  const baseUrl = `https://app.planewx.ai?lp=${variant}`
  const [appUrl, setAppUrl] = useState(baseUrl)
  const [plusPlan, setPlusPlan] = useState<"monthly" | "annual">("annual")
  const twoYearOpen = Date.now() < TWO_YEAR_OFFER_ENDS_AT_MS

  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
      try {
        localStorage.setItem("planewx_referral", code)
      } catch {
        // Fail silently if localStorage is blocked or full
      }
      setAppUrl(`${baseUrl}&ref=${code}`)
    } else {
      try {
        const stored = localStorage.getItem("planewx_referral")
        if (stored) setAppUrl(`${baseUrl}&ref=${stored}`)
      } catch {
        // Fail silently if localStorage is blocked
      }
    }
  }, [baseUrl])

  return (
    <section id="pricing" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start with full Pro Plus.{" "}
            <span className="text-sky-400">Free for 14 days.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            No credit card required. Every pilot gets full-quality briefings. After your trial,
            choose the plan that fits how you fly. Pro Plus adds automation while you&apos;re on
            the ground and when you file.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-10 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-emerald-300 mb-2">
            Safety is not a premium feature.
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Every briefing — free, Casual, Pro, or Pro Plus — uses the same AI engine, the same
            weather models, and the same scoring methodology. We limit how much you can use
            PlaneWX, not how well it works. Paid plans unlock{" "}
            <span className="text-teal-300 font-medium">automation</span> and{" "}
            <span className="text-sky-300 font-medium">scale</span> &mdash; not the quality of
            the analysis that keeps you safe.
          </p>
        </div>

        {twoYearOpen && (
          <p className="max-w-2xl mx-auto mb-10 px-4 py-3 rounded-xl border border-teal-500/40 bg-teal-500/10 text-sm font-semibold text-white/80 text-center">
            I priced annual when the app was new. It isn&apos;t anymore. This locks today&apos;s
            rate for two years. Grateful for your support — it&apos;s why I keep putting my
            heart, soul, and wallet into PlaneWX. — Mark
          </p>
        )}

        {/* Pro Plus — featured */}
        <div className="rounded-2xl border-2 border-indigo-500/40 bg-indigo-950/30 p-6 sm:p-8 shadow-lg shadow-indigo-500/10 relative mb-10">
          {twoYearOpen && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold whitespace-nowrap">
              Lock today&apos;s price — 2 years
            </div>
          )}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-indigo-500/10">
                  <Shield className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold">Pro Plus</h3>
              </div>
              <p className="text-sm text-white/50 mb-4 max-w-xl">
                For pilots who want PlaneWX working between flights — parked-aircraft watch,
                briefings on file, and early access to tools still in development. Decision
                support only; you stay PIC.
              </p>
              <p className="text-sm font-semibold mb-3 text-white/80">Everything in Pro, plus:</p>
              <ul className="space-y-4 text-sm">
                {PLUS_BULLETS.map((item) => (
                  <li key={item.name}>
                    {item.helpPath ? (
                      <a
                        href={`${APP_HELP}${item.helpPath}`}
                        className="font-semibold text-white underline underline-offset-2 decoration-indigo-400/70 hover:text-indigo-300"
                      >
                        {item.name}
                      </a>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white underline underline-offset-2 decoration-indigo-400/70 hover:text-indigo-300"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="font-semibold text-white">{item.name}</span>
                    )}
                    <p className="text-white/50 mt-0.5">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-72 shrink-0 rounded-xl border border-indigo-500/30 bg-black/30 p-5">
              {plusPlan === "annual" ? (
                <>
                  <div className="mb-1">
                    <span className="text-3xl font-bold">$249</span>
                    <span className="text-white/40 ml-1">/year</span>
                  </div>
                  <p className="text-xs text-white/40 mb-1">$20.75/mo effective — save $111 vs monthly</p>
                </>
              ) : (
                <>
                  <div className="mb-1">
                    <span className="text-3xl font-bold">$29.99</span>
                    <span className="text-white/40 ml-1">/month</span>
                  </div>
                  <p className="text-xs text-white/40 mb-1">or $249/year — save $111 vs monthly</p>
                </>
              )}
              <p className="text-xs text-white/40 mb-4">
                Also includes higher limits than Pro — 25 monitored trips, 10 aircraft, unlimited
                saved routes, and 25 Corridor Watch routes.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPlusPlan("monthly")}
                  className={`w-full py-2 rounded-lg text-sm font-medium border transition-colors ${
                    plusPlan === "monthly"
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-indigo-500/40 text-white/70 hover:bg-indigo-500/10"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setPlusPlan("annual")}
                  className={`w-full py-2 rounded-lg text-sm font-medium border transition-colors ${
                    plusPlan === "annual"
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-indigo-500/40 text-white/70 hover:bg-indigo-500/10"
                  }`}
                >
                  Annual
                </button>
              </div>
              <TrialLink
                href={appUrl}
                className={`block text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors text-sm${twoYearOpen ? " mb-2" : ""}`}
              >
                Start 14-Day Free Trial
              </TrialLink>
              {twoYearOpen && (
                <TrialLink
                  href={appUrl}
                  className="block text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors text-sm"
                >
                  Lock 2 years — $498
                </TrialLink>
              )}
            </div>
          </div>
        </div>

        {/* Free / Casual / Pro Monthly / Pro Annual */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-slate-500/10">
                  <Plane className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold">Free</h3>
              </div>
              <p className="text-sm text-white/40">Full-quality briefings for occasional flyers</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-white/30 ml-1">/forever</span>
            </div>
            <TrialLink
              href={appUrl}
              className="block text-center py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors mb-6 font-medium text-sm"
            >
              Get Started
            </TrialLink>
            <ul className="space-y-3 text-sm flex-1">
              {[
                "2 monitored flights",
                "1 aircraft profile",
                "15 briefing refreshes per week",
                "Full WX Score breakdown",
                "Synoptic Intelligence™",
                "PAVE Risk Assessment",
                "Flight Window Explorer",
                "Access to mentors",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/60">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-teal-500/40 bg-teal-950/30 p-6 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-teal-500/10">
                  <Plane className="h-5 w-5 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold">Casual</h3>
              </div>
              <p className="text-sm text-white/40">
                Auto-monitoring for pilots who fly a few times a month
              </p>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-bold">$7.99</span>
              <span className="text-white/30 ml-1">/month</span>
            </div>
            <p className="text-xs text-white/40 mb-1">or $59.99/yr — 4 months free</p>
            <p className="text-xs text-teal-400 mb-5">$5.00/mo effective</p>
            <TrialLink
              href={appUrl}
              className={`block text-center py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold transition-colors text-sm${twoYearOpen ? " mb-2" : " mb-6"}`}
            >
              Start 14-Day Free Trial
            </TrialLink>
            {twoYearOpen && (
              <TrialLink
                href={appUrl}
                className="block text-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors text-sm mb-6"
              >
                Lock 2 years — $120
              </TrialLink>
            )}
            <ul className="space-y-3 text-sm flex-1">
              {[
                ["5", " monitored with auto-updates"],
                ["3", " aircraft profiles"],
                ["Unlimited", " briefing refreshes"],
                ["", "Auto-refresh briefings"],
                ["", "Email weather alerts"],
                ["", "Trip watchers (4/flight)"],
                ["", "Access to mentors"],
              ].map(([strong, rest]) => (
                <li key={strong + rest} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-teal-400 shrink-0" />
                  <span className="text-white/70">
                    {strong ? <strong>{strong}</strong> : null}
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-950/20 p-6 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-amber-500/10">
                  <Crown className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Pro Monthly</h3>
              </div>
              <p className="text-sm text-white/40">
                Auto-monitoring &amp; advanced tools for active pilots
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$14.99</span>
              <span className="text-white/30 ml-1">/month</span>
            </div>
            <TrialLink
              href={appUrl}
              className="block text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold transition-colors mb-6 text-sm"
            >
              Start 14-Day Free Trial
            </TrialLink>
            <ul className="space-y-3 text-sm flex-1">
              {[
                ["10", " monitored with auto-updates"],
                ["5", " aircraft profiles"],
                ["Unlimited", " briefing refreshes"],
                ["Auto-refresh", " briefings"],
                ["", "Email weather alerts"],
                ["", "Trip watchers"],
                ["", "Multi-City Optimizer"],
                ["", "Corridor Watch (10 routes)"],
                ["", "Access to mentors"],
              ].map(([strong, rest]) => (
                <li key={strong + rest} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-white/70">
                    {strong ? <strong>{strong}</strong> : null}
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl border-2 border-amber-500/50 bg-amber-950/30 p-6 flex flex-col shadow-lg shadow-amber-500/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase tracking-wide">
              Most Popular
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-amber-500/10">
                  <Crown className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Pro Annual</h3>
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300">
                  4 months free
                </span>
              </div>
              <p className="text-sm text-white/40">Best value — save $60.88 vs monthly</p>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-bold">$119</span>
              <span className="text-white/30 ml-1">/year</span>
            </div>
            <p className="text-xs text-white/40 mb-5">$9.92/mo effective</p>
            <TrialLink
              href={appUrl}
              className={`block text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold transition-colors text-sm${twoYearOpen ? " mb-3" : " mb-6"}`}
            >
              Start 14-Day Free Trial
            </TrialLink>
            {twoYearOpen && (
              <TrialLink
                href={appUrl}
                className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold transition-colors text-sm mb-6"
              >
                Lock 2 years — $238
              </TrialLink>
            )}
            <ul className="space-y-3 text-sm flex-1">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/70">
                  <strong>10</strong> monitored with auto-updates
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/50">Everything in Pro Monthly</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/70">
                  <strong>Unlimited</strong> briefing refreshes
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/70">
                  Save <strong>$60.88</strong> per year
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white/70">Cancel anytime</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          All plans include WX Score, PAVE Risk Assessment, Synoptic Intelligence™, mentor
          broadcast, and 14-day planning.
        </p>
      </div>
    </section>
  )
}
