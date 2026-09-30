import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { BlogPostArticle } from "@/components/blog/BlogPostArticle"
import {
  getSoroArticles,
  getSoroArticleBySlug,
  getSoroArticleContent,
} from "@/lib/soro"

export const revalidate = 3600
/** Allow new Soro slugs that were not in generateStaticParams at build time. */
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getSoroArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getSoroArticleBySlug(slug)
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
  const article = await getSoroArticleBySlug(slug)
  if (!article) {
    // Confirmed miss after a no-store list refetch — wait for a real request so
    // Next does not ISR-cache this 404 for revalidate (3600s). A post published
    // minutes later would otherwise stay soft-404 until the hour rolled over.
    await connection()
    notFound()
  }

  const content = await getSoroArticleContent(article.id)

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] text-white">
        <header className="border-b border-white/10 px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300"
            >
              All articles
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/60"
            >
              planewx.ai
            </Link>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-6 py-12 pb-24">
          <p className="text-white/50">
            Content could not be loaded. Please try again later.
          </p>
        </article>
      </div>
    )
  }

  return (
    <BlogPostArticle
      title={article.title}
      excerpt={article.excerpt}
      date={article.date}
      isoDate={article.isoDate}
      image={article.image}
      canonicalUrl={`https://www.planewx.ai/blog/${slug}`}
      contentHtml={content}
    />
  )
}
