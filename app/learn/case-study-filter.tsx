"use client"

import { useState } from "react"
import Link from "next/link"

export type CaseStudyCard = {
  href: string
  title: string
  summary: string
  tags: string[]
}

export function CaseStudyFilter({
  cards,
  tags,
}: {
  cards: CaseStudyCard[]
  tags: string[]
}) {
  const [active, setActive] = useState<string | null>(null)
  const shown = active ? cards.filter((c) => c.tags.includes(active)) : cards
  const pill = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
      on
        ? "border-sky-400/60 bg-sky-500/20 text-sky-200"
        : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/80"
    }`

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter case studies">
        <button type="button" className={pill(active === null)} aria-pressed={active === null} onClick={() => setActive(null)}>
          All ({cards.length})
        </button>
        {tags.map((t) => {
          const n = cards.filter((c) => c.tags.includes(t)).length
          if (n === 0) return null
          return (
            <button key={t} type="button" className={pill(active === t)} aria-pressed={active === t} onClick={() => setActive(active === t ? null : t)}>
              {t} ({n})
            </button>
          )
        })}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {shown.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-sky-500/40 hover:bg-white/[0.08]"
            >
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/60">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-base font-semibold text-white transition-colors group-hover:text-sky-300">
                {c.title}
              </h3>
              <p className="line-clamp-3 text-sm text-white/55">{c.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
