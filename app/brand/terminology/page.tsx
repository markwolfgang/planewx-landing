export const metadata = {
  title: "Terminology | PlaneWX Brand Portal",
  description: "PlaneWX proprietary terms, usage guidelines, and elevator pitches.",
}

const PROPRIETARY_TERMS = [
  {
    term: "WX Score",
    definition:
      "0–100% risk metric calculated against YOUR personal minimums and YOUR specific aircraft",
    usage:
      "Always capitalize. Never call it 'Go Score' (deprecated). Emphasize personalization.",
  },
  {
    term: "Synoptic Intelligence™",
    definition:
      "PlaneWX's umbrella brand for all AI-powered weather analysis",
    usage:
      "Always use ™ until registered. Always capitalize both words.",
  },
  {
    term: "Trip Watchers",
    definition:
      "Feature allowing passengers, family, and schedulers to see live trip weather data",
    usage:
      "Two words, both capitalized. Emphasize pressure-reduction benefit.",
  },
  {
    term: "Ask a Mentor / Browse Mentors",
    definition:
      "Peer pilot consultation with shared briefing context",
    usage:
      "Distinguish between 'Ask a Mentor' (free) and 'Browse Mentors' (Pro).",
  },
  {
    term: "Corridor Watch",
    definition:
      "Route-specific intelligence at departure, waypoints, and arrival",
    usage:
      "Two words, both capitalized.",
  },
  {
    term: "Multi-City Optimizer",
    definition:
      "Multi-leg trip planning that finds optimal departure sequence",
    usage:
      "Hyphenate 'Multi-City.'",
  },
  {
    term: "PAVE Risk Assessment",
    definition:
      "PlaneWX's integration of the FAA's PAVE decision-making framework",
    usage:
      "Reference as 'FAA's PAVE framework' on first use. PlaneWX pre-fills Environment.",
  },
]

const TERMS_TO_AVOID = [
  { dontSay: "Go Score", sayInstead: "WX Score", why: "Deprecated terminology" },
  {
    dontSay: "Official weather briefing",
    sayInstead: "Weather intelligence / Weather analysis",
    why: "Regulatory concern — removed Feb 2026",
  },
  {
    dontSay: "Replacement for [competitor]",
    sayInstead: "Complementary to / Enhances",
    why: "We complement, never replace",
  },
  {
    dontSay: "Better than [competitor]",
    sayInstead: "Fills the gap beyond 24 hours",
    why: "Respectful positioning",
  },
  {
    dontSay: "Guaranteed",
    sayInstead: "High confidence / Transparent about uncertainty",
    why: "Sets wrong expectations",
  },
  {
    dontSay: "Certain weather",
    sayInstead: "Early visibility / Weather intelligence",
    why: "Too absolute",
  },
  {
    dontSay: "Revolutionary / Disrupting",
    sayInstead: "A new approach / Purpose-built",
    why: "Not the brand's style",
  },
  {
    dontSay: "AI-powered (as primary descriptor)",
    sayInstead: "Decision support system / Weather intelligence",
    why: "AI is the how, not the what",
  },
]

export default function TerminologyPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
          Brand Terminology
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Terminology
        </h1>
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
          Proprietary terms, usage guidelines, and elevator pitches for the
          PlaneWX brand.
        </p>
      </section>

      {/* Proprietary Terms */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Proprietary Terms
        </h2>
        <p className="text-white/70 leading-relaxed mb-8">
          Use exactly as specified. These terms are core to the PlaneWX product
          and messaging.
        </p>
        <div className="space-y-4">
          {PROPRIETARY_TERMS.map((item) => (
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

      {/* Terms to Avoid */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Terms to Avoid
        </h2>
        <p className="text-white/70 leading-relaxed mb-8">
          Use the recommended alternatives to stay on-brand and avoid regulatory
          or positioning issues.
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
              {TERMS_TO_AVOID.map((row, i) => (
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

      {/* Elevator Pitches */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Elevator Pitches
        </h2>
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-3">
              One Sentence
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              PlaneWX is an Aviation Decision Support System that synthesizes
              federal weather data against your specific aircraft and personal
              minimums into a continuously updated WX Score across a 14-day
              planning horizon — so pilots can make go/no-go decisions before the
              pressure to commit makes those decisions hard.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-3">
              30-Second
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Think about how you plan a trip a week from now. You&apos;ve got
              the date, the destination, maybe the hotel. And then what do you
              do with weather? You wait. You check the night before. You look at
              the TAF the morning of. And by then, the bags are packed, the
              family is ready, and the decision to say no costs you something
              real. PlaneWX fixes that. It takes the same federal weather data
              every EFB uses, synthesizes it across three models, matches it
              against your specific aircraft and your personal minimums, and
              gives you a WX Score that updates automatically starting 14 days
              before your flight. Built by pilots, for pilots. PlaneWX.ai.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
