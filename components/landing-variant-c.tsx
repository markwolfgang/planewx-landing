import { BrandLogo } from "@/components/shared/brand-logo"
import {
  ArrowRight,
  Check,
  X,
  Plane,
  Quote,
  Gauge,
  Clock,
  Shield,
  HeartHandshake,
  Users,
  Brain,
} from "lucide-react"
import {
  PricingSection,
  FaqSection,
  FooterCTA,
  SiteFooter,
  VariantTracker,
  FlightChopsEndorsement,
  PartnerBadges,
  TestimonialsCarousel,
  SignUpButton,
  FounderImageModal,
  STATS,
} from "./shared"

const VARIANT = "c"
const appUrl = `https://app.planewx.ai?lp=${VARIANT}`

export function LandingVariantC() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* Background — radial-gradient avoids GPU compositing layers caused by filter:blur */}
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-9 w-auto" priority />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#community"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Community
            </a>
            <a
              href="#features"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a href="/news" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              News
            </a>
            <a href="/research/turbulence-safety" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              Research
            </a>
            <a href={appUrl} className="text-sm text-white/60 hover:text-white transition-colors">
              Log In
            </a>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free Trial
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* HERO — Community-first */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Trusted by {STATS.totalPilots} pilots —{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {STATS.cumulativeHours} flight hours
            </span>{" "}
            across our community
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            From student pilots to {STATS.maxPilotHoursPhrase} ATP captains. From Cessna 172s to Gulfstreams.{" "}
            <strong className="text-white">{STATS.instrumentRated} instrument rated.</strong>
          </p>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We didn&apos;t build a weather display. We built the{" "}
            <strong className="text-sky-400">decision support system</strong> that serious
            pilots asked for.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Join the Community — Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </SignUpButton>
          </div>

          <p className="text-sm text-white/30">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── FLIGHT CHOPS ENDORSEMENT ── */}
      <FlightChopsEndorsement />

      {/* ── TESTIMONIALS + PODCASTS ── */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real pilots. Real decisions.</h2>
            <p className="text-white/50">From student pilots to {STATS.maxPilotHoursPhrase} ATP captains.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <PartnerBadges />




      {/* STATS GRID */}
      <section className="relative py-20 px-4 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A community of <span className="text-sky-400">serious pilots</span>
            </h2>
            <p className="text-white/50">The pilots who demand more from their weather tools.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { value: STATS.cumulativeHours, label: "Cumulative Flight Hours", color: "text-sky-400", border: "border-sky-500/20" },
              { value: STATS.instrumentRated, label: "Instrument Rated", color: "text-emerald-400", border: "border-emerald-500/20" },
              { value: STATS.jetAircraft, label: "Jet Aircraft", color: "text-violet-400", border: "border-violet-500/20" },
              { value: STATS.atpPilots, label: "ATP Pilots", color: "text-amber-400", border: "border-amber-500/20" },
              { value: STATS.avgHours, label: "Average Hours per Pilot", color: "text-cyan-400", border: "border-cyan-500/20" },
              { value: STATS.maxPilotHours, label: "Highest-Time Pilot", color: "text-rose-400", border: "border-rose-500/20" },
            ].map(({ value, label, color, border }) => (
              <div key={label} className={`p-6 rounded-2xl bg-white/[0.03] border ${border} text-center`}>
                <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>{value}</div>
                <div className="text-sm text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHAT ARE THEY ALL USING? */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-5">
              The Product
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              What are they all <span className="text-sky-400">using?</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              PlaneWX is the first decision support system built specifically for GA pilots.
              It doesn&apos;t just show weather — it tells you what it means for{" "}
              <strong className="text-white">your aircraft</strong> and{" "}
              <strong className="text-white">your minimums</strong>.
            </p>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
            <div className="grid grid-cols-2">
              <div className="bg-rose-950/40 border-b border-r border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-rose-300 uppercase tracking-wider">Every EFB & Weather Tool</p>
              </div>
              <div className="bg-sky-950/40 border-b border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-sky-300 uppercase tracking-wider">PlaneWX</p>
              </div>

              {[
                ["Displays raw METARs, TAFs, PIREPs", "Synthesizes all of it using AI"],
                ["Generic VFR / IFR categories", "Your personal minimums + your aircraft"],
                ["You formulate the risk in your head", "WX Score — quantified risk, done for you"],
                ["Data only", "WX Score feeds into the PAVE framework"],
                ["You decide alone", "Connects you to a mentor who sees your full briefing"],
              ].map(([left, right], i) => (
                <div key={i} className="contents">
                  <div className="bg-rose-950/20 border-b border-r border-white/10 px-6 py-4 flex items-center gap-3">
                    <X className="h-4 w-4 text-rose-500 shrink-0" />
                    <span className="text-sm text-white/60">{left}</span>
                  </div>
                  <div className="bg-sky-950/20 border-b border-white/10 px-6 py-4 flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/80">{right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WX Score card */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                The <span className="text-emerald-400">WX Score</span>: weather risk, quantified
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                A 0&ndash;100% risk metric calculated against your personal minimums and your specific
                aircraft. Not generic VFR/IFR categories. Every deduction is transparent and explained.
              </p>
              <p className="text-white/60 leading-relaxed">
                It updates automatically as weather evolves &mdash; 40+ times over 14 days &mdash; so
                you never face a last-minute go/no-go scramble.
              </p>
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
              <p className="text-xs text-white/25 text-center">
                Illustrative example. Your score reflects your aircraft and minimums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES — Compact 6-card layout */}
      <section id="features" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Why they <span className="text-sky-400">stay</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The features that make PlaneWX the decision support system pilots won&apos;t fly without.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <Gauge className="h-6 w-6" />, color: "text-emerald-400 bg-emerald-500/20", title: "Personalized WX Score", desc: "A 0–100% risk metric calculated against your minimums and your aircraft — not generic VFR/IFR thresholds." },
              { icon: <Clock className="h-6 w-6" />, color: "text-sky-400 bg-sky-500/20", title: "14-Day Planning", desc: "Monitor WX trends from 2 weeks out. Never face a last-minute go/no-go with bags packed and commitments made." },
              { icon: <Brain className="h-6 w-6" />, color: "text-blue-400 bg-blue-500/20", title: "Multi-Model Analysis", desc: "HRRR, GFS, and ECMWF consensus across sample points along your route with confidence scoring." },
              { icon: <Shield className="h-6 w-6" />, color: "text-indigo-400 bg-indigo-500/20", title: "PAVE Risk Assessment", desc: "The FAA's decision-making framework, pre-filled from your trip context — all four quadrants in one view." },
              { icon: <HeartHandshake className="h-6 w-6" />, color: "text-teal-400 bg-teal-500/20", title: "Ask a Mentor", desc: "Connect with experienced pilots who see your full briefing — WX Score, aircraft profile, minimums." },
              { icon: <Users className="h-6 w-6" />, color: "text-amber-400 bg-amber-500/20", title: "Trip Watchers", desc: "Family and schedulers see live data. Rescheduling becomes a shared decision — not a confrontation at 6 AM." },
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
                Now flying a TBM 900 and approaching 1,000 hours total time — including 784 hours of
                cross-country PIC in under 2 years — Mark built PlaneWX to solve his own problem. What
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
    </div>
  )
}
