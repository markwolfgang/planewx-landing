import Image from "next/image"
import DownloadAllButton from "./DownloadAllButton"
import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"

type AssetsContent = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; subtitle: string }
  colors: {
    title: string
    items: {
      name: string
      hex: string
      swatch: string | null
      usage: string
      border?: boolean
      borderOnly?: boolean
    }[]
  }
  scoring: {
    title: string
    subtitle: string
    items: { name: string; hex: string; swatch: string }[]
  }
  typography: {
    title: string
    labelExample: string
    description: string
    headingExample: string
    bodyExample: string
  }
  logo: {
    title: string
    intro: string
    variants: {
      title: string
      bg: "dark" | "light"
      previewSrc: string
      previewType: "next-image" | "img"
      width: number
      height: number
      className?: string
      downloads: {
        href: string
        download: string
        label: string
        primary: boolean
      }[]
    }[]
    usageRules: {
      title: string
      dos: string[]
      donts: string[]
      contact: string
    }
  }
  images: {
    title: string
    items: { title: string; body: string }[]
  }
  brandFormat: {
    title: string
    items: { label: string; text: string; href?: string }[]
  }
}

export function generateMetadata() {
  const content = loadBrandContent<AssetsContent>("assets")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default function AssetsPage() {
  const content = withStatsDeep(loadBrandContent<AssetsContent>("assets"))

  return (
    <div className="space-y-16">
      <section>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
          {content.hero.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {content.hero.title}
        </h1>
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
          {content.hero.subtitle}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.colors.title}
        </h2>
        <div className="space-y-6">
          {content.colors.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              {item.borderOnly ? (
                <div
                  className="w-24 h-24 rounded-xl border-2 border-white/10 shrink-0"
                  aria-hidden
                />
              ) : item.swatch ? (
                <div
                  className={`w-24 h-24 rounded-xl shrink-0 ${item.border ? "border border-white/10" : ""}`}
                  style={{ backgroundColor: item.swatch }}
                  aria-hidden
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-xl bg-white/[0.03] border border-white/10 shrink-0"
                  aria-hidden
                />
              )}
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sky-400 font-mono text-sm">{item.hex}</p>
                <p className="text-white/70 leading-relaxed mt-1">{item.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          {content.scoring.title}
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          {content.scoring.subtitle}
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {content.scoring.items.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div
                className="w-full h-16 rounded-xl mb-4"
                style={{ backgroundColor: item.swatch }}
                aria-hidden
              />
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sky-400 font-mono text-sm">{item.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.typography.title}
        </h2>
        <div className="space-y-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-1">
              {content.typography.labelExample}
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              {content.typography.description}
            </p>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            {content.typography.headingExample}
          </h3>
          <p className="text-white/70 leading-relaxed">
            {content.typography.bodyExample}
          </p>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {content.logo.title}
          </h2>
          <DownloadAllButton />
        </div>
        <p className="text-white/60 mb-8 leading-relaxed">{content.logo.intro}</p>

        {content.logo.variants.map((variant) => (
          <div key={variant.title} className="space-y-4 mb-10 last:mb-8">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">
              {variant.title}
            </h3>
            <div
              className={`rounded-2xl border border-white/10 p-10 flex items-center justify-center ${
                variant.bg === "dark" ? "bg-[#0a0f1a]" : "bg-white"
              }`}
            >
              {variant.previewType === "next-image" ? (
                <Image
                  src={variant.previewSrc}
                  alt={variant.title}
                  width={variant.width}
                  height={variant.height}
                  className="max-w-full h-auto"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={variant.previewSrc}
                  alt={variant.title}
                  width={variant.width}
                  height={variant.height}
                  className={variant.className ?? "max-w-full h-auto"}
                />
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {variant.downloads.map((dl) => (
                <a
                  key={dl.href}
                  href={dl.href}
                  download={dl.download}
                  className={
                    dl.primary
                      ? "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium hover:bg-sky-500/20 transition-colors"
                      : "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
                  }
                >
                  {dl.label}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <p className="text-sm font-semibold text-white">
            {content.logo.usageRules.title}
          </p>
          <ul className="space-y-2 text-sm text-white/60">
            {content.logo.usageRules.dos.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span> {rule}
              </li>
            ))}
            {content.logo.usageRules.donts.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">✗</span> {rule}
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/30 pt-2">
            Questions?{" "}
            <a
              href={`mailto:${content.logo.usageRules.contact}`}
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              {content.logo.usageRules.contact}
            </a>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.images.title}
        </h2>
        <div className="space-y-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          {content.images.items.map((item) => (
            <div key={item.title}>
              <p className="font-semibold text-white mb-1">{item.title}</p>
              <p className="text-white/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.brandFormat.title}
        </h2>
        <div className="space-y-4">
          {content.brandFormat.items.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sky-400 hover:text-sky-300 transition-colors font-medium"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-white font-medium">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
