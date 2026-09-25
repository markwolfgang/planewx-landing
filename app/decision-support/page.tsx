import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Brain,
  CloudSun,
  ClipboardCheck,
  Users,
  Shield,
  CalendarDays,
  FileText,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SignUpButton } from "@/components/shared/sign-up-button"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Pilot Decision Support System | PlaneWX",
  description:
    "PlaneWX is the decision support system for general aviation. Weather Briefing, FRAT, Fly or Stay, and Self Debrief, with Mentor as an optional layer. Beside your EFB. You remain PIC.",
  openGraph: {
    title: "Decide before you launch | PlaneWX",
    description:
      "Weather Briefing, FRAT, Fly or Stay, and Self Debrief in one workflow. Put a real trip on the calendar and pressure-test the call before trip pressure locks in.",
    type: "website",
    url: "https://www.planewx.ai/decision-support",
  },
  alternates: {
    canonical: "https://www.planewx.ai/decision-support",
  },
}

const VARIANT = "a"

const LOOP = [
  {
    icon: CloudSun,
    accent: "text-sky-400",
    iconBg: "bg-sky-500/20",
    border: "border-sky-500/20",
    gradient: "from-sky-950/60 to-sky-950/20",
    title: "Weather Briefing",
    body: "Ceiling, visibility, wind, icing, convective trends, and how those products evolve as the window tightens. Matched to your airplane and personal minimums, with a WX Score that updates as the forecast sharpens. Personal minimums are required; without them there is no WX Score. TAFs stay authoritative inside their valid window.",
  },
  {
    icon: ClipboardCheck,
    accent: "text-violet-400",
    iconBg: "bg-violet-500/20",
    border: "border-violet-500/20",
    gradient: "from-violet-950/60 to-violet-950/20",
    title: "FRAT",
    body: "A living flight risk assessment on the FAA PAVE framework (Pilot, Aircraft, enVironment, External). PlaneWX fills what it already knows from the briefing and airport context. You self-rate near departure. When risks stack, you see it. You still decide.",
  },
  {
    icon: Shield,
    accent: "text-amber-400",
    iconBg: "bg-amber-500/20",
    border: "border-amber-500/20",
    gradient: "from-amber-950/60 to-amber-950/20",
    title: "Fly or Stay",
    body: "The call stays with the pilot in command. PlaneWX does not issue an automatic fly or stay verdict. It gives you a clear picture so you can own the decision while options still exist.",
  },
  {
    icon: FileText,
    accent: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
    border: "border-cyan-500/20",
    gradient: "from-cyan-950/60 to-cyan-950/20",
    title: "Self Debrief",
    body: "After the flight, a short structured look back on how the weather and the call actually went. It does not change the WX Score. It helps the next trip start smarter.",
  },
] as const

export default function DecisionSupportPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
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

      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="PlaneWX home">
            <BrandLogo className="h-9 w-auto" />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="#loop"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              The loop
            </a>
            <SignUpButton
              variant={VARIANT}
              path="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Log In
            </SignUpButton>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free Trial
            </SignUpButton>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-20 pb-16 px-4 sm:pt-24 sm:pb-20">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium">
              <Brain className="h-4 w-4" />
              <span>Pilot decision support</span>
            </div>

            <p className="text-sm sm:text-base font-semibold tracking-wide text-sky-300/90">
              PlaneWX
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
              Decide before you{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                launch.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              PlaneWX is the decision support system for general aviation. The hard Fly or Stay
              calls happen after the trip already has momentum. PlaneWX helps you see weather,
              risk, and counsel before you commit.
            </p>

            <p className="text-white/45 italic font-light tracking-wide">
              Fly like it&apos;s your job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <SignUpButton
                variant={VARIANT}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 text-base font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                Put a trip on the calendar
                <ArrowRight className="ml-2 h-5 w-5" />
              </SignUpButton>
              <a
                href="#loop"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-8 py-3.5 text-base transition-all"
              >
                See the decision loop
              </a>
            </div>

            <p className="text-sm text-white/35">
              Soft start: brief a real trip. Work the FRAT. Bring a mentor in when the call is close.
            </p>
          </div>
        </section>

        <section className="relative py-16 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl text-center space-y-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400/80">
              Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              Improve general aviation safety by giving pilots a robust decision support system.
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">
              Most bad launches are not mysteries. They are late decisions. Hotels are booked.
              Passengers have rearranged work. The airplane is reserved. Then the night before,
              the briefing finally gets serious, and &ldquo;we&apos;ll see&rdquo; has quietly become
              &ldquo;we have to go.&rdquo; By then you are not deciding. You are rationalizing.
            </p>
            <p className="text-white/60 leading-relaxed">
              What you needed earlier was not another tab of METARs. You needed a way to
              pressure-test the flight while a change of plan was still a change of plan.
            </p>
          </div>
        </section>

        <section id="loop" className="relative py-20 sm:py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
                The decision loop
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Weather Briefing. FRAT. Fly or Stay. Self Debrief.
              </h2>
              <p className="text-lg text-white/55 max-w-2xl mx-auto">
                PlaneWX is built around that loop. Mentors are an optional layer when you want a
                second set of eyes, not a required step.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {LOOP.map(({ icon: Icon, accent, iconBg, border, gradient, title, body }) => (
                <div
                  key={title}
                  className={`relative p-7 rounded-3xl bg-gradient-to-br ${gradient} border ${border}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`h-6 w-6 ${accent}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 relative p-7 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-emerald-950/20 border border-emerald-500/20">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Mentor (optional)</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Even good pilots miss their own blind spots. Mentors give you another set of
                    eyes before you launch: someone who will ask the awkward question about fatigue,
                    currency, or get-there-itis when the forecast looks good enough. Counsel is
                    available when you want it. The Fly or Stay call stays yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              How PlaneWX puts the loop together
            </h2>
            <p className="text-white/65 leading-relaxed text-center text-lg">
              The weather briefing synthesizes authoritative products against your airplane and
              personal minimums. FRAT walks Pilot, Aircraft, enVironment, and External pressures so
              risk is visible before departure. You make the Fly or Stay call. Afterward, Self
              Debrief closes the loop. Mentors can join when the call is close.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-sky-400 mt-0.5 shrink-0" />
                <p className="text-white/70 leading-relaxed">
                  PlaneWX sits beside your EFB. It does not replace charts, filing, or official
                  weather sources. It does not tell you what to do. Outputs are decision-support
                  tools. The pilot in command remains solely responsible for the flight.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
              <CalendarDays className="h-3.5 w-3.5" />
              Mid-horizon planning
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              When the window is the mission
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">
              Some trips are not weekend hops. They are mid-horizon weather calls with real arrival
              pressure. The hard part is not finding a METAR. It is picking a window early enough
              that the airplane can move when the weather says yes, and changing the plan while a
              change still costs less than a forced launch.
            </p>
          </div>
        </section>

        <section className="relative py-20 sm:py-24 px-4">
          <div className="container mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Before you promise a departure day,{" "}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                run the decision.
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
              Explore a full-quality briefing. Put a real trip on the calendar. Brief it. Work the
              FRAT. Bring a mentor in when the call is close.
            </p>
            <p className="text-white/45 italic font-light tracking-wide">
              Fly like it&apos;s your job.
            </p>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Start free and brief a trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </SignUpButton>
            <p className="text-sm text-white/30">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      <SiteFooter variant={VARIANT} />
    </div>
  )
}
