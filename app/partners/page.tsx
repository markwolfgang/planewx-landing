import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Handshake,
  Mail,
  Megaphone,
  Shield,
  Users,
} from "lucide-react"
import { PartnerApplyForm } from "@/components/partners/apply-form"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

const PARTNER_MAILTO = "mailto:sara@planewx.ai?subject=Partnership%20inquiry"

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with PlaneWX to reach GA pilots who use a decision support system before they launch. Community listing, co-marketing, and shared work. A listing is not an endorsement. The PIC owns every go / no-go.",
  openGraph: {
    title: "Partners | PlaneWX",
    description:
      "Reach GA pilots who still own the go / no-go. Partner with PlaneWX through community listing and co-marketing. A listing is not an endorsement.",
    type: "website",
    url: "https://www.planewx.ai/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | PlaneWX",
    description:
      "Reach GA pilots who still own the go / no-go. Partner with PlaneWX through community listing and co-marketing.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/partners",
  },
}

type Partner = {
  name: string
  href: string
  logo: {
    src: string
    alt: string
    width: number
    height: number
    className: string
    wellClassName?: string
  }
  blurb: string
}

const PARTNERS: Partner[] = [
  {
    name: "5X5 Aviation Insurance",
    href: "https://www.5x5insurance.com",
    logo: {
      src: "/partners/5x5-white.png",
      alt: "5X5 Aviation Insurance logo",
      width: 2500,
      height: 613,
      className: "h-9 sm:h-10 w-auto max-w-[11rem] object-contain",
    },
    blurb:
      "Direct aviation insurance for pilots and owners. Fast online quotes, coverage tailored to how you fly, and discounts that reward training and safety.",
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    logo: {
      src: "/partners/flight-chops.png",
      alt: "Flight Chops logo",
      width: 800,
      height: 766,
      className: "h-14 sm:h-16 w-auto max-w-[9rem] object-contain",
    },
    blurb:
      "Real-world cockpit video and training content that puts pilot decision-making on camera.",
  },
  {
    name: "EAA",
    href: "https://www.eaa.org",
    logo: {
      src: "/partners/eaa-white.png",
      alt: "Experimental Aircraft Association (EAA) logo",
      width: 861,
      height: 492,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Experimental Aircraft Association. Home of AirVenture Oshkosh and the community that builds, restores, and flies experimental and light aircraft.",
  },
  {
    name: "AOPA",
    href: "https://www.aopa.org",
    logo: {
      src: "/partners/aopa-white.svg",
      alt: "Aircraft Owners and Pilots Association (AOPA) logo",
      width: 96,
      height: 51,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Aircraft Owners and Pilots Association. Advocacy, training, and resources that protect and support GA pilots.",
  },
  {
    name: "Veterans Airlift Command",
    href: "https://www.veteransairlift.org",
    logo: {
      src: "/partners/vac.png",
      alt: "Veterans Airlift Command logo",
      width: 712,
      height: 232,
      className: "h-9 sm:h-10 w-auto max-w-[12rem] object-contain",
      wellClassName: "bg-white",
    },
    blurb:
      "Volunteer pilots and aircraft owners providing free air transport for wounded veterans and their families.",
  },
  {
    name: "FLYTE",
    href: "https://www.flyte.aero",
    logo: {
      src: "/partners/flyte-white.png",
      alt: "FLYTE logo",
      width: 5758,
      height: 1182,
      className: "h-9 sm:h-10 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Aviator sunglasses built for the cockpit. Thin temples for headsets. Non-polarized lenses so glass-cockpit displays stay readable.",
  },
  {
    name: "TBMOPA",
    href: "https://www.tbmowners.org",
    logo: {
      src: "/partners/tbmopa-placeholder.svg",
      alt: "TBMOPA logo",
      width: 320,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "TBM Owners and Pilots Association for Daher TBM owners and operators. Safety, member forums, training and safety seminars, annual convention, and technical answers with Daher expertise.",
  },
  {
    name: "Runway to Oshkosh",
    href: "https://runwaytooshkosh.com",
    logo: {
      src: "/partners/runway-placeholder.svg",
      alt: "Runway to Oshkosh logo",
      width: 360,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[14rem] object-contain",
    },
    blurb:
      "A multi-aircraft flight from Tecnam's U.S. base at Sebring to AirVenture. Three days, 1,047 nautical miles, and the country in between.",
  },
]

const BENEFITS = [
  {
    icon: Users,
    title: "Reach pilots making the call",
    body: "PlaneWX is used by GA pilots before they launch: briefing, FRAT, and counsel in one workflow. Partners meet people who are already thinking about go / no-go, not browsing a weather gadget.",
  },
  {
    icon: Megaphone,
    title: "Co-marketing that sounds like pilots",
    body: "Joint notes, posts, and event work written in the same voice we use with the community. No hype layer. If we cannot stand behind the sentence, it does not ship.",
  },
  {
    icon: Handshake,
    title: "Community trust, earned slowly",
    body: "A listing here sits next to clubs and brands pilots already know. That only works if the page stays honest: collaboration, not a purchased seal.",
  },
  {
    icon: Shield,
    title: "Aligned with safer decisions",
    body: "The fit is product or community work that helps a PIC see weather, risk, and counsel earlier. Beyond a weather briefing. The confidence to go, or the courage to stay.",
  },
] as const

const PROGRAM = [
  {
    title: "Community",
    body: "Owners groups, clubs, and events that already gather pilots who care about the next flight. A listing puts you on this page with a live link and a blurb we both accept.",
  },
  {
    title: "Co-marketing",
    body: "Shared content, booths, and campaigns. We write like pilots talking to pilots. You keep your brand. We keep PIC judgment at the center.",
  },
  {
    title: "Strategic",
    body: "Deeper product alignment when the work changes what a member can do, the way 5X5 recognizes preparation in underwriting. Those take a longer conversation.",
  },
] as const

const STEPS = [
  {
    n: "01",
    title: "Write Sara",
    body: "Email who you are, the organization, a site, and what you want to do together. A short note is enough.",
  },
  {
    n: "02",
    title: "Talk through fit",
    body: "We will reply if there is a path. Expect a plain conversation about audience, the work, and whether the voices match.",
  },
  {
    n: "03",
    title: "Align on the work",
    body: "Listing copy, links, and any co-marketing get agreed in writing. We do not invent metrics. We do not put a name on a card we cannot defend.",
  },
  {
    n: "04",
    title: "Launch and stay honest",
    body: "The page goes live, or the campaign starts. Listing is not an endorsement. The PIC still owns every go / no-go.",
  },
] as const

const PROOF = [
  {
    name: "5X5 Aviation Insurance",
    href: "/news/5x5-aviation-insurance-exclusive-partner",
    title: "Exclusive insurance partner",
    body: "Verified Pro Plus members can be eligible for risk-based premium credits through 5X5 Safety Rewards. PlaneWX does not sell insurance. Credits are 5X5's underwriting, not a PlaneWX guarantee.",
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    title: "YouTube partner",
    body: "Steve pushed smoke onto the same briefing as the rest of the weather. Real cockpit video, real decision-making. A video is not a go / no-go. It is another set of eyes on the problem.",
  },
  {
    name: "EAA",
    href: "https://www.eaa.org",
    title: "Proud supporter",
    body: "PlaneWX supports EAA AirVenture and has stood on the forum stage to talk risk, personal minimums, and decision support. Community first. No claim that we got anyone to Oshkosh.",
  },
] as const

const FAQS = [
  {
    q: "Who is eligible to partner?",
    a: "Clubs, owners groups, trainers, media, and aviation brands whose work helps GA pilots make better decisions. If the product fights PIC judgment or needs us to pretend PlaneWX is only a weather app, this is not the page.",
  },
  {
    q: "What does a listing mean?",
    a: "A listing is collaboration: a logo, a live link, and a blurb we both accept. It is not an endorsement of a product, a policy, or a flight. The PIC owns every go / no-go.",
  },
  {
    q: "How do I apply?",
    a: "Use the form on this page or email sara@planewx.ai with your organization, a site, and a short note on the work. We will reply if there is a fit. There is no public SLA and no automated approval.",
  },
  {
    q: "Who do I contact?",
    a: "Sara Wolfgang, PlaneWX. sara@planewx.ai. For product or press that is not a partnership, hello@planewx.ai still works.",
  },
] as const

function BecomePartnerButton({
  className,
  children = "Become a Partner",
}: {
  className?: string
  children?: string
}) {
  return (
    <a
      href={PARTNER_MAILTO}
      className={
        className ??
        "inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
      }
    >
      {children}
    </a>
  )
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
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
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="PlaneWX home">
            <BrandLogo className="h-9 w-auto bg-transparent" priority />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-16 sm:space-y-20">
        <header className="space-y-6 text-center sm:text-left max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08]">
            Reach the pilots who still own the call.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
            Partner with PlaneWX when you want to stand next to GA pilots who
            brief early, run a living FRAT, and make go / no-go before the bags
            are packed. Community listing, co-marketing, and shared work that
            respects PIC judgment.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 pt-1">
            <BecomePartnerButton />
            <a
              href="mailto:sara@planewx.ai?subject=Partnership%20question"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-6 py-3 text-sm font-medium transition-all"
            >
              Talk to us
            </a>
          </div>
        </header>

        <section aria-labelledby="partners-grid-heading" className="space-y-5">
          <div className="space-y-2 text-center sm:text-left">
            <h2 id="partners-grid-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Partners in the community
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              Clubs, brands, and campaigns already on this page. A listing is
              not an endorsement. The PIC owns every go / no-go.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="h-full">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <div
                    className={`flex min-h-[5rem] items-center justify-center rounded-xl px-4 py-5 mb-4 ${
                      partner.logo.wellClassName ?? "bg-black/25"
                    }`}
                  >
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={partner.logo.className}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 mt-auto">
                    <div className="space-y-2 min-w-0">
                      <p className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                        {partner.name}
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {partner.blurb}
                      </p>
                    </div>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-white/30 group-hover:text-sky-400 transition-colors mt-1"
                      aria-hidden
                    />
                  </div>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="benefits-heading" className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why partner with PlaneWX
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              This is for organizations that want to reach pilots in the middle
              of a real decision, not a weather-app install screen.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
                    <benefit.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{benefit.body}</p>
              </li>
            ))}
          </ul>
          <div className="pt-1">
            <BecomePartnerButton />
          </div>
        </section>

        <section aria-labelledby="program-heading" className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 id="program-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              What a PlaneWX partnership is
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              Strategic, community, and co-marketing work. Not a badge you buy.
              Not a claim that PlaneWX vouches for a flight.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROGRAM.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-2"
              >
                <h3 className="font-semibold text-sky-300">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/40 leading-relaxed max-w-3xl">
            We will list you when the work is real and the copy is honest. We
            will not list you as an endorsement. PlaneWX is a pilot decision
            support system sitting beside the EFB. Weather is the environment.
            It is not the entire risk picture. The PIC still owns the call.
          </p>
        </section>

        <section aria-labelledby="apply-steps-heading" className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 id="apply-steps-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              How to become a partner
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              Four steps. No portal, no points program. Write us, talk it
              through, agree the work, then show up.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-2"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-sky-400/80">{step.n}</p>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <BecomePartnerButton />
            <p className="text-sm text-white/40 sm:pt-3">
              Typical first reply is a human, not a packet.
            </p>
          </div>
        </section>

        <section aria-labelledby="proof-heading" className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 id="proof-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              How we work together
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              Real collaborations already on the record. No invented reach
              numbers. Read the work, then decide if the fit is yours.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROOF.map((item) => (
              <li key={item.name} className="h-full">
                <Link
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400/80">
                    {item.title}
                  </p>
                  <h3 className="mt-2 font-semibold text-white group-hover:text-sky-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed flex-1">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="apply"
          aria-labelledby="apply-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-300 text-sm font-medium">
              <Mail className="h-4 w-4" aria-hidden />
              Apply
            </div>
            <h2 id="apply-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Tell us who you are
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
              The form opens a message to sara@planewx.ai with your note. No
              account, no portal. If mail does not open, write her directly.
            </p>
          </div>
          <PartnerApplyForm />
        </section>

        <section aria-labelledby="faq-heading" className="space-y-5">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Questions we get first
          </h2>
          <dl className="space-y-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:px-6 sm:py-5 space-y-2"
              >
                <dt className="font-semibold text-white">{faq.q}</dt>
                <dd className="text-sm text-white/50 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8 space-y-3 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Built with pilots, for pilots
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl">
            We work with the clubs, brands, and pilots who care about clearer
            go / no-go calls. Partners here collaborate with that community.
            Listing is not an endorsement. The PIC still owns every decision.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 pt-2">
            <BecomePartnerButton />
            <Link
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/5 px-6 py-3 text-sm font-medium transition-all"
            >
              Get PlaneWX
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
