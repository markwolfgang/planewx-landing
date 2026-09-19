import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ExternalLink,
  Plane,
  Shield,
  Youtube,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SignUpButton } from "@/components/shared/sign-up-button"
import { SiteFooter } from "@/components/shared/site-footer"
import {
  BOLDFACE_APP_STORE_URL,
  BOLDFACE_TESTFLIGHT_URL,
  GA_CUSTOMS_APP_STORE_URL,
} from "@/lib/planewx-family-apps"

export const metadata: Metadata = {
  title: "About PlaneWX | Aviation Decision Support for General Aviation",
  description:
    "PlaneWX is the first aviation decision support system focused on general aviation. Free briefing quality forever. Founded by Navy veteran and GA pilot Mark Wolfgang.",
  openGraph: {
    title: "About PlaneWX | Aviation Decision Support for General Aviation",
    description:
      "PlaneWX is the first aviation decision support system focused on general aviation. Free briefing quality forever. Founded by Navy veteran and GA pilot Mark Wolfgang.",
    type: "website",
    url: "https://www.planewx.ai/about",
  },
  alternates: {
    canonical: "https://www.planewx.ai/about",
  },
}

const VARIANT = "d"
const SIGNUP_HREF = "https://app.planewx.ai/auth/sign-up?lp=d"
const VAC_URL = "https://www.veteransairlift.org/"
const YOUTUBE_URL = "https://www.youtube.com/@markflieshigh"

const TIMELINE = [
  {
    when: "2024",
    title: "Product work begins",
    body: "Mark Wolfgang started building what became PlaneWX while exploring AI tools to analyze aviation weather products. The problem was personal: cross-country IFR planning meant stitching METARs, TAFs, model guidance, and NWS narratives across tabs, then still telling family, \"I'll know more when the TAF drops tonight.\"",
  },
  {
    when: "November 2025",
    title: "PlaneWX LLC formed",
    body: "PlaneWX LLC was formed in November 2025 to turn that personal tool into a product for general aviation. Since formation, Mark has worked on PlaneWX seven days a week.",
  },
  {
    when: "December 2025–February 28, 2026",
    title: "Beta",
    body: "PlaneWX underwent beta testing from December 2025 through February 28, 2026.",
  },
  {
    when: "March 1, 2026",
    title: "Public launch",
    body: "PlaneWX launched publicly on March 1, 2026.",
  },
  {
    when: "Today",
    title: "A DSS for GA",
    body: "PlaneWX is the first aviation decision support system focused on general aviation: weather briefing, WX Score, Synoptic Intelligence™, FRAT, and mentors in one workflow. Safety-critical quality stays free. Paid plans buy automation for busy pilots.",
  },
] as const

const MISSION_POINTS = [
  "Put real impact on GA safety, not vanity metrics.",
  "Equip pilots with a high-quality weather briefing scored against personal minimums and aircraft capabilities, an honest FRAT, and mentor input when the call is close.",
  "Keep the PIC in command. PlaneWX never tells you to go or stay. It helps you see the decision clearly enough to own it.",
] as const

const FAMILY_APPS = [
  {
    name: "PlaneWX (DSS)",
    body: "The pilot's decision support system: weather briefing matched to your aircraft and personal minimums, WX Score, Synoptic Intelligence™, FRAT, and mentors.",
    links: [
      { label: "planewx.ai", href: "https://www.planewx.ai" },
      { label: "Sign up", href: SIGNUP_HREF },
    ],
  },
  {
    name: "TBM Boldface",
    body: "Free memory-item study app for TBM pilots. Brought to you by PlaneWX.",
    links: [
      { label: "Landing", href: "https://www.planewx.ai/boldface" },
      { label: "App Store", href: BOLDFACE_APP_STORE_URL },
      { label: "TestFlight", href: BOLDFACE_TESTFLIGHT_URL },
    ],
  },
  {
    name: "GA Customs",
    body: "Free AOE / eAPIS helper for U.S. customs arrivals: Airport of Entry hours, fees, notice, and related planning aids.",
    links: [
      { label: "Landing", href: "https://www.planewx.ai/ga-customs" },
      { label: "App Store", href: GA_CUSTOMS_APP_STORE_URL },
    ],
  },
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 25% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 75% 100%, rgba(14,165,233,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 400px 400px at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
            "linear-gradient(135deg, #0B1120 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      <nav className="relative z-10 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="PlaneWX home">
            <BrandLogo className="h-9 w-auto" />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/apps"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              Apps
            </Link>
            <Link
              href="/news"
              className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors"
            >
              News
            </Link>
            <span className="hidden sm:inline text-sm text-sky-400 font-medium" aria-current="page">
              About
            </span>
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
        {/* Hero */}
        <section className="relative pt-20 pb-16 px-4 sm:pt-24 sm:pb-20">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
              About PlaneWX
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
              Built for the go/no-go that only a{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                pilot can make
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              PlaneWX is the first aviation decision support system focused on general aviation.
              We exist to make a measurable impact on GA safety by equipping pilots to make
              smarter, safer decisions. The pilot in command always owns the call.
            </p>

            <p className="text-white/45 italic font-light tracking-wide">
              The confidence to go, or the courage to stay™
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <SignUpButton
                variant={VARIANT}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 text-base font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                Start a free briefing
                <ArrowRight className="ml-2 h-5 w-5" />
              </SignUpButton>
            </div>

            <p className="text-sm text-white/35 max-w-xl mx-auto leading-relaxed">
              PlaneWX complements Flight Service and your EFB. It does not replace official weather
              sources, charts, filing, or PIC judgment.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="relative py-16 sm:py-20 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Mission</h2>
            <p className="text-lg text-white/65 leading-relaxed text-center">
              General aviation still loses too many good pilots to decisions made under pressure,
              with incomplete synthesis, and too late in the planning window. PlaneWX was built to
              change that.
            </p>
            <p className="text-white/55 text-center">Our mission is simple and measurable:</p>
            <ul className="space-y-4">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/70 leading-relaxed">
                  <Check className="h-5 w-5 text-sky-400 mt-0.5 shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/65 leading-relaxed">
              You want to be a safer pilot. You want a briefing that matches how{" "}
              <em className="text-white/80">you</em> fly. You need an honest self-assessment. And
              when pressure is high and the weather is questionable, you benefit from an objective
              mentor&apos;s input. That is the decision support system.
            </p>
            <p className="text-white/65 leading-relaxed">
              We sit beside Flight Service and your EFB. They remain essential. PlaneWX adds the
              layer that turns weather products into a structured go/no-go conversation before bags
              are packed and options disappear.
            </p>
          </div>
        </section>

        {/* Story / Timeline */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How PlaneWX started
            </h2>
            <ol className="relative space-y-8 border-l border-sky-500/30 pl-8 ml-2">
              {TIMELINE.map((item) => (
                <li key={item.when} className="relative">
                  <span
                    className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"
                    aria-hidden
                  />
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-sky-400 mb-1">
                    {item.when}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/65 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-white/70 leading-relaxed text-center max-w-2xl mx-auto">
              Since launch, PlaneWX has grown to over 2,200 pilots in 36 countries, flying a wide
              variety of aircraft from pistons to turbines.
            </p>
          </div>
        </section>

        {/* Synoptic Intelligence */}
        <section className="relative py-16 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Synoptic Intelligence™</h2>
            <p className="text-lg text-white/65 leading-relaxed">
              Synoptic Intelligence™ is PlaneWX&apos;s approach to synthesizing the big-picture
              weather story pilots need for planning. Patent pending. Details live in in-app help
              for signed-in pilots.
            </p>
          </div>
        </section>

        {/* Founder */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="container mx-auto max-w-3xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
                <Plane className="h-3.5 w-3.5" aria-hidden />
                Founder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Founder</h2>
              <p className="text-white/50">
                <strong className="text-white">Mark Wolfgang</strong>
                <span className="text-white/40"> · </span>
                Founder, PlaneWX LLC
              </p>
            </div>
            <p className="text-white/65 leading-relaxed">
              Mark is a U.S. Navy veteran, commercial instrument pilot, and TBM owner with over
              1,000 hours. He built PlaneWX because he needed a decision support system that matched
              how GA pilots actually plan trips: days out, against personal minimums, with room for
              judgment.
            </p>
            <p className="text-white/65 leading-relaxed">
              After selling his information security consulting company, he earned his private
              certificate, flew a Diamond DA40 NG with his wife and dog across the country,
              completed an accelerated instrument program, and learned how hard honest weather
              planning gets once IFR and passengers enter the picture. That frustration became
              PlaneWX.
            </p>
            <p className="text-white/65 leading-relaxed">
              He still flies the product he ships. The homepage Founder&apos;s Story stays a short
              teaser that links here for the full picture.
            </p>
            <div className="pt-2 flex justify-center">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5 text-sky-400" aria-hidden />
                Watch Mark&apos;s flying and product story on YouTube
                <ExternalLink className="h-4 w-4 text-white/40" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* Veterans & VAC */}
        <section className="relative py-16 sm:py-20 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Veterans and Veterans Airlift Command
            </h2>
            <p className="text-white/65 leading-relaxed">
              Service runs through Mark&apos;s family. His father served in Vietnam. His grandfather
              served in World War II. Familial military service reaches back to the Revolutionary
              War. Mark served in the U.S. Navy.
            </p>
            <p className="text-white/65 leading-relaxed">
              He volunteers as a pilot with{" "}
              <a
                href={VAC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                Veterans Airlift Command
              </a>
              , helping transport injured veterans, their families, and caregivers for medical and
              other needs.
            </p>
            <p className="text-sm text-white/40 text-center pt-2">
              Proud volunteer pilot,{" "}
              <a
                href={VAC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400/80 hover:text-sky-300 underline underline-offset-2"
              >
                Veterans Airlift Command
              </a>
              .
            </p>
          </div>
        </section>

        {/* Free for safety */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="container mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Free for safety. Paid for automation.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">Safety is not a premium feature.</p>
            <p className="text-white/65 leading-relaxed text-left sm:text-center">
              Briefing quality, Synoptic Intelligence™, WX Score, FRAT, and mentors stay free-quality
              forever. We limit how much you can use PlaneWX on free and lower tiers, not how well
              the decision support works.
            </p>
            <p className="text-white/65 leading-relaxed text-left sm:text-center">
              Paid plans exist for busy pilots who want automation: monitoring, refresh cadence,
              ground protection, auto-brief on file, and other time-savers. You are not buying better
              weather truth. You are buying help keeping that truth in front of you.
            </p>
            <p className="text-white/65 leading-relaxed">
              Every pilot gets the same decision support engine. The PIC still makes the call.
            </p>
            <div className="pt-2">
              <SignUpButton
                variant={VARIANT}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 text-base font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                Create a free account
                <ArrowRight className="ml-2 h-5 w-5" />
              </SignUpButton>
            </div>
          </div>
        </section>

        {/* Product family */}
        <section className="relative py-16 sm:py-24 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl space-y-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">The PlaneWX family of apps</h2>
              <p className="text-white/65 leading-relaxed">
                PlaneWX is the decision support system. Two free companion apps help GA pilots with
                other parts of the job. See the full family hub:{" "}
                <Link href="/apps" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
                  planewx.ai/apps
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {FAMILY_APPS.map((app) => (
                <article
                  key={app.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
                >
                  <h3 className="text-xl font-bold">{app.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{app.body}</p>
                  <ul className="space-y-2 pt-1">
                    {app.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                          {...(link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="relative py-20 sm:py-24 px-4">
          <div className="container mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Brief a real trip</h2>
            <p className="text-lg text-white/65 leading-relaxed">
              Start with a free account. Work a real route. See the WX Score against your minimums.
              Run the FRAT. Bring a mentor in when the call is close.
            </p>
            <p className="text-white/55 leading-relaxed">
              PlaneWX will not replace Flight Service, your EFB, or your judgment. It will give you
              clearer structure earlier in the window, when you still have options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <SignUpButton
                variant={VARIANT}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                Sign up free
                <ArrowRight className="ml-2 h-5 w-5" />
              </SignUpButton>
              <Link
                href="/apps"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-10 py-4 text-lg transition-all"
              >
                Explore the apps
              </Link>
            </div>
            <p className="text-white/45 italic font-light tracking-wide pt-2">
              The confidence to go, or the courage to stay™
            </p>
            <div className="flex items-start justify-center gap-2 pt-4 text-sm text-white/30 max-w-lg mx-auto">
              <Shield className="h-4 w-4 mt-0.5 shrink-0 text-white/25" aria-hidden />
              <p>
                Outputs are decision-support tools. The pilot in command remains solely responsible
                for the flight. © PlaneWX, LLC. Patent pending.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant={VARIANT} />
    </div>
  )
}
