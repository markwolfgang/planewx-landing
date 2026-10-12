import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0f1a] px-6 text-white">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
        planewx.ai
      </p>
      <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
        404
      </h1>
      <p className="mb-8 max-w-md text-center text-white/60">
        That page is not here. It may have moved, or the link is unfinished.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <Link
          href="/"
          className="rounded-md bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="rounded-md border border-white/15 px-4 py-2 text-sky-300 hover:border-sky-400/40 hover:text-sky-200 transition-colors"
        >
          Blog
        </Link>
      </div>
    </div>
  )
}
