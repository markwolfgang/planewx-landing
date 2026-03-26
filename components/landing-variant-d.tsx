import { BrandLogo } from "@/components/shared/brand-logo"
import {
  ArrowRight,
  Check,
  Shield,
  Plane,
  Quote,
  Minus,
  GraduationCap,
  Calendar,
  Search,
} from "lucide-react"
import {
  YouTubeSection,
  PricingSection,
  FaqSection,
  FooterCTA,
  SiteFooter,
  VariantTracker,
  SignUpButton,
  FounderImageModal,
  STATS,
  TESTIMONIALS,
} from "./shared"

const VARIANT = "d"
const appUrl = `https://app.planewx.ai?lp=${VARIANT}`

const FREE_FEATURES = [
  "Full WX Score breakdown (0–100%, transparent deductions)",
  "Multi-model analysis (HRRR + GFS + ECMWF)",
  "Synoptic Intelligence\u2122 AI briefings",
  "PAVE Risk Assessment",
  "Personal & aircraft minimums",
  "Alternate departure suggestions",
  "Mentor network access (broadcast)",
  "14-day planning horizon",
  "Full raw data transparency",
  "Convective Watch (thunderstorm scoring)",
]

const SAME_ROWS = [
  "WX Score",
  "Synoptic Intelligence\u2122",
  "Multi-model icing",
  "Multi-model turbulence",
  "Convective Watch",
  "Winds aloft",
  "Hazardous weather",
  "PAVE",
  "Mentor broadcast",
  "Personal minimums",
  "Alternate departures",
  "Raw data",
  "14-day planning",
]

const DIFF_ROWS: [string, string, string][] = [
  ["Auto-refresh", "Manual only", "Automatic"],
  ["Email alerts", "\u2014", "\u2713"],
  ["Trip Watchers", "\u2014", "\u2713"],
  ["Corridor Watch", "\u2014", "\u2713"],
  ["Multi-City Optimizer", "\u2014", "\u2713"],
  ["Browse Mentors", "Broadcast", "Browse + select"],
]

const SCALE_ROWS: [string, string, string][] = [
  ["Active flights", "2", "10"],
  ["Aircraft profiles", "1", "5"],
  ["Weekly briefings", "15", "Unlimited"],
]

export function LandingVariantD() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <VariantTracker variant={VARIANT} />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

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
              href="#free-vs-pro"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Free vs Pro
            </a>
            <a
              href="#philosophy"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Our Philosophy
            </a>
            <a
              href="#pricing"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a href="/research/turbulence-safety" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              Research
            </a>
            <a href={appUrl} className="text-sm text-white/60 hover:text-white transition-colors">
              Log In
            </a>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
            >
              Get Started Free
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>Safety is not a premium feature</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Full weather intelligence.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Free forever.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            PlaneWX will never put safety behind a paywall. Every pilot gets the same AI engine,
            the same weather models, the same WX Score — whether you pay or not.{" "}
            <strong className="text-white">We limit how much you can use it, not how well it works.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-emerald-500/25 transition-all"
            >
              Start for Free — No Credit Card
              <ArrowRight className="ml-2 h-5 w-5" />
            </SignUpButton>
            <a
              href="#free-vs-pro"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-10 py-4 text-lg transition-all"
            >
              See What&apos;s Included
            </a>
          </div>

          <p className="text-sm text-white/30">Same analysis as Pro · No credit card · Never expires</p>
        </div>
      </section>

      {/* YOUTUBE */}
      <YouTubeSection variant={VARIANT} />

      {/* WHAT YOU GET FOR FREE */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
              <Check className="h-3.5 w-3.5" />
              Included on Free
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              What you get for{" "}
              <span className="text-emerald-400">$0</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every feature below is available on the free plan. No trial countdown. No feature gates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {FREE_FEATURES.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/20 text-center">
            <p className="text-lg text-white/80 leading-relaxed">
              The free plan limits how much you use PlaneWX{" "}
              <span className="text-white/50">(2 flights, 15 briefings/week)</span>,{" "}
              <strong className="text-emerald-300">not how well it works</strong>.
              A free briefing and a Pro briefing for the same flight are identical.
            </p>
          </div>
        </div>
      </section>

      {/* FREE vs PRO */}
      <section id="free-vs-pro" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Free vs <span className="text-emerald-400">Pro</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Same engine. Same analysis. Pro adds convenience and scale.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="grid grid-cols-3">
              <div className="bg-white/[0.03] border-b border-r border-white/10 px-6 py-4">
                <p className="text-sm font-semibold text-white/50 uppercase tracking-wider">Feature</p>
              </div>
              <div className="bg-emerald-950/40 border-b border-r border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Free</p>
              </div>
              <div className="bg-sky-950/40 border-b border-white/10 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-sky-300 uppercase tracking-wider">Pro</p>
              </div>
            </div>

            {/* Section: Safety & Analysis */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-emerald-500/5">
              <div className="col-span-3 px-6 py-2">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Safety &amp; Analysis</p>
              </div>
            </div>

            {SAME_ROWS.map((label, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5">
                <div className="px-6 py-3 border-r border-white/5 flex items-center">
                  <span className="text-sm text-white/70">{label}</span>
                </div>
                <div className="px-6 py-3 border-r border-white/5 flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="px-6 py-3 flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            ))}

            {/* Section: Convenience & Automation */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-amber-500/5">
              <div className="col-span-3 px-6 py-2">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Convenience &amp; Automation</p>
              </div>
            </div>

            {DIFF_ROWS.map(([label, free, pro], i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5">
                <div className="px-6 py-3 border-r border-white/5 flex items-center">
                  <span className="text-sm text-white/70">{label}</span>
                </div>
                <div className="px-6 py-3 border-r border-white/5 flex items-center justify-center">
                  {free === "\u2014" ? (
                    <Minus className="h-4 w-4 text-white/20" />
                  ) : (
                    <span className="text-sm text-white/50">{free}</span>
                  )}
                </div>
                <div className="px-6 py-3 flex items-center justify-center">
                  {pro === "\u2713" ? (
                    <Check className="h-4 w-4 text-sky-400" />
                  ) : (
                    <span className="text-sm text-sky-300">{pro}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Section: Scale */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-amber-500/5">
              <div className="col-span-3 px-6 py-2">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Scale</p>
              </div>
            </div>

            {SCALE_ROWS.map(([label, free, pro], i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/5">
                <div className="px-6 py-3 border-r border-white/5 flex items-center">
                  <span className="text-sm text-white/70">{label}</span>
                </div>
                <div className="px-6 py-3 border-r border-white/5 flex items-center justify-center">
                  <span className="text-sm text-white/50">{free}</span>
                </div>
                <div className="px-6 py-3 flex items-center justify-center">
                  <span className="text-sm text-sky-300">{pro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PHILOSOPHY */}
      <section id="philosophy" className="relative py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <Shield className="h-8 w-8 text-emerald-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            &ldquo;We don&apos;t make pilots pay for safety.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              We won&apos;t. We refuse.
            </span>&rdquo;
          </h2>

          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
            <p>
              Our mission is to increase general aviation safety. Removing the free plan would mean
              telling pilots they need to pay to access weather intelligence that could prevent an
              accident. That&apos;s not something we&apos;re willing to do.
            </p>
            <p className="text-white/80">
              Pro doesn&apos;t make your briefings better — they&apos;re already full quality.
              Pro makes PlaneWX work harder for you by adding{" "}
              <strong className="text-emerald-300">automation</strong>,{" "}
              <strong className="text-emerald-300">proactive monitoring</strong>, and{" "}
              <strong className="text-emerald-300">scale</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IS THE FREE PLAN FOR? */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-teal-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Who is the free plan <span className="text-emerald-400">for?</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Three kinds of pilots who get full value from PlaneWX at no cost.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5">
                <Calendar className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weekend Flyers</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                You fly a handful of cross-country trips a year. Two active flights and 15 weekly
                briefings cover your typical usage comfortably. Full analysis, every time.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-950/60 to-teal-950/20 border border-teal-500/20">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-5">
                <GraduationCap className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Student Pilots</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Building hours, learning weather, developing good ADM habits. PAVE risk assessments
                and mentor access help you build the judgment that keeps you safe for a lifetime.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-950/60 to-sky-950/20 border border-sky-500/20">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-5">
                <Search className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pilots Evaluating PlaneWX</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                This isn&apos;t a watered-down demo. It&apos;s the real product with quantity limits.
                Run actual flights through the system and see the full analysis before deciding to upgrade.
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
              Real pilots. Real decisions.
            </h2>
            <p className="text-white/50">From student pilots to 30,000-hour ATP captains.</p>
          </div>

          <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border border-emerald-500/30">
            <Quote className="h-8 w-8 text-emerald-400/40 mb-4" />
            <p className="text-lg text-white/80 leading-relaxed mb-6 italic">
              &ldquo;{TESTIMONIALS.find(t => t.featured)?.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
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
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-1">{STATS.cumulativeHours}</div>
              <div className="text-sm text-white/50">cumulative flight hours<br />in our pilot community</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-1">{STATS.instrumentRated}</div>
              <div className="text-sm text-white/50">of our pilots are<br />instrument rated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-1">{STATS.jetAircraft}</div>
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
              Founder&apos;s <span className="text-emerald-400">Story</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2 space-y-3">
              <FounderImageModal hoverColor="emerald" />
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
                <em className="text-emerald-400">&ldquo;Is this flight going to happen?&rdquo;</em>
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
