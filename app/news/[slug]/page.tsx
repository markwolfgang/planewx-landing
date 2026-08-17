import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BrandLogo } from "@/components/shared/brand-logo"
import { NEWS_ITEMS, getNewsItem } from "../news-data"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) return {}

  return {
    title: `${item.title} — PlaneWX Newsroom`,
    description: item.excerpt,
    alternates: { canonical: `https://www.planewx.ai/news/${slug}` },
    openGraph: {
      type: "article",
      url: `https://www.planewx.ai/news/${slug}`,
      title: item.title,
      description: item.excerpt,
      publishedTime: item.isoDate,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) notFound()

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All news
          </Link>
          <Link href="/" className="text-xs uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors">
            planewx.ai
          </Link>
        </div>
      </header>

      <article
        className="mx-auto max-w-3xl px-6 py-12 pb-24"
        itemScope
        itemType="https://schema.org/NewsArticle"
      >
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-sky-300">
              {item.category}
            </span>
            <time dateTime={item.isoDate} className="text-white/40" itemProp="datePublished">
              {item.date}
            </time>
          </div>
          {(item.category === "Press Release" || item.category === "Partnerships") && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              For Immediate Release
            </p>
          )}
          <h1
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            itemProp="headline"
          >
            {item.title}
          </h1>
          <p className="text-lg leading-relaxed text-white/70">{item.excerpt}</p>
        </header>

        {/* Co-branded lockup — both marks on one row, ours first */}
        {item.coBrand && (
          <div className="mb-10 flex items-center justify-center gap-5 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-6 sm:gap-8">
            <BrandLogo
              variant="wordmarkTransparent"
              className="h-7 w-auto sm:h-8"
              alt="PlaneWX"
            />
            <span aria-hidden="true" className="text-lg font-light leading-none text-white/25">
              +
            </span>
            <Image
              src={item.coBrand.logo}
              alt={item.coBrand.name}
              width={item.coBrand.logoWidth}
              height={item.coBrand.logoHeight}
              className="h-8 w-auto sm:h-9"
            />
          </div>
        )}

        {/*
          Body. The body HTML carries its own curly quotes, and
          @tailwindcss/typography adds open-quote/close-quote on blockquote
          paragraphs — content-none drops the CSS pair so pull quotes don't
          render as doubled quotation marks.
        */}
        <div
          className="prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-sky-500/50 prose-blockquote:text-white/80 prose-cite:text-white/50 prose-cite:not-italic [&_blockquote_p::before]:content-none [&_blockquote_p::after]:content-none"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: item.title,
              description: item.excerpt,
              datePublished: item.isoDate,
              url: `https://www.planewx.ai/news/${slug}`,
              publisher: {
                "@type": "Organization",
                name: "PlaneWX",
                url: "https://www.planewx.ai",
              },
            }),
          }}
        />
      </article>
    </div>
  )
}
