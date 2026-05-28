"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BrandLogo } from "@/components/shared/brand-logo"
import { YouTubeFacade } from "@/components/shared/youtube-facade"
import { STATS, TESTIMONIALS, FAQS } from "@/components/shared/landing-data"
import {
  ArrowRight,
  Check,
  Shield,
  Brain,
  Gauge,
  Users,
  Clock,
  HeartHandshake,
  Target,
  ChevronDown,
  Plane,
  Crown,
  Minus,
  X,
  Snowflake,
  Wind,
  Route,
  Quote,
} from "lucide-react"


export function LandingPageV3() {
  const searchParams = useSearchParams()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
      try {
        localStorage.setItem("planewx_referral", code)
      } catch {}
      setReferralCode(code)

      // Fire one anonymous visit event per browser session per campaign code.
      const sessionKey = `planewx_visit_fired_${code}`
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, "1")
          fetch("/api/campaign-visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, lp: "v3" }),
          }).catch(() => {})
        }
      } catch {}
    } else {
      try {
        const storedRef = localStorage.getItem("planewx_referral")
        if (storedRef) setReferralCode(storedRef)
      } catch {}
    }
  }, [searchParams])

  const signUpUrl = `https://app.planewx.ai/auth/sign-up${referralCode ? `?ref=${referralCode}` : ""}`

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px]" />
      </div>

      {/* ── NAV ────────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-10 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-9 w-auto" priority />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot's Decision Support System
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
            <a href="/research/turbulence-safety" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              Research
            </a>
            <a href="https://app.planewx.ai" className="text-sm text-white/60 hover:text-white transition-colors">
              Log In
            </a>
            <a
              href={signUpUrl}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 sm:pt-24 pb-14 sm:pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-6 sm:space-y-8">
          {/* Category claim */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium">
            <Brain className="h-4 w-4" />
            <span>A new category in aviation technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Every weather tool{" "}
            <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              shows you data.
            </span>
            <br />
            PlaneWX{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              helps you decide.
            </span>
          </h1>

          {/* Brand tagline */}
          <p className="text-lg md:text-xl text-white/50 italic font-light tracking-wide">
            "The confidence to go, or the courage to stay™"
          </p>

          <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We synthesize the same authoritative weather data every EFB uses — against{" "}
            <strong className="text-white">your aircraft</strong> and{" "}
            <strong className="text-white">your personal minimums</strong> — into a{" "}
            <strong className="text-sky-400">WX Score</strong>: a quantified risk assessment
            integrated into the{" "}
            <strong className="text-white">PAVE decision framework.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={signUpUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-10 py-4 text-lg transition-all"
            >
              See How It Works
            </button>
          </div>

          <p className="text-sm text-white/30">No credit card required · Cancel anytime</p>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-emerald-400/80">
            <Shield className="h-4 w-4" />
            <span>Full safety analysis on every plan — <strong className="text-emerald-300">free forever</strong></span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────────── */}
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

      {/* ── THE PROBLEM WITH EVERY OTHER TOOL ─────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-5">
              The Problem
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Every other tool makes{" "}
              <span className="text-rose-400">you the analyst.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              EFBs and weather portals display raw data. The cognitive work — synthesizing it,
              assessing risk, forming a go/no-go judgment — lands entirely on you. Alone. Often
              under pressure.
            </p>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-2">
              {/* Headers */}
              <div className="bg-rose-950/40 border-b border-r border-white/10 px-3 sm:px-6 py-3 sm:py-4 text-center">
                <p className="text-xs sm:text-sm font-semibold text-rose-300 uppercase tracking-wider">Every EFB & Weather Tool</p>
              </div>
              <div className="bg-sky-950/40 border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4 text-center">
                <p className="text-xs sm:text-sm font-semibold text-sky-300 uppercase tracking-wider">PlaneWX</p>
              </div>

              {[
                ["Raw METARs, TAFs, PIREPs", "Synthesizes all of it using AI"],
                ["Generic VFR / IFR categories", "Your minimums + your aircraft"],
                ["You formulate the risk yourself", "WX Score — quantified, done for you"],
                ["Data only", "WX Score feeds into PAVE framework"],
                ["You decide alone", "Mentor who sees your full briefing"],
              ].map(([left, right], i) => (
                <>
                  <div
                    key={`left-${i}`}
                    className="bg-rose-950/20 border-b border-r border-white/10 px-3 sm:px-6 py-3 sm:py-4 flex items-start gap-2 sm:gap-3"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/60">{left}</span>
                  </div>
                  <div
                    key={`right-${i}`}
                    className="bg-sky-950/20 border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4 flex items-start gap-2 sm:gap-3"
                  >
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/80">{right}</span>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/20 text-center">
            <p className="text-lg font-semibold text-white">
              This is the difference between a data display and a{" "}
              <span className="text-sky-400">decision support system.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-5">
              How It Works
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              From raw data to{" "}
              <span className="text-sky-400">confident decision</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Three steps that happen automatically, before you even open a briefing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/60 to-blue-950/20 border border-blue-500/20">
              <div className="text-6xl font-bold text-blue-500/20 absolute top-4 right-6 select-none">1</div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Synthesize</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Our AI reads METARs, TAFs, PIREPs, SIGMETs, winds aloft, HRRR/GFS/ECMWF model
                data, and NWS forecaster narratives — then synthesizes them into a coherent picture
                along your entire route.
              </p>
              <ul className="space-y-1.5 text-xs text-white/40">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-blue-400" />METARs · TAFs · PIREPs</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-blue-400" />SIGMETs · AIRMETs · G-AIRMETs</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-blue-400" />HRRR · GFS · ECMWF model consensus</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-blue-400" />NWS forecaster narratives</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 to-violet-950/20 border border-violet-500/20">
              <div className="text-6xl font-bold text-violet-500/20 absolute top-4 right-6 select-none">2</div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalize</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                The synthesis is matched against your aircraft's actual capabilities — FIKI, TAS,
                service ceiling, autopilot — and your personal minimums. Your SR22T has different
                limits than a rental 172.
              </p>
              <ul className="space-y-1.5 text-xs text-white/40">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-violet-400" />Per-aircraft minimums (ceiling, vis, crosswind)</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-violet-400" />Icing & turbulence tolerance per aircraft</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-violet-400" />FIKI, TAS, autopilot, weather radar aware</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-violet-400" />Multiple aircraft profiles supported</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
              <div className="text-6xl font-bold text-emerald-500/20 absolute top-4 right-6 select-none">3</div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5">
                <Gauge className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Decide</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                The WX Score feeds into a structured PAVE risk assessment — Pilot, Aircraft,
                enVironment, External pressures. You get a complete decision picture, not just a
                weather snapshot.
              </p>
              <ul className="space-y-1.5 text-xs text-white/40">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" />WX Score: 0–100% quantified risk</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" />Full PAVE framework, pre-filled from context</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" />14-day trend to avoid last-minute pressure</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-400" />Mentor connection for human perspective</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUTUBE VIDEO ──────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-3">Don't take our word for it</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Hear what pilots are saying
            </h2>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10" style={{ paddingBottom: "56.25%" }}>
            <YouTubeFacade
              videoId="qu7ppznhcGM"
              title="Pilots: Meet PlaneWX — The AI Tool That Scores Your Flight Risk"
            />
          </div>
        </div>
      </section>

      {/* ── WX SCORE ───────────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
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

            {/* WX Score Visual */}
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

      {/* ── PAVE FRAMEWORK ─────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-5">
              Beyond Weather
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Weather is only one part{" "}
              <span className="text-indigo-400">of the decision</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The FAA's PAVE framework is the gold standard for aeronautical decision-making.
              PlaneWX pre-fills the environment quadrant and guides you through the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                letter: "P",
                label: "Pilot",
                color: "from-blue-950/60 to-blue-950/20 border-blue-500/20",
                accent: "text-blue-400",
                bg: "bg-blue-500/20",
                items: ["Currency & recency", "Fatigue & physical condition", "Experience with route / conditions", "Mindset — are you flying pressured?"],
                filled: false,
                note: "You complete this — PlaneWX prompts the right questions.",
              },
              {
                letter: "A",
                label: "Aircraft",
                color: "from-violet-950/60 to-violet-950/20 border-violet-500/20",
                accent: "text-violet-400",
                bg: "bg-violet-500/20",
                items: ["FIKI / de-ice capability", "TAS and service ceiling", "Autopilot & weather radar", "Aircraft-specific minimums"],
                filled: true,
                note: "Pre-filled from your aircraft profile.",
              },
              {
                letter: "V",
                label: "enVironment",
                color: "from-emerald-950/60 to-emerald-950/20 border-emerald-500/30",
                accent: "text-emerald-400",
                bg: "bg-emerald-500/20",
                items: ["WX Score (synthesized risk)", "Icing & turbulence consensus", "Convective activity", "14-day trend visibility"],
                filled: true,
                note: "Fully pre-filled — this is what PlaneWX does.",
              },
              {
                letter: "E",
                label: "External Pressures",
                color: "from-amber-950/60 to-amber-950/20 border-amber-500/20",
                accent: "text-amber-400",
                bg: "bg-amber-500/20",
                items: ["Time pressure", "Passenger / family expectations", "Business commitments", "Trip Watchers — share data, reduce pressure"],
                filled: false,
                note: "Trip Watchers helps — stakeholders see the same data.",
              },
            ].map(({ letter, label, color, accent, bg, items, filled, note }) => (
              <div key={letter} className={`p-5 sm:p-7 rounded-2xl bg-gradient-to-br ${color} border relative overflow-hidden`}>
                {filled && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-400 font-medium">
                    Auto-filled
                  </div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${accent}`}>{letter}</span>
                  </div>
                  <h3 className="text-xl font-bold">{label}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className={`h-3.5 w-3.5 ${accent} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`text-xs ${accent} opacity-70 italic`}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY STORY ───────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-5 sm:p-8 rounded-2xl bg-rose-950/30 border border-rose-500/20">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-rose-300">
                <span className="text-2xl">⚠️</span>
                The Pattern That Kills
              </h3>
              <ol className="space-y-4">
                {[
                  "Plans made weeks in advance — hotels booked, family waiting",
                  "Weather monitored, but TAFs only go 24 hours. \"We'll know the night before.\"",
                  "Morning of departure: conditions marginal. Bags are packed. Commitments made.",
                  "The pressure to go is immense. The decision feels impossible.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-rose-400 font-bold mt-0.5 shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-rose-300/60 italic">
                This is when accidents happen. Not because pilots lack skill — because they're forced
                into decisions when the stakes are highest.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-emerald-300">
                <span className="text-2xl">✅</span>
                How PlaneWX Changes This
              </h3>
              <ul className="space-y-4">
                {[
                  ["Know 7+ days out", "WX Score trends visible before you commit to anything"],
                  ["40+ automatic updates", "Watch conditions evolve — no scramble the night before"],
                  ["Alternative windows", "'Friday looks bad. Thursday afternoon shows 85%.'"],
                  ["Trip Watchers", "Stakeholders see the same data — rescheduling is shared"],
                ].map(([title, detail], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70">
                      <strong className="text-white">{title}</strong> — {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-emerald-300/60 italic">
                The safest pilots aren't the ones who can fly in anything — they're the ones who
                never put themselves in that position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────────── */}
      <section id="features" className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Everything the decision{" "}
              <span className="text-sky-400">requires</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every layer of the decision support system — from raw data to community connection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Gauge className="h-6 w-6" />,
                color: "text-emerald-400 bg-emerald-500/20",
                title: "Personalized WX Score",
                desc: "A 0–100% risk metric calculated against your minimums and your aircraft — not generic VFR/IFR thresholds. The cognitive work, done for you.",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                color: "text-sky-400 bg-sky-500/20",
                title: "14-Day Planning Horizon",
                desc: "Monitor WX trends from 2 weeks out. Never face a last-minute go/no-go with bags packed and commitments made.",
              },
              {
                icon: <Snowflake className="h-6 w-6" />,
                color: "text-blue-400 bg-blue-500/20",
                title: "Multi-Model Analysis",
                desc: "HRRR, GFS, and ECMWF consensus across 3–7 sample points along your route with confidence scoring. Nobody else does this.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                color: "text-indigo-400 bg-indigo-500/20",
                title: "PAVE Risk Assessment",
                desc: "The FAA's decision-making framework, pre-filled from your trip context. Pilot, Aircraft, enVironment, External pressures — all in one view.",
              },
              {
                icon: <HeartHandshake className="h-6 w-6" />,
                color: "text-teal-400 bg-teal-500/20",
                title: "Ask a Mentor",
                desc: "Connect with experienced pilots who see your full briefing — WX Score, aircraft profile, minimums. Shared context, not verbal descriptions.",
              },
              {
                icon: <Users className="h-6 w-6" />,
                color: "text-amber-400 bg-amber-500/20",
                title: "Trip Watchers",
                desc: "Family, passengers, schedulers see the same live data. Rescheduling becomes a shared decision — not a confrontation at 6 AM.",
              },
              {
                icon: <Route className="h-6 w-6" />,
                color: "text-rose-400 bg-rose-500/20",
                title: "Corridor Watch",
                desc: "Route-specific intelligence at departure, waypoints, and arrival. TFRs, NOTAMs, and icing overlays along your exact path.",
              },
              {
                icon: <Wind className="h-6 w-6" />,
                color: "text-cyan-400 bg-cyan-500/20",
                title: "Synoptic Intelligence™",
                desc: "NWS forecaster narratives synthesized into regional summaries that explain the big picture — not just the numbers.",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                color: "text-violet-400 bg-violet-500/20",
                title: "Multi-City Optimizer",
                desc: "Planning a multi-leg trip? Enter all your stops and PlaneWX finds the optimal departure sequence based on weather windows.",
              },
            ].map(({ icon, color, title, desc }, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                <div className={`w-10 h-10 rounded-lg ${color.split(" ")[1]} ${color.split(" ")[0]} flex items-center justify-center mb-4`}>
                  {icon}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real pilots. Real decisions.
            </h2>
            <p className="text-white/50">From student pilots to 30,000-hour ATP captains.</p>
          </div>

          {/* Featured testimonial */}
          <div className="mb-8 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border border-sky-500/30">
            <Quote className="h-8 w-8 text-sky-400/40 mb-4" />
            <p className="text-lg text-white/80 leading-relaxed mb-6 italic">
              "{TESTIMONIALS.find(t => t.featured)?.quote}"
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

          {/* Grid testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.filter(t => !t.featured).map((t, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <Quote className="h-5 w-5 text-white/20 mb-3" />
                <p className="text-sm text-white/70 leading-relaxed italic mb-4">"{t.quote}"</p>
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

      {/* ── PRICING ────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative py-16 sm:py-24 px-4">
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
            <div className="p-5 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
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
                href={signUpUrl}
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
            <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border-2 border-sky-500/40 shadow-xl shadow-sky-500/10">
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
                href={signUpUrl}
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

      {/* ── FAQ ────────────────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-white/90 text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-white/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ────────────────────────────────────────────────────────────── */}
      <section id="founder" className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-5">
              <Plane className="h-3.5 w-3.5" />
              Built by a pilot
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Founder's <span className="text-sky-400">Story</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Flight log photo */}
            <div className="md:col-span-2 space-y-3">
              <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl cursor-pointer hover:border-sky-500/50 transition-colors"
                onClick={() => setZoomedImage("/screenshots/foreflight.png")}
              >
                <Image
                  src="/screenshots/foreflight.png"
                  alt="Mark's flight log showing extensive cross-country flying"
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-white/30 text-center italic">"I built PlaneWX because I needed it."</p>
            </div>

            {/* Story */}
            <div className="md:col-span-3 space-y-5 text-white/60 leading-relaxed">
              <p>
                PlaneWX was founded in 2025 by <strong className="text-white">Mark Wolfgang</strong>, an
                experienced technology entrepreneur and General Aviation pilot.
              </p>
              <p>
                After selling his Information Security consulting company in December 2022, Mark retired
                and bought his first airplane — a Diamond DA40 NG. He earned his Private Pilot's license
                in just six weeks and started flying his wife and dog around the country.
              </p>
              <p>
                After completing an accelerated IFR program in five days, Mark discovered the complexities
                of weather planning for instrument flying. He grew frustrated having to tell his wife,{" "}
                <em className="text-white/80">
                  "Yeah, we should be good. I'll let you know after the TAF comes out tonight."
                </em>
              </p>
              <p>
                Now flying a Cirrus SR22T with over 800 hours total time — including 620 hours of
                cross-country PIC in 18 months — Mark built PlaneWX to solve his own problem. What
                started as personal frustration became a mission to help every pilot answer the question:{" "}
                <em className="text-sky-400">"Is this flight going to happen?"</em>
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

      {/* ── FINAL CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Stop being your own{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              meteorologist.
            </span>
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
            Join {STATS.totalPilots} pilots — from students to 30,000-hour ATP captains — who use PlaneWX
            to make better decisions.
          </p>
          <a
            href={signUpUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-2xl shadow-sky-500/30 transition-all"
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
              Full Pro access for 14 days
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="relative py-10 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-5 text-sm text-white/30 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-5 w-auto" />
            <span>· The Pilot's Decision Support System</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/blog" className="hover:text-white/60 transition-colors">Blog</a>
            <a href="https://app.planewx.ai/help/faqs" className="hover:text-white/60 transition-colors">FAQ</a>
            <a href="/research/turbulence-safety" className="hover:text-white/60 transition-colors">Research</a>
            <a href="mailto:hello@planewx.ai" className="hover:text-white/60 transition-colors">Contact</a>
            <span>© 2026 PlaneWX, LLC</span>
          </div>
        </div>
      </footer>

      {/* ── ZOOM OVERLAY ───────────────────────────────────────────────────────── */}
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
