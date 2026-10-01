import Image from "next/image"
import Link from "next/link"

export type BlogPostArticleProps = {
  title: string
  excerpt: string
  date: string
  isoDate: string
  image?: string | null
  /** Canonical URL used in BlogPosting JSON-LD (live blog URL). */
  canonicalUrl: string
  /** HTML body (Soro-safe tags). Injected as articleBody. */
  contentHtml: string
  /** Optional FAQPage JSON-LD object. */
  faqJsonLd?: Record<string, unknown> | null
  /** Extra BlogPosting fields (e.g. dateModified). */
  dateModified?: string
  /** Back-link label/href override for preview chrome. */
  backHref?: string
  backLabel?: string
}

/**
 * Presentational blog article chrome shared by the live /blog/[slug] page and
 * the preview-only /learn-preview/blog/[slug] draft viewer.
 */
export function BlogPostArticle({
  title,
  excerpt,
  date,
  isoDate,
  image,
  canonicalUrl,
  contentHtml,
  faqJsonLd,
  dateModified,
  backHref = "/blog",
  backLabel = "All articles",
}: BlogPostArticleProps) {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300"
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
            {backLabel}
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/60"
          >
            planewx.ai
          </Link>
        </div>
      </header>

      <article
        className="mx-auto max-w-3xl px-6 py-12 pb-24"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {image ? (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
              /* Cap was 768px which under-fetched on 1280/2x and left a flat
                 placeholder; size to the article column with headroom. */
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 896px, 1024px"
              itemProp="image"
            />
          </div>
        ) : null}

        <header className="mb-8">
          <h1
            className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            itemProp="headline"
          >
            {title}
          </h1>
          <time
            dateTime={isoDate}
            className="text-sm text-white/40"
            itemProp="datePublished"
          >
            {date}
          </time>
        </header>

        <div
          className="prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description: excerpt,
              datePublished: isoDate,
              ...(dateModified ? { dateModified } : {}),
              image: image || undefined,
              url: canonicalUrl,
              publisher: {
                "@type": "Organization",
                name: "PlaneWX",
                url: "https://www.planewx.ai",
              },
            }),
          }}
        />

        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd),
            }}
          />
        ) : null}
      </article>
    </div>
  )
}
