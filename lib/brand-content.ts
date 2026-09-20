import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { STATS } from "@/components/shared/landing-data"

const BRAND_CONTENT_DIR = path.join(process.cwd(), "content/brand")

type StatsKey = keyof typeof STATS

/**
 * Load a Brand Portal content document from content/brand/<slug>.md.
 * Frontmatter is the structured source of truth; optional markdown body is
 * available as `body` for long-form prose sections.
 */
export function loadBrandContent<T extends Record<string, unknown>>(
  slug: string
): T & { body: string } {
  const fullPath = path.join(BRAND_CONTENT_DIR, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(raw)
  return {
    ...(data as T),
    body: content.trim(),
  }
}

/** Replace {{stats.key}} placeholders with live community stats. */
export function withStats(text: string): string {
  return text.replace(/\{\{stats\.(\w+)\}\}/g, (_match, key: string) => {
    const value = STATS[key as StatsKey]
    return value == null ? `{{stats.${key}}}` : String(value)
  })
}

/** Deep-walk strings in content structures and apply withStats. */
export function withStatsDeep<T>(value: T): T {
  if (typeof value === "string") return withStats(value) as T
  if (Array.isArray(value)) return value.map((item) => withStatsDeep(item)) as T
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = withStatsDeep(v)
    }
    return out as T
  }
  return value
}
