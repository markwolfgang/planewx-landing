import {
  Compass,
  AlertTriangle,
  Layers,
  Scale,
  Heart,
  Shield,
  Users,
  Sparkles,
  Cloud,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  Quote,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"
import { BrandText } from "@/components/brand/brand-text"

const ICONS: Record<string, LucideIcon> = {
  AlertTriangle,
  Layers,
  Scale,
  Heart,
  Shield,
  Users,
  Sparkles,
  Cloud,
  ClipboardCheck,
  GraduationCap,
}

const ACCENT_BORDER: Record<string, string> = {
  amber: "border-l-amber-500",
  sky: "border-l-sky-500",
  violet: "border-l-violet-500",
  emerald: "border-l-emerald-500",
}

const ACCENT_ICON: Record<string, string> = {
  amber: "text-amber-400/80",
  sky: "text-sky-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  rose: "text-rose-400/80",
}

type WhyContent = {
  meta: { title: string; description: string }
  hero: { badge: string; title: string; subtitle: string }
  origin: {
    title: string
    subtitle: string
    paragraphs: string[]
    highlightQuote: string
    highlightLead: string
    highlightAfter: string
  }
  problems: {
    title: string
    subtitle: string
    items: { icon: string; accent: string; title: string; body: string }[]
  }
  emotional: {
    title: string
    subtitle: string
    cards: {
      icon: string
      iconColor: string
      title: string
      paragraphs: string[]
    }[]
  }
  philosophy: {
    title: string
    subtitle: string
    quotes: { quote: string; context: string }[]
  }
  pillars: {
    title: string
    subtitle: string
    items: { icon: string; accent: string; title: string; body: string }[]
  }
  comparison: {
    title: string
    subtitle: string
    rows: [string, string][]
  }
  mentoring: {
    title: string
    subtitle: string
    paragraphs: string[]
  }
  audiences: {
    title: string
    subtitle: string
    profiles: { icon: string; title: string; desc: string }[]
  }
}

export function generateMetadata() {
  const content = loadBrandContent<WhyContent>("why")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default function WhyPlaneWXPage() {
  const content = withStatsDeep(loadBrandContent<WhyContent>("why"))

  return (
    <div className="space-y-16">
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <Compass className="h-4 w-4" />
          {content.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {content.hero.title}
        </h1>
        <p className="text-xl text-white/70">{content.hero.subtitle}</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.origin.title}
        </h2>
        <p className="text-white/60 mb-8">{content.origin.subtitle}</p>
        <div className="space-y-6">
          {content.origin.paragraphs.map((p) => (
            <div
              key={p.slice(0, 40)}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-white/80 leading-relaxed text-lg">
                <BrandText text={p} />
              </p>
            </div>
          ))}
          <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
            <p className="text-white/90 leading-relaxed text-lg">
              {content.origin.highlightLead}{" "}
              <em className="text-sky-400">
                &quot;{content.origin.highlightQuote}&quot;
              </em>
            </p>
            <p className="text-white/70 mt-4">
              <BrandText text={content.origin.highlightAfter} />
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.problems.title}
        </h2>
        <p className="text-white/60 mb-8">{content.problems.subtitle}</p>
        <div className="space-y-6">
          {content.problems.items.map((item) => {
            const Icon = ICONS[item.icon] ?? AlertTriangle
            return (
              <div
                key={item.title}
                className={`p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 ${ACCENT_BORDER[item.accent] ?? "border-l-sky-500"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    className={`h-6 w-6 ${ACCENT_ICON[item.accent] ?? "text-sky-400"}`}
                  />
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">
                  <BrandText text={item.body} />
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.emotional.title}
        </h2>
        <p className="text-white/60 mb-8">{content.emotional.subtitle}</p>
        <div className="space-y-6">
          {content.emotional.cards.map((card) => {
            const Icon = ICONS[card.icon] ?? Heart
            return (
              <div
                key={card.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <Icon
                  className={`h-8 w-8 ${ACCENT_ICON[card.iconColor] ?? "text-sky-400"} mb-4`}
                />
                <h3 className="text-lg font-semibold text-white mb-3">
                  {card.title}
                </h3>
                {card.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-white/70 leading-relaxed ${i > 0 ? "mt-3" : ""}`}
                  >
                    <BrandText text={p} />
                  </p>
                ))}
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.philosophy.title}
        </h2>
        <p className="text-white/60 mb-8">{content.philosophy.subtitle}</p>
        <div className="space-y-4">
          {content.philosophy.quotes.map((item) => (
            <div
              key={item.quote}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <Quote className="h-5 w-5 text-sky-400/60 mb-3" />
              <p className="text-white/90 text-lg leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="text-white/40 text-sm mt-3">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.pillars.title}
        </h2>
        <p className="text-white/60 mb-8">{content.pillars.subtitle}</p>
        <div className="space-y-4">
          {content.pillars.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Cloud
            return (
              <div
                key={item.title}
                className={`p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 ${ACCENT_BORDER[item.accent] ?? "border-l-sky-500"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    className={`h-6 w-6 ${ACCENT_ICON[item.accent] ?? "text-sky-400"}`}
                  />
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/70">
                  <BrandText text={item.body} />
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.comparison.title}
        </h2>
        <p className="text-white/60 mb-8">{content.comparison.subtitle}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 font-medium">
                  Without PlaneWX
                </th>
                <th className="text-left py-3 px-4 text-sky-400 font-medium">
                  With PlaneWX
                </th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {content.comparison.rows.map(([without, withPWX], i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white/50">{without}</td>
                  <td className="py-3 px-4 text-white/80">{withPWX}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.mentoring.title}
        </h2>
        <p className="text-white/60 mb-8">{content.mentoring.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          {content.mentoring.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-white/70 leading-relaxed ${i > 0 ? "mt-4" : ""}`}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.audiences.title}
        </h2>
        <p className="text-white/60 mb-8">{content.audiences.subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {content.audiences.profiles.map((profile) => {
            const Icon = ICONS[profile.icon] ?? Users
            return (
              <div
                key={profile.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <Icon className="h-6 w-6 text-sky-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {profile.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {profile.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-wrap gap-4">
        <Link
          href="/brand/social"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors text-sm font-medium"
        >
          Social Media Playbook
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/brand/voice"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          Voice & Tone
          <ArrowRight className="h-4 w-4" />
        </Link>
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
