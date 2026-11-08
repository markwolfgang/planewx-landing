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
 * Fail closed: allow only when VERCEL_ENV === "preview", or when
 * NODE_ENV === "development" and VERCEL_ENV is unset. Deny production,
 * unknown VERCEL_ENV values, and unset VERCEL_ENV outside development.
 * Public news lives at /news.
 */
export function isCaaPressPreviewAllowed(): boolean {
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv === "preview") return true
  if (vercelEnv === undefined && process.env.NODE_ENV === "development") {
    return true
  }
  return false
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
