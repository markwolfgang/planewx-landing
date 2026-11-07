import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  isCaaPressPreviewAllowed,
  loadCaaPressPreview,
} from "@/lib/caa-press-preview"

// Request-time gate so production never serves baked HTML for this draft.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "CAA press release (draft review) | PlaneWX Brand Portal",
  description:
    "Private draft review of the CAA fuel provider partner press release. Not published.",
  robots: { index: false, follow: false },
}

/**
 * Draft review render for the CAA press release.
 * - Not in NEWS_ITEMS / /news routes / sitemap / feeds.
 * - Production (VERCEL_ENV=production) → 404.
 * - Preview deployments are behind Vercel Deployment Protection (SSO).
 * - Path is under /brand, which also uses the brand-portal password when set.
 */
export default function CaaPressPreviewPage() {
  if (!isCaaPressPreviewAllowed()) notFound()

  const item = loadCaaPressPreview()

  return (
    <article className="max-w-3xl space-y-8">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        <p className="font-semibold tracking-wide uppercase text-amber-200 text-xs mb-1">
          Draft review only
        </p>
        <p className="text-amber-100/80 leading-relaxed">
          Private preview of an unpublished press release. Not listed in the
          public Newsroom. Production returns 404 for this path. Do not treat
          this as a published announcement.
        </p>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-sky-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-sky-300">
            Partnerships
          </span>
          <time dateTime={item.isoDate} className="text-white/40">
            {item.date}
          </time>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          For Immediate Release
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
          {item.title}
        </h1>
        <p className="text-lg leading-relaxed text-white/70">{item.subhead}</p>
      </header>

      <div
        className="prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-sky-500/50 prose-blockquote:text-white/80 prose-cite:text-white/50 prose-cite:not-italic [&_blockquote_p::before]:content-none [&_blockquote_p::after]:content-none"
        dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
      />
    </article>
  )
}
