import { MetadataRoute } from 'next'
import { getSoroArticles } from '@/lib/soro'
import { LOCAL_BLOG_POSTS } from '@/lib/blog-posts'
import { getPublishedNewsItems } from '@/app/news/news-data'
import {
  getIndexableLearnArticles,
  getIndexableLearnHubPages,
  shouldIndexLearnHub,
} from '@/app/learn/learn-data'

export const revalidate = 3600

const BASE_URL = 'https://www.planewx.ai'

/**
 * Static lastmod dates for marketing/legal pages (content effective dates or
 * known publish dates). Never use `new Date()` — request-time lastmod is fake.
 * Omit lastModified when a real date is unknown.
 */
const STATIC_LASTMOD: Record<string, string> = {
  '/': '2026-11-09',
  '/osh': '2026-10-12',
  '/apps': '2026-11-09',
  '/ios': '2026-11-09',
  '/ga-customs': '2026-11-09',
  '/events': '2026-10-20',
  '/partners': '2026-11-08',
  '/ambassadors': '2026-10-20',
  '/boldface': '2026-10-17',
  '/volunteer': '2026-11-09',
  '/mcp': '2026-11-09',
  '/about': '2026-11-09',
  '/decision-support': '2026-11-09',
  '/talks': '2026-09-24',
  '/talks/tbmopa': '2026-09-24',
  '/talks/eaa983': '2026-09-24',
  '/talks/osh': '2026-09-24',
  '/blog': '2026-10-14',
  '/news': '2026-09-22',
  '/learn': '2026-10-01',
  '/multi-model-analysis': '2026-09-30',
  '/research/mountain-wave-validation': '2026-03-01',
  '/research/turbulence-safety': '2026-03-01',
  '/privacy': '2026-08-31',
  '/terms': '2026-01-05',
  '/cookies': '2026-09-27',
}

function staticEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const lastModified = STATIC_LASTMOD[path]
  return {
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localSlugs = new Set(LOCAL_BLOG_POSTS.map((p) => p.slug))

  const articles = await getSoroArticles()
  const blogPosts: MetadataRoute.Sitemap = LOCAL_BLOG_POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.isoDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  for (const a of articles) {
    if (localSlugs.has(a.slug)) continue
    blogPosts.push({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.isoDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  const newsPosts: MetadataRoute.Sitemap = getPublishedNewsItems().map((item) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: new Date(item.isoDate),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Learning Center: hub index, allowlisted [slug] articles, and shipped hub
  // HTML pages. Non-allowlisted articles and Tips stay out of the sitemap.
  // Empty when LEARN_PUBLIC is false (rollback noindexes hubs via hubPageRobots).
  const learnEntries: MetadataRoute.Sitemap = []
  if (shouldIndexLearnHub()) {
    learnEntries.push(staticEntry('/learn', 'weekly', 0.75))
    for (const hub of getIndexableLearnHubPages()) {
      learnEntries.push({
        url: `${BASE_URL}${hub.href}`,
        lastModified: new Date(hub.lastReviewed),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
    for (const article of getIndexableLearnArticles()) {
      learnEntries.push({
        url: `${BASE_URL}/learn/${article.slug}`,
        lastModified: new Date(article.lastReviewed),
        changeFrequency: 'monthly',
        priority: 0.65,
      })
    }
  }

  // /runway is a partner short-link rewrite to the homepage funnel (not a
  // distinct indexable page), so it is intentionally omitted.
  // The llms text file is not an HTML indexable URL and is omitted by design.
  return [
    staticEntry('/', 'weekly', 1),
    staticEntry('/osh', 'daily', 0.95),
    staticEntry('/apps', 'monthly', 0.85),
    staticEntry('/ios', 'monthly', 0.85),
    staticEntry('/ga-customs', 'monthly', 0.85),
    staticEntry('/events', 'weekly', 0.8),
    staticEntry('/partners', 'monthly', 0.8),
    staticEntry('/ambassadors', 'monthly', 0.8),
    staticEntry('/boldface', 'monthly', 0.85),
    staticEntry('/volunteer', 'monthly', 0.9),
    staticEntry('/mcp', 'monthly', 0.85),
    staticEntry('/about', 'monthly', 0.9),
    staticEntry('/decision-support', 'monthly', 0.9),
    staticEntry('/talks', 'weekly', 0.6),
    staticEntry('/talks/tbmopa', 'monthly', 0.5),
    staticEntry('/talks/eaa983', 'monthly', 0.5),
    staticEntry('/talks/osh', 'monthly', 0.5),
    staticEntry('/blog', 'weekly', 0.9),
    ...blogPosts,
    staticEntry('/news', 'weekly', 0.8),
    ...newsPosts,
    ...learnEntries,
    staticEntry('/multi-model-analysis', 'monthly', 0.7),
    staticEntry('/research/mountain-wave-validation', 'monthly', 0.8),
    staticEntry('/research/turbulence-safety', 'monthly', 0.8),
    staticEntry('/privacy', 'monthly', 0.3),
    staticEntry('/terms', 'monthly', 0.3),
    staticEntry('/cookies', 'monthly', 0.3),
  ]
}
