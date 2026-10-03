import type { Metadata } from "next"
import { shouldEmitHubJsonLd } from "../../learn-data"
import Link from "next/link"
import { HubHost } from "../hub-host"
import {
  ARTICLE_JSON_LD,
  DEFINED_TERM_SET_JSON_LD,
  FAQ_JSON_LD,
} from "./json-ld"
import { MAIN_HTML } from "./content"
import "../aw-hub.css"

const TITLE = "Atmospheric Stability for Pilots: Lapse Rates, Inversions, and Convection"
const DESCRIPTION = "What absolute, conditional, and neutral stability mean, how lapse rates and lifting shape clouds and turbulence, what inversions do, and how LI and CAPE show up in convective planning."
const CANONICAL = "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: false },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "PlaneWX",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@planewx",
  },
}

export default function Page() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 500px 400px at 15% 0%, rgba(14,165,233,0.08) 0%, transparent 70%)",
            "linear-gradient(160deg, #0a1628 0%, #0a0f1a 60%, #0d1a2e 100%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1120px] px-5 pt-6">
        <div className="rounded-lg border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100">
          <strong>DRAFT — not published.</strong> Hidden from hub list and sitemap. For Mark review only.
        </div>
      </div>

      <HubHost html={MAIN_HTML} />

      {shouldEmitHubJsonLd() ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(DEFINED_TERM_SET_JSON_LD) }}
          />
        </>
      ) : null}

      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-[1120px] px-5">
          <div className="grid grid-cols-1 justify-center gap-x-10 min-[980px]:grid-cols-[minmax(0,760px)_320px]">
            <div className="min-w-0 space-y-6">
              <p className="text-center text-sm text-white/40">
                <Link href="/learn" className="text-sky-400 hover:text-sky-300">
                  Back to Learning Center
                </Link>
              </p>
              <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-950/40 to-cyan-950/20 px-6 py-10 text-center">
                <p className="mb-5 text-base text-white/70">
                  Ready to put a trip on the briefing board?
                </p>
                <a
                  href="https://app.planewx.ai/auth/sign-up"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:from-sky-400 hover:to-cyan-400 sm:px-8"
                >
                  Try a PlaneWX briefing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
