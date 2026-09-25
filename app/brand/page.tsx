import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6"
import { STATS } from "@/components/shared/landing-data"
import { FiveX5SeesNote } from "@/components/shared/five-x-five-sees-note"
import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"
import { BrandText } from "@/components/brand/brand-text"
import {
  Target,
  Eye,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  User,
  Compass,
  Mic2,
  BookOpen,
  MessageSquare,
  Palette,
  ArrowRight,
  Quote,
  Handshake,
  GraduationCap,
  Plane,
  Users,
  Check,
  Minus,
  Crown,
  Zap,
  Shield,
  Download,
  type LucideIcon,
} from "lucide-react"

const LUCIDE: Record<string, LucideIcon> = {
  Target,
  Eye,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  User,
  Compass,
  Mic2,
  BookOpen,
  MessageSquare,
  Palette,
  Handshake,
  GraduationCap,
  Plane,
  Users,
  Crown,
  Zap,
  Shield,
}

const SOCIAL_ICONS = {
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaTiktok,
} as const

const LOOP_ACCENT: Record<string, { bg: string; border: string; text: string }> = {
  sky: { bg: "bg-sky-500/15", border: "border-sky-500/20", text: "text-sky-400" },
  blue: { bg: "bg-blue-500/15", border: "border-blue-500/20", text: "text-blue-400" },
  emerald: { bg: "bg-emerald-500/15", border: "border-emerald-500/20", text: "text-emerald-400" },
  amber: { bg: "bg-amber-500/15", border: "border-amber-500/20", text: "text-amber-400" },
  violet: { bg: "bg-violet-500/15", border: "border-violet-500/20", text: "text-violet-400" },
}

const STAT_COLOR: Record<string, string> = {
  emerald: "text-emerald-400",
  sky: "text-sky-400",
  amber: "text-amber-400",
}

const TESTIMONIAL_ACCENT: Record<string, string> = {
  emerald: "border-l-emerald-500/60 text-emerald-400/60 text-emerald-400/80",
  sky: "border-l-sky-500/60 text-sky-400/60 text-sky-400/80",
  violet: "border-l-violet-500/60 text-violet-400/60 text-violet-400/80",
}

type OverviewContent = {
  meta: { title: string; description: string }
  hero: {
    badge: string
    headline: string
    subtitle: string
    meta: string[]
  }
  categoryClaim: { lead: string; support: string }
  loop: {
    title: string
    subtitle: string
    items: { num: number; accent: string; title: string; body: string }[]
    mentorNote: string
  }
  missionVision: {
    title: string
    subtitle: string
    mission: { title: string; body: string }
    vision: { title: string; body: string }
  }
  structuralMinimums: { title: string; body: string }
  partnerOnePager: { label: string; href: string; note: string }
  problemSolution: {
    title: string
    subtitle: string
    problem: { title: string; paragraphs: string[] }
    solution: { title: string; body: string }
    differentiator: { title: string; body: string }
    community: { title: string; paragraphs: string[] }
  }
  pricing: {
    title: string
    subtitle: string
    safetyNote: string
    footer: string
    tiers: {
      id: string
      name: string
      price: string
      period: string
      annual?: string
      annualSave?: string
      badge?: string
      badgeIcon?: string
      style?: string
      everythingIn?: string
      included: string[]
      excluded: string[]
      fiveX5NoteOn?: string
    }[]
  }
  publicProof: {
    title: string
    subtitle: string
    items: { value: string; label: string; color: string }[]
    association: string
    associationNote: string
  }
  sayAvoid: {
    title: string
    say: { title: string; items: string[] }
    avoid: { title: string; items: string[] }
  }
  testimonials: {
    title: string
    subtitle: string
    items: {
      accent: string
      quote: string
      name: string
      detail: string
      recommend: string
    }[]
  }
  community: {
    title: string
    subtitle: string
    stats: { valueKey: keyof typeof STATS; label: string }[]
    note: string
  }
  traction: {
    title: string
    subtitle: string
    asOf: string
    stats: { value?: string; valueKey?: keyof typeof STATS; label: string }[]
  }
  founder: {
    title: string
    subtitle: string
    name: string
    paragraphs: string[]
    originCta: string
    youtubeCta: string
    youtubeUrl: string
    personalYoutubeCta: string
    personalYoutubeUrl: string
    personalYoutubeNote?: string
  }
  positioning: {
    title: string
    subtitle: string
    body: string
    quote: string
  }
  audienceHooks: {
    title: string
    subtitle: string
    items: { icon: string; title: string; body: string }[]
  }
  messaging: {
    title: string
    subtitle: string
    primary: { line: string; note: string }[]
    soundBitesIntro: string
    soundBites: { line: string; note: string }[]
  }
  partners: {
    title: string
    subtitle: string
    body: string
    offer: string
    founderEmailLabel: string
    founderEmail: string
    generalEmailLabel: string
    generalEmail: string
    bullets: string[]
  }
  socialHandles: {
    title: string
    subtitle: string
    note: string
    accounts: {
      platform: string
      handle: string
      url: string
      note: string
      icon: keyof typeof SOCIAL_ICONS
      color: string
      bg: string
    }[]
  }
  explore: {
    title: string
    subtitle: string
    links: { href: string; title: string; desc: string; icon: string }[]
  }
}

export function generateMetadata() {
  const content = loadBrandContent<OverviewContent>("overview")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

function tierCardClass(style?: string) {
  switch (style) {
    case "casual":
      return "relative p-6 rounded-2xl bg-gradient-to-br from-teal-950/60 to-emerald-950/40 border-2 border-teal-500/40"
    case "pro":
      return "relative p-6 rounded-2xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border border-sky-500/30"
    case "proPlus":
      return "relative p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-violet-950/40 border-2 border-indigo-500/40"
    default:
      return "p-6 rounded-2xl bg-white/[0.03] border border-white/10"
  }
}

function checkColor(style?: string) {
  switch (style) {
    case "casual":
      return "text-teal-400"
    case "pro":
      return "text-sky-400"
    case "proPlus":
      return "text-indigo-400"
    default:
      return "text-emerald-400"
  }
}

export default function BrandPortalPage() {
  const content = withStatsDeep(loadBrandContent<OverviewContent>("overview"))

  return (
    <div className="space-y-16">
      <section>
        <div className="mb-3 sm:mb-4 flex flex-wrap items-end justify-between gap-3">
          <Image
            src="/brand/planewx-og-wordmark.png"
            alt="PlaneWX"
            width={320}
            height={64}
            className="h-10 sm:h-14 w-auto"
            priority
          />
          <a
            href={content.partnerOnePager.href}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shrink-0"
          >
            <Download className="h-4 w-4" />
            {content.partnerOnePager.label}
          </a>
        </div>
        <p className="text-lg sm:text-xl text-white/70 mb-3 sm:mb-4">{content.hero.subtitle}</p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-3 sm:mb-4">
          <Target className="h-4 w-4" />
          {content.hero.badge}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          {content.hero.headline}
        </h1>
        <div className="mt-3 sm:mt-5 flex flex-wrap gap-4 text-sm text-white/60">
          <span>{content.hero.meta[0]}</span>
          <span>&middot;</span>
          <a
            href={`mailto:${content.hero.meta[1]}`}
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            {content.hero.meta[1]}
          </a>
          <span>&middot;</span>
          <span>{content.hero.meta[2]}</span>
        </div>
        <p className="text-white/40 text-xs mt-2">{content.partnerOnePager.note}</p>
      </section>

      <section>
        <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
          <p className="text-white/90 leading-relaxed text-xl font-medium">
            {content.categoryClaim.lead}
          </p>
          <p className="text-white/60 mt-3">{content.categoryClaim.support}</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.loop.title}</h2>
        <p className="text-white/60 mb-8">{content.loop.subtitle}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.loop.items.map((item) => {
            const accent = LOOP_ACCENT[item.accent] ?? LOOP_ACCENT.sky
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div
                  className={`h-10 w-10 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center mb-4`}
                >
                  <span className={`${accent.text} font-bold text-lg`}>
                    {item.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  <BrandText text={item.body} />
                </p>
              </div>
            )
          })}
        </div>
        <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10 border-l-4 border-l-cyan-500/50">
          <p className="text-white/70 text-sm leading-relaxed">
            <BrandText text={content.loop.mentorNote} />
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.missionVision.title}
        </h2>
        <p className="text-white/60 mb-8">{content.missionVision.subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Target className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              {content.missionVision.mission.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {content.missionVision.mission.body}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Eye className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              {content.missionVision.vision.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {content.missionVision.vision.body}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
          <h2 className="text-xl font-bold text-white mb-3">
            {content.structuralMinimums.title}
          </h2>
          <p className="text-white/70 leading-relaxed">
            {content.structuralMinimums.body}
          </p>
        </div>
        <div className="mt-6">
          <a
            href={content.partnerOnePager.href}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors"
          >
            <Download className="h-4 w-4" />
            {content.partnerOnePager.label}
          </a>
          <p className="text-white/40 text-xs mt-2">{content.partnerOnePager.note}</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.publicProof.title}
        </h2>
        <p className="text-white/60 mb-8">{content.publicProof.subtitle}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {content.publicProof.items.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
            >
              <div className={`text-2xl font-bold ${STAT_COLOR[stat.color] ?? "text-sky-400"}`}>
                {stat.value}
              </div>
              <div className={`text-sm text-white/60 mt-2 leading-snug ${stat.value === "Up to 10%" ? "whitespace-nowrap" : ""}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/70 text-sm mt-5 leading-relaxed text-center">
          {content.publicProof.association}
        </p>
        <p className="text-white/40 text-xs mt-2 text-center italic">
          {content.publicProof.associationNote}
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.sayAvoid.title}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              {content.sayAvoid.say.title}
            </h3>
            <ul className="space-y-3">
              {content.sayAvoid.say.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4">
              {content.sayAvoid.avoid.title}
            </h3>
            <ul className="space-y-3">
              {content.sayAvoid.avoid.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.problemSolution.title}
        </h2>
        <p className="text-white/60 mb-8">{content.problemSolution.subtitle}</p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-amber-400/80" />
              <h3 className="text-lg font-semibold text-white">
                {content.problemSolution.problem.title}
              </h3>
            </div>
            {content.problemSolution.problem.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-white/70 leading-relaxed ${i > 0 ? "" : "mb-3"}`}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-semibold text-white">
                {content.problemSolution.solution.title}
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              {content.problemSolution.solution.body}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-semibold text-white">
                {content.problemSolution.differentiator.title}
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              {content.problemSolution.differentiator.body}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-violet-500/50">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-violet-400" />
              <h3 className="text-lg font-semibold text-white">
                {content.problemSolution.community.title}
              </h3>
            </div>
            {content.problemSolution.community.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-white/70 leading-relaxed ${i === 0 ? "mb-3" : ""}`}
              >
                <BrandText text={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.pricing.title}</h2>
        <p className="text-white/60 mb-6">{content.pricing.subtitle}</p>

        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-8 flex items-start gap-4">
          <Shield className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm leading-relaxed">
            <BrandText text={content.pricing.safetyNote} />
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {content.pricing.tiers.map((tier) => {
            const BadgeIcon =
              (tier.badgeIcon && LUCIDE[tier.badgeIcon]) || Zap
            const includedColor = checkColor(tier.style)
            return (
              <div key={tier.id} className={tierCardClass(tier.style)}>
                {tier.badge ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div
                      className={
                        tier.style === "casual"
                          ? "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-semibold"
                          : tier.style === "pro"
                            ? "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-900/80 border border-sky-500/40 text-sky-300 text-xs font-semibold"
                            : "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold"
                      }
                    >
                      <BadgeIcon className="h-3 w-3" />
                      {tier.badge}
                    </div>
                  </div>
                ) : null}
                <p
                  className={`text-xs uppercase tracking-widest mb-1 ${
                    tier.style === "casual"
                      ? "text-teal-400/70"
                      : tier.style === "pro"
                        ? "text-sky-400/70"
                        : tier.style === "proPlus"
                          ? "text-indigo-400/70"
                          : "text-white/40"
                  }`}
                >
                  {tier.name}
                </p>
                <div className="text-3xl font-bold text-white mb-0.5">
                  {tier.price}
                </div>
                <p
                  className={`text-xs text-white/30 ${tier.annual ? "mb-1" : "mb-4"}`}
                >
                  {tier.period}
                </p>
                {tier.annual ? (
                  <p
                    className={`text-xs mb-4 ${
                      tier.style === "casual"
                        ? "text-teal-400"
                        : tier.style === "pro"
                          ? "text-sky-400"
                          : "text-indigo-400"
                    }`}
                  >
                    {tier.annual}{" "}
                    {tier.annualSave ? (
                      <span className="text-emerald-400">{tier.annualSave}</span>
                    ) : null}
                  </p>
                ) : null}
                <div
                  className={`space-y-2 text-sm ${
                    tier.style ? "text-white/70" : "text-white/60"
                  }`}
                >
                  {tier.everythingIn ? (
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                      {tier.everythingIn}
                    </p>
                  ) : null}
                  {tier.included.map((f) => (
                    <div key={f} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Check
                          className={`h-3.5 w-3.5 ${includedColor} shrink-0`}
                        />
                        <span>{f}</span>
                      </div>
                      {tier.fiveX5NoteOn === f ? (
                        <FiveX5SeesNote className="pl-5 text-xs text-white/40 leading-snug" />
                      ) : null}
                    </div>
                  ))}
                  {tier.excluded.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Minus className="h-3.5 w-3.5 text-white/20 shrink-0" />
                      <span className="text-white/25">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-white/30 mt-4 text-center">
          {content.pricing.footer}
        </p>
      </section>

      

      

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.testimonials.title}
        </h2>
        <p className="text-white/60 mb-8">{content.testimonials.subtitle}</p>
        <div className="space-y-4">
          {content.testimonials.items.map((item) => {
            const accent = TESTIMONIAL_ACCENT[item.accent] ?? TESTIMONIAL_ACCENT.sky
            const [border, quoteColor, nameColor] = accent.split(" ")
            return (
              <div
                key={item.name + item.detail}
                className={`p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 ${border}`}
              >
                <div className="flex items-start gap-3">
                  <Quote className={`h-4 w-4 ${quoteColor} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                      <span className={`${nameColor} font-medium`}>{item.name}</span>
                      <span>&middot;</span>
                      <span>{item.detail}</span>
                      <span>&middot;</span>
                      <span>{item.recommend}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.community.title}</h2>
        <p className="text-white/60 mb-8">{content.community.subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {content.community.stats.map((stat) => (
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
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-white/50 text-sm">{content.community.note}</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.traction.title}</h2>
        <p className="text-white/60 mb-2">{content.traction.subtitle}</p>
        <p className="text-white/40 text-sm mb-8">{content.traction.asOf}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.traction.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
            >
              <div className="text-xl font-bold text-sky-400">
                {stat.valueKey ? STATS[stat.valueKey] : stat.value}
              </div>
              <div className="text-xs text-white/50 mt-1 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.founder.title}</h2>
        <p className="text-white/60 mb-6">{content.founder.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <User className="h-8 w-8 text-sky-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            {content.founder.name}
          </h3>
          {content.founder.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-white/70 leading-relaxed ${
                i < content.founder.paragraphs.length - 1 ? "mb-4" : ""
              }`}
            >
              {p}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/brand/why"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
            >
              {content.founder.originCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={content.founder.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
            >
              <FaYoutube className="h-4 w-4" />
              {content.founder.youtubeCta}
            </a>
            <a
              href={content.founder.personalYoutubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
            >
              <FaYoutube className="h-4 w-4" />
              {content.founder.personalYoutubeCta}
            </a>
          </div>
          {content.founder.personalYoutubeNote ? (
            <p className="text-xs text-white/35 mt-3">
              {content.founder.personalYoutubeNote}
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.positioning.title}
        </h2>
        <p className="text-white/60 mb-6">{content.positioning.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <p className="text-white/70 leading-relaxed">{content.positioning.body}</p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <Quote className="h-4 w-4 text-sky-400/50 mb-2" />
            <p className="text-white/60 text-sm italic">
              &ldquo;{content.positioning.quote}&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.audienceHooks.title}
        </h2>
        <p className="text-white/60 mb-8">{content.audienceHooks.subtitle}</p>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {content.audienceHooks.items.map((item) => {
            const Icon = LUCIDE[item.icon] ?? Plane
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <Icon className="h-8 w-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.messaging.title}
        </h2>
        <p className="text-white/60 mb-8">{content.messaging.subtitle}</p>
        <div className="space-y-3">
          {content.messaging.primary.map((item) => (
            <div
              key={item.line}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex-1">
                <p className="text-white/90 font-medium">&ldquo;{item.line}&rdquo;</p>
              </div>
              <span className="text-xs text-white/30 shrink-0 mt-1">{item.note}</span>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm mt-10 mb-4">
          {content.messaging.soundBitesIntro}
        </p>
        <div className="space-y-3">
          {content.messaging.soundBites.map((item) => (
            <div
              key={item.line}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex-1">
                <p className="text-white/90 font-medium">&ldquo;{item.line}&rdquo;</p>
              </div>
              <span className="text-xs text-white/30 shrink-0 mt-1">{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.partners.title}</h2>
        <p className="text-white/60 mb-6">{content.partners.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Handshake className="h-8 w-8 text-sky-400 mb-4" />
          <p className="text-white/70 leading-relaxed mb-6">{content.partners.body}</p>
          <p className="text-white/80 text-sm mb-6 p-4 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <strong className="text-sky-400">Partner offer:</strong> Promo code
            coming soon. Email{" "}
            <a
              href={`mailto:${content.partners.founderEmail}`}
              className="text-sky-400 hover:text-sky-300"
            >
              {content.partners.founderEmail}
            </a>{" "}
            for an early partner code.
          </p>
          <p className="text-white/50 text-sm mb-3">
            {content.partners.founderEmailLabel}
          </p>
          <a
            href={`mailto:${content.partners.founderEmail}`}
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            {content.partners.founderEmail}
          </a>
          <p className="text-white/40 text-sm mt-4 mb-3">
            {content.partners.generalEmailLabel}{" "}
            <a
              href={`mailto:${content.partners.generalEmail}`}
              className="text-sky-400/80 hover:text-sky-300"
            >
              {content.partners.generalEmail}
            </a>
          </p>
          <ul className="text-white/70 text-sm space-y-2 list-disc list-inside mt-6">
            {content.partners.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          {content.socialHandles.title}
        </h2>
        <p className="text-white/60 mb-8">{content.socialHandles.subtitle}</p>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">
                  Platform
                </th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">
                  Handle
                </th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">
                  URL
                </th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs hidden sm:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {content.socialHandles.accounts.map((account) => {
                const Icon = SOCIAL_ICONS[account.icon] ?? FaYoutube
                return (
                  <tr
                    key={account.platform}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${account.bg} flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`h-4 w-4 ${account.color}`} />
                        </div>
                        <span className="font-medium text-white">
                          {account.platform}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-sky-400 font-mono text-sm">
                        {account.handle}
                      </code>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-sky-400 transition-colors text-xs truncate block max-w-[200px]"
                      >
                        {account.url.replace("https://", "")}
                      </a>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-white/40 text-xs">{account.note}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/30 mt-3">{content.socialHandles.note}</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-2">{content.explore.title}</h2>
        <p className="text-white/60 mb-8">{content.explore.subtitle}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.explore.links.map((item) => {
            const Icon = LUCIDE[item.icon] ?? Compass
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
              >
                <Icon className="h-5 w-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
