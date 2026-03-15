import { Mic2, CheckCircle, XCircle } from "lucide-react"

export const metadata = {
  title: "Voice & Tone | Brand Portal | PlaneWX",
  description:
    "PlaneWX voice and tone guidelines — how we sound across all channels.",
}

export default function VoicePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <Mic2 className="h-4 w-4" />
          Voice & Tone
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Voice & Tone
        </h1>
        <p className="text-xl text-white/70 max-w-2xl">
          PlaneWX sounds like a knowledgeable pilot-founder talking to fellow
          pilots — not a corporation marketing to customers.
        </p>
      </section>

      {/* We Are / We Are Not */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          We Are / We Are Not
        </h2>
        <p className="text-white/60 mb-6">
          The identity we embody vs. what we avoid.
        </p>
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
              {[
                [
                  "A fellow pilot who built this for himself",
                  "A faceless tech company",
                ],
                [
                  "Safety-focused and mission-driven",
                  "Fear-mongering or preachy about safety",
                ],
                [
                  "Technically credible — we speak pilot",
                  "Dumbed-down or over-simplified",
                ],
                [
                  "Transparent about data and limitations",
                  "Hiding methodology or overselling accuracy",
                ],
                [
                  "Complementary to existing tools",
                  "Competing with or bashing ForeFlight/Garmin",
                ],
                [
                  "Personally authentic (Mark's voice)",
                  "Corporate marketing speak",
                ],
                [
                  "Action-oriented with clear next steps",
                  "Vague or hand-wavy",
                ],
                [
                  "Confident in what we do well",
                  "Arrogant or dismissive of alternatives",
                ],
                [
                  "Empathetic to real pilot frustrations",
                  "Lecturing pilots on what they should do",
                ],
                [
                  "Data-transparent — show the work",
                  'A black box that says "trust us"',
                ],
              ].map(([weAre, weAreNot], i) => (
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

      {/* Voice Attributes */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Voice Attributes
        </h2>
        <p className="text-white/60 mb-6">
          Ranked by priority. Apply in order when crafting content.
        </p>
        <div className="space-y-4">
          {[
            {
              num: 1,
              title: "Safety-First",
              desc: "Everything ties back to keeping pilots safe. Reference FAA's PAVE framework and \"get-there-itis\" naturally — not as scare tactics.",
            },
            {
              num: 2,
              title: "Technically Credible",
              desc: "Use precise aviation terminology naturally: HRRR, ECMWF, TAFs, PIREPs, G-AIRMETs, Richardson number, SLD detection. Assume the reader is a pilot.",
            },
            {
              num: 3,
              title: "Personally Authentic",
              desc: "Mark Wolfgang is the voice. Content should feel like a real person, not a marketing department.",
            },
            {
              num: 4,
              title: "Empathy-Driven",
              desc: "Understand the real frustration: the pressure from family, the hotel already booked, the meeting you can't miss.",
            },
            {
              num: 5,
              title: "Action-Oriented",
              desc: "Every piece of content gives the reader something to do next. Feature descriptions: Name → What it does → Why it matters.",
            },
            {
              num: 6,
              title: "Data-Transparent",
              desc: "Show our work. \"Disagree with the consensus? The data is there.\" Never hide methodology.",
            },
            {
              num: 7,
              title: "Confident but Humble",
              desc: "Claim differentiators clearly but acknowledge where others excel. We complement, never replace.",
            },
          ].map((attr) => (
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

      {/* Tone by Context */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Tone by Context
        </h2>
        <p className="text-white/60 mb-6">
          How our tone shifts across channels and content types.
        </p>
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
              {[
                [
                  "Landing page headlines",
                  "Bold, direct, emotionally resonant",
                  '"Every weather tool shows you data. PlaneWX helps you decide."',
                ],
                [
                  "Feature descriptions",
                  "Technical yet accessible, benefit-focused",
                  '"Three Models. One Confident Answer."',
                ],
                [
                  "Onboarding emails",
                  "Warm, personal, first-name basis",
                  '"Here are 3 things to do in the next 5 minutes"',
                ],
                [
                  "Weather alert emails",
                  "Clear, factual, actionable",
                  '"Your WX Score dropped from 82% to 61%"',
                ],
                [
                  "Safety messaging",
                  "Serious but not preachy, data-backed",
                  "—",
                ],
                [
                  "Competitor positioning",
                  "Respectful, complementary",
                  '"We enhance, not replace, existing tools."',
                ],
                [
                  "Pricing / CTAs",
                  "Confident, no-pressure",
                  '"No credit card required. Cancel anytime."',
                ],
                [
                  "Social media / forums",
                  "Knowledgeable peer, conversational",
                  "Fellow pilot sharing something useful, not selling",
                ],
                [
                  "Ad copy",
                  "Problem → Pain → Solution",
                  "Lead with the scenario pilots recognize",
                ],
                [
                  "In-app UI",
                  "Clear, concise, pilot-natural",
                  "Aviation conventions. Empty states guide, not scold.",
                ],
              ].map(([context, tone, example], i) => (
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

      {/* Do's and Don'ts */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Do&apos;s and Don&apos;ts
        </h2>
        <p className="text-white/60 mb-6">
          Quick reference for content creation.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              DO
            </h3>
            <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
              <li>Use correct aviation terminology</li>
              <li>Lead with specific numbers and data</li>
              <li>Present weather as a planning variable</li>
              <li>Acknowledge limits honestly</li>
              <li>Let the product speak for itself</li>
              <li>Use pilot-native scenarios</li>
              <li>Credit the community</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
              DON&apos;T
            </h3>
            <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
              <li>Use fear-based language</li>
              <li>Use startup buzzwords (disruptive, revolutionary)</li>
              <li>Claim to replace ForeFlight</li>
              <li>Guarantee accuracy or predict outcomes</li>
              <li>Use urgency/alarm in messaging</li>
              <li>Imply non-users are unsafe</li>
              <li>Over-promise on AI</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quality Checklist */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Quality Checklist
        </h2>
        <p className="text-white/60 mb-6">
          Before publishing any content, verify each item.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <ol className="space-y-3">
            {[
              "Sounds like a pilot talking to pilots?",
              "Ties back to safety or better decision-making?",
              "Aviation terminology used correctly?",
              "Proprietary terms used consistently?",
              "Avoids deprecated terms?",
              "Positions PlaneWX as complementary?",
              "Tone matches the channel?",
              "Claims are defensible?",
              "Includes a clear CTA?",
              "Would Mark send this?",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
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
