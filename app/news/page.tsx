import type { Metadata } from "next"
import Link from "next/link"
import { NewsNav } from "@/components/news-nav"
import { getPublishedNewsItems } from "./news-data"

export const metadata: Metadata = {
  title: "Newsroom — PlaneWX Press Releases & Announcements",
  description:
    "Press releases, product news, and partnership announcements from PlaneWX, the pilot's decision support system.",
  alternates: { canonical: "https://www.planewx.ai/news" },
  openGraph: {
    type: "website",
    url: "https://www.planewx.ai/news",
    title: "PlaneWX Newsroom",
    description:
      "Press releases, product news, and partnership announcements from PlaneWX.",
  },
}

type NewsPageProps = {
  searchParams: Promise<{ embed?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const embed = params.embed === "1"
  const items = getPublishedNewsItems()

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <NewsNav
        embed={embed}
        maxWidthClass="max-w-5xl"
        back={{ href: "/", label: "Home" }}
      />

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-sky-400">PlaneWX Newsroom</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            News from PlaneWX
          </h1>
          <p className="text-base text-white/60">
            Press releases, product news, and partnership announcements.
          </p>
        </div>
      </section>

      {/* Item list */}
      <main className="mx-auto max-w-3xl px-6 pb-24">
        {items.length === 0 ? (
          <p className="text-center text-white/40 py-16">No announcements yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={embed ? `/news/${item.slug}?embed=1` : `/news/${item.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-6 hover:border-sky-500/40 hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-sky-500/15 px-2.5 py-1 font-medium uppercase tracking-wide text-sky-300">
                    {item.category}
                  </span>
                  <time dateTime={item.isoDate} className="text-white/40">
                    {item.date}
                  </time>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-white/55">{item.excerpt}</p>
                <span className="mt-1 text-sm font-medium text-sky-400 group-hover:text-sky-300">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
