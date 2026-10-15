import type { Metadata } from "next"
import Link from "next/link"
import { YouTubeFacade } from "@/components/shared/youtube-facade"
import * as post from "@/lib/blog-posts/cross-check-pilot-weather-briefing"

const PROSE =
  "prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline"

const URL = `https://www.planewx.ai/blog/${post.slug}`

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: post.title,
    description: post.description,
    publishedTime: post.isoDate,
  },
}

export default function CrossCheckPilotWeatherBriefingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
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
        <header className="mb-8">
          <h1
            className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            itemProp="headline"
          >
            {post.h1}
          </h1>
          <time dateTime={post.isoDate} className="text-sm text-white/40" itemProp="datePublished">
            {post.date}
          </time>
        </header>

        <div itemProp="articleBody">
          <div
            className={PROSE}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <figure className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
              <YouTubeFacade
                videoId={post.video.id}
                title={post.video.title}
                embedParams="autoplay=1&rel=0"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <figcaption className="mt-2 text-xs text-white/45">
              Watch: Claude cross-checks a PlaneWX briefing against ForeFlight.
            </figcaption>
          </figure>
          <div
            className={PROSE}
            dangerouslySetInnerHTML={{ __html: post.htmlAfterVideo }}
          />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.h1,
              description: post.description,
              datePublished: post.isoDate,
              author: { "@type": "Person", name: "Mark Wolfgang" },
              url: URL,
              publisher: { "@type": "Organization", name: "PlaneWX", url: "https://www.planewx.ai" },
            }),
          }}
        />
        {post.faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqJsonLd) }}
          />
        ) : null}
      </article>
    </div>
  )
}
