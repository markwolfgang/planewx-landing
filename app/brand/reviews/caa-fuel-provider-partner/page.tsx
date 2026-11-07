import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  isCaaPressPreviewAllowed,
  loadCaaPressPreview,
} from "@/lib/caa-press-preview"

// Request-time gate so production never serves this brand path.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "CAA press release (brand review) | PlaneWX Brand Portal",
  description:
    "Brand-portal review of the CAA fuel provider partner press release. Public article is at /news/caa-fuel-provider-partner.",
  robots: { index: false, follow: false },
}

/**
 * Brand-portal review render of the CAA press release (same copy as NEWS_ITEMS).
 * - Public Newsroom: /news/caa-fuel-provider-partner
 * - This path: Vercel Preview (SSO) + brand password when set; production 404.
 */
export default function CaaPressPreviewPage() {
  if (!isCaaPressPreviewAllowed()) notFound()

  const item = loadCaaPressPreview()

  return (
    <article className="max-w-3xl space-y-8">
      <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
        <p className="font-semibold tracking-wide uppercase text-sky-200 text-xs mb-1">
          Brand review
        </p>
        <p className="text-sky-100/80 leading-relaxed">
          Same copy as the public Newsroom article at{" "}
          <code className="text-sky-200">/news/caa-fuel-provider-partner</code>.
          This brand path is preview-only (production returns 404).
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
