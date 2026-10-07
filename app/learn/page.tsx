import type { Metadata } from "next"
import Link from "next/link"
import {
  AVIATION_WEATHER_HUB_PAGES,
  DECISION_MAKING_HUB_PAGES,
  LEARN_ARTICLES,
  LEARN_PUBLIC,
  TIPS_EMPTY_LINE,
  getPublishedTips,
  shouldIndexLearnHub,
} from "./learn-data"
import {
  CASE_STUDY_TAGS,
  CASE_STUDY_TAG_ORDER,
  DECISION_GROUP,
  START_HERE_HREFS,
  WEATHER_GROUPS,
} from "./learn-hub-layout"
import { CaseStudyFilter } from "./case-study-filter"

const HUB_TITLE = "Learning Center"
/** Visible H1 only. Metadata title stays HUB_TITLE. */
const HUB_H1 = "PlaneWX Learning Center: Aviation Weather and Pilot Decision Guides"
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

type Entry = {
  href: string
  title: string
  summary: string
  draft?: boolean
}

/** Short card title: the part before the first colon or question mark. */
function shortTitle(title: string): string {
  const colon = title.indexOf(": ")
  if (colon > 0) return title.slice(0, colon)
  const q = title.indexOf("? ")
  if (q > 0) return title.slice(0, q + 1)
  return title
}

function buildCatalog(): Map<string, Entry> {
  const all = new Map<string, Entry>()
  for (const p of [...AVIATION_WEATHER_HUB_PAGES, ...DECISION_MAKING_HUB_PAGES]) {
    all.set(p.href, { href: p.href, title: p.title, summary: p.summary })
  }
  for (const a of LEARN_ARTICLES) {
    const href = `/learn/${a.slug}`
    all.set(href, { href, title: a.title, summary: a.summary, draft: a.draft })
  }
  return all
}

function EntryGrid({ entries }: { entries: Entry[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {entries.map((e) => (
        <li key={e.href}>
          <Link
            href={e.href}
            className="group flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-sky-500/40 hover:bg-white/[0.08]"
          >
            {e.draft ? (
              <span className="self-start rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-amber-300">
                Draft
              </span>
            ) : null}
            <h3 className="text-base font-semibold text-white transition-colors group-hover:text-sky-300">
              {shortTitle(e.title)}
            </h3>
            <p className="line-clamp-2 text-sm text-white/55">{e.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Shelf({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="mb-2 text-2xl font-bold tracking-tight text-white">
        {title}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-white/50">{description}</p>
      {children}
    </section>
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

const JUMP_LINKS = [
  { href: "#section-weather", label: "Weather" },
  { href: "#section-decision-making", label: "Decision making" },
  { href: "#section-case-studies", label: "Accident case studies" },
  { href: "#section-tips", label: "Tips of the Week" },
]

export default function LearnHubPage() {
  const catalog = buildCatalog()
  const used = new Set<string>()
  const take = (hrefs: string[]): Entry[] =>
    hrefs.flatMap((h) => {
      const e = catalog.get(h)
      if (!e) return []
      used.add(h)
      return [e]
    })
  const startHere = START_HERE_HREFS.flatMap((h) => {
    const e = catalog.get(h)
    return e ? [e] : []
  })
  const weatherGroups = WEATHER_GROUPS.map((g) => ({ ...g, entries: take(g.hrefs) })).filter(
    (g) => g.entries.length > 0
  )
  const decision = take(DECISION_GROUP.hrefs)
  const caseStudies = Object.keys(CASE_STUDY_TAGS).flatMap((slug) => {
    const href = `/learn/${slug}`
    const e = catalog.get(href)
    if (!e) return []
    used.add(href)
    return [{ href, title: e.title, summary: e.summary, tags: CASE_STUDY_TAGS[slug] }]
  })
  const more = [...catalog.values()].filter((e) => !used.has(e.href))

  return (
    <>
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

      <section className="px-6 pb-8 pt-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-sky-400">
            PlaneWX
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {HUB_H1}
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

      <nav aria-label="Learning Center sections" className="mx-auto mb-12 max-w-4xl px-6">
        <ul className="flex flex-wrap justify-center gap-2">
          {JUMP_LINKS.map((j) => (
            <li key={j.href}>
              <a
                href={j.href}
                className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-sky-500/40 hover:text-sky-300"
              >
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mx-auto max-w-4xl space-y-16 px-6 pb-8">
        {startHere.length > 0 ? (
          <Shelf
            id="section-start-here"
            title="Start here: weather briefings, FRAT, and risk stacking"
            description="New to the Learning Center? Begin with these three."
          >
            <EntryGrid entries={startHere} />
          </Shelf>
        ) : null}

        <Shelf
          id="section-weather"
          title="Aviation weather guides for pilots"
          description="Plain-language guides to weather products and hazards, sourced from the FAA, NWS, and Aviation Weather Center."
        >
          <div className="space-y-10">
            {weatherGroups.map((g) => (
              <div key={g.id}>
                <h2
                  id={`group-${g.id}`}
                  className="mb-1 text-sm font-semibold uppercase tracking-widest text-sky-400"
                >
                  {g.title}
                </h2>
                <p className="mb-4 text-sm text-white/45">{g.description}</p>
                <EntryGrid entries={g.entries} />
              </div>
            ))}
          </div>
        </Shelf>

        <Shelf
          id="section-decision-making"
          title={DECISION_GROUP.title}
          description={DECISION_GROUP.description}
        >
          <EntryGrid entries={decision} />
        </Shelf>

        {caseStudies.length > 0 ? (
          <Shelf
            id="section-case-studies"
            title="Accident case studies"
            description="Real accidents from AOPA Air Safety Institute case studies and NTSB final reports. Filter by what went wrong."
          >
            <CaseStudyFilter cards={caseStudies} tags={CASE_STUDY_TAG_ORDER} />
          </Shelf>
        ) : null}

        {more.length > 0 ? (
          <Shelf id="section-more" title="More" description="Other explainers.">
            <EntryGrid entries={more} />
          </Shelf>
        ) : null}

        <section aria-labelledby="section-tips" className="scroll-mt-24">
          <h2
            id="section-tips"
            className="mb-2 text-2xl font-bold tracking-tight text-white"
          >
            Weekly PIREP tips on aviation weather and ADM
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/50">
            Archive of Weekly PIREP weather and ADM tips.
          </p>
          <TipsArchive />
        </section>
      </main>

      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-950/40 to-cyan-950/20 px-6 py-10 text-center">
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
      </section>
    </>
  )
}
