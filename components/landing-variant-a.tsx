import Image from "next/image"
import { BrandLogo } from "@/components/shared/brand-logo"
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
  Plane,
  X,
  Snowflake,
  Wind,
  Route,
  Quote,
  CloudSun,
  ClipboardCheck,
  RotateCcw,
  Database,
  Sparkles,
} from "lucide-react"
import {
  PricingSection,
  FaqSection,
  FooterCTA,
  SiteFooter,
  VariantTracker,
  FlightChopsEndorsement,
  TestimonialsCarousel,
  SignUpButton,
  FounderImageModal,
  STATS,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_WHY,
} from "./shared"
import { HomepagePartnerLogos } from "@/components/shared/homepage-partner-logos"
import { YouTubeFacade } from "./shared/youtube-facade"

const VARIANT = "a"

/** Light-blue brain outline with a small airplane silhouette inside (Mark-locked pill). */
function BrainPlaneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`} aria-hidden>
      <Brain className="h-full w-full text-sky-400" strokeWidth={1.75} />
      <Plane className="absolute h-[45%] w-[45%] text-sky-400" strokeWidth={2.25} />
    </span>
  )
}


export function LandingVariantA() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* Background, radial-gradient avoids GPU compositing layers caused by filter:blur */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 25% 0%, rgba(14,165,233,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 75% 100%, rgba(99,102,241,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 400px 400px at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
            "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      {/* NAV */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto pl-4 pr-5 sm:px-4 py-4 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogo className="h-5 min-[390px]:h-6 sm:h-9 w-auto max-w-none shrink-0" priority />
            <span className="hidden xl:inline text-xs text-white/40 font-medium tracking-wide ml-1 whitespace-nowrap">
              The Pilot&apos;s Decision Support System
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 shrink">
            <a
              href="#how-it-works"
              className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              Pricing
            </a>
            <a href="/about" className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap">
              About
            </a>
            <a href="/news" className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap">
              News
            </a>
            <a href="/research/turbulence-safety" className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap">
              Research
            </a>
            <SignUpButton
              variant={VARIANT}
              path="/"
              className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Log In
            </SignUpButton>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold px-3 py-1.5 sm:h-9 sm:px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors whitespace-nowrap shrink-0"
            >
              Start Free 14-Day Trial
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0a1628] border border-sky-400/40 text-sky-400 text-xs sm:text-sm font-medium whitespace-nowrap max-w-full">
            <BrainPlaneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span>Decision support for general aviation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Fly like it&apos;s your job.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
            Weather tools show you raw data. PlaneWX shows you what matters for your
            flight and helps you{" "}
            <span className="whitespace-nowrap">make the call.</span>
          </p>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
            PlaneWX is the decision support system for general aviation. It gives pilots
            professional-grade tools and instills professional-grade habits that make flying safer.
          </p>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed text-balance">
            The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-6 sm:px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all whitespace-nowrap"
            >
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </SignUpButton>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-10 py-4 text-lg transition-all"
            >
              See How It Works
            </a>
          </div>

          <p className="text-sm text-white/30">Brief a real trip. Run the FRAT. Make the call. Debrief. Add a mentor anytime.</p>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-emerald-400/80">
            <Shield className="h-4 w-4" />
            <span>Full safety analysis on every plan. <strong className="text-emerald-300">Free forever.</strong></span>
          </div>
        </div>
      </section>

      {/* ── FLIGHT CHOPS ENDORSEMENT ── */}
      <FlightChopsEndorsement />

      {/* ── TESTIMONIALS + PODCASTS ── */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real pilots. Real decisions.</h2>
            <p className="text-white/50">From student pilots to ATP captains.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-12 px-4 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8 font-medium text-balance">
            Trusted by serious GA pilots. Partnered with the organizations that support them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center items-start">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-400 mb-1 whitespace-nowrap">{STATS.totalPilots}</div>
              <div className="text-sm text-white/50">
                pilots in {STATS.countries} countries
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 mb-1 whitespace-nowrap">8.7/10</div>
              <div className="text-sm text-white/50">
                how likely pilots are<br />to recommend PlaneWX<br />(1,724 responses)
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl xl:text-5xl font-bold text-amber-400 mb-1 whitespace-nowrap">
                Up to 10%
              </div>
              <div className="text-sm text-white/50 leading-snug max-w-[14rem] mx-auto">
                off 5X5 insurance with Pro Plus
              </div>
            </div>
          </div>
          <HomepagePartnerLogos />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-5">
              The Problem
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Raw weather still leaves{" "}
              <span className="text-rose-400">you as the analyst.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Most bad launches are not mysteries. They are late decisions. Hotels are booked.
              Passengers rearranged work. The airplane is reserved. Then the night before,
              &ldquo;we&apos;ll see&rdquo; quietly becomes &ldquo;we have to launch.&rdquo; By then you
              are not deciding. You are rationalizing. PlaneWX is the risk-management loop.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-2">
              <div className="bg-rose-950/40 border-b border-r border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-rose-300 uppercase tracking-wider">Weather data alone</p>
              </div>
              <div className="bg-sky-950/40 border-b border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-sky-300 uppercase tracking-wider">PlaneWX</p>
              </div>

              {[
                ["Every chart, and you pick the right one", "The prog chart closest to your departure time"],
                ["You sort and interpret it all yourself", "Less preflight workload, more attention on the decision"],
                ["Displays raw METARs, TAFs, PIREPs", "Weather Briefing with a WX Score"],
                ["Generic VFR / IFR categories", "Your minimums and your aircraft"],
                ["You invent the risk picture alone", "FRAT on the FAA PAVE framework"],
                ["No structured GO / NO‑GO step", "You make the call. PlaneWX informs."],
                ["No habit loop after the flight", "Self Debrief looks back at every trip"],
              ].map(([left, right], i) => (
                <div key={i} className="contents">
                  <div className="bg-rose-950/20 border-b border-r border-white/10 px-3 sm:px-6 py-3 sm:py-4 flex items-start gap-2 sm:gap-3">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/60 leading-snug">{left}</span>
                  </div>
                  <div className="bg-sky-950/20 border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4 flex items-start gap-2 sm:gap-3">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/80 leading-snug">{right}</span>
                  </div>
                </div>
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


      {/* RISK-MANAGEMENT LOOP */}
      <section id="the-loop" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
              The risk-management loop
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Four steps.{" "}
              <span className="text-sky-400">You make the call.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              WX Score briefing, FRAT, <span className="whitespace-nowrap">GO / NO-GO</span>, Self Debrief. Mentor is optional, alongside the loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-950/60 to-sky-950/20 border border-sky-500/20">
              <div className="text-5xl font-bold text-sky-500/20 absolute top-3 right-4 select-none">1</div>
              <div className="w-11 h-11 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4">
                <CloudSun className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Weather Briefing</h3>
              <p className="text-sky-400/90 text-xs font-medium mb-2">WX Score</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A briefing scored against your aircraft and personal minimums. Personal minimums are
                structural: the WX Score cannot generate without them, and they appear on every
                briefing.
              </p>
            </div>

            <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 to-violet-950/20 border border-violet-500/20">
              <div className="text-5xl font-bold text-violet-500/20 absolute top-3 right-4 select-none">2</div>
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">FRAT</h3>
              <p className="text-violet-400/90 text-xs font-medium mb-2">PAVE risk assessment</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A living flight risk assessment on the FAA PAVE framework, pre-filled from your
                briefing and trip context so you are not inventing the environment under pressure.
              </p>
            </div>

            <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
              <div className="text-5xl font-bold text-emerald-500/20 absolute top-3 right-4 select-none">3</div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <Plane className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2"><span className="whitespace-nowrap">GO / NO-GO</span></h3>
              <p className="text-emerald-400/90 text-xs font-medium mb-2">PIC decision</p>
              <p className="text-white/60 text-sm leading-relaxed">
                PlaneWX never recommends go or no-go. The pilot makes the call. Staying is a
                legitimate outcome, not a failure.
              </p>
            </div>

            <div className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/60 to-amber-950/20 border border-amber-500/20">
              <div className="text-5xl font-bold text-amber-500/20 absolute top-3 right-4 select-none">4</div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <RotateCcw className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Self Debrief</h3>
              <p className="text-amber-400/90 text-xs font-medium mb-2">Close the loop</p>
              <p className="text-white/60 text-sm leading-relaxed">
                After the flight, or the flight you skipped, your Self Debrief looks back at the FRAT you ran for that trip.
              </p>
            </div>
          </div>

          <div className="mt-6 p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-950/50 to-teal-950/20 border border-teal-500/20 flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-11 h-11 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
              <HeartHandshake className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Mentor{" "}
                <span className="text-white/40 font-medium text-sm">(optional, alongside the loop)</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Not a fifth step. When you want a second set of eyes, mentors see the same briefing
                and FRAT you see. Shared context, not a phone description.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-sky-400 mt-0.5 shrink-0" />
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                PlaneWX sits beside your EFB. It does not replace charts, filing, or official weather
                sources. It does not tell you what to do. Outputs are decision-support tools. The
                pilot in command remains solely responsible for the flight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-5">
              How It Works
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              From raw data to{" "}
              <span className="text-sky-400">a clearer picture</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Under the hood of every Weather Briefing: retrieve, personalize, synthesize, then
              put the picture in front of you so you can decide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const styles = [
                {
                  card: "from-sky-950/60 to-sky-950/20 border-sky-500/20",
                  num: "text-sky-500/20",
                  iconWrap: "bg-sky-500/20",
                  icon: "text-sky-400",
                  Icon: Database,
                },
                {
                  card: "from-violet-950/60 to-violet-950/20 border-violet-500/20",
                  num: "text-violet-500/20",
                  iconWrap: "bg-violet-500/20",
                  icon: "text-violet-400",
                  Icon: Target,
                },
                {
                  card: "from-blue-950/60 to-blue-950/20 border-blue-500/20",
                  num: "text-blue-500/20",
                  iconWrap: "bg-blue-500/20",
                  icon: "text-blue-400",
                  Icon: Sparkles,
                },
                {
                  card: "from-emerald-950/60 to-emerald-950/20 border-emerald-500/20",
                  num: "text-emerald-500/20",
                  iconWrap: "bg-emerald-500/20",
                  icon: "text-emerald-400",
                  Icon: Gauge,
                },
              ][i]
              const Icon = styles.Icon
              return (
                <div
                  key={step.title}
                  className={`relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br border ${styles.card}`}
                >
                  <div className={`text-5xl font-bold ${styles.num} absolute top-3 right-5 select-none`}>
                    {i + 1}
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${styles.iconWrap} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${styles.icon}`} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3 pr-8">
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    {step.badge ? (
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/55">
                        {step.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-10 text-center text-sm sm:text-base text-white/55 max-w-3xl mx-auto leading-relaxed">
            <span className="text-white/70 font-medium">Why this matters. </span>
            {HOW_IT_WORKS_WHY}
          </p>
        </div>
      </section>

      {/* WX SCORE */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
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
                Right now, your weather judgment lives entirely in your head. You mentally juggle
                ceilings, winds, icing, turbulence, currency, and fatigue under pressure, often at
                the last minute.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                The WX Score externalizes that work. The workload of weather risk
                assessment lives in software, not your memory, not your gut.
              </p>
              <ul className="space-y-3">
                {[
                  "0-100% metric calculated against YOUR minimums, not generic VFR/IFR",
                  "Ceiling, visibility, crosswind, turbulence, icing, all weighted",
                  "Different scores for each aircraft you fly",
                  "Every deduction is transparent and explained",
                  "Updates automatically for monitored flights as weather evolves, 40+ times over 14 days",
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
                  <span className="text-xs text-emerald-400">SR22T · KPAO to KSBA</span>
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
                  <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center min-w-0">
                    <div className={`text-2xl font-bold ${color}`}>{score}</div>
                    <div className="text-[11px] sm:text-xs text-white/40 mt-0.5 leading-tight">{label}</div>
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

      {/* PAVE FRAMEWORK */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-5">
              FRAT
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Weather alone is not{" "}
              <span className="text-indigo-400">the whole call</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              FRAT turns risk into a conversation with yourself. PlaneWX FRAT uses the FAA&apos;s
              PAVE framework (Pilot, Aircraft, enVironment, External) and stays dynamic: it reads
              the WX briefing, airport complexity, day or night, unfamiliar destinations, and risk
              stacking. Not a static one-time form.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                letter: "P", label: "Pilot",
                color: "from-blue-950/60 to-blue-950/20 border-blue-500/20",
                accent: "text-blue-400", bg: "bg-blue-500/20",
                items: ["Currency & recency", "Fatigue & physical condition", "Experience with route / conditions", "Mindset: are you flying pressured?"],
                filled: false, note: "You complete this. PlaneWX prompts the right questions.",
              },
              {
                letter: "A", label: "Aircraft",
                color: "from-violet-950/60 to-violet-950/20 border-violet-500/20",
                accent: "text-violet-400", bg: "bg-violet-500/20",
                items: ["FIKI / de-ice capability", "TAS and service ceiling", "Autopilot & weather radar", "Aircraft-specific minimums"],
                filled: true, note: "Pre-filled from your aircraft profile.",
              },
              {
                letter: "V", label: "enVironment",
                color: "from-emerald-950/60 to-emerald-950/20 border-emerald-500/30",
                accent: "text-emerald-400", bg: "bg-emerald-500/20",
                items: ["WX Score (synthesized risk)", "Icing & turbulence consensus", "Convective activity", "14-day trend visibility"],
                filled: true, note: "Fully pre-filled. This is what PlaneWX does.",
              },
              {
                letter: "E", label: "External Pressures",
                color: "from-amber-950/60 to-amber-950/20 border-amber-500/20",
                accent: "text-amber-400", bg: "bg-amber-500/20",
                items: ["Time pressure", "Passenger / family expectations", "Business commitments", "Trip Watchers: share data and reduce pressure"],
                filled: false, note: "Trip Watchers takes the pressure off the conversation.",
              },
            ].map(({ letter, label, color, accent, bg, items, filled, note }) => (
              <div key={letter} className={`p-7 rounded-2xl bg-gradient-to-br ${color} border relative overflow-hidden`}>
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

      {/* SAFETY STORY */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-500/20">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-rose-300">
                <span className="text-2xl">&#9888;&#65039;</span>
                The Pattern That Kills
              </h3>
              <ol className="space-y-4">
                {[
                  "Plans made weeks in advance. Hotels booked. Family waiting.",
                  "Weather monitored, but TAFs only cover 24 hours. \"We'll know the night before.\"",
                  "Morning of departure: conditions marginal. Bags are packed. Commitments made.",
                  "The pressure to launch is immense. The decision feels impossible.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-rose-400 font-bold mt-0.5 shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-rose-300/60 italic">
                This is when accidents happen. Not because pilots lack skill. Because they&apos;re forced
                into decisions when the stakes are highest.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-emerald-300">
                <span className="text-2xl">&#10004;&#65039;</span>
                How PlaneWX Changes This
              </h3>
              <ul className="space-y-4">
                {[
                  ["Know 7+ days out", "WX Score trends visible before you commit to anything."],
                  ["40+ automatic updates for monitored flights", "Watch conditions evolve. No scramble the night before."],
                  ["Alternative windows", "Friday looks bad. Thursday afternoon shows 85%."],
                  ["Trip Watchers", "Stakeholders see the same data. Rescheduling is shared."],
                ].map(([title, detail], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70">
                      <strong className="text-white">{title}</strong>. {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-emerald-300/60 italic">
                The safest pilots aren&apos;t the ones who can fly in anything. They&apos;re the ones who
                never put themselves in that position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Everything the decision{" "}
              <span className="text-sky-400">requires</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every layer of the decision support system, from Weather Briefing to Self Debrief,
              with Mentor alongside.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Gauge className="h-6 w-6" />, color: "text-emerald-400 bg-emerald-500/20", title: "Personalized WX Score", desc: "A 0-100% risk metric calculated against your minimums and your aircraft, not generic VFR/IFR thresholds." },
              { icon: <Clock className="h-6 w-6" />, color: "text-sky-400 bg-sky-500/20", title: "14-Day Planning Horizon", desc: "Monitor WX trends from 2 weeks out. See GO / NO‑GO options early, before bags are packed and commitments harden." },
              { icon: <Snowflake className="h-6 w-6" />, color: "text-blue-400 bg-blue-500/20", title: "Multi-Model Analysis", desc: "HRRR, GFS, and ECMWF consensus across 3 to 7 sample points along your route, with confidence scoring on the agreement." },
              { icon: <Shield className="h-6 w-6" />, color: "text-indigo-400 bg-indigo-500/20", title: "FRAT on PAVE", desc: "The FAA PAVE framework pre-filled from your trip context. Pilot, Aircraft, enVironment, External pressures, all in one view." },
              { icon: <HeartHandshake className="h-6 w-6" />, color: "text-teal-400 bg-teal-500/20", title: "Ask a Mentor", desc: "Optional layer alongside the loop. Experienced pilots see your full briefing: WX Score, aircraft profile, minimums. Shared context, not verbal descriptions." },
              { icon: <Users className="h-6 w-6" />, color: "text-amber-400 bg-amber-500/20", title: "Trip Watchers", desc: "Family, passengers, and schedulers see the same live data. Rescheduling becomes a shared decision, not a confrontation at 6 AM." },
              { icon: <Route className="h-6 w-6" />, color: "text-rose-400 bg-rose-500/20", title: "Corridor Watch", desc: "Route-specific intelligence at departure, waypoints, and arrival. TFRs, NOTAMs, and icing overlays along your exact path." },
              { icon: <Wind className="h-6 w-6" />, color: "text-cyan-400 bg-cyan-500/20", title: "Synoptic Intelligence™", desc: "NWS forecaster narratives synthesized into regional summaries that explain the big picture, not just the numbers." },
              { icon: <Brain className="h-6 w-6" />, color: "text-violet-400 bg-violet-500/20", title: "Multi-City Optimizer", desc: "Planning a multi-leg trip? Enter all your stops and PlaneWX finds the optimal departure sequence based on weather windows." },
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
              <FounderImageModal hoverColor="sky" />
              <p className="text-sm text-white/30 text-center italic">&ldquo;I built PlaneWX because I needed it.&rdquo;</p>
            </div>

            <div className="md:col-span-3 space-y-5 text-white/60 leading-relaxed">
              <p>
                PlaneWX was founded in 2025 by <strong className="text-white">Mark Wolfgang</strong>, an
                experienced technology entrepreneur and General Aviation pilot.
              </p>
              <p>
                After selling his Information Security consulting company in December 2022, Mark retired
                and bought his first airplane, a Diamond DA40 NG. He earned his Private Pilot&apos;s license
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
                Now flying a TBM 900 with{" "}
                <span className="whitespace-nowrap">over 1,000 hours</span> total time, Mark built
                PlaneWX to solve his own problem. What started as personal frustration became a
                mission to help every pilot answer the question:{" "}
                <em className="text-sky-400">&ldquo;Is this flight going to happen?&rdquo;</em>
              </p>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-sm text-white/50">
                  <strong className="text-white">Mark Wolfgang</strong> is a Commercial Instrument pilot
                  with single and multiengine ratings, and a veteran of the U.S. Navy.
                </p>
                <p className="text-sm text-white/50">
                  Read the full story on our{" "}
                  <a href="/about" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
                    About
                  </a>{" "}
                  page: how PlaneWX started, why safety stays free, and the mission behind Synoptic
                  Intelligence™.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-center text-sm text-white/40 mb-4">Watch the founder&apos;s story</p>
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50" style={{ paddingBottom: "56.25%" }}>
              <YouTubeFacade
                videoId="rAFTCzeR38M"
                title="PlaneWX Founder's Story, Mark Wolfgang"
              />
            </div>
            <p className="text-center text-sm text-white/40 mt-4">
              <a
                href="https://www.youtube.com/@markflieshigh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
              >
                More on YouTube
              </a>
            </p>
          </div>
        </div>
      </section>

      <FooterCTA variant={VARIANT} />
      <SiteFooter variant={VARIANT} />
    </div>
  )
}
