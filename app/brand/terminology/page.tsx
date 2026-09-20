import { loadBrandContent, withStatsDeep } from "@/lib/brand-content"
import { BrandText } from "@/components/brand/brand-text"

type TerminologyContent = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; subtitle: string }
  proprietary: {
    title: string
    intro: string
    terms: { term: string; definition: string; usage: string }[]
  }
  avoid: {
    title: string
    intro: string
    rows: { dontSay: string; sayInstead: string; why: string }[]
  }
  pitches: {
    title: string
    oneSentence: { label: string; text: string }
    thirtySecond: { label: string; text: string }
  }
}

export function generateMetadata() {
  const content = loadBrandContent<TerminologyContent>("terminology")
  return {
    title: content.meta.title,
    description: content.meta.description,
  }
}

export default function TerminologyPage() {
  const content = withStatsDeep(
    loadBrandContent<TerminologyContent>("terminology")
  )

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
          {content.proprietary.title}
        </h2>
        <p className="text-white/70 leading-relaxed mb-8">
          {content.proprietary.intro}
        </p>
        <div className="space-y-4">
          {content.proprietary.terms.map((item) => (
            <div
              key={item.term}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.term}
              </h3>
              <p className="text-white/70 leading-relaxed mb-2">
                {item.definition}
              </p>
              <p className="text-sm text-sky-400">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Usage:
                </span>{" "}
                {item.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.avoid.title}
        </h2>
        <p className="text-white/70 leading-relaxed mb-8">
          {content.avoid.intro}
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-sky-400 font-medium">
                  Don&apos;t Say
                </th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-sky-400 font-medium">
                  Say Instead
                </th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-sky-400 font-medium">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              {content.avoid.rows.map((row, i) => (
                <tr
                  key={row.dontSay}
                  className={
                    i % 2 === 0
                      ? "bg-white/[0.02] border-b border-white/10"
                      : "border-b border-white/10"
                  }
                >
                  <td className="px-6 py-4 text-red-400 font-medium">
                    {row.dontSay}
                  </td>
                  <td className="px-6 py-4 text-green-400 font-medium">
                    {row.sayInstead}
                  </td>
                  <td className="px-6 py-4 text-white/70">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          {content.pitches.title}
        </h2>
        <div className="space-y-6">
          {[content.pitches.oneSentence, content.pitches.thirtySecond].map(
            (pitch) => (
              <div
                key={pitch.label}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-3">
                  {pitch.label}
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  <BrandText text={pitch.text} />
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
}
