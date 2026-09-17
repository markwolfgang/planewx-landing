import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partners who help pilots fly safer. PlaneWX works with aviation organizations and companies that support general aviation decision support.",
  openGraph: {
    title: "Partners | PlaneWX",
    description:
      "Partners who help pilots fly safer. Meet the organizations working alongside PlaneWX for general aviation.",
    type: "website",
    url: "https://www.planewx.ai/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | PlaneWX",
    description:
      "Partners who help pilots fly safer. Meet the organizations working alongside PlaneWX for general aviation.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/partners",
  },
}

const PARTNERS = [
  {
    name: "5X5 Aviation Insurance",
    href: "https://www.5x5insurance.com",
    logo: {
      src: "/partners/5x5-white.png",
      alt: "5X5 Aviation Insurance logo",
      width: 2500,
      height: 613,
      className: "h-10 sm:h-12 w-auto max-w-full object-contain",
    },
    blurb:
      "Aviation insurance partner working with PlaneWX so pilots can keep their decision support and their coverage in the same flight picture.",
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    logo: {
      src: "/partners/flight-chops.png",
      alt: "Flight Chops logo",
      width: 800,
      height: 766,
      className: "h-16 sm:h-20 w-auto max-w-full object-contain",
    },
    blurb:
      "Training and storytelling that put real pilot decision-making on camera. A PlaneWX partner helping more pilots brief with intent.",
  },
  {
    name: "EAA",
    href: "https://www.eaa.org",
    logo: {
      // White mark for dark DSS background; color master also shipped at /partners/eaa.png
      src: "/partners/eaa-white.png",
      alt: "Experimental Aircraft Association (EAA) logo",
      width: 861,
      height: 492,
      className: "h-12 sm:h-14 w-auto max-w-full object-contain",
    },
    blurb:
      "Experimental Aircraft Association. Supporting the builders, restorers, and pilots who keep general aviation moving.",
  },
  {
    name: "AOPA",
    href: "https://www.aopa.org",
    logo: {
      src: "/partners/aopa.png",
      alt: "Aircraft Owners and Pilots Association (AOPA) logo",
      width: 900,
      height: 548,
      className: "h-12 sm:h-14 w-auto max-w-full object-contain",
    },
    blurb:
      "Aircraft Owners and Pilots Association. Advocating for GA pilots and the freedom to fly.",
  },
  {
    name: "Veterans Airlift Command",
    href: "https://www.veteransairlift.org",
    logo: {
      src: "/partners/vac.png",
      alt: "Veterans Airlift Command logo",
      width: 712,
      height: 232,
      className: "h-10 sm:h-12 w-auto max-w-full object-contain",
    },
    blurb:
      "Connecting wounded veterans and their families with free air transportation through volunteer pilots and aircraft owners.",
  },
] as const

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1f3c] to-[#0a0f1a]" />
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-2 h-px bg-[#3B82F6]/40"
          aria-hidden
        />
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-[#3B82F6]/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PlaneWX home">
            <BrandLogo variant="wordmarkTransparent" className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <header className="space-y-4 text-center sm:text-left max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Partners
          </h1>
          <p className="text-lg sm:text-xl text-white/65 leading-relaxed">
            Partners who help pilots fly safer.
          </p>
          <p className="text-sm sm:text-base text-white/45 leading-relaxed">
            PlaneWX is a pilot decision support system. We work alongside
            organizations and companies that serve general aviation. Listing
            here means collaboration or shared community, not an endorsement of
            PlaneWX by any partner.
          </p>
        </header>

        <section aria-labelledby="partners-grid-heading" className="space-y-6">
          <h2 id="partners-grid-heading" className="sr-only">
            Partner organizations
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="h-full">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <div className="flex min-h-[5.5rem] items-center justify-center rounded-xl bg-white/[0.04] px-4 py-5 mb-5">
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

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8 space-y-3 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Built for the pilot in command
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl">
            Partners help the ecosystem around PlaneWX. The PIC still owns every
            go / no-go call. PlaneWX exists to make that call clearer.
          </p>
          <div className="pt-2">
            <Link
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
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
