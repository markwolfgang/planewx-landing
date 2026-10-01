import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * Preview-only expanded blog drafts (r10+). Bodies live in content/blog-preview/
 * and are served at /learn-preview/blog/<slug>. Not linked, not in sitemap,
 * noindex/nofollow. Do not publish these through Soro from this path.
 */

export const BLOG_PREVIEW_SLUGS = [
  "vfr-weather-go-no-go",
  "pave-risk-assessment-weather",
  "personal-minimums-weather-planning",
  "ifr-personal-minimums-low-time-instrument-pilots",
  "leave-early-or-wait-out-weather-vfr-cross-country",
] as const

export type BlogPreviewSlug = (typeof BLOG_PREVIEW_SLUGS)[number]

export function isBlogPreviewSlug(slug: string): slug is BlogPreviewSlug {
  return (BLOG_PREVIEW_SLUGS as readonly string[]).includes(slug)
}

/** True when this deployment should serve /learn-preview/blog/*. */
export function isBlogPreviewAllowedEnv(
  vercelEnv: string | undefined = process.env.VERCEL_ENV
): boolean {
  // Serve on Vercel preview and local/dev. Hard 404 in production.
  return vercelEnv !== "production"
}

export type BlogPreviewMeta = {
  slug: BlogPreviewSlug
  title: string
  excerpt: string
  date: string
  isoDate: string
  image: string
  /** Live blog canonical (for JSON-LD only; preview itself is noindex). */
  liveCanonical: string
  dateModified: string
}

/**
 * Static metadata copied from the live Soro list at port time (read-only).
 * Preview does not call Soro for body or metadata at request time.
 * New r12 posts reuse existing hero images until Soro has its own.
 */
export const BLOG_PREVIEW_META: Record<BlogPreviewSlug, BlogPreviewMeta> = {
  "vfr-weather-go-no-go": {
    slug: "vfr-weather-go-no-go",
    title: "VFR Weather Go No Go: How Pilots Decide",
    excerpt:
      "VFR weather go no go decisions get harder when plans are set. Here's a practical pilot's framework for judging risk before launch day arrives.",
    date: "April 6, 2026",
    isoDate: "2026-04-06T05:00:24.163+00:00",
    image:
      "https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/4703682a-b969-419a-973a-7b3d0151ffc1/cc417c6d-d10f-4621-b305-387f0d4bf37c.webp",
    liveCanonical: "https://www.planewx.ai/blog/vfr-weather-go-no-go",
    dateModified: "2026-09-30",
  },
  "pave-risk-assessment-weather": {
    slug: "pave-risk-assessment-weather",
    title: "PAVE Risk Assessment Weather for Real Trips",
    excerpt:
      "What PAVE stands for in aviation, a practical PAVE checklist for cross-country flying, and how weather leaks into every leg of the PAVE model. Soft bridge to a living FRAT. PIC decides.",
    date: "April 3, 2026",
    isoDate: "2026-04-03T04:35:07.578+00:00",
    image:
      "https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/4703682a-b969-419a-973a-7b3d0151ffc1/f794de9a-a93c-4ca1-8915-6993aabd49d0.webp",
    liveCanonical: "https://www.planewx.ai/blog/pave-risk-assessment-weather",
    dateModified: "2026-09-30",
  },
  "personal-minimums-weather-planning": {
    slug: "personal-minimums-weather-planning",
    title: "Personal Minimums Weather Planning That Holds Up",
    excerpt:
      "Personal minimums weather planning works best before TAF time. Build limits around trend, route, and pressure so your go/no-go calls get easier.",
    date: "April 2, 2026",
    isoDate: "2026-04-02T04:30:26.585+00:00",
    image:
      "https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/4703682a-b969-419a-973a-7b3d0151ffc1/ac6b9286-fc4f-48fa-9509-fd683dc835da.webp",
    liveCanonical:
      "https://www.planewx.ai/blog/personal-minimums-weather-planning",
    dateModified: "2026-09-30",
  },
  "ifr-personal-minimums-low-time-instrument-pilots": {
    slug: "ifr-personal-minimums-low-time-instrument-pilots",
    title: "IFR Personal Minimums for Low-Time Instrument Pilots",
    excerpt:
      "How a newly rated instrument pilot sets IFR personal minimums above the legal ones for ceiling, approach type, wind, ice and storms, and when to lower them.",
    date: "October 1, 2026",
    isoDate: "2026-10-01T12:00:00.000+00:00",
    // Reused from personal-minimums-weather-planning hero.
    image:
      "https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/4703682a-b969-419a-973a-7b3d0151ffc1/ac6b9286-fc4f-48fa-9509-fd683dc835da.webp",
    liveCanonical:
      "https://www.planewx.ai/blog/ifr-personal-minimums-low-time-instrument-pilots",
    dateModified: "2026-10-01",
  },
  "leave-early-or-wait-out-weather-vfr-cross-country": {
    slug: "leave-early-or-wait-out-weather-vfr-cross-country",
    title: "Leave Early or Wait Out the Weather on a VFR Cross-Country?",
    excerpt:
      "Should you depart ahead of weather or wait for it to pass on a VFR cross-country? How to weigh TAF timing, fronts, fog, daylight, fuel and your way out.",
    date: "October 1, 2026",
    isoDate: "2026-10-01T12:00:00.000+00:00",
    // Reused from vfr-weather-go-no-go hero.
    image:
      "https://afocirmbqdxnkyescnev.supabase.co/storage/v1/object/public/featured-images/4703682a-b969-419a-973a-7b3d0151ffc1/cc417c6d-d10f-4621-b305-387f0d4bf37c.webp",
    liveCanonical:
      "https://www.planewx.ai/blog/leave-early-or-wait-out-weather-vfr-cross-country",
    dateModified: "2026-10-01",
  },
}

const ROOT = join(process.cwd(), "content/blog-preview")

/** Read draft HTML as UTF-8 bytes with no rewrite. */
export function readBlogPreviewHtml(slug: BlogPreviewSlug): string {
  return readFileSync(join(ROOT, `${slug}.html`), "utf8")
}

/** Read FAQPage JSON-LD for a preview slug. */
export function readBlogPreviewFaq(
  slug: BlogPreviewSlug
): Record<string, unknown> {
  const raw = readFileSync(join(ROOT, `${slug}.faq.jsonld.json`), "utf8")
  return JSON.parse(raw) as Record<string, unknown>
}
