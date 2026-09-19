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

type ArticlesCacheMode = 'default' | 'no-store'

function articlesFetchInit(mode: ArticlesCacheMode): RequestInit {
  if (mode === 'no-store') {
    return { cache: 'no-store' }
  }
  return { next: { revalidate: 3600, tags: [SORO_ARTICLES_TAG] } }
}

async function fetchSoroArticles(mode: ArticlesCacheMode): Promise<SoroArticle[]> {
  try {
    const script = await fetch(
      `${SORO_API_BASE}/api/embed/${SORO_TOKEN}?theme=dark`,
      articlesFetchInit(mode)
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
  return fetchSoroArticles('default')
}

/**
 * Resolve a single article by slug.
 *
 * Soro has no public slug endpoint — only the embed list + UUID content API.
 * If the long-lived list cache is stale and omits a newly published slug, we
 * refetch with cache: 'no-store' before treating it as missing. That stops the
 * index from linking to a slug whose page ISR-cached a 404 for up to 1h.
 */
export async function getSoroArticleBySlug(slug: string): Promise<SoroArticle | null> {
  const cached = await fetchSoroArticles('default')
  const fromCache = cached.find((a) => a.slug === slug)
  if (fromCache) return fromCache

  const fresh = await fetchSoroArticles('no-store')
  return fresh.find((a) => a.slug === slug) ?? null
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
