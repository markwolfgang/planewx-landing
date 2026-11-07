# Unpublished news sources

Files in this directory are **source only**. They are not imported by
`app/news/news-data.ts`, not registered in `generateStaticParams`, and not
served by any public route, feed, sitemap, or search surface.

Existing `draft: true` items in `NEWS_ITEMS` remain reachable by direct
`/news/[slug]` URL. That is **not** a safely gated preview. Do not add
unpublished releases to `NEWS_ITEMS` until publication is explicitly approved
and a safe preview path (if any) is verified.

Do not invent `/preview` routes, password gates, or `noindex` as substitutes
for keeping source out of public loaders.
