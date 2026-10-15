import * as crossCheck from "./cross-check-pilot-weather-briefing"

export interface LocalBlogPost {
  slug: string
  title: string
  h1: string
  description: string
  isoDate: string
  date: string
  html: string
  htmlAfterVideo?: string
  video?: { id: string; title: string }
  faqJsonLd?: unknown
}

/** Blog posts whose body lives in this repo instead of Soro. */
export const LOCAL_BLOG_POSTS: LocalBlogPost[] = [crossCheck]
