import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getSoroArticles } from "@/lib/soro"

export const revalidate = 3600 // re-fetch article list every hour

export const metadata: Metadata = {
  title: "Blog — Aviation Weather Insights for Pilots",
  description:
    "Pilot weather education, go/no-go decision making, and aviation weather intelligence from the PlaneWX team.",
  alternates: { canonical: "https://www.planewx.ai/blog" },
  openGraph: {
    type: "website",
    url: "https://www.planewx.ai/blog",
    title: "PlaneWX Blog — Aviation Weather Insights",
    description:
      "Pilot weather education, go/no-go decision making, and aviation weather intelligence from the PlaneWX team.",
  },
}

export default async function BlogPage() {
  const articles = await getSoroArticles()

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            planewx.ai
          </Link>
          <span className="text-xs uppercase tracking-widest text-white/40">Blog</span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-sky-400">PlaneWX Blog</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            Weather intel for pilots who plan ahead
          </h1>
          <p className="text-base text-white/60">
            Go/no-go guidance, weather education, and decision-making insight from the PlaneWX team.
          </p>
        </div>
      </section>

      {/* Article list */}
      <main className="mx-auto max-w-5xl px-6 pb-24">
        {articles.length === 0 ? (
          <p className="text-center text-white/40 py-16">No articles yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex gap-5 rounded-xl border border-white/10 bg-white/5 p-5 hover:border-sky-500/40 hover:bg-white/8 transition-all"
              >
                {article.image && (
                  <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-1.5 min-w-0">
                  <h2 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-white/55 line-clamp-2">{article.excerpt}</p>
                  <time
                    dateTime={article.isoDate}
                    className="text-xs text-white/30 mt-0.5"
                  >
                    {article.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
