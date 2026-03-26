import type { Metadata } from "next"
import Link from "next/link"
import SoroBlogEmbed from "./SoroBlogEmbed"

export const metadata: Metadata = {
  title: "Blog — Aviation Weather Insights for Pilots",
  description:
    "Pilot weather education, go/no-go decision making, and aviation weather intelligence from the PlaneWX team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://www.planewx.ai/blog",
    title: "PlaneWX Blog — Aviation Weather Insights",
    description:
      "Pilot weather education, go/no-go decision making, and aviation weather intelligence from the PlaneWX team.",
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <style>{`
        /* Remap Soro embed colors to PlaneWX palette */
        #soro-blog,
        #soro-blog * {
          color-scheme: dark;
        }
        #soro-blog a,
        #soro-blog h1,
        #soro-blog h2,
        #soro-blog h3 {
          color: #38bdf8 !important; /* sky-400 */
        }
        #soro-blog a:hover {
          color: #7dd3fc !important; /* sky-300 */
        }
        #soro-blog p,
        #soro-blog li,
        #soro-blog span,
        #soro-blog time {
          color: rgba(255,255,255,0.7) !important;
        }
        #soro-blog button,
        #soro-blog [class*="btn"],
        #soro-blog [class*="tag"],
        #soro-blog [class*="badge"],
        #soro-blog [class*="pill"] {
          background: transparent !important;
          border-color: rgba(255,255,255,0.15) !important;
          color: rgba(255,255,255,0.6) !important;
        }
        #soro-blog [style*="background"],
        #soro-blog [style*="background-color"] {
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

      {/* Soro embed */}
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <SoroBlogEmbed />
      </main>
    </div>
  )
}
