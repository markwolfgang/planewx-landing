import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostArticle } from "@/components/blog/BlogPostArticle"
import {
  BLOG_PREVIEW_META,
  BLOG_PREVIEW_SLUGS,
  isBlogPreviewAllowedEnv,
  isBlogPreviewSlug,
  readBlogPreviewFaq,
  readBlogPreviewHtml,
  type BlogPreviewSlug,
} from "@/lib/blog-preview"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  // Still generate the three preview pages at build time; production runtime
  // returns 404 via isBlogPreviewAllowedEnv.
  return BLOG_PREVIEW_SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!isBlogPreviewAllowedEnv() || !isBlogPreviewSlug(slug)) {
    return { robots: { index: false, follow: false } }
  }
  const meta = BLOG_PREVIEW_META[slug]
  return {
    title: `${meta.title} (draft preview)`,
    description: meta.excerpt,
    robots: { index: false, follow: false },
    alternates: {
      // Point at live canonical for clarity; page itself is noindex.
      canonical: meta.liveCanonical,
    },
    openGraph: {
      type: "article",
      url: meta.liveCanonical,
      title: meta.title,
      description: meta.excerpt,
      publishedTime: meta.isoDate,
      images: meta.image ? [{ url: meta.image }] : [],
    },
  }
}

export default async function BlogPreviewPage({ params }: Props) {
  if (!isBlogPreviewAllowedEnv()) {
    notFound()
  }

  const { slug } = await params
  if (!isBlogPreviewSlug(slug)) {
    notFound()
  }

  const previewSlug = slug as BlogPreviewSlug
  const meta = BLOG_PREVIEW_META[previewSlug]
  const contentHtml = readBlogPreviewHtml(previewSlug)
  const faqJsonLd = readBlogPreviewFaq(previewSlug)

  return (
    <BlogPostArticle
      title={meta.title}
      excerpt={meta.excerpt}
      date={meta.date}
      isoDate={meta.isoDate}
      image={meta.image}
      canonicalUrl={meta.liveCanonical}
      contentHtml={contentHtml}
      faqJsonLd={faqJsonLd}
      dateModified={meta.dateModified}
      backHref="/learn"
      backLabel="Learning Center (preview drafts)"
    />
  )
}
