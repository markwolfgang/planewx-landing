import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getSoroArticles, getSoroArticleContent } from "@/lib/soro"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getSoroArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const articles = await getSoroArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://www.planewx.ai/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `https://www.planewx.ai/blog/${slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.isoDate,
      images: article.image ? [{ url: article.image }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const articles = await getSoroArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const content = await getSoroArticleContent(article.id)

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/blog"
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
            All articles
          </Link>
          <Link href="/" className="text-xs uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors">
            planewx.ai
          </Link>
        </div>
      </header>

      <article
        className="mx-auto max-w-3xl px-6 py-12 pb-24"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Hero image */}
        {article.image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              itemProp="image"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1
            className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            itemProp="headline"
          >
            {article.title}
          </h1>
          <time
            dateTime={article.isoDate}
            className="text-sm text-white/40"
            itemProp="datePublished"
          >
            {article.date}
          </time>
        </header>

        {/* Body */}
        {content ? (
          <div
            className="prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-white/50">Content could not be loaded. Please try again later.</p>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.isoDate,
              image: article.image || undefined,
              url: `https://www.planewx.ai/blog/${slug}`,
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
