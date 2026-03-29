const SORO_TOKEN = '732fc303-3b9b-4f2b-a629-ca12722565ce'
const SORO_API_BASE = 'https://app.trysoro.com'

export interface SoroArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string | null
  date: string
  isoDate: string
  image: string
}

/**
 * Fetch the article list from the Soro embed script.
 * The script embeds SORO_ARTICLES as a JSON literal — we parse it out.
 * Cached for 1 hour on the CDN (ISR-compatible).
 */
export async function getSoroArticles(): Promise<SoroArticle[]> {
  try {
    const script = await fetch(
      `${SORO_API_BASE}/api/embed/${SORO_TOKEN}?theme=dark`,
      { next: { revalidate: 3600 } }
    ).then(r => r.text())

    const match = script.match(/var SORO_ARTICLES = (\[[\s\S]*?\]);/)
    if (!match) return []
    return JSON.parse(match[1]) as SoroArticle[]
  } catch {
    return []
  }
}

/**
 * Fetch full HTML content for a single article by its UUID.
 * Cached for 1 hour.
 */
export async function getSoroArticleContent(articleId: string): Promise<string | null> {
  try {
    const data = await fetch(
      `${SORO_API_BASE}/api/embed/${SORO_TOKEN}/article/${articleId}`,
      { next: { revalidate: 3600 } }
    ).then(r => r.json())
    return data?.content ?? null
  } catch {
    return null
  }
}
