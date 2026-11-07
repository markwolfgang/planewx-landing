import { getNewsItem } from "@/app/news/news-data"

export type CaaPressPreview = {
  title: string
  subhead: string
  date: string
  isoDate: string
  location: string
  bodyHtml: string
}

/**
 * Brand-portal review render of the published CAA news article.
 * Available on Vercel Preview (SSO) and local review only.
 * Production always fail-closes this brand path; public news lives at /news.
 */
export function isCaaPressPreviewAllowed(): boolean {
  if (process.env.VERCEL_ENV === "production") return false
  return true
}

export function loadCaaPressPreview(): CaaPressPreview {
  const item = getNewsItem("caa-fuel-provider-partner")
  if (!item) {
    throw new Error("CAA press release missing from NEWS_ITEMS")
  }

  return {
    title: item.title,
    subhead: item.excerpt,
    date: item.date,
    isoDate: item.isoDate,
    location: item.location ?? "",
    bodyHtml: item.body.trim(),
  }
}
