import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, XCircle,
  Clock, Wind, Layers, Zap, CloudRain, MapPin, RefreshCw,
  TrendingUp, Lock, ChevronRight, Info, Plane,
} from "lucide-react"
import { fetchKlalOutlook } from "@/lib/klal-outlook"
import type { KlalOutlookResponse, DayOutlook } from "@/lib/klal-outlook"

export const revalidate = 21600 // 6h — aligned with model cycles

export const metadata: Metadata = {
  title: "Flying into Sun 'n Fun 2026? | PlaneWX",
  description:
    "Live weather outlook for pilots flying into KLAL Apr 14–20, 2026. Best morning departure windows, Florida convection patterns, and AI-powered briefings for your specific route — free for 14 days.",
  openGraph: {
    title: "Flying to Sun 'n Fun? PlaneWX has been watching the weather.",
    description:
      "Live ECMWF + GFS + HRRR outlook for KLAL Apr 14–20. Best windows, convection timing, model agreement — updated every 6 hours.",
    type: "article",
  },
}

const SIGNUP_URL = "https://app.planewx.ai/auth/sign-up?lp=snf2026"
const APP_URL = "https://app.planewx.ai?lp=snf2026"

// ─── Fetch weather data ───────────────────────────────────────────────────────
// Called directly — no self-referential HTTP fetch needed in server components

// ─── Sub-components ───────────────────────────────────────────────────────────

function RiskDot({ color }: { color: "green" | "yellow" | "red" }) {
  const cls = {
    green: "bg-emerald-400",
    yellow: "bg-amber-400",
    red: "bg-red-500",
  }[color]
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${cls} shrink-0`} />
}

function ConvectionBadge({ risk }: { risk: "low" | "moderate" | "high" }) {
  const map = {
    low: { label: "Low convection", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    moderate: { label: "Moderate convection", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    high: { label: "High convection", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  }[risk]
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${map.cls}`}>
      {map.label}
    </span>
  )
}

function AgreementBadge({ agreement }: { agreement: DayOutlook["modelAgreement"] }) {
  if (agreement === "agree") return null
  const label = agreement === "significant_divergence" ? "Models disagree" : "Minor model divergence"
  return (
    <span className="text-xs px-2 py-0.5 rounded-full border bg-violet-500/10 text-violet-400 border-violet-500/30 font-medium flex items-center gap-1">
      <Info className="h-3 w-3" />
      {label}
    </span>
  )
}

function HeatmapRow({ day }: { day: DayOutlook }) {
  const riskColor = {
    low: "bg-emerald-500",
    moderate: "bg-amber-400",
    high: "bg-red-500",
  }
  const hours = Array.from({ length: 15 }, (_, i) => i + 6) // 6 AM – 8 PM
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-white/50 w-16 shrink-0 text-right">{day.dayLabel}</span>
      <div className="flex gap-0.5 flex-1">
        {hours.map(h => {
          const slot = day.hours.find(s => s.hour === h)
          const risk = slot?.riskLevel ?? "low"
          const opacity = risk === "low" ? "opacity-30" : risk === "moderate" ? "opacity-70" : "opacity-100"
          return (
            <div
              key={h}
              title={slot ? `${h}:00 EDT · CAPE ${slot.capeJpkg} J/kg · Storm ${slot.precipPct}%` : `${h}:00 EDT`}
              className={`h-5 flex-1 rounded-sm ${riskColor[risk]} ${opacity}`}
            />
          )
        })}
      </div>
      {day.isDepartureDay && (
        <span className="text-xs text-sky-400 shrink-0 font-medium">Dep</span>
      )}
    </div>
  )
}

function DayCard({ day }: { day: DayOutlook }) {
  const borderColor = {
    green: "border-emerald-500/30",
    yellow: "border-amber-500/30",
    red: "border-red-500/30",
  }[day.riskColor]

  const bgColor = {
    green: "bg-emerald-500/5",
    yellow: "bg-amber-500/5",
    red: "bg-red-500/5",
  }[day.riskColor]

  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} p-5 space-y-4 flex flex-col`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <RiskDot color={day.riskColor} />
          <span className="font-semibold text-white">{day.dayLabel}</span>
          {day.isEventOpen && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">
              Show Opens
            </span>
          )}
          {day.isDepartureDay && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-medium">
              Departure Day
            </span>
          )}
          {day.isPreEvent && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40 border border-white/10 font-medium">
              Arrival window
            </span>
          )}
        </div>
        <ConvectionBadge risk={day.convectionRisk} />
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Best Window</p>
          <p className="text-white font-medium">
            {day.bestWindow ?? (day.riskColor === "red" ? "Brief carefully" : "Early morning")}
          </p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Morning VFR</p>
          <p className="text-white font-medium">{day.morningVfrPct}%</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Ceiling</p>
          <p className="text-white font-medium">
            {day.ceilingFtAgl !== null ? `${day.ceilingFtAgl.toLocaleString()} ft AGL` : "Unlimited"}
          </p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Wind / Gusts</p>
          <p className="text-white font-medium">
            {day.windMaxKt}G{day.gustMaxKt} kt
          </p>
        </div>
      </div>

      {/* Afternoon storm % */}
      {day.afternoonStormPct > 20 && (
        <div className="flex items-center gap-2 text-xs text-amber-400">
          <CloudRain className="h-3.5 w-3.5 shrink-0" />
          <span>Afternoon storm probability: {day.afternoonStormPct}%</span>
        </div>
      )}

      {/* Model agreement */}
      {day.modelAgreement !== "agree" && (
        <div className="space-y-1">
          <AgreementBadge agreement={day.modelAgreement} />
          {day.ecmwfCeilingFt !== null && day.gfsCeilingFt !== null && (
            <p className="text-xs text-white/40">
              ECMWF ceiling {day.ecmwfCeilingFt.toLocaleString()} ft · GFS {day.gfsCeilingFt.toLocaleString()} ft — higher uncertainty, brief closer to departure
            </p>
          )}
        </div>
      )}

      {/* Summary */}
      <p className="text-sm text-white/60 leading-relaxed flex-1">{day.summary}</p>

      {/* CTA */}
      <a
        href={SIGNUP_URL}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/40 text-sm text-white/70 hover:text-sky-300 transition-all"
      >
        Get full briefing for this day
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SunNFun2026() {
  const outlook = await fetchKlalOutlook().catch(() => null) as KlalOutlookResponse | null

  const updatedAt = outlook?.updatedAt
    ? new Date(outlook.updatedAt).toLocaleString("en-US", {
        month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
        timeZone: "America/New_York", timeZoneName: "short",
      })
    : null

  const ecmwfPct = outlook ? Math.round(outlook.ecmwfWeight * 100) : 58
  const gfsPct = outlook ? Math.round(outlook.gfsWeight * 100) : 42

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/10">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            PlaneWX
          </Link>
          <a
            href={SIGNUP_URL}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-24">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>KLAL · Lakeland, FL</span>
            </div>
            <span className="text-white/20">·</span>
            <span>Sun &apos;n Fun 2026</span>
            <span className="text-white/20">·</span>
            <span>Show Apr 14–20 · Planning starts now</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Flying into KLAL?<br />
            <span className="text-sky-400">We are watching<br />the weather.</span>
          </h1>

          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            Sun &apos;n Fun is April 14–20 — but smart pilots start planning now.
            PlaneWX is already tracking KLAL using ECMWF and GFS, automatically
            switching to HRRR as you get within 48 hours of your departure.
            This outlook updates every 6 hours and drops past days automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold rounded-xl text-lg shadow-xl shadow-sky-500/20 transition-all"
            >
              Plan My KLAL Trip Free
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="flex flex-col justify-center gap-1 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Full Pro access, free for 14 days
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                No credit card required
              </div>
            </div>
          </div>
        </section>

        {/* ── Model explainer ───────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              The models behind this page
            </h2>
            <p className="text-white/50">
              PlaneWX doesn&apos;t just pick one model and hope for the best.
              Each model has a role — and we switch automatically based on how
              close you are to your flight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* ECMWF */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">ECMWF</span>
                <span className="text-xs text-white/30">{ecmwfPct}% weight</span>
              </div>
              <p className="font-semibold text-white">The global gold standard</p>
              <p className="text-sm text-white/50 leading-relaxed">
                European Centre for Medium-Range Weather Forecasts. 9 km resolution,
                15-day range. PlaneWX weights ECMWF higher for ceiling and wind in
                the Southeast US — it consistently outperforms GFS on synoptic accuracy
                in this region.
              </p>
            </div>

            {/* GFS */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">GFS</span>
                <span className="text-xs text-white/30">{gfsPct}% weight</span>
              </div>
              <p className="font-semibold text-white">The convection model</p>
              <p className="text-sm text-white/50 leading-relaxed">
                NOAA&apos;s Global Forecast System. The only model that provides CAPE and
                convection probability — essential for predicting Florida afternoon
                thunderstorm development. We can&apos;t leave GFS out even with ECMWF
                available, because ECMWF simply doesn&apos;t publish these metrics.
              </p>
            </div>

            {/* HRRR */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">HRRR</span>
                <span className="text-xs text-white/30">auto-switches at 48h</span>
              </div>
              <p className="font-semibold text-white">Day-of precision</p>
              <p className="text-sm text-white/50 leading-relaxed">
                High-Resolution Rapid Refresh. 3 km resolution, updates every hour.
                Built for exactly what central Florida throws at you in April — rapid
                sea-breeze-driven storm development. When you need to decide whether
                to push your departure two hours earlier, HRRR is the model you want.
              </p>
            </div>
          </div>

          {/* Live weight display */}
          {outlook && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/40 bg-white/5 rounded-xl px-5 py-3 border border-white/10">
              <RefreshCw className="h-4 w-4 shrink-0" />
              <span className="font-medium text-white/60">{outlook.modelLabel}</span>
              <span className="text-white/20">·</span>
              {updatedAt && <span>Updated {updatedAt}</span>}
              <span className="text-white/20">·</span>
              <span>Next update in ~{Math.round((21600 - (Date.now() / 1000 % 21600)) / 3600)}h</span>
            </div>
          )}
        </section>

        {/* ── Convection heatmap ────────────────────────────────────────────── */}
        {outlook && outlook.days.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              When convection builds each day
            </h2>
            <p className="text-white/50">
              Florida spring afternoons are predictable in one way: storms fire fast.
              Green = low risk, amber = developing, red = active convection.
              Pre-event days show your arrival window; show days Apr 14–20.
            </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-2.5">
              {/* Hour labels */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-16 shrink-0" />
                <div className="flex flex-1 text-xs text-white/30">
                  {["6a", "", "8a", "", "10a", "", "12p", "", "2p", "", "4p", "", "6p", "", "8p"].map((label, i) => (
                    <span key={i} className="flex-1 text-center">{label}</span>
                  ))}
                </div>
              </div>
              {outlook.days.map(day => (
                <HeatmapRow key={day.date} day={day} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 opacity-30 inline-block" />
                Low convection risk
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-400 opacity-70 inline-block" />
                Developing — watch closely
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />
                Active convection — avoid if possible
              </div>
              <span className="ml-auto">Powered by GFS CAPE + precipitation probability</span>
            </div>
          </section>
        )}

        {/* ── Day-by-day cards ──────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Day-by-day outlook: now through Apr 20
            </h2>
            <p className="text-white/50">
              Updated every 6 hours. Past days drop off automatically.
              Pre-event days show your arrival window — the show opens Apr 14.
              Apr 20 is departure day: hundreds of aircraft trying to leave at once,
              all before the afternoon convection.
            </p>
          </div>

          {outlook ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outlook.days.map(day => (
                <DayCard key={day.date} day={day} />
              ))}
            </div>
          ) : (
            /* Fallback skeleton */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 h-56 animate-pulse" />
              ))}
            </div>
          )}

          <p className="text-xs text-white/30">
            This is a planning outlook, not a certified flight briefing.
            Get your full route briefing — including personal minimums, icing, turbulence, and NOTAM analysis — in PlaneWX.
          </p>
        </section>

        {/* ── Route matters ─────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider">What this page can&apos;t tell you</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Your route matters more than the destination
            </h2>
          </div>

          <p className="text-white/60 leading-relaxed max-w-2xl">
            KLAL conditions are only half the picture. A pilot flying from the Gulf Coast
            faces a completely different weather profile than one coming down from the
            Carolinas or crossing from the Mississippi valley. KLAL can be green while
            your route has embedded convection, icing layers, or SIGMET activity.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Plane className="h-4 w-4 text-sky-400 rotate-45" />
                Northern approach (Carolinas → KLAL)
              </div>
              <p className="text-xs text-white/50">
                Track any frontal boundary position, ceiling along the I-95 corridor,
                and Carolina mountain wave activity before you even enter Florida airspace.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Plane className="h-4 w-4 text-sky-400 -rotate-12" />
                Gulf Coast approach (Texas/LA → KLAL)
              </div>
              <p className="text-xs text-white/50">
                Gulf moisture, offshore convection, and the New Orleans–Tampa corridor
                can be IMC even when central Florida looks clean on a surface chart.
              </p>
            </div>
          </div>

          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
          >
            Get your route briefed in PlaneWX
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        {/* ── Teaser Go Score ───────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Your Go Score is waiting
            </h2>
            <p className="text-white/50 max-w-2xl">
              PlaneWX distills every data source — ECMWF, GFS, HRRR, PIREPs, NOTAMs,
              METARs, TAFs — into a single number scored against{" "}
              <span className="text-white">your aircraft, your ratings, and your personal minimums.</span>
            </p>
          </div>

          {/* Mock briefing card with blur/lock */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden max-w-lg">
            {/* Blurred content */}
            <div className="p-6 space-y-4 blur-sm select-none pointer-events-none">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Go Score</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-5xl font-bold text-emerald-400">82</span>
                    <span className="text-white/40 mb-1">/ 100</span>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-emerald-400/40 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400">GO</span>
                </div>
              </div>
              <div className="space-y-2">
                {["Ceiling & Visibility", "Wind & Crosswind", "Icing Risk", "Turbulence", "Convection"].map(label => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{label}</span>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${60 + Math.random() * 35}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0B1120]/70 backdrop-blur-sm">
              <Lock className="h-8 w-8 text-white/40" />
              <div className="text-center space-y-1 px-6">
                <p className="font-semibold text-white">Your score depends on your flight</p>
                <p className="text-sm text-white/50">
                  Aircraft, minimums, and your exact route — all factored in.
                </p>
              </div>
              <a
                href={SIGNUP_URL}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Get My Free Briefing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── What a full briefing adds ─────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            What a full PlaneWX briefing adds
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Route-level scoring",
                body: "Every waypoint along your route is scored — not just the destination. Weather that's fine at KLAL may be a problem 200 nm away.",
              },
              {
                icon: CheckCircle,
                title: "Personal minimums",
                body: "Your crosswind limits, IFR ceiling floors, and visibility requirements are checked against the actual forecast, not generic thresholds.",
              },
              {
                icon: Layers,
                title: "Icing & turbulence",
                body: "Altitude-banded icing probability and turbulence analysis — including CAPE-based convective turbulence that generic forecasts miss.",
              },
              {
                icon: RefreshCw,
                title: "Auto-refreshes",
                body: "Your briefing updates every time a new model run is available. Check it the morning of and again two hours before departure.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
                <Icon className="h-5 w-5 text-sky-400" />
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sun n Fun context ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Sun &apos;n Fun aviation context
            </h2>
            <p className="text-white/50">
              Flying into a major fly-in isn&apos;t like any other cross-country.
              There are event-specific factors no weather app will tell you about.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Plane,
                color: "text-sky-400",
                title: "SFAR arrival & departure procedures",
                body: "Sun 'n Fun publishes specific VFR corridors, altitude requirements, and arrival flow procedures. Review the published NOTAM before you plan your approach — non-compliance means a go-around and a very embarrassing radio call.",
              },
              {
                icon: CloudRain,
                color: "text-amber-400",
                title: "Sea breeze convergence",
                body: "Florida's Gulf and Atlantic sea breeze boundaries frequently collide over central Florida. When they do, storms fire with almost no warning. A day that looks 'partly cloudy' at 10 AM can be severe by 2 PM.",
              },
              {
                icon: Zap,
                color: "text-red-400",
                title: "Traffic density is its own problem",
                body: "Hundreds of aircraft converge on KLAL in a narrow morning window before afternoon convection. Arriving before noon isn't just about weather — it's about avoiding extended holds and pattern saturation.",
              },
              {
                icon: AlertTriangle,
                color: "text-violet-400",
                title: "TFR watch",
                body: "Event-related TFRs are common around Sun 'n Fun. Airspace is dynamic. Brief your NOTAMs the morning of your flight, not the night before, and check for last-minute changes on your EFB.",
              },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 360WX preview ─────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Coming to PlaneWX</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              360WX Explorer — see every direction from KLAL
            </h2>
            <p className="text-white/50 max-w-2xl">
              The 360WX Explorer shows flyable conditions in every direction from any
              airport — so you can see at a glance which approach corridor is cleanest
              and which directions to avoid. Currently in development.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <Image
              src="/screenshots/360wx-klal-preview.png"
              alt="360WX Explorer centered on KLAL showing directional flyability — green sectors indicate favorable conditions, red indicates convection or IMC"
              width={1024}
              height={768}
              className="w-full"
            />
            <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <p className="text-sm text-white/40">
                360WX Explorer · KLAL · Apr 7, 2026 — color-coded directional flyability
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                In development
              </span>
            </div>
          </div>
        </section>

        {/* ── Social proof ──────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center space-y-4">
          <p className="text-white/40 text-sm uppercase tracking-wider font-medium">Already planning</p>
          <p className="text-xl md:text-2xl font-semibold text-white">
            Pilots are already briefing their Sun &apos;n Fun trips in PlaneWX —<br className="hidden md:block" />
            from Mississippi, North Carolina, and beyond.
          </p>
          <p className="text-white/50 max-w-xl mx-auto">
            Full Pro access is free for 14 days. Plan your route, check your minimums,
            and get the same NWP intelligence used by the pros — before you ever enter
            Florida airspace.
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold rounded-xl text-lg shadow-xl shadow-sky-500/20 transition-all mt-4"
          >
            Plan My KLAL Trip Free
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-white/30 text-sm">No credit card · Cancel anytime · Full Pro features</p>
        </section>

        {/* ── Footer CTA strip ──────────────────────────────────────────────── */}
        <section className="border-t border-white/10 pt-12 pb-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-bold text-white text-lg">PlaneWX</p>
            <p className="text-white/40 text-sm">
              AI-powered flight weather briefings for general aviation pilots.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={APP_URL}
              className="px-5 py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium transition-colors text-center"
            >
              Sign in
            </a>
            <a
              href={SIGNUP_URL}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors text-center"
            >
              Start Free Trial →
            </a>
          </div>
        </section>

        <p className="text-xs text-white/20 text-center pb-8">
          Weather data sourced from Open-Meteo (ECMWF, GFS, HRRR). This page is an informational planning tool only —
          it is not a certified aeronautical weather briefing. Always obtain an official weather briefing before flight.
          PlaneWX is not responsible for decisions made based on this information.
        </p>
      </div>
    </div>
  )
}
