"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  Check,
  Shield,
  AlertTriangle,
  Gauge,
  Users,
  Clock,
  CalendarClock,
  Eye,
  Plane,
  X,
  Quote,
} from "lucide-react"
import {
  YouTubeSection,
  PricingSection,
  FaqSection,
  FooterCTA,
  SiteFooter,
  VariantTracker,
  STATS,
  TESTIMONIALS,
} from "./shared"

const VARIANT = "b"

export function LandingVariantB() {
  const searchParams = useSearchParams()
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam) {
      localStorage.setItem("planewx_referral", refParam.toUpperCase())
    }
  }, [searchParams])

  const appUrl = `https://app.planewx.ai?lp=${VARIANT}`

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* NAV */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane className="h-7 w-7 text-sky-400" />
            <span className="text-2xl font-bold tracking-tight">PlaneWX</span>
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <a href={appUrl} className="text-sm text-white/60 hover:text-white transition-colors">
              Log In
            </a>
            <a
              href={appUrl}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>72% of GA weather accidents involve VFR into IMC</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            The go/no-go decision{" "}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              shouldn&apos;t happen
            </span>
            <br />
            at the airport.
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Plans made weeks in advance. Hotels booked. Family waiting. And then, the morning of
            departure — conditions are marginal.{" "}
            <strong className="text-rose-300">This is when accidents happen.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={appUrl}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Get Early Warning — Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-10 py-4 text-lg transition-all"
            >
              See How It Works
            </button>
          </div>

          <p className="text-sm text-white/30">
            No credit card required · Full safety analysis on every plan
          </p>
        </div>
      </section>

      {/* THE PATTERN THAT KILLS */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-5">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Pattern That Kills
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              You&apos;ve been in this{" "}
              <span className="text-rose-400">situation before.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              It&apos;s not a lack of skill. It&apos;s the pressure of the moment — and every pilot
              has felt it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT PlaneWX */}
            <div className="rounded-2xl overflow-hidden border border-rose-500/20 bg-rose-950/20">
              <div className="px-6 py-4 bg-rose-950/40 border-b border-rose-500/20">
                <p className="text-sm font-semibold text-rose-300 uppercase tracking-wider text-center">
                  Without PlaneWX
                </p>
              </div>
              <div className="p-6 space-y-5">
                {[
                  {
                    time: "Two weeks out",
                    text: "Trip planned. Hotels booked. Everyone excited.",
                  },
                  {
                    time: "One week out",
                    text: "Weather looks okay... but TAFs only go 24 hours.",
                  },
                  {
                    time: "Night before",
                    text: "TAF finally drops. Marginal ceilings. Crosswind at limits.",
                  },
                  {
                    time: "Morning of",
                    text: "Bags packed. Family in the car. You're staring at aviationweather.gov trying to decide.",
                  },
                  {
                    time: "The decision",
                    text: "You go. Because the pressure is immense and turning around feels impossible.",
                  },
                ].map(({ time, text }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-rose-300">{time}</p>
                      <p className="text-sm text-white/60 mt-0.5">{text}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-rose-300/50 italic pt-2 border-t border-rose-500/10">
                  Not because you lack skill — because you were forced into a decision when the
                  stakes were highest.
                </p>
              </div>
            </div>

            {/* WITH PlaneWX */}
            <div className="rounded-2xl overflow-hidden border border-emerald-500/20 bg-emerald-950/20">
              <div className="px-6 py-4 bg-emerald-950/40 border-b border-emerald-500/20">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider text-center">
                  With PlaneWX
                </p>
              </div>
              <div className="p-6 space-y-5">
                {[
                  {
                    time: "Two weeks out",
                    text: "WX Score shows 45%. You know early this might be tight.",
                  },
                  {
                    time: "One week out",
                    text: "Score trending down. You text your wife: 'Let's look at Thursday instead.'",
                  },
                  {
                    time: "Thursday",
                    text: "Score shows 88%. You fly with confidence, not anxiety.",
                  },
                  {
                    time: "The result",
                    text: "You never faced the morning-of pressure. The decision was made days ago, calmly.",
                  },
                ].map(({ time, text }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">{time}</p>
                      <p className="text-sm text-white/60 mt-0.5">{text}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-emerald-500/10">
                  <p className="text-sm text-emerald-300/80 italic">
                    &ldquo;The confidence to go, or the courage to stay&trade;&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/20 text-center">
            <p className="text-lg font-semibold text-white">
              The safest pilots aren&apos;t the ones who can fly in anything — they&apos;re the ones
              who{" "}
              <span className="text-sky-400">never put themselves in that position.</span>
            </p>
          </div>
        </div>
      </section>

      <YouTubeSection variant={VARIANT} />

      {/* HOW PLANEWX PREVENTS THIS */}
      <section id="how-it-works" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-5">
              How PlaneWX Prevents This
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Move the decision{" "}
              <span className="text-sky-400">away from the airport</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Three capabilities that eliminate the morning-of pressure entirely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-950/60 to-blue-950/20 border border-blue-500/20">
              <div className="text-6xl font-bold text-blue-500/20 absolute top-4 right-6 select-none">1</div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">
                <CalendarClock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">14-Day Early Warning</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                See WX Score trends before you commit to anything. Cancel hotels, not your safety
                margins. You&apos;ll know days in advance whether conditions are trending toward a go or
                a no-go — while you still have options.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 to-violet-950/20 border border-violet-500/20">
              <div className="text-6xl font-bold text-violet-500/20 absolute top-4 right-6 select-none">2</div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-5">
                <Eye className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Alternative Departure Windows</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                &ldquo;Friday looks bad. Thursday afternoon shows 85%.&rdquo; PlaneWX finds better
                options automatically. Flexibility is safety — and PlaneWX gives you the data to flex
                with confidence.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
              <div className="text-6xl font-bold text-emerald-500/20 absolute top-4 right-6 select-none">3</div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trip Watchers</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Your spouse, passengers, and boss see the same data. &ldquo;We should
                reschedule&rdquo; comes from the weather, not from you. The pressure to go evaporates
                when everyone sees the same numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WX SCORE */}
      <section id="features" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                Core Feature
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                The WX Score: weather risk,{" "}
                <span className="text-emerald-400">finally quantified</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Right now, your go/no-go judgment lives entirely in your head. You mentally juggle
                ceilings, winds, icing, turbulence, currency, and fatigue — under pressure, often at
                the last minute.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                The WX Score externalizes that work. For the first time, the cognitive burden of
                weather risk assessment lives in software — not your memory, not your gut.
              </p>
              <ul className="space-y-3">
                {[
                  "0–100% metric calculated against YOUR minimums — not generic VFR/IFR",
                  "Ceiling, visibility, crosswind, turbulence, icing — all weighted",
                  "Different scores for each aircraft you fly",
                  "Every deduction is transparent and explained",
                  "Updates automatically as weather evolves — 40+ times over 14 days",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/60">WX Score</span>
                  <span className="text-xs text-emerald-400">SR22T · KPAO → KSBA</span>
                </div>
                <div className="text-center py-4">
                  <div className="text-7xl font-bold text-emerald-400">86</div>
                  <div className="text-sm text-emerald-400/60 mt-1">Good conditions for your minimums</div>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" style={{ width: "86%" }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Ceilings", score: "94", color: "text-emerald-400" },
                  { label: "Visibility", score: "92", color: "text-emerald-400" },
                  { label: "Crosswind", score: "88", color: "text-emerald-400" },
                  { label: "Turbulence", score: "71", color: "text-amber-400" },
                  { label: "Icing", score: "95", color: "text-emerald-400" },
                  { label: "Convective", score: "100", color: "text-emerald-400" },
                ].map(({ label, score, color }) => (
                  <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className={`text-2xl font-bold ${color}`}>{score}</div>
                    <div className="text-xs text-white/40 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/25 text-center">
                Illustrative example. Your score reflects your aircraft and minimums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What experienced pilots say.
            </h2>
            <p className="text-white/50">From student pilots to 30,000-hour ATP captains.</p>
          </div>

          <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border border-sky-500/30">
            <Quote className="h-8 w-8 text-sky-400/40 mb-4" />
            <p className="text-lg text-white/80 leading-relaxed mb-6 italic">
              &ldquo;{TESTIMONIALS.find(t => t.featured)?.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
                {TESTIMONIALS.find(t => t.featured)?.name[0]}
              </div>
              <div>
                <p className="font-semibold">{TESTIMONIALS.find(t => t.featured)?.name}</p>
                <p className="text-xs text-white/40">{TESTIMONIALS.find(t => t.featured)?.cert}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.filter(t => !t.featured).map((t, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <Quote className="h-5 w-5 text-white/20 mb-3" />
                <p className="text-sm text-white/70 leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-xs text-white/30">{t.cert}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-12 px-4 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8 font-medium">
            Trusted by serious GA pilots
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-1">{STATS.cumulativeHours}</div>
              <div className="text-sm text-white/50">cumulative flight hours<br />in our pilot community</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-1">{STATS.instrumentRated}</div>
              <div className="text-sm text-white/50">of our pilots are<br />instrument rated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-violet-400 mb-1">{STATS.jetAircraft}</div>
              <div className="text-sm text-white/50">jet aircraft<br />in our fleet</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-1">2,000+</div>
              <div className="text-sm text-white/50">average flight hours<br />per pilot</div>
            </div>
          </div>
          <p className="text-center text-xs text-white/25 mt-8">
            From student pilots building hours to ATP captains flying Citations and Gulfstreams.
          </p>
        </div>
      </section>

      <PricingSection variant={VARIANT} />
      <FaqSection variant={VARIANT} />

      {/* FOUNDER */}
      <section id="founder" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-5">
              <Plane className="h-3.5 w-3.5" />
              Built by a pilot
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Founder&apos;s <span className="text-sky-400">Story</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2 space-y-3">
              <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl cursor-pointer hover:border-sky-500/50 transition-colors"
                onClick={() => setZoomedImage("/screenshots/foreflight.png")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screenshots/foreflight.png"
                  alt="Mark's flight log showing extensive cross-country flying"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-white/30 text-center italic">&ldquo;I built PlaneWX because I needed it.&rdquo;</p>
            </div>

            <div className="md:col-span-3 space-y-5 text-white/60 leading-relaxed">
              <p>
                PlaneWX was founded in 2025 by <strong className="text-white">Mark Wolfgang</strong>, an
                experienced technology entrepreneur and General Aviation pilot.
              </p>
              <p>
                After selling his Information Security consulting company in December 2022, Mark retired
                and bought his first airplane — a Diamond DA40 NG. He earned his Private Pilot&apos;s license
                in just six weeks and started flying his wife and dog around the country.
              </p>
              <p>
                After completing an accelerated IFR program in five days, Mark discovered the complexities
                of weather planning for instrument flying. He grew frustrated having to tell his wife,{" "}
                <em className="text-white/80">
                  &ldquo;Yeah, we should be good. I&apos;ll let you know after the TAF comes out tonight.&rdquo;
                </em>
              </p>
              <p>
                Now flying a Cirrus SR22T with over 800 hours total time — including 620 hours of
                cross-country PIC in 18 months — Mark built PlaneWX to solve his own problem. What
                started as personal frustration became a mission to help every pilot answer the question:{" "}
                <em className="text-sky-400">&ldquo;Is this flight going to happen?&rdquo;</em>
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/50">
                  <strong className="text-white">Mark Wolfgang</strong> is a Commercial Instrument pilot
                  with single and multiengine ratings, and a veteran of the U.S. Navy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA variant={VARIANT} />
      <SiteFooter variant={VARIANT} />

      {/* ZOOM OVERLAY */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white/60 hover:text-white">
            <X className="h-8 w-8" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomedImage} alt="Screenshot" className="max-w-full max-h-full rounded-xl" />
        </div>
      )}
    </div>
  )
}
