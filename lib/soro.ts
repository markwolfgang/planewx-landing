const SORO_TOKEN = '732fc303-3b9b-4f2b-a629-ca12722565ce'
const SORO_API_BASE = 'https://app.trysoro.com'

/** Data-cache tags for on-demand revalidation (see app/api/revalidate/route.ts). */
export const SORO_ARTICLES_TAG = 'soro-articles'
export const SORO_ARTICLE_CONTENT_TAG = 'soro-article-content'

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

async function fetchSoroArticles(): Promise<SoroArticle[]> {
  try {
    const script = await fetch(
      `${SORO_API_BASE}/api/embed/${SORO_TOKEN}?theme=dark`,
      { next: { revalidate: 3600, tags: [SORO_ARTICLES_TAG] } }
    ).then((r) => r.text())

    const match = script.match(/var SORO_ARTICLES = (\[[\s\S]*?\]);/)
    if (!match) return []
    return JSON.parse(match[1]) as SoroArticle[]
  } catch {
    return []
  }
}

/**
 * Fetch the article list from the Soro embed script.
 * The script embeds SORO_ARTICLES as a JSON literal — we parse it out.
 * Cached for 1 hour on the CDN (ISR-compatible), tagged for on-demand purge.
 */
export async function getSoroArticles(): Promise<SoroArticle[]> {
  return fetchSoroArticles()
}

/**
 * Resolve a single article by slug.
 *
 * Soro has no public slug endpoint — only the embed list + UUID content API.
 * Uses the same ISR-tagged list fetch as getSoroArticles. Do not opt this
 * helper into an uncached fetch: on an ISR /blog/[slug] route that forces
 * "static to dynamic at runtime" and returns HTTP 500 for unknown slugs.
 * After publishing a new Soro post, hit /api/revalidate (or wait for the
 * 3600s list revalidate) so the slug is present before the first request.
 */
export async function getSoroArticleBySlug(slug: string): Promise<SoroArticle | null> {
  const articles = await fetchSoroArticles()
  return articles.find((a) => a.slug === slug) ?? null
}

/**
 * Fetch full HTML content for a single article by its UUID.
 * Cached for 1 hour, tagged for on-demand purge.
 */
export async function getSoroArticleContent(articleId: string): Promise<string | null> {
  try {
    const data = await fetch(
      `${SORO_API_BASE}/api/embed/${SORO_TOKEN}/article/${articleId}`,
      {
        next: {
          revalidate: 3600,
          tags: [SORO_ARTICLE_CONTENT_TAG, `${SORO_ARTICLE_CONTENT_TAG}:${articleId}`],
        },
      }
    ).then((r) => r.json())
    return data?.content ?? null
  } catch {
    return null
  }
}
