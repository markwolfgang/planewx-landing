// PlaneWX Learning Center: weather product explainers, concepts, and ADM.
// To add an article: prepend a new object to LEARN_ARTICLES (or append within section order).
// To add a tip: prepend to TIPS_OF_THE_WEEK (newest first), starting at Weekly PIREP issue #2.
//
// Indexing safety: keep LEARN_PUBLIC false until at least LEARN_PUBLIC_MIN_ARTICLES
// real, sourced (non-draft) articles exist. Draft articles stay reachable by URL
// for review, but robots noindex and stay out of the sitemap.

export const LEARN_PUBLIC = false

/** Flip LEARN_PUBLIC only after this many non-draft, sourced articles ship. */
export const LEARN_PUBLIC_MIN_ARTICLES = 3

export type LearnSection =
  | "Weather Products"
  | "Weather Knowledge"
  | "Decision-Making"

export type LearnPublisher = "FAA" | "NWS" | "AWC" | "MDL"

export interface LearnSource {
  label: string
  url: string
  publisher: LearnPublisher
}

export type LearnBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }

export interface LearnArticle {
  slug: string
  title: string
  section: LearnSection
  summary: string
  body: LearnBodyBlock[]
  /** ISO date, e.g. "2026-09-25" */
  lastReviewed: string
  sources: LearnSource[]
  /**
   * Draft articles render a visible banner, stay noindex, and stay out of the
   * sitemap. Bodies must not invent weather facts until a reviewed fact pack lands.
   */
  draft: boolean
}

/**
 * Weekly PIREP tip archive. Same list/prepend pattern as NEWS_ITEMS.
 * Empty until issue #2. Hub shows a standing empty-state line until then.
 */
export interface TipOfTheWeek {
  slug: string
  title: string
  summary: string
  /** Human-readable, e.g. "September 25, 2026" */
  date: string
  /** ISO date, e.g. "2026-09-25" */
  isoDate: string
  /** Weekly PIREP issue number (tips start at #2) */
  issueNumber: number
  body: LearnBodyBlock[]
  draft?: boolean
}

export const LEARN_SECTIONS: {
  id: LearnSection
  description: string
}[] = [
  {
    id: "Weather Products",
    description:
      "Explainers for aviationweather.gov products: what each one is for, and how to read it in context.",
  },
  {
    id: "Weather Knowledge",
    description:
      "Concepts such as dry lines, troughs and ridges, and what they mean for your flight.",
  },
  {
    id: "Decision-Making",
    description:
      "ADM best practices from FAA risk-management material. Habits that keep the PIC in command.",
  },
]

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "mos-vs-nbm-vs-taf",
    title: "MOS vs NBM vs TAF",
    section: "Weather Products",
    summary:
      "Placeholder slot for how MOS, NBM, and TAF differ as forecast products. Facts pending source review.",
    lastReviewed: "2026-09-25",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "This page is a structural placeholder. Weather facts will be filled from a reviewed fact pack with citations. No product claims are stated here yet.",
      },
      {
        type: "paragraph",
        text: "When the fact pack lands, this article will compare MOS, NBM, and TAF as weather products pilots encounter on aviationweather.gov and in briefings. Until then, treat every claim below as unfinished.",
      },
    ],
    sources: [
      {
        label: "TBD",
        url: "https://www.aviationweather.gov/",
        publisher: "AWC",
      },
      {
        label: "TBD",
        url: "https://www.weather.gov/",
        publisher: "NWS",
      },
    ],
  },
  {
    slug: "tcf-vs-ecfp",
    title: "TCF vs ECFP",
    section: "Weather Products",
    summary:
      "Placeholder slot for how TCF and ECFP differ as convective forecast products. Facts pending source review.",
    lastReviewed: "2026-09-25",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "This page is a structural placeholder. Weather facts will be filled from a reviewed fact pack with citations. No product claims are stated here yet.",
      },
      {
        type: "paragraph",
        text: "When the fact pack lands, this article will compare TCF and ECFP as convective guidance pilots see in the weather products stack. Until then, treat every claim below as unfinished.",
      },
    ],
    sources: [
      {
        label: "TBD",
        url: "https://www.aviationweather.gov/",
        publisher: "AWC",
      },
      {
        label: "TBD",
        url: "https://www.weather.gov/",
        publisher: "NWS",
      },
    ],
  },
]

/** Tips start with Weekly PIREP issue #2. Prepend newest first when adding. */
export const TIPS_OF_THE_WEEK: TipOfTheWeek[] = []

export const LEARN_DISCLAIMER =
  "PlaneWX complements FAA and Flight Service weather products. It does not replace an official briefing."

export const LEARN_DRAFT_BANNER = "DRAFT: facts pending source review"

export const TIPS_EMPTY_LINE =
  "Tips start with Weekly PIREP issue #2."

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug)
}

/** Hub list: drafts stay visible so editorial review can walk the slots. */
export function getLearnArticlesForHub(): LearnArticle[] {
  return LEARN_ARTICLES
}

export function getArticlesBySection(section: LearnSection): LearnArticle[] {
  return LEARN_ARTICLES.filter((a) => a.section === section)
}

export function getPublishedTips(): TipOfTheWeek[] {
  return TIPS_OF_THE_WEEK.filter((t) => !t.draft)
}

/** Sitemap + indexing: only when the center is public and the article is not draft. */
export function getIndexableLearnArticles(): LearnArticle[] {
  if (!LEARN_PUBLIC) return []
  return LEARN_ARTICLES.filter((a) => !a.draft)
}

export function shouldIndexLearnHub(): boolean {
  return LEARN_PUBLIC
}

export function shouldIndexLearnArticle(article: LearnArticle): boolean {
  return LEARN_PUBLIC && !article.draft
}

export function shouldEmitArticleJsonLd(article: LearnArticle): boolean {
  return !article.draft
}
