import {
  MessageSquare,
  Target,
  Share2,
  MessageCircle,
  Hash,
  Ban,
  Rss,
  Shield,
  Building2,
  Users,
  Search,
  Lock,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { STATS } from "@/components/shared/landing-data"
import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"
import { BrandText } from "@/components/brand/brand-text"

const ICONS: Record<string, LucideIcon> = {
  Share2,
  Target,
  MessageCircle,
  Rss,
  Search,
  Lock,
  Shield,
  Building2,
  Users,
}

type SocialContent = {
  meta: { title: string; description: string }
  hero: { badge: string; title: string; subtitle: string }
  pillars: {
    title: string
    subtitle: string
    items: { num: number; title: string; desc: string }[]
  }
  platforms: {
    title: string
    subtitle: string
    items: { icon: string; title: string; body: string }[]
  }
  creator: {
    title: string
    subtitle: string
    formulaTitle: string
    formula: { label: string; text: string }[]
    formatsTitle: string
    formats: { label: string; text: string }[]
  }
  recurringFormats: {
    title: string
    subtitle: string
    items: string[]
  }
  responses: {
    title: string
    subtitle: string
    items: { q: string; a: string }[]
  }
  socialProof: {
    title: string
    subtitle: string
    communityTitle: string
    communityStats: { valueKey: keyof typeof STATS; label: string }[]
    safetyTitle: string
    safetyStats: { value: string; desc: string }[]
    usageNote: string
  }
  hashtags: {
    title: string
    subtitle: string
    intro: string
    tags: string[]
    note: string
  }
  neverSay: {
    title: string
    subtitle: string
    items: { phrase: string; note: string }[]
  }
  communityVision: {
    title: string
    subtitle: string
    feed: { title: string; paragraphs: string[] }
    expertise: { title: string; body: string }
    sideCards: { icon: string; title: string; body: string }[]
  }
  enterprise: {
    title: string
    subtitle: string
    items: { icon: string; title: string; body: string }[]
  }
}

export function generateMetadata() {
  const content = loadBrandContent<SocialContent>("social")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default function SocialMediaPlaybookPage() {
  const content = withStatsDeep(loadBrandContent<SocialContent>("social"))

  return (
    <div className="space-y-16">
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <MessageSquare className="h-4 w-4" />
          {content.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {content.hero.title}
        </h1>
        <p className="text-xl text-white/70">{content.hero.subtitle}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.pillars.title}
        </h2>
        <p className="text-white/60 mb-8">{content.pillars.subtitle}</p>
        <div className="space-y-4">
          {content.pillars.items.map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4 items-start"
            >
              <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm flex items-center justify-center">
                {pillar.num}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {pillar.title}
                </h3>
                <p className="text-white/70">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.platforms.title}
        </h2>
        <p className="text-white/60 mb-8">{content.platforms.subtitle}</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {content.platforms.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Share2
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <Icon className="h-8 w-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{item.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.creator.title}
        </h2>
        <p className="text-white/60 mb-8">{content.creator.subtitle}</p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              {content.creator.formulaTitle}
            </h3>
            <ul className="space-y-3 text-white/70">
              {content.creator.formula.map((row) => (
                <li key={row.label}>
                  <strong className="text-white">{row.label}:</strong> {row.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              {content.creator.formatsTitle}
            </h3>
            <ul className="space-y-4 text-white/70">
              {content.creator.formats.map((row) => (
                <li key={row.label}>
                  <strong className="text-white">{row.label}:</strong> {row.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.recurringFormats.title}
        </h2>
        <p className="text-white/60 mb-8">{content.recurringFormats.subtitle}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.recurringFormats.items.map((format, i) => (
            <div
              key={format}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-white/90 font-medium">{format}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.responses.title}
        </h2>
        <p className="text-white/60 mb-8">{content.responses.subtitle}</p>
        <div className="space-y-4">
          {content.responses.items.map((item) => (
            <div
              key={item.q}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-sky-400 font-medium mb-2">{item.q}</p>
              <p className="text-white/80 leading-relaxed">&ldquo;{item.a}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.socialProof.title}
        </h2>
        <p className="text-white/60 mb-8">{content.socialProof.subtitle}</p>

        <h3 className="text-lg font-semibold text-white mb-4">
          {content.socialProof.communityTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {content.socialProof.communityStats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-sky-400">
                {STATS[stat.valueKey]}
              </div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-white mb-4">
          {content.socialProof.safetyTitle}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {content.socialProof.safetyStats.map((stat) => (
            <div
              key={stat.value}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="text-xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-white/80 text-sm">
            <strong className="text-amber-400/90">Usage guidelines:</strong>{" "}
            {content.socialProof.usageNote}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.hashtags.title}
        </h2>
        <p className="text-white/60 mb-6">{content.hashtags.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Hash className="h-8 w-8 text-sky-400 mb-4" />
          <p className="text-white/70 mb-4">
            {content.hashtags.intro}{" "}
            {content.hashtags.tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 ? ", " : ""}
                <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
                  {tag}
                </code>
              </span>
            ))}
            .
          </p>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <p className="text-white/80 text-sm">{content.hashtags.note}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.neverSay.title}
        </h2>
        <p className="text-white/60 mb-8">{content.neverSay.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Ban className="h-8 w-8 text-amber-400/80 mb-4" />
          <ul className="space-y-2 text-white/70">
            {content.neverSay.items.map((item) => (
              <li key={item.phrase}>
                <strong className="text-white/90">&quot;{item.phrase}&quot;</strong>
                {item.note ? <> ({item.note})</> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.communityVision.title}
        </h2>
        <p className="text-white/60 mb-8">{content.communityVision.subtitle}</p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Rss className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              {content.communityVision.feed.title}
            </h3>
            {content.communityVision.feed.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-white/70 leading-relaxed ${i > 0 ? "mt-4" : "mb-4"}`}
              >
                <BrandText text={p} />
              </p>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Search className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              {content.communityVision.expertise.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              <BrandText text={content.communityVision.expertise.body} />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {content.communityVision.sideCards.map((card) => {
              const Icon = ICONS[card.icon] ?? Lock
              return (
                <div
                  key={card.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <Icon className="h-6 w-6 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.enterprise.title}
        </h2>
        <p className="text-white/60 mb-8">{content.enterprise.subtitle}</p>
        <div className="space-y-4">
          {content.enterprise.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Building2
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <Icon className="h-8 w-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{item.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <Link
          href="/brand"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
        >
          &larr; Back to Brand Portal
        </Link>
      </section>
    </div>
  )
}
