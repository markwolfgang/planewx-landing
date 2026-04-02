"use client"

import { Shield, ArrowRight, BookOpen, Users, CheckCircle, Star, CloudLightning, AlertTriangle } from "lucide-react"
import {
  YouTubeSection,
  PricingSection,
  FaqSection,
  FooterCTA,
  SiteFooter,
  VariantTracker,
  SignUpButton,
  STATS,
  TESTIMONIALS,
} from "./shared"

const VARIANT = "e"

// ─────────────────────────────────────────────────────────────────────────────
// Variant E — Founder Story / Accountability / "I wanted to live"
// Primary accent: amber/orange (human, warm, serious)
// Secondary: sky blue (brand)
// ─────────────────────────────────────────────────────────────────────────────

export function LandingVariantE() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* ── Background gradients ──────────────────────────────────────────── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 25% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 75% 100%, rgba(14,165,233,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 400px 400px at 50% 50%, rgba(234,88,12,0.04) 0%, transparent 70%)",
            "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
            <CloudLightning className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">PlaneWX</span>
          <span className="hidden sm:block text-white/30 text-sm ml-1">
            — The Pilot's Decision Support System
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#story" className="hover:text-white transition-colors">The Story</a>
            <a href="#system" className="hover:text-white transition-colors">The System</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a
            href="https://app.planewx.ai/auth/login"
            className="hidden md:block text-sm text-white/50 hover:text-white transition-colors"
          >
            Log in
          </a>
          <SignUpButton
            variant={VARIANT}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-amber-500/20"
          >
            Start free <ArrowRight className="h-3.5 w-3.5" />
          </SignUpButton>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-8 tracking-wider uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            A message from the founder
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            I wanted to live.{" "}
            <br className="hidden sm:block" />
            <span
              className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
            >
              I didn't want to kill my wife.
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl text-white/70 mb-4 font-light">
            That's why I built PlaneWX.
          </p>

          <p className="text-white/40 text-sm mb-12 tracking-wide">
            — Mark Wolfgang, Founder · SR22T Pilot · ~900 hours
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <SignUpButton
              variant={VARIANT}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-lg font-bold transition-all shadow-xl shadow-amber-500/20"
            >
              Start flying with a system
              <ArrowRight className="h-5 w-5" />
            </SignUpButton>
            <a
              href="#story"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-lg font-medium transition-all"
            >
              Read the story
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span>8.2 / 10 recommendation score</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <span>800+ active pilots</span>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <span>64% of weather cancellations — pilots found the courage to stay</span>
          </div>
        </div>
      </section>

      {/* ── The Story ────────────────────────────────────────────────────── */}
      <section id="story" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-4">
              The origin
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Why this product exists</h2>
          </div>

          {/* Founder quote block */}
          <div className="relative pl-6 border-l-2 border-amber-500/30 space-y-6 text-lg text-white/70 leading-relaxed">

            <p>
              Before I ever touched the controls of an airplane, I spent a year
              listening to AOPA's{" "}
              <em className="text-white not-italic font-medium">"And There I Was"</em>{" "}
              — a podcast about mishaps, near-misses, and accidents. I watched every
              aviation accident/mishap video I could find. I wanted to understand exactly
              what separated the pilots who came home from the ones who didn't.
            </p>

            <p>
              When I finally got my certificate and put my wife in the right seat
              for our first long cross-country, the weight of what I was holding
              was immense. She doesn't know what a TAF is. She doesn't think about
              METARs or personal minimums. She buckled her seatbelt and trusted me
              completely.
            </p>

            <p>
              I thought about her family. I thought about my kids. I thought about
              what it would mean to get it wrong — not abstractly, but specifically.
              If I made a bad decision and we didn't come home, the people who loved
              us would spend the rest of their lives wondering why I wasn't more careful.
            </p>

            <div className="py-4">
              <p className="text-xl sm:text-2xl text-white font-medium not-italic leading-relaxed">
                "There are the regulatory requirements the FAA imposes on pilots
                to be safe. And then there is simply the desire to live. The
                desire to not be reckless. The desire to not have your legacy
                be that you crashed and killed your family."
              </p>
            </div>

            <p>
              On one summer flight from Bentonville to Destin, there was a line
              of thunderstorms to my left — gray skies and radar I wanted no
              part of. To my right and ahead: blue sky. I had a rule before I
              ever started the engine:{" "}
              <em className="text-amber-400 not-italic">don't turn into the gray</em>.
              I had outs — airports every twenty minutes. I'd done the work to
              know the difference between a storm to route around and a storm to
              avoid entirely.
            </p>

            <p>
              We had a great vacation. But somewhere over Alabama I thought:{" "}
              <em className="text-white not-italic font-medium">
                I need a system that takes this as seriously as I do.
              </em>
            </p>

            <p>That system didn't exist. So I built it.</p>
          </div>

          <p className="mt-8 pl-6 text-white/30 text-sm">
            — Mark Wolfgang · Founder, PlaneWX
          </p>
        </div>
      </section>

      {/* ── The Truth ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              The FAA sets the floor.{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                You decide the ceiling.
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              PlaneWX is for the pilot who holds themselves to a standard above
              what's required — not because someone is watching, but because
              they've already decided what kind of pilot they're going to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                value: "95.5%",
                color: "text-sky-400",
                bg: "from-sky-950/60 to-cyan-950/20",
                border: "border-sky-500/20",
                label: "of PlaneWX pilots voluntarily require a pre-flight risk assessment",
                sub: "Nobody made them. They turned that on themselves.",
              },
              {
                value: "64%",
                color: "text-amber-400",
                bg: "from-amber-950/60 to-orange-950/20",
                border: "border-amber-500/20",
                label: "of weather cancellations — pilots found the courage to stay",
                sub: "Every cancelled flight is a story that didn't end badly.",
              },
              {
                value: "92%",
                color: "text-emerald-400",
                bg: "from-emerald-950/60 to-teal-950/20",
                border: "border-emerald-500/20",
                label: "found their WX Score accurate or conservative",
                sub: "Safety-first. Always. This is not a booking engine.",
              },
            ].map(stat => (
              <div
                key={stat.value}
                className={`rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} p-6`}
              >
                <div className={`text-5xl font-bold ${stat.color} mb-3`}>{stat.value}</div>
                <p className="text-white font-medium mb-2 leading-snug">{stat.label}</p>
                <p className="text-white/40 text-sm">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trip Watchers ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-4">
              Trip Watchers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The question that might{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                save your life.
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Share your trip with anyone. They'll follow along as conditions evolve —
              without needing to understand a TAF.
            </p>
          </div>

          {/* Email timeline */}
          <div className="space-y-3 mb-12">
            {[
              {
                day: "5 days out",
                dot: "bg-emerald-400",
                border: "border-emerald-500/20",
                bg: "from-emerald-950/30 to-teal-950/10",
                subject: "✈️ Your trip is looking great",
                body: "Conditions for Saturday's flight are shaping up well. We'll keep watching and let you know if anything changes.",
              },
              {
                day: "3 days out",
                dot: "bg-amber-400",
                border: "border-amber-500/20",
                bg: "from-amber-950/30 to-orange-950/10",
                subject: "⚠️ Heads up — conditions are shifting",
                body: "The weather picture for Saturday has changed. Your pilot is aware and monitoring closely.",
              },
              {
                day: "1 day out",
                dot: "bg-red-400",
                border: "border-red-500/20",
                bg: "from-red-950/30 to-orange-950/10",
                subject: "🔴 Saturday's trip may need reconsideration",
                body: "Conditions have deteriorated significantly. Your pilot will make the final call — but this one is worth a conversation.",
              },
            ].map((email) => (
              <div
                key={email.day}
                className={`rounded-2xl bg-gradient-to-br ${email.bg} border ${email.border} p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${email.dot}`} />
                  <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{email.day}</span>
                </div>
                <p className="text-white font-medium text-sm mb-1">{email.subject}</p>
                <p className="text-white/50 text-sm leading-relaxed">{email.body}</p>
              </div>
            ))}
          </div>

          {/* The dinner table moment */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-950/50 to-orange-950/20 border border-amber-500/30 p-8 sm:p-10">
            <p className="text-white/50 text-sm mb-6 uppercase tracking-wider font-medium">That evening</p>
            <blockquote className="text-2xl sm:text-3xl text-white font-light italic leading-relaxed mb-6">
              "So… what are you going to do?"
            </blockquote>
            <p className="text-white/60 leading-relaxed">
              She's not a pilot. She doesn't know what a TAF is. But she's been getting
              those emails — and she can feel the tone shifting. She's not asking out of
              fear. She's asking because she knows something has changed, and she loves you.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/80 font-medium">
                That question — asked by someone who loves you, with just enough information
                to ask it — is one of the most powerful safety mechanisms a pilot can have.
              </p>
            </div>
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            This is the inversion of the story PlaneWX was built on.<br />
            She used to buckle her seatbelt and trust you completely.<br />
            Now she's part of the system.
          </p>

        </div>
      </section>

      {/* ── Real feedback ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              Real user feedback — received this week
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-950/40 to-orange-950/20 border border-amber-500/20 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/40 text-sm">10 / 10 · Promoter · Helped my decision: yes</span>
            </div>

            <blockquote className="text-xl sm:text-2xl text-white leading-relaxed font-light italic mb-6">
              "You were right on. I should not have flown. I tuned around within
              30 mins and barely made it back in VMC. I should have listened to
              the 0% rating for the flight."
            </blockquote>

            <div className="text-white/40 text-sm">
              Private pilot · Instrument rating · 282 hours · C172 · Based KESN
            </div>
          </div>

          <p className="text-white/30 text-sm mt-5 text-center">
            He gave us a 10/10 after the system told him something he didn't want to hear — and was right.
            The product works because it tells the truth.
          </p>
        </div>
      </section>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <YouTubeSection variant={VARIANT} />

      {/* ── The System ───────────────────────────────────────────────────── */}
      <section id="system" className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Not a weather app.{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                A system.
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A weather app gives you data. PlaneWX builds accountability around
              every flight — before you go, in the decision moment, and across
              your entire flying career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                label: "Before the flight",
                accent: "text-sky-400",
                border: "border-sky-500/20",
                bg: "from-sky-950/40 to-cyan-950/10",
                title: "Weather intelligence that tells the truth",
                body: "Your WX Score is aircraft-specific, minimums-aware, and honest — even when the answer is one you don't want. It covers the 24-hour gap that TAFs can't, so you know days early instead of hours before.",
                features: ["WX Score (0–100%)", "Synoptic Intelligence™", "Aircraft-specific minimums", "Long-range outlook", "Trip monitoring & alerts"],
              },
              {
                label: "The decision moment",
                accent: "text-amber-400",
                border: "border-amber-500/20",
                bg: "from-amber-950/40 to-orange-950/10",
                title: "A structured framework for go / no-go",
                body: "The FAA's PAVE risk assessment, built into your pre-flight workflow. Not a checkbox — a genuine moment of honest reflection, documented and timestamped, before you ever start the engine.",
                features: ["PAVE Risk Assessment", "Pilot · Aircraft · enVironment · External", "Voluntary accountability", "Decision record", "Timestamped for your log"],
              },
              {
                label: "Across your career",
                accent: "text-emerald-400",
                border: "border-emerald-500/20",
                bg: "from-emerald-950/40 to-teal-950/10",
                title: "Accountability that grows with you",
                body: "A mentor network of experienced pilots who review your decisions and help you become the pilot you want to be. Because experience alone doesn't protect you. Accountability does.",
                features: ["Mentor matching network", "Decision quality tracking", "Post-flight debrief (coming)", "Community feed", "Individual safety record"],
              },
            ].map(col => (
              <div
                key={col.label}
                className={`rounded-2xl bg-gradient-to-br ${col.bg} border ${col.border} p-6`}
              >
                <div className={`text-xs font-semibold ${col.accent} uppercase tracking-wider mb-4`}>
                  {col.label}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{col.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{col.body}</p>
                <div className="space-y-2">
                  {col.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className={`h-4 w-4 ${col.accent} flex-shrink-0`} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center py-10 border-t border-white/5">
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
              "The confidence to go, or the courage to stay."
            </p>
            <p className="text-white/30 text-sm">— PlaneWX™</p>
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              This is not for every pilot.
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              If you want a fast weather check, there are free tools for that.
              PlaneWX is for the pilot who has thought carefully about what it
              means to get it wrong — and decided to build a system around every
              flight so that doesn't happen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: <Shield className="h-5 w-5 text-amber-400" />,
                bg: "from-amber-950/40 to-orange-950/10",
                border: "border-amber-500/15",
                title: "The self-accountable GA pilot",
                body: "You hold yourself to a standard above what's required. You want a record that proves it — to yourself, and eventually to your insurer.",
              },
              {
                icon: <Users className="h-5 w-5 text-sky-400" />,
                bg: "from-sky-950/40 to-cyan-950/10",
                border: "border-sky-500/15",
                title: "The pilot carrying people they love",
                body: "You've felt the weight of the right seat. You've thought about what getting it wrong would mean for everyone left behind.",
              },
              {
                icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
                bg: "from-emerald-950/40 to-teal-950/10",
                border: "border-emerald-500/15",
                title: "The pilot who studies accidents",
                body: "You listen to \"And There I Was.\" You read NTSB reports. You know exactly what the accident chains look like and you refuse to be one.",
              },
            ].map(item => (
              <div
                key={item.title}
                className={`rounded-2xl bg-gradient-to-br ${item.bg} border ${item.border} p-6`}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/60 text-xl mb-8">If that's you, you're in the right place.</p>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-lg font-bold transition-all shadow-xl shadow-amber-500/20"
            >
              Start flying with a system
              <ArrowRight className="h-5 w-5" />
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Pilots who take it seriously</h2>
            <p className="text-white/50">Real feedback from the PlaneWX community</p>
          </div>

          {/* Featured testimonial */}
          {TESTIMONIALS.filter(t => t.featured).map(t => (
            <div
              key={t.name}
              className="rounded-2xl bg-gradient-to-br from-amber-950/40 to-orange-950/10 border border-amber-500/20 p-8 sm:p-10 mb-8"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-xl sm:text-2xl text-white font-light italic leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="text-white/50 text-sm">{t.name} · {t.cert}</div>
            </div>
          ))}

          {/* Grid of remaining testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.filter(t => !t.featured).map(t => (
              <div
                key={t.name}
                className="rounded-xl bg-white/[0.03] border border-white/8 p-5"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-white/70 text-sm leading-relaxed italic mb-4">
                  "{t.quote}"
                </blockquote>
                <div className="text-white/40 text-xs">{t.name} · {t.cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: STATS.cumulativeHours, label: "Hours of experience in our community" },
            { value: STATS.instrumentRated, label: "Instrument rated" },
            { value: STATS.jetAircraft, label: "Aircraft in our community" },
            { value: STATS.maxPilotHours, label: "Hours, our most experienced pilot" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">{s.value}</div>
              <div className="text-white/40 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <div id="pricing">
        <PricingSection variant={VARIANT} />
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSection variant={VARIANT} />

      {/* ── Founder story ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
                Built by a pilot, for pilots
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                PlaneWX was built from the{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  left seat, not the boardroom.
                </span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Mark Wolfgang is a general aviation pilot based in Bentonville,
                  Arkansas. He built PlaneWX because he needed it — as a husband,
                  as a father, and as a pilot who understood exactly what was at
                  stake every time he flew.
                </p>
                <p>
                  PlaneWX is not a VC-backed startup optimizing for engagement
                  metrics. It's a product built by a pilot who felt the weight of
                  the left seat and decided to do something about it.
                </p>
                <p className="text-white/80 font-medium">
                  Every feature exists because a real pilot needed it.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-amber-950/40 to-orange-950/10 border border-amber-500/20 p-8">
              <div className="space-y-4 text-sm">
                {[
                  { label: "Aircraft", value: "Cirrus SR22T" },
                  { label: "Total hours", value: "~900" },
                  { label: "Ratings", value: "Commercial · Instrument · Multi-Engine" },
                  { label: "Home base", value: "Rogers, AR (KROG)" },
                  { label: "Why he built it", value: "Needed a system that took it as seriously as he did" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-start gap-4 py-3 border-b border-white/5 last:border-0">
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────── */}
      <FooterCTA variant={VARIANT} />

      {/* ── Site Footer ──────────────────────────────────────────────────── */}
      <SiteFooter variant={VARIANT} />

    </div>
  )
}
