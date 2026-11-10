import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { GA_CUSTOMS_BODY_HTML } from "@/app/ga-customs/ga-customs-body"
import faqJson from "@/app/ga-customs/ga-customs.faq.jsonld.json"
import { MAIN_HTML as AIRMET_HTML } from "@/app/learn/aviation-weather/airmet-sigmet/content"
import { FAQ_JSON_LD as AIRMET_FAQ } from "@/app/learn/aviation-weather/airmet-sigmet/json-ld"
import {
  AVIATION_WEATHER_HUB_PAGES,
  DECISION_MAKING_HUB_PAGES,
  getLearnArticle,
  getLearnArticlesForHub,
  type LearnBodyBlock,
  type LearnFaqItem,
} from "@/app/learn/learn-data"
import { MAIN_HTML as RISK_LOOP_HTML } from "@/app/learn/risk-management-loop/content"
import { FAQ_JSON_LD as RISK_LOOP_FAQ } from "@/app/learn/risk-management-loop/json-ld"
import {
  FAQS,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_WHY,
  STATS,
  faqAnswerToPlainText,
} from "@/components/shared/landing-data"
import { htmlToMarkdown } from "@/lib/html-to-markdown"
import {
  BOLDFACE_APP_STORE_URL,
  BOLDFACE_TESTFLIGHT_URL,
  GA_CUSTOMS_APP_STORE_URL,
  GA_CUSTOMS_TESTFLIGHT_URL,
  PLANEWX_IOS_TESTFLIGHT_URL,
} from "@/lib/planewx-family-apps"

export const SITE_ORIGIN = "https://www.planewx.ai"

export type MarkdownPageSpec = {
  /** HTML path, e.g. "/about" or "/". */
  htmlPath: string
  /** Public markdown path, e.g. "/about.md" or "/index.md". */
  mdPath: string
  title: string
}

export const MARKDOWN_PAGES: MarkdownPageSpec[] = [
  { htmlPath: "/", mdPath: "/index.md", title: "PlaneWX" },
  { htmlPath: "/about", mdPath: "/about.md", title: "About PlaneWX" },
  { htmlPath: "/mcp", mdPath: "/mcp.md", title: "PlaneWX MCP" },
  { htmlPath: "/learn", mdPath: "/learn.md", title: "Learning Center" },
  { htmlPath: "/ga-customs", mdPath: "/ga-customs.md", title: "GA Customs" },
  { htmlPath: "/ios", mdPath: "/ios.md", title: "PlaneWX iOS" },
  { htmlPath: "/apps", mdPath: "/apps.md", title: "iOS apps from the PlaneWX family" },
  {
    htmlPath: "/learn/risk-management-loop",
    mdPath: "/learn/risk-management-loop.md",
    title: "Brief, Assess, Decide, Debrief",
  },
  {
    htmlPath: "/learn/hazardous-attitudes",
    mdPath: "/learn/hazardous-attitudes.md",
    title: "Hazardous Attitudes",
  },
  {
    htmlPath: "/learn/aviation-weather/airmet-sigmet",
    mdPath: "/learn/aviation-weather/airmet-sigmet.md",
    title: "AIRMET, SIGMET, and CWA",
  },
  {
    htmlPath: "/learn/swiss-cheese-model-three-strikes-rule",
    mdPath: "/learn/swiss-cheese-model-three-strikes-rule.md",
    title: "The Three Strikes Rule",
  },
]

export function canonicalUrl(htmlPath: string): string {
  if (htmlPath === "/") return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${htmlPath}`
}

export function markdownUrl(mdPath: string): string {
  return `${SITE_ORIGIN}${mdPath}`
}

/** Merge a text/markdown alternate onto an existing alternates object. */
export function withMarkdownAlternate(
  alternates: Metadata["alternates"],
  mdPath: string,
): NonNullable<Metadata["alternates"]> {
  const current =
    alternates && typeof alternates === "object" && !Array.isArray(alternates)
      ? alternates
      : {}
  return {
    ...current,
    types: {
      ...(current.types ?? {}),
      "text/markdown": markdownUrl(mdPath),
    },
  }
}

/**
 * Homepage alternates. Middleware rewrites "/" to /variants/a, so this must sit
 * on that page (the HTML actually served at "/"), not only on app/page.tsx.
 * Do not put it in the root layout: child pages would inherit /index.md.
 */
export const HOME_MARKDOWN_ALTERNATES = withMarkdownAlternate({ canonical: "/" }, "/index.md")

type FaqItem = { question: string; answer: string }

function faqSection(items: FaqItem[]): string {
  if (items.length === 0) return ""
  const body = items
    .map((item) => `**Q:** ${item.question}\n\n**A:** ${item.answer}`)
    .join("\n\n")
  return `## FAQ\n\n${body}`
}

function wrapPage(opts: {
  htmlPath: string
  title: string
  intro?: string
  sections: string[]
  faq?: FaqItem[]
}): string {
  const parts = [
    `Canonical: ${canonicalUrl(opts.htmlPath)}`,
    `# ${opts.title}`,
  ]
  if (opts.intro) parts.push(opts.intro)
  for (const section of opts.sections) {
    const trimmed = section.trim()
    if (trimmed) parts.push(trimmed)
  }
  const faq = faqSection(opts.faq ?? [])
  if (faq) parts.push(faq)
  return parts.join("\n\n").replace(/\n{3,}/g, "\n\n").trim() + "\n"
}

function faqFromJsonLd(data: {
  mainEntity?: readonly {
    name?: string
    acceptedAnswer?: { text?: string }
  }[]
}): FaqItem[] {
  return (data.mainEntity ?? [])
    .map((entity) => ({
      question: entity.name?.trim() ?? "",
      answer: entity.acceptedAnswer?.text?.trim() ?? "",
    }))
    .filter((item) => item.question && item.answer)
}

function learnFaq(items: LearnFaqItem[] | undefined): FaqItem[] {
  return (items ?? []).map((item) => ({
    question: item.question,
    answer: item.answer,
  }))
}

function renderLearnBlocks(blocks: LearnBodyBlock[]): string {
  const parts: string[] = []
  for (const block of blocks) {
    if (block.type === "htmlComment") continue
    if (block.type === "heading") {
      parts.push(`## ${block.text}`)
      continue
    }
    if (block.type === "paragraph") {
      parts.push(block.text)
      continue
    }
    if (block.type === "list") {
      parts.push(block.items.map((item) => `- ${item}`).join("\n"))
      continue
    }
    if (block.type === "callout") {
      parts.push(`**${block.title}**\n\n${block.text}`)
      continue
    }
    if (block.type === "youtube") {
      const url = `https://www.youtube.com/watch?v=${block.videoId}`
      const caption = block.caption ? `\n\n${block.caption}` : ""
      parts.push(`[Watch: ${block.title}](${url})${caption}`)
    }
  }
  return parts.join("\n\n")
}

function buildHomeMarkdown(): string {
  const how = HOW_IT_WORKS_STEPS.map((step) => {
    const badge = step.badge ? ` (${step.badge})` : ""
    return `### ${step.title}${badge}\n\n${step.body}`
  }).join("\n\n")
  return wrapPage({
    htmlPath: "/",
    title: "PlaneWX",
    intro:
      "Fly like it's your job. The confidence to go. The courage to stay. Raw weather still leaves you as the analyst.\n\nPlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer.\n\nThe risk-management loop for pilots without a dispatcher. Beyond the weather briefing.\n\nFull safety analysis on every plan. Free Plan, No End Date.",
    sections: [
      `PlaneWX is trusted by ${STATS.totalPilots} pilots in ${STATS.countries} countries.`,
      `## How it works\n\n${HOW_IT_WORKS_WHY}\n\n${how}`,
      "## Plans\n\nFree Plan, No End Date. Free is fully free. Free covers 2 flights at a time. Free has the same WX Score, FRAT, Self Debrief and personal minimums as paid plans. Paid plans (Casual, Pro, Pro Plus) add alerts, monitoring, more flights and Fuel Advisor.\n\nEvery briefing uses the same engine. After a 14-day Pro Plus trial, choose the plan that fits how you fly.",
    ],
    faq: FAQS.map((faq) => ({
      question: faq.q,
      answer: faqAnswerToPlainText(faq.a),
    })),
  })
}

function buildAboutMarkdown(): string {
  return wrapPage({
    htmlPath: "/about",
    title: "Built for the go/no-go that only a pilot can make",
    intro:
      "PlaneWX is the first aviation decision support system focused on general aviation. We exist to make a measurable impact on GA safety by equipping pilots to make smarter, safer decisions. The pilot in command always owns the call.\n\nThe confidence to go. The courage to stay.\n\nPlaneWX complements Flight Service and your EFB. It does not replace official weather sources, charts, filing, or PIC judgment.",
    sections: [
      "## Mission\n\nGeneral aviation still loses too many good pilots to decisions made under pressure, with incomplete synthesis, and too late in the planning window. PlaneWX was built to change that.\n\nOur mission is simple and measurable:\n\n- Make a real impact on GA safety, not vanity metrics.\n- Equip pilots with a high-quality weather briefing scored against personal minimums and aircraft capabilities, an honest FRAT, and mentor input when the call is close.\n- Keep the PIC in command. PlaneWX never tells you to go or stay. It helps you see the decision clearly enough to own it.\n\nYou want to be a safer pilot. You want a briefing that matches how you fly. You need an honest self-assessment. And when pressure is high and the weather is questionable, you benefit from an objective mentor's input. That is the decision support system.\n\nWe sit beside Flight Service and your EFB. They remain essential. PlaneWX adds the layer that turns weather products into a structured go/no-go conversation before bags are packed and options disappear.",
      "## How PlaneWX started\n\n- **2024 - Product work begins.** Mark Wolfgang started building what became PlaneWX while exploring AI tools to analyze aviation weather products. The problem was personal: cross-country IFR planning meant stitching METARs, TAFs, model guidance, and NWS narratives across tabs, then still telling family, \"I'll know more when the TAF drops tonight.\"\n- **November 2025 - PlaneWX LLC formed.** PlaneWX LLC was formed in November 2025 to turn that personal tool into a product for general aviation. Since formation, Mark has worked on PlaneWX seven days a week.\n- **December 2025-February 28, 2026 - Beta.** PlaneWX underwent beta testing from December 2025 through February 28, 2026.\n- **March 1, 2026 - Public launch.** PlaneWX launched publicly on March 1, 2026.\n- **Today - A DSS for GA.** PlaneWX is the first aviation decision support system focused on general aviation: weather briefing, WX Score, Synoptic Intelligence, FRAT, and mentors in one workflow. Safety-critical quality stays free. Paid plans buy automation for busy pilots.\n\nSince launch, PlaneWX has grown to over 2,200 pilots in 35 countries, flying a wide variety of aircraft from pistons to turbines.",
      "## Synoptic Intelligence\n\nSynoptic Intelligence is PlaneWX's approach to synthesizing the big-picture weather story pilots need for planning. Patent pending. Details live in in-app help for signed-in pilots.",
      "## Founder\n\nMark Wolfgang, Founder, PlaneWX LLC. Mark is a U.S. Navy veteran, commercial instrument pilot, and TBM owner with over 1,000 hours. He built PlaneWX because he needed a decision support system that matched how GA pilots actually plan trips: days out, against personal minimums, with room for judgment.\n\nAfter selling his information security consulting company, he earned his private certificate, flew a Diamond DA40 NG with his wife and dog across the country, completed an accelerated instrument program, and learned how hard honest weather planning gets once IFR and passengers enter the picture. That frustration became PlaneWX.\n\nHe still flies the product he ships.\n\n[Watch Mark's flying and product story on YouTube](https://www.youtube.com/@markflieshigh)\n\n[Read why I built PlaneWX](https://www.planewx.ai/news/why-i-built-planewx)",
      "## Partners\n\nPlaneWX works with aviation organizations and companies that help pilots fly safer. Clubs, brands, and volunteer groups that share the GA community.\n\n[Meet our partners](https://www.planewx.ai/partners)",
      "## Veterans and Veterans Airlift Command\n\nService runs through Mark's family. His father served in Vietnam. His grandfather served in World War II. Familial military service reaches back to the Revolutionary War. Mark served in the U.S. Navy.\n\nHe volunteers as a pilot with [Veterans Airlift Command](https://www.veteransairlift.org/), helping transport injured veterans, their families, and caregivers for medical and other needs.",
      "## Free for safety. Paid for automation.\n\nSafety is not a premium feature.\n\nBriefing quality, Synoptic Intelligence, WX Score, FRAT, and mentors stay the same quality on the Free Plan, No End Date. We limit how much you can use PlaneWX on free and lower tiers, not how well the decision support works.\n\nPaid plans exist for busy pilots who want automation: monitoring, refresh cadence, ground protection, auto-brief on file, and other time-savers. You are not buying better weather truth. You are buying help keeping that truth in front of you.\n\nEvery pilot gets the same decision support engine. The PIC still makes the call.",
      "## The PlaneWX family of apps\n\nPlaneWX is the decision support system. Two free companion apps help GA pilots with other parts of the job. See the full family hub: [planewx.ai/apps](/apps).\n\n- **PlaneWX (DSS).** The pilot's decision support system: weather briefing matched to your aircraft and personal minimums, WX Score, Synoptic Intelligence, FRAT, and mentors. [planewx.ai](https://www.planewx.ai)\n- **TBM Boldface.** Free memory-item study app for TBM pilots. Brought to you by PlaneWX. [Landing](/boldface) · [App Store](" +
        BOLDFACE_APP_STORE_URL +
        ")\n- **GA Customs.** Free AOE / eAPIS helper for U.S. customs arrivals: Airport of Entry hours, fees, notice, and related planning aids. [Landing](/ga-customs) · [App Store](" +
        GA_CUSTOMS_APP_STORE_URL +
        ")",
      "## Brief a real trip\n\nStart with a free account. Work a real route. See the WX Score against your minimums. Run the FRAT. Bring a mentor in when the call is close.\n\nPlaneWX will not replace Flight Service, your EFB, or your judgment. It will give you clearer structure earlier in the window, when you still have options.\n\nOutputs are decision-support tools. The pilot in command remains solely responsible for the flight. (c) PlaneWX, LLC. Patent pending.",
    ],
  })
}

function buildMcpMarkdown(): string {
  return wrapPage({
    htmlPath: "/mcp",
    title: "PlaneWX MCP: Aviation Weather for Claude, Grok, ChatGPT and Gemini",
    intro:
      "PlaneWX briefings, WX Score, trips and departure windows in Claude, Grok, ChatGPT and Gemini. Pro Plus, trials included. You still make the GO / NO-GO call.\n\nThe assistant reports the WX Score and what drives it. It never recommends GO or NO-GO; the pilot in command makes the call.\n\nMCP server URL: https://app.planewx.ai/api/mcp\n\nHelp: https://app.planewx.ai/help/connect-ai-assistant\n\nYou need Pro Plus or a Pro Plus trial. It is not available on Free, Casual or Pro without a Pro Plus trial.",
    sections: [
      "## What you can ask\n\n### Your stored briefing\n\nThe same briefing and WX Score you see in the app, with no re-score unless you ask to refresh.\n\nExample: What does my briefing for tomorrow's trip to KASE look like?\n\n### Scoring a route and time\n\nAsk for a WX Score on a new route and departure time. Scoring includes density altitude and runway performance, along with the rest of the PlaneWX briefing, measured against your aircraft and personal minimums.\n\nExample: I want to fly to Nashville on Sunday. Check a few departure times and give me the WX Score for each.\n\n### Your saved trips\n\nRoute, departure time and stored WX Score, plus Self Debriefs and FRATs for past trips. You can also save a scored candidate as a new trip, which gets its own fresh briefing in PlaneWX.\n\nExample: What upcoming trips do I have?\n\n### Departure windows\n\nRanked candidate times, honoring limits like arriving before sunset.\n\nExample: Find the best departure window Saturday from KAPA to KSDL.",
      "## Connect Claude\n\n- In PlaneWX, go to Profile, Preferences, PlaneWX Labs and turn on the AI assistant connector switch.\n- In Claude, open Customize, then Connectors, then Discover. Search for PlaneWX (listed as PlaneWX, Community, by PlaneWX LLC) and connect. Sign in to PlaneWX and choose Allow; tick Also allow building briefings for scored runs.\n- To add it as a custom connector instead: In Claude, open Customize, then Connectors, then Add custom connector, and enter the PlaneWX MCP URL: https://app.planewx.ai/api/mcp. Sign in to PlaneWX and choose Allow on the consent screen. Tick \"Also allow building briefings\" for scored runs.",
      "## Connect Grok\n\n- In PlaneWX, go to Profile, Preferences, PlaneWX Labs and turn on the AI assistant connector switch.\n- Open Grok at grok.com and add a custom connector with the PlaneWX MCP URL: https://app.planewx.ai/api/mcp\n- Sign in to PlaneWX and choose Allow on the consent screen. Tick \"Also allow building briefings\" for scored runs.",
      "## Connect ChatGPT\n\nYou need a paid ChatGPT plan. Open the [PlaneWX plugin page](https://chatgpt.com/plugins/plugin_asdk_app_6ace72ff9874819192f7ceb03d1a17d1) and connect.",
      "## Connect Gemini\n\nNeeds Gemini custom apps access: 18 or over, in the US, signed in with a personal Google Account, with Keep Activity on.\n\n- You need Pro Plus or a Pro Plus trial. Turn on the AI assistant connector in Profile, Preferences, PlaneWX Labs.\n- On your computer, go to gemini.google.com. At the bottom, click Settings, then Connected Apps (if you don't see Connected Apps, click Personal Intelligence first). Under Custom apps, click Add a custom app, enter the URL https://app.planewx.ai/api/mcp and click Next.\n- Leave Client ID and Client secret blank.\n- Sign in to PlaneWX. Tick \"Also allow building briefings\" for scored runs, then press Allow.\n- Disconnect anytime in PlaneWX account settings or in Gemini.",
      "## If a feature does not seem to work\n\nIf a feature does not seem to work, disconnect and reconnect to the PlaneWX connector. In PlaneWX, open your Profile, then the Account tab, then Connected apps, and choose Disconnect next to the assistant. You can also revoke the PlaneWX connection in your AI assistant's app or connector settings. Then follow the steps for your assistant above to connect again.",
    ],
  })
}

function buildLearnHubMarkdown(): string {
  const weather = AVIATION_WEATHER_HUB_PAGES.map(
    (page) => `- [${page.title}](${page.href}): ${page.summary}`,
  ).join("\n")
  const decision = DECISION_MAKING_HUB_PAGES.map(
    (page) => `- [${page.title}](${page.href}): ${page.summary}`,
  ).join("\n")
  const articles = getLearnArticlesForHub()
    .map((article) => `- [${article.title}](/learn/${article.slug}): ${article.summary}`)
    .join("\n")
  return wrapPage({
    htmlPath: "/learn",
    title: "PlaneWX Learning Center: Aviation Weather and Pilot Decision Guides",
    intro:
      "Learn the weather products, concepts, and decision habits professional pilots rely on. Plain-language explainers, sourced from the FAA, NWS, and Aviation Weather Center.",
    sections: [
      `## Aviation weather\n\n${weather}`,
      `## Decision making\n\n${decision}`,
      `## Guides and case studies\n\n${articles}`,
    ],
  })
}

function buildIosMarkdown(): string {
  return wrapPage({
    htmlPath: "/ios",
    title: "PlaneWX iOS",
    intro:
      "PlaneWX for iPhone and iPad is in TestFlight beta. Trips, WX Score, briefings, ForeFlight Send To import, and push notifications. Join the beta on TestFlight.",
    sections: [
      "## Features\n\n### Trips, WX Score and briefings\n\nSame Pilot's Decision Support System you use on the web - personal minimums, multi-model weather, and a clear picture days before you fly.\n\n### ForeFlight to PlaneWX\n\nSend To, then PlaneWX from ForeFlight to import a route and jump straight into Watch a New Trip.\n\n### Push notifications\n\nScore changes, Auto-Brief alerts, and pre-flight reminders - opt in under notification settings after you sign in.\n\n### Built for iPhone and iPad\n\nNative shell tuned for mobile briefings. Sign in with the same account you use at app.planewx.ai.",
      `## Join the TestFlight beta\n\n[Join the TestFlight beta](${PLANEWX_IOS_TESTFLIGHT_URL})`,
    ],
  })
}

function buildAppsMarkdown(): string {
  return wrapPage({
    htmlPath: "/apps",
    title: "iOS apps from the PlaneWX family",
    intro:
      "iOS apps from the PlaneWX family: TBM Boldface and GA Customs on the App Store, PlaneWX for iPhone and iPad in TestFlight beta.",
    sections: [
      `## PlaneWX\n\nWeather decision support on iPhone and iPad. Native app for trips, WX Score, and briefings - ForeFlight Send To import, push notifications, and the same account as app.planewx.ai.\n\n[Join the TestFlight beta](${PLANEWX_IOS_TESTFLIGHT_URL})\n\nDetails: [/ios](/ios)`,
      `## TBM Boldface\n\nTBM memory items on iPhone and iPad. Free on the App Store - chair-fly memory items, study, test, and keep serial-aware procedures ready before the airplane asks.\n\n[Download on the App Store](${BOLDFACE_APP_STORE_URL})\n\n[TestFlight](${BOLDFACE_TESTFLIGHT_URL})\n\nDetails: [/boldface](/boldface)`,
      `## GA Customs\n\nU.S. customs airports for GA pilots. Free on the App Store.\n\n[Download on the App Store](${GA_CUSTOMS_APP_STORE_URL})\n\n[TestFlight](${GA_CUSTOMS_TESTFLIGHT_URL})\n\nDetails: [/ga-customs](/ga-customs)`,
    ],
  })
}

function buildHtmlBodyMarkdown(
  htmlPath: string,
  fallbackTitle: string,
  html: string,
  faq: FaqItem[],
): string {
  const markdown = htmlToMarkdown(html)
  const lines = markdown.split("\n")
  let title = fallbackTitle
  let rest = markdown
  if (lines[0]?.startsWith("# ")) {
    title = lines[0].replace(/^#\s+/, "").trim()
    rest = lines.slice(1).join("\n").trim()
  }
  return wrapPage({
    htmlPath,
    title,
    sections: rest ? [rest] : [],
    faq,
  })
}

function buildLearnArticleMarkdown(slug: string): string | null {
  const article = getLearnArticle(slug)
  if (!article) return null
  const practice = article.puttingItIntoPractice
  const practiceHeading = practice.heading ?? "Putting it into practice"
  const whyHeading = practice.whyItMattersHeading ?? "Why it matters"
  const toolHeading = practice.toolOrHabitHeading ?? "Tool or habit"
  const sources = article.sources
    .map((source) => {
      const label = source.label
      return `- [${label}](${source.url})`
    })
    .join("\n")
  const sourcesHeading = article.sourcesHeading ?? "Sources"
  return wrapPage({
    htmlPath: `/learn/${slug}`,
    title: article.title,
    intro: article.summary,
    sections: [
      renderLearnBlocks(article.body),
      `## ${practiceHeading}\n\n### ${whyHeading}\n\n${practice.whyItMatters}\n\n### ${toolHeading}\n\n${practice.toolOrHabit}\n\nLoop stages: ${practice.loopStage.join(", ")}.`,
      sources ? `## ${sourcesHeading}\n\n${sources}` : "",
    ],
    faq: learnFaq(article.faq),
  })
}

const BUILDERS: Record<string, () => string | null> = {
  index: buildHomeMarkdown,
  about: buildAboutMarkdown,
  mcp: buildMcpMarkdown,
  learn: buildLearnHubMarkdown,
  "ga-customs": buildGaCustoms,
  ios: buildIosMarkdown,
  apps: buildAppsMarkdown,
  "learn/risk-management-loop": () =>
    buildHtmlBodyMarkdown(
      "/learn/risk-management-loop",
      "Brief, Assess, Decide, Debrief: A Risk Management Loop for General Aviation",
      RISK_LOOP_HTML,
      faqFromJsonLd(RISK_LOOP_FAQ),
    ),
  "learn/aviation-weather/airmet-sigmet": () =>
    buildHtmlBodyMarkdown(
      "/learn/aviation-weather/airmet-sigmet",
      "AIRMET, SIGMET, and CWA: In-Flight Weather Advisories Explained",
      AIRMET_HTML,
      faqFromJsonLd(AIRMET_FAQ),
    ),
  "learn/hazardous-attitudes": () =>
    buildLearnArticleMarkdown("hazardous-attitudes"),
  "learn/swiss-cheese-model-three-strikes-rule": () =>
    buildLearnArticleMarkdown("swiss-cheese-model-three-strikes-rule"),
}

function buildGaCustoms(): string {
  return buildHtmlBodyMarkdown(
    "/ga-customs",
    "App for U.S. Customs Airports for GA Pilots",
    GA_CUSTOMS_BODY_HTML,
    faqFromJsonLd(faqJson as { mainEntity?: { name?: string; acceptedAnswer?: { text?: string } }[] }),
  )
}

/** Look up markdown for a public path such as "about" or "learn/risk-management-loop". */
export function getMarkdownForSlug(slugPath: string): string | null {
  if (!Object.hasOwn(BUILDERS, slugPath)) return null
  const builder = BUILDERS[slugPath]
  return builder()
}

export function getMarkdownForMdPath(mdPath: string): string | null {
  const spec = MARKDOWN_PAGES.find((page) => page.mdPath === mdPath)
  if (!spec) return null
  const slug = spec.mdPath.replace(/^\//, "").replace(/\.md$/, "")
  return getMarkdownForSlug(slug)
}

export function readLlmsTxt(): string {
  return readFileSync(join(process.cwd(), "public/llms.txt"), "utf8")
}

/** llms.txt, then every markdown page under a "# <URL>" header. Built from the same generators. */
export function buildLlmsFull(): string {
  const parts = [readLlmsTxt().trimEnd(), ""]
  for (const page of MARKDOWN_PAGES) {
    const body = getMarkdownForMdPath(page.mdPath)
    if (!body) continue
    parts.push(`# ${markdownUrl(page.mdPath)}`, "", body.trimEnd(), "")
  }
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n"
}
