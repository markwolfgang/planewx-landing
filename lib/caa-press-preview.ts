import fs from "fs"
import path from "path"
import matter from "gray-matter"

const SOURCE_PATH = path.join(
  process.cwd(),
  "content/unpublished/caa-fuel-provider-partner.md",
)

export type CaaPressPreview = {
  title: string
  subhead: string
  date: string
  isoDate: string
  location: string
  partnerBlurb: string
  bodyHtml: string
}

/**
 * Preview is for Vercel Preview deployments (SSO-protected) and local review.
 * Production always fail-closes.
 */
export function isCaaPressPreviewAllowed(): boolean {
  if (process.env.VERCEL_ENV === "production") return false
  return true
}

export function loadCaaPressPreview(): CaaPressPreview {
  const raw = fs.readFileSync(SOURCE_PATH, "utf8")
  const { data, content } = matter(raw)
  const bodyHtml = content
    // Drop HTML comments (internal notes) from the rendered article.
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim()

  return {
    title: String(data.title ?? ""),
    subhead: String(data.subhead ?? ""),
    date: String(data.date ?? ""),
    isoDate: String(data.isoDate ?? ""),
    location: String(data.location ?? ""),
    partnerBlurb: String(data.partnerBlurb ?? ""),
    bodyHtml,
  }
}
