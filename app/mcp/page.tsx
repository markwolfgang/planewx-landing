import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { Check, ExternalLink } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SignUpButton } from "@/components/shared/sign-up-button"
import { SiteFooter } from "@/components/shared/site-footer"
import {
  MCP_CHATGPT_DEMO_VIDEO,
  MCP_CLAUDE_DEMO_VIDEOS,
  mcpDemoEmbedUrl,
  type McpDemoVideo,
} from "@/lib/mcp/demo-videos"

const TITLE = "PlaneWX MCP: Aviation Weather for Claude, Grok, ChatGPT and Gemini"
const DESCRIPTION =
  "PlaneWX briefings, WX Score, trips and departure windows in Claude, Grok, ChatGPT and Gemini. Pro Plus, trials included. You still make the GO / NO-GO call."
const URL = "https://www.planewx.ai/mcp"
const HELP_URL = "https://app.planewx.ai/help/connect-ai-assistant"
const MCP_URL = "https://app.planewx.ai/api/mcp"
const VARIANT = "d"

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: URL },
  alternates: { canonical: URL },
}

const ASK = [
  {
    title: "Your stored briefing",
    body: "The same briefing and WX Score you see in the app, with no re-score unless you ask to refresh.",
    example: "What does my briefing for tomorrow's trip to KASE look like?",
  },
  {
    title: "Scoring a route and time",
    body: "Ask for a WX Score on a new route and departure time. Scoring includes density altitude and runway performance, along with the rest of the PlaneWX briefing, measured against your aircraft and personal minimums.",
    example: "I want to fly to Nashville on Sunday. Check a few departure times and give me the WX Score for each.",
  },
  {
    title: "Your saved trips",
    body: "Route, departure time and stored WX Score, plus Self Debriefs and FRATs for past trips. You can also save a scored candidate as a new trip, which gets its own fresh briefing in PlaneWX.",
    example: "What upcoming trips do I have?",
  },
  {
    title: "Departure windows",
    body: "Ranked candidate times, honoring limits like arriving before sunset.",
    example: "Find the best departure window Saturday from KAPA to KSDL.",
  },
] as const

const STEPS = [
  "In PlaneWX, go to Profile, Preferences, PlaneWX Labs and turn on the AI assistant connector switch.",
  `In Claude, open Customize, then Connectors, then Add custom connector, and enter the PlaneWX MCP URL: ${MCP_URL}`,
  'Sign in to PlaneWX and choose Allow on the consent screen. Tick "Also allow building briefings" for scored runs.',
] as const

const TROUBLESHOOTING =
  "If a feature does not seem to work, disconnect and reconnect to the PlaneWX connector. In PlaneWX, open your Profile, then the Account tab, then Connected apps, and choose Disconnect next to the assistant. You can also revoke the PlaneWX connection in your AI assistant's app or connector settings. Then follow the steps for your assistant above to connect again."

const CLAUDE_DIRECTORY_STEP =
  "In Claude, open Customize, then Connectors, then Discover. Search for PlaneWX (listed as PlaneWX, Community, by PlaneWX LLC) and connect. Sign in to PlaneWX and choose Allow; tick Also allow building briefings for scored runs."

const GROK_STEPS = [
  "In PlaneWX, go to Profile, Preferences, PlaneWX Labs and turn on the AI assistant connector switch.",
  `Open Grok at grok.com and add a custom connector with the PlaneWX MCP URL: ${MCP_URL}`,
  'Sign in to PlaneWX and choose Allow on the consent screen. Tick "Also allow building briefings" for scored runs.',
] as const

const GEMINI_STEPS = [
  "You need Pro Plus or a Pro Plus trial. Turn on the AI assistant connector in Profile, Preferences, PlaneWX Labs.",
  `On your computer, go to gemini.google.com. At the bottom, click Settings, then Connected Apps (if you don't see Connected Apps, click Personal Intelligence first). Under Custom apps, click Add a custom app, enter the URL ${MCP_URL} and click Next.`,
  "Leave Client ID and Client secret blank.",
  'Sign in to PlaneWX. Tick "Also allow building briefings" for scored runs, then press Allow.',
  "Disconnect anytime in PlaneWX account settings or in Gemini.",
] as const

const GEMINI_REQUIREMENT =
  "Needs Gemini custom apps access: 18 or over, in the US, signed in with a personal Google Account, with Keep Activity on."

const CHATGPT_APP_URL =
  "https://chatgpt.com/plugins/plugin_asdk_app_6ace72ff9874819192f7ceb03d1a17d1"

const CHATGPT_STEPS: ReactNode[] = [
  "You need Pro Plus or a Pro Plus trial. Turn on the AI assistant connector in Profile, Preferences, PlaneWX Labs.",
  <>
    You need a paid ChatGPT plan. Open{" "}
    <a
      href={CHATGPT_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
    >
      Add PlaneWX to ChatGPT
    </a>
    .
  </>,
  'Sign in to PlaneWX. Tick "Also allow building briefings" for scored runs, then press Allow.',
  "Disconnect anytime in PlaneWX account settings or in ChatGPT.",
]

function DemoVideo({ video }: { video: McpDemoVideo }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <iframe
        className="aspect-video w-full"
        src={mcpDemoEmbedUrl(video.id)}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}

const FOREFLIGHT_COMPARE_TIP =
  "If you also use the ForeFlight MCP, you can ask your assistant to compare the ForeFlight briefing directly with the PlaneWX briefing. Only do this for flights departing within about 2 hours. ForeFlight briefings are built for near-term departures, so a comparison made hours in advance won't be accurate."

const FAQ = [
  {
    q: "Can I use Claude for pilots' weather briefings?",
    a: "Yes, with your own PlaneWX data. The PlaneWX connector links your account to Claude, so you can ask about your trips, stored briefings, WX Score and departure windows in a normal conversation. Claude reports what PlaneWX found and links back to the full briefing. You still make the GO / NO-GO call and weigh NOTAMs, ATIS, PIREPs and your other sources.",
  },
  {
    q: "What is an AI weather briefing with PlaneWX?",
    a: "It is your PlaneWX briefing, read through an AI assistant. The assistant reports the WX Score, the band (Favorable, Marginal or Unfavorable) and what drives it. It does not tell you to go or not to go. PlaneWX is one input to your decision, alongside an official briefing, NOTAMs, ATIS and PIREPs.",
  },
  {
    q: "Does Garmin Pilot have an AI connector?",
    a: "Garmin Pilot does not have an AI connector. The PlaneWX connector works in Claude, Grok, ChatGPT and Gemini.",
  },
  {
    q: "Is there an aviation weather MCP server?",
    a: `Yes. PlaneWX runs an MCP server at ${MCP_URL}. Add it as a custom connector in your AI assistant, then sign in with your PlaneWX account.`,
  },
  {
    q: "Who can use the PlaneWX MCP?",
    a: "Pro Plus pilots, trials included. It is not available on Free, Casual or Pro without a Pro Plus trial.",
  },
  {
    q: "Can I compare a ForeFlight briefing with my PlaneWX briefing?",
    a: FOREFLIGHT_COMPARE_TIP,
  },
] as const

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const sectionTitle = "text-3xl md:text-4xl font-bold"
const body = "text-white/65 leading-relaxed"

export default function McpPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 25% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 75% 100%, rgba(14,165,233,0.08) 0%, transparent 70%)",
            "linear-gradient(135deg, #0B1120 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      <nav className="relative z-10 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="PlaneWX home">
            <BrandLogo className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/news" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/about" className="hidden sm:inline text-sm text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <SignUpButton
              variant={VARIANT}
              path="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Log In
            </SignUpButton>
            <SignUpButton
              variant={VARIANT}
              className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free Trial
            </SignUpButton>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-20 pb-16 px-4 sm:pt-24 sm:pb-20">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
              PlaneWX MCP (beta)
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
              The Aviation Weather MCP Server for{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Claude, Grok, ChatGPT and Gemini
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              Ask about your trips, briefings and departure windows in plain English, right inside
              the AI assistant you already use. Pro Plus, trials included.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={HELP_URL}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 text-base font-semibold shadow-lg shadow-sky-500/25 transition-all"
              >
                How to connect
              </a>
              <Link
                href="/news/new-beta-planewx-in-claude-and-grok"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Read the beta announcement
              </Link>
            </div>
            <p className="text-sm text-white/35 max-w-xl mx-auto leading-relaxed">
              You still make the GO / NO-GO call. PlaneWX is one input alongside NOTAMs, ATIS,
              PIREPs and your other sources.
            </p>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className={`${sectionTitle} text-center`}>What the PlaneWX MCP is</h2>
            <p className={body}>
              The PlaneWX connector is an MCP server that links your PlaneWX account to an AI
              assistant. Once connected, you can ask about your flying in a normal conversation and
              get answers from your own PlaneWX data: your profile, aircraft, personal minimums,
              saved trips, briefings and WX Score.
            </p>
            <p className={body}>
              PlaneWX doesn&apos;t tell you to go or not to go, and neither does the connector. The
              assistant reports the WX Score, the band (Favorable, Marginal or Unfavorable) and what
              drives it, and links back to the full PlaneWX briefing.
            </p>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4">
          <div className="container mx-auto max-w-5xl space-y-10">
            <h2 className={`${sectionTitle} text-center`}>What you can ask</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {ASK.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className={body}>{item.body}</p>
                  <p className="text-sm italic text-sky-300/80">&ldquo;{item.example}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl space-y-6 text-center">
            <h2 className={sectionTitle}>Works in Claude, Grok, ChatGPT and Gemini</h2>
            <p className={body}>
              The PlaneWX connector works in Claude, Grok, ChatGPT and Gemini.
            </p>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className={`${sectionTitle} text-center`}>Who gets it</h2>
            <ul className="space-y-4">
              {[
                "Pro Plus, trials included.",
                "Not available on Free, Casual or Pro without a Pro Plus trial.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/70 leading-relaxed">
                  <Check className="h-5 w-5 text-sky-400 mt-0.5 shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className={body}>
              It is a PlaneWX Labs beta feature, so you may run into rough edges. Tell us with the
              Feedback button in the app.
            </p>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-3xl space-y-6">
            <h2 className={`${sectionTitle} text-center`}>How to connect</h2>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Claude</h3>
              <p className="text-white/70 leading-relaxed break-words">{CLAUDE_DIRECTORY_STEP}</p>
              <p className="text-white/70 leading-relaxed break-words">
                Or add it as a custom connector with the URL {MCP_URL}:
              </p>
              <ol className="space-y-4 list-decimal pl-6 text-white/70 leading-relaxed break-words">
                {STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {MCP_CLAUDE_DEMO_VIDEOS.map((video) => (
                <DemoVideo key={video.id} video={video} />
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Grok</h3>
              <ol className="space-y-4 list-decimal pl-6 text-white/70 leading-relaxed break-words">
                {GROK_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Gemini</h3>
              <p className="text-white/70 leading-relaxed break-words">{GEMINI_REQUIREMENT}</p>
              <ol className="space-y-3 list-decimal pl-6 text-white/70 leading-relaxed break-words">
                {GEMINI_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">ChatGPT</h3>
              <ol className="space-y-3 list-decimal pl-6 text-white/70 leading-relaxed break-words">
                {CHATGPT_STEPS.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <DemoVideo video={MCP_CHATGPT_DEMO_VIDEO} />
            </div>
            <p className="text-white/70 leading-relaxed break-words">{TROUBLESHOOTING}</p>
            <div className="text-center pt-2">
              <a
                href={HELP_URL}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Full steps in Help: Connect PlaneWX to your AI assistant
                <ExternalLink className="h-4 w-4 text-white/40" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4">
          <div className="container mx-auto max-w-3xl space-y-8">
            <h2 className={`${sectionTitle} text-center`}>FAQ</h2>
            <p className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 text-white/70 leading-relaxed">
              <strong className="text-white">Tip:</strong> {FOREFLIGHT_COMPARE_TIP}
            </p>
            {FAQ.map((item) => (
              <div key={item.q} className="space-y-2">
                <h3 className="text-xl font-bold">{item.q}</h3>
                <p className={body}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter variant={VARIANT} />
    </div>
  )
}
