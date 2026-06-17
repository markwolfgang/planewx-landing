"use client"

import { Gauge, CalendarDays, Shield, ArrowRight, CloudLightning, CheckCircle } from "lucide-react"
import {
  PricingSection,
  FaqSection,
  SiteFooter,
  VariantTracker,
  FlightChopsEndorsement,
  PartnerBadges,
  SignUpButton,
  STATS,
  TESTIMONIALS,
} from "./shared"

const VARIANT = "f"

// ─────────────────────────────────────────────────────────────────────────────
// Variant F — "From Chaos to Clarity"
// Leads with information overload, resolves into the WX Score.
// Primary accent: sky-500 (#0ea5e9) on Linear near-black canvas (#08090a)
// ─────────────────────────────────────────────────────────────────────────────

export function LandingVariantF() {
  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* ── Background radial gradients ──────────────────────────────────── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 700px 500px at 15% 5%, rgba(14,165,233,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 85% 90%, rgba(14,165,233,0.05) 0%, transparent 70%)",
            "radial-gradient(ellipse 300px 300px at 50% 40%, rgba(14,165,233,0.03) 0%, transparent 70%)",
            "linear-gradient(180deg, #08090a 0%, #0a0e13 100%)",
          ].join(", "),
        }}
      />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#08090a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <CloudLightning className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-[#f7f8f8] tracking-tight">PlaneWX</span>
          <span className="hidden sm:block text-[#8a8f98] text-sm ml-1">
            — The Pilot's Decision Support System
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-[#8a8f98]">
            <a href="#how-it-works" className="hover:text-[#f7f8f8] transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-[#f7f8f8] transition-colors">Pricing</a>
          </div>
          <a
            href="https://app.planewx.ai/auth/login"
            className="hidden md:block text-sm text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
          >
            Log In
          </a>
          <SignUpButton
            variant={VARIANT}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20"
          >
            Start free <ArrowRight className="h-3.5 w-3.5" />
          </SignUpButton>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/[0.08] border border-sky-500/[0.18] text-sky-400 text-[9px] font-semibold mb-8 tracking-[0.12em] uppercase">
            Decision Support System
          </div>

          {/* H1 */}
          <h1
            className="font-semibold text-[#f7f8f8] mb-7 leading-[1.04]"
            style={{
              fontSize: "clamp(38px, 6vw, 56px)",
              letterSpacing: "-1.4px",
            }}
          >
            Six tabs. Four apps.
            <br />
            A hundred variables.
            <br />
            <span className="text-sky-400">One number that matters.</span>
          </h1>

          {/* Subhead */}
          <p
            className="text-[#d0d6e0] font-light max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: "20px" }}
          >
            PlaneWX synthesizes your weather — against your aircraft, your minimums,
            your route — and delivers a single, honest WX Score. Days before you need
            to decide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <SignUpButton
              variant={VARIANT}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-base font-semibold transition-colors shadow-xl shadow-sky-500/20"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </SignUpButton>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#d0d6e0] hover:text-[#f7f8f8] text-base font-medium transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Social proof line */}
          <p className="text-[#8a8f98] text-sm mb-16">
            Trusted by{" "}
            <span className="text-[#d0d6e0]">{STATS.instrumentRated}</span> instrument-rated pilots
            {" "}·{" "}
            <span className="text-[#d0d6e0]">{STATS.cumulativeHours}</span> flight hours analyzed
          </p>

          {/* Hero visual — mock WX Score card */}
          <div className="mx-auto max-w-sm">
            <div
              className="rounded-xl border border-white/[0.08] p-6 text-left"
              style={{
                background: "#0f1011",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(14,165,233,0.08)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[#8a8f98] text-xs font-medium tracking-wide uppercase">WX Score</span>
                <span className="text-[9px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  14-day outlook
                </span>
              </div>

              {/* Score */}
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className="font-semibold text-sky-400 leading-none"
                  style={{ fontSize: "72px", letterSpacing: "-2px" }}
                >
                  74
                </span>
                <span className="text-[#8a8f98] text-2xl font-light">%</span>
              </div>

              {/* Sub-rows */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                {[
                  { label: "Ceiling", value: "8,200 ft" },
                  { label: "Icing", value: "Trace possible above 9,000" },
                  { label: "Winds", value: "23 kts at cruise" },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-[#8a8f98] text-sm">{row.label}</span>
                    <span className="text-[#8a8f98] text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Footer bar */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-sky-500/70" style={{ width: "74%" }} />
                </div>
                <span className="text-[#8a8f98] text-xs">KBDU → KSFO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT CHOPS ENDORSEMENT ── */}
      <FlightChopsEndorsement />
      <PartnerBadges />


      {/* ── Problem Section ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          {/* Section label */}
          <p className="text-sky-500 text-xs font-semibold tracking-[0.15em] uppercase mb-5">
            The Problem
          </p>

          <h2
            className="font-semibold text-[#f7f8f8] max-w-3xl mb-14 leading-[1.1]"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-1.056px" }}
          >
            You already know how to read weather.
            The problem is there's too much of it.
          </h2>

          {/* Chaos cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              {
                source: "aviationweather.gov",
                body: "METARs, TAFs, SIGMETs, AIRMETs, Prog Charts, Winds Aloft, PIREPs, CIP, G-AIRMETs...",
                sub: "A raw feed with no synthesis. You do the analysis.",
              },
              {
                source: "ForeFlight / Garmin Pilot",
                body: "Displays the data. Renders it beautifully. Leaves every decision — and every risk judgment — to you.",
                sub: "A data display is not a decision support system.",
              },
              {
                source: "Your gut",
                body: "The trip is planned. The passengers are ready. The hangar fee is paid. Everyone is counting on you.",
                sub: "Pressure to go is its own weather system.",
              },
            ].map(card => (
              <div
                key={card.source}
                className="rounded-lg border border-white/5 p-6"
                style={{
                  background: "#0f1011",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-[#f7f8f8] text-sm font-semibold mb-3 tracking-tight">
                  {card.source}
                </p>
                <p className="text-[#d0d6e0] text-sm leading-relaxed mb-3">{card.body}</p>
                <p className="text-[#8a8f98] text-xs leading-relaxed">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Bridge copy */}
          <p className="text-[#8a8f98] text-base text-center max-w-2xl mx-auto leading-relaxed">
            PlaneWX is not another data display.
            It's the synthesis layer that was always missing.
          </p>
        </div>
      </section>

      {/* ── Solution Section ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5 bg-[#0f1011]/40">
        <div className="max-w-5xl mx-auto">

          {/* Section label */}
          <p className="text-sky-500 text-xs font-semibold tracking-[0.15em] uppercase mb-5">
            What PlaneWX Actually Does
          </p>

          <h2
            className="font-semibold text-[#f7f8f8] max-w-2xl mb-16 leading-[1.1]"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-1.056px" }}
          >
            Three tools. One system. Zero guesswork.
          </h2>

          {/* Alternating feature rows */}
          <div className="space-y-12">
            {[
              {
                Icon: Gauge,
                title: "WX Score — One number, built around you",
                body: "We score your flight against your personal minimums and your aircraft — not generic VFR/IFR thresholds. Every deduction is transparent and explained.",
              },
              {
                Icon: CalendarDays,
                title: "14-Day Timeline — Plan when you still have options",
                body: "TAFs cover 24 hours. PlaneWX starts 14 days out and updates as confidence improves — ~55% at 14 days, ~95%+ in the final 6 hours. You'll never be surprised at the gate again.",
              },
              {
                Icon: Shield,
                title: "PAVE Risk Assessment — Structured decision-making, pre-filled",
                body: "PlaneWX pre-fills the enVironment quadrant of the FAA's PAVE framework using your WX Score, then walks you through Pilot, Aircraft, and External Pressure — so every go/no-go is documented and defensible.",
              },
            ].map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
              >
                {/* Icon block */}
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center border border-sky-500/20"
                    style={{
                      background: "rgba(14,165,233,0.06)",
                      boxShadow: "inset 0 1px 0 rgba(14,165,233,0.08)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-sky-400" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <h3
                    className="text-[#f7f8f8] font-semibold mb-3 leading-snug"
                    style={{ fontSize: "20px", letterSpacing: "-0.24px" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#d0d6e0] text-base leading-relaxed max-w-xl">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <p className="text-sky-500 text-xs font-semibold tracking-[0.15em] uppercase mb-10 text-center">
            What Pilots Are Saying
          </p>

          {/* Featured testimonial — Clark */}
          {TESTIMONIALS.filter(t => t.featured).map(t => (
            <div
              key={t.name}
              className="rounded-xl border border-sky-500/20 p-8 mb-8 relative overflow-hidden"
              style={{
                background: "rgba(14,165,233,0.04)",
                boxShadow: "inset 0 1px 0 rgba(14,165,233,0.08), 0 0 0 1px rgba(14,165,233,0.06)",
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 right-6 text-sky-500/10 font-bold leading-none select-none"
                style={{ fontSize: "80px" }}
                aria-hidden
              >
                "
              </span>

              <blockquote className="text-[#d0d6e0] text-lg leading-relaxed mb-5 max-w-3xl font-light relative">
                "{t.quote}"
              </blockquote>
              <div className="text-[#8a8f98] text-sm">
                {t.name} · <span className="text-[#62666d]">{t.cert}</span>
              </div>
            </div>
          ))}

          {/* Grid of remaining testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTIMONIALS.filter(t => !t.featured).map(t => (
              <div
                key={t.name}
                className="rounded-xl border border-white/5 p-6"
                style={{
                  background: "#0f1011",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <blockquote className="text-[#d0d6e0] text-sm leading-relaxed mb-4 font-light">
                  "{t.quote}"
                </blockquote>
                <div className="text-[#8a8f98] text-xs">
                  {t.name} · <span className="text-[#62666d]">{t.cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <div id="pricing">
        <PricingSection variant={VARIANT} />
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FaqSection variant={VARIANT} />

      {/* ── Footer CTA — custom headline override ────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-semibold text-[#f7f8f8] mb-5 leading-[1.1]"
            style={{ fontSize: "clamp(30px, 5vw, 44px)", letterSpacing: "-1.056px" }}
          >
            The decision doesn't wait.
            <br />
            <span className="text-sky-400">Neither should your briefing.</span>
          </h2>

          <p className="text-[#8a8f98] text-base mb-10">
            Start free. No credit card. Cancel anytime.
          </p>

          <SignUpButton
            variant={VARIANT}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-lg font-semibold transition-colors shadow-2xl shadow-sky-500/20"
          >
            Start free <ArrowRight className="h-5 w-5" />
          </SignUpButton>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-[#8a8f98]">
            {[
              "No credit card required",
              "Full access. Free plan forever.",
              "Cancel anytime",
            ].map(line => (
              <div key={line} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-sky-500/60 flex-shrink-0" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Site Footer ───────────────────────────────────────────────────── */}
      <SiteFooter variant={VARIANT} />
    </div>
  )
}
