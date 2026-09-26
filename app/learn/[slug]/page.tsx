import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NewsNav } from "@/components/news-nav"
import {
  LEARN_ARTICLES,
  LEARN_DISCLAIMER,
  LEARN_DRAFT_BANNER,
  LEARN_LOOP_STAGES,
  getLearnArticle,
  shouldEmitArticleJsonLd,
  shouldIndexLearnArticle,
  type LearnBodyBlock,
  type LearnLoopStage,
  type PuttingItIntoPractice,
} from "../learn-data"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getLearnArticle(slug)
  if (!article) return {}

  const title = `${article.title} · Learning Center`
  const description = article.summary
  const canonical = `https://www.planewx.ai/learn/${slug}`
  const indexable = shouldIndexLearnArticle(article)

  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description,
      siteName: "PlaneWX",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description,
      creator: "@planewx",
    },
  }
}

function BodyBlocks({ blocks }: { blocks: LearnBodyBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-white/75">
      {blocks.map((block, i) => {
        if (block.type === "htmlComment") {
          return (
            <div
              key={i}
              className="hidden"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: `<!-- ${block.text} -->` }}
            />
          )
        }
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="pt-2 text-xl font-semibold tracking-tight text-white"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-white/70">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}

function LoopStageIndicator({ active }: { active: LearnLoopStage[] }) {
  const activeSet = new Set(active)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-widest text-white/40">
        Decision loop
      </p>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {LEARN_LOOP_STAGES.map((stage, index) => {
          const isOn = activeSet.has(stage)
          return (
            <li
              key={stage}
              className={`relative rounded-lg border px-2.5 py-3 text-center transition-colors ${
                isOn
                  ? "border-sky-400/50 bg-sky-500/15 text-sky-100"
                  : "border-white/10 bg-white/[0.03] text-white/35"
              }`}
            >
              <span
                className={`mb-1 block text-[10px] font-semibold uppercase tracking-wider ${
                  isOn ? "text-sky-300/80" : "text-white/25"
                }`}
              >
                {index + 1}
              </span>
              <span className="block whitespace-nowrap text-[11px] font-medium leading-snug sm:text-[13px]">
                {stage}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="text-xs text-white/35">
        Mentor is an optional layer on any step, not a fifth stage.
      </p>
    </div>
  )
}

function PuttingItIntoPracticeSection({
  practice,
  draft,
}: {
  practice: PuttingItIntoPractice
  draft: boolean
}) {
  return (
    <section
      aria-labelledby="practice-heading"
      className="mt-12 border-t border-white/10 pt-8"
    >
      <h2
        id="practice-heading"
        className="mb-4 text-xl font-semibold tracking-tight text-white"
      >
        Putting it into practice
      </h2>

      {draft ? (
        <div
          role="status"
          className="mb-5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center text-xs font-semibold tracking-wide text-amber-200"
        >
          {LEARN_DRAFT_BANNER}
        </div>
      ) : null}

      <div className="space-y-6 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
            Why it matters
          </h3>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            {practice.whyItMatters}
          </p>
        </div>

        <LoopStageIndicator active={practice.loopStage} />

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
            Tool or habit
          </h3>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            {practice.toolOrHabit}
          </p>
        </div>

        {practice.screenshot ? (
          <figure className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
            <Image
              src={practice.screenshot.src}
              alt={practice.screenshot.alt}
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </figure>
        ) : null}
      </div>
    </section>
  )
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getLearnArticle(slug)
  if (!article) notFound()

  const canonical = `https://www.planewx.ai/learn/${slug}`
  const emitJsonLd = shouldEmitArticleJsonLd(article)

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
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

      <NewsNav
        maxWidthClass="max-w-3xl"
        back={{ href: "/learn", label: "Learning Center" }}
      />

      <article className="mx-auto max-w-3xl px-6 py-12 pb-16">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-sky-300">
              {article.section}
            </span>
            <time dateTime={article.lastReviewed} className="text-white/40">
              Last reviewed {article.lastReviewed}
            </time>
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-white/65">
            {article.summary}
          </p>
        </header>

        {article.draft ? (
          <div
            role="status"
            className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm font-semibold tracking-wide text-amber-200"
          >
            {LEARN_DRAFT_BANNER}
          </div>
        ) : null}

        <BodyBlocks blocks={article.body} />

        <PuttingItIntoPracticeSection
          practice={article.puttingItIntoPractice}
          draft={article.draft}
        />

        <section
          aria-labelledby="sources-heading"
          className="mt-12 border-t border-white/10 pt-8"
        >
          <h2
            id="sources-heading"
            className="mb-4 text-lg font-semibold text-white"
          >
            Sources
          </h2>
          <ul className="space-y-3">
            {article.sources.map((source, i) => (
              <li key={i} className="text-sm text-white/70">
                <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-white/50">
                  {source.publisher}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-white/45">
            {LEARN_DISCLAIMER}
          </p>
        </section>

        {emitJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                description: article.summary,
                dateModified: article.lastReviewed,
                url: canonical,
                author: {
                  "@type": "Organization",
                  name: "PlaneWX",
                  url: "https://www.planewx.ai",
                },
                publisher: {
                  "@type": "Organization",
                  name: "PlaneWX",
                  url: "https://www.planewx.ai",
                },
              }),
            }}
          />
        ) : null}
      </article>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-6">
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
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:from-sky-400 hover:to-cyan-400 sm:px-8"
            >
              Try a PlaneWX briefing
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
