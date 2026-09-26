import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { NewsNav } from "@/components/news-nav"
import {
  LEARN_PUBLIC,
  LEARN_SECTIONS,
  TIPS_EMPTY_LINE,
  getArticlesBySection,
  getPublishedTips,
  shouldIndexLearnHub,
  type LearnSection,
} from "./learn-data"

const HUB_TITLE = "Learning Center"
const HUB_DESCRIPTION =
  "Learn the weather products, concepts, and decision habits professional pilots rely on. Plain-language explainers, sourced from the FAA, NWS, and Aviation Weather Center."
const CANONICAL = "https://www.planewx.ai/learn"

export const metadata: Metadata = {
  title: HUB_TITLE,
  description: HUB_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: shouldIndexLearnHub()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: `${HUB_TITLE} | PlaneWX`,
    description: HUB_DESCRIPTION,
    siteName: "PlaneWX",
  },
  twitter: {
    card: "summary",
    title: `${HUB_TITLE} | PlaneWX`,
    description: HUB_DESCRIPTION,
    creator: "@planewx",
  },
}

function SectionArticles({ section }: { section: LearnSection }) {
  const articles = getArticlesBySection(section)

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center">
        <p className="text-sm font-medium text-white/50">Coming soon</p>
        <p className="mt-2 text-sm text-white/35">
          Sourced explainers for this section are on the way.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={`/learn/${article.slug}`}
            className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-sky-500/40 hover:bg-white/[0.08]"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {article.draft ? (
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-amber-300">
                  Draft
                </span>
              ) : null}
              <span className="text-white/40">
                Reviewed {article.lastReviewed}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-sky-300">
              {article.title}
            </h3>
            <p className="text-sm text-white/55">{article.summary}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 group-hover:text-sky-300">
              Read article
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function TipsArchive() {
  const tips = getPublishedTips()

  if (tips.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-8">
        <p className="text-sm text-white/50">{TIPS_EMPTY_LINE}</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {tips.map((tip) => (
        <li
          key={tip.slug}
          className="rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <div className="mb-2 flex items-center gap-3 text-xs text-white/40">
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-sky-300">
              Issue #{tip.issueNumber}
            </span>
            <time dateTime={tip.isoDate}>{tip.date}</time>
          </div>
          <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
          <p className="mt-2 text-sm text-white/55">{tip.summary}</p>
          {tip.body.some((b) => b.type === "paragraph" && b.text.includes("https://app.planewx.ai/help/wx-score")) ? (
            <p className="mt-3 text-sm">
              <a
                href="https://app.planewx.ai/help/wx-score"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
              >
                More in the WX Score guide.
              </a>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export default function LearnHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 500px at 20% 0%, rgba(14,165,233,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 400px at 80% 100%, rgba(6,182,212,0.06) 0%, transparent 70%)",
            "linear-gradient(160deg, #0a1628 0%, #0a0f1a 55%, #0d1a2e 100%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      <NewsNav
        maxWidthClass="max-w-5xl"
        back={{ href: "/", label: "Home" }}
      />

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-sky-400">
            PlaneWX
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {HUB_TITLE}
          </h1>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            {HUB_DESCRIPTION}
          </p>
          {!LEARN_PUBLIC ? (
            <p className="mt-4 text-xs text-amber-300/80">
              Preview only. Not indexed while content is thin or in draft.
            </p>
          ) : null}
        </div>
      </section>

      <main className="mx-auto max-w-3xl space-y-16 px-6 pb-8">
        {LEARN_SECTIONS.map((section) => {
          const sectionId = `section-${section.id.toLowerCase().replace(/\s+/g, "-")}`
          return (
          <section key={section.id} aria-labelledby={sectionId}>
            <h2
              id={sectionId}
              className="mb-2 text-2xl font-bold tracking-tight text-white"
            >
              {section.id}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {section.description}
            </p>
            <SectionArticles section={section.id} />
          </section>
          )
        })}

        <section aria-labelledby="section-tips">
          <h2
            id="section-tips"
            className="mb-2 text-2xl font-bold tracking-tight text-white"
          >
            Tips of the Week
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/50">
            Archive of Weekly PIREP weather and ADM tips.
          </p>
          <TipsArchive />
        </section>
      </main>

      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-950/40 to-cyan-950/20 px-6 py-10 text-center">
          <p className="mb-5 text-base text-white/70">
            Ready to put a trip on the briefing board?
          </p>
          <a
            href="https://app.planewx.ai"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:from-sky-400 hover:to-cyan-400 sm:px-8"
          >
            Try a PlaneWX briefing
            <ArrowRight className="ml-2 h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  )
}
