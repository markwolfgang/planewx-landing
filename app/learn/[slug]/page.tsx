import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { NewsNav } from "@/components/news-nav"
import {
  LEARN_ARTICLES,
  LEARN_DISCLAIMER,
  LEARN_DRAFT_BANNER,
  getLearnArticle,
  shouldEmitArticleJsonLd,
  shouldIndexLearnArticle,
  type LearnBodyBlock,
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
              ← Back to Learning Center
            </Link>
          </p>
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-950/40 to-cyan-950/20 px-6 py-10 text-center">
            <p className="mb-5 text-base text-white/70">
              Ready to put a trip on the briefing board?
            </p>
            <a
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:from-sky-400 hover:to-cyan-400"
            >
              Try a PlaneWX briefing
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
