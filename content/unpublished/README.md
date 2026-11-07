# Unpublished content (fail-closed)

Markdown (and related assets) in this directory are **source of truth for drafts that must not appear on public surfaces**.

Rules:

1. Do **not** import these files into `lib/news-data.ts` / `NEWS_ITEMS`, sitemap builders, RSS/JSON feeds, search indexes, or structured data until an explicit publish decision.
2. Do **not** add matching `/news/[slug]` entries, home-page news cards, or partner-press links that would make the draft discoverable.
3. Prefer keeping copy here (or in the Google Doc) until Mark authorizes publication. Draft GitHub PRs are not publication.
4. The CAA press draft may render under `/brand/reviews/caa-fuel-provider-partner` for **Vercel Preview** review only (`VERCEL_ENV !== "production"`). Production must 404 that path. Preview deployments stay behind Vercel Deployment Protection (SSO); the path is also under `/brand` password middleware when `BRAND_PORTAL_PASSWORD` is set.
