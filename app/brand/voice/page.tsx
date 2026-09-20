import { Mic2, CheckCircle, XCircle } from "lucide-react"
import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"

type VoiceContent = {
  meta: { title: string; description: string }
  hero: { badge: string; title: string; subtitle: string }
  weAreSection: { title: string; subtitle: string; rows: [string, string][] }
  attributes: {
    title: string
    subtitle: string
    items: { num: number; title: string; desc: string }[]
  }
  toneByContext: {
    title: string
    subtitle: string
    rows: [string, string, string][]
  }
  dosDonts: {
    title: string
    subtitle: string
    dos: string[]
    donts: string[]
  }
  checklist: { title: string; subtitle: string; items: string[] }
}

export function generateMetadata() {
  const content = loadBrandContent<VoiceContent>("voice")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default function VoicePage() {
  const content = withStatsDeep(loadBrandContent<VoiceContent>("voice"))

  return (
    <div className="space-y-16">
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <Mic2 className="h-4 w-4" />
          {content.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          {content.hero.title}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl">{content.hero.subtitle}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.weAreSection.title}
        </h2>
        <p className="text-white/60 mb-6">{content.weAreSection.subtitle}</p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 font-semibold text-white">
                  We Are
                </th>
                <th className="text-left px-6 py-4 font-semibold text-white">
                  We Are Not
                </th>
              </tr>
            </thead>
            <tbody>
              {content.weAreSection.rows.map(([weAre, weAreNot], i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 1
                      ? "bg-white/[0.02] border-b border-white/10 last:border-b-0"
                      : "border-b border-white/10 last:border-b-0"
                  }
                >
                  <td className="px-6 py-4 text-white/80">{weAre}</td>
                  <td className="px-6 py-4 text-white/60">{weAreNot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.attributes.title}
        </h2>
        <p className="text-white/60 mb-6">{content.attributes.subtitle}</p>
        <div className="space-y-4">
          {content.attributes.items.map((attr) => (
            <div
              key={attr.num}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex gap-4">
                <span className="text-sky-400 font-bold shrink-0">
                  {attr.num}.
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{attr.title}</h3>
                  <p className="text-white/70 leading-relaxed">{attr.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.toneByContext.title}
        </h2>
        <p className="text-white/60 mb-6">{content.toneByContext.subtitle}</p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 font-semibold text-white">
                  Context
                </th>
                <th className="text-left px-6 py-4 font-semibold text-white">
                  Tone
                </th>
                <th className="text-left px-6 py-4 font-semibold text-white">
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {content.toneByContext.rows.map(([context, tone, example], i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 1
                      ? "bg-white/[0.02] border-b border-white/10 last:border-b-0"
                      : "border-b border-white/10 last:border-b-0"
                  }
                >
                  <td className="px-6 py-4 text-white/80">{context}</td>
                  <td className="px-6 py-4 text-white/80">{tone}</td>
                  <td className="px-6 py-4 text-white/60 italic">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.dosDonts.title}
        </h2>
        <p className="text-white/60 mb-6">{content.dosDonts.subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              DO
            </h3>
            <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
              {content.dosDonts.dos.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
              DON&apos;T
            </h3>
            <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
              {content.dosDonts.donts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          {content.checklist.title}
        </h2>
        <p className="text-white/60 mb-6">{content.checklist.subtitle}</p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <ol className="space-y-3">
            {content.checklist.items.map((item, i) => (
              <li key={item} className="flex gap-3">
                <span className="text-sky-400 font-bold shrink-0">{i + 1}.</span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
