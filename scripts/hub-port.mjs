/**
 * Shared Learning Center hub HTML helpers.
 * Extract <article> + <style> the same way the r12 port does, then rewrite
 * absolute planewx.ai /learn links to site-root paths.
 *
 * Production CI must NOT read staging git refs. Expected MAIN_HTML /
 * INLINE_STYLE / asset MD5s are pinned in HUB_CONTENT_MD5 and HUB_ASSET_MD5.
 * Re-porting from a local HTML tree is optional for editors only.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")

/**
 * All Learning Center hub pages. dir is relative to app/learn.
 * sourceMd5 is the staged HTML box checksum (documentation / local re-verify).
 * mainHtmlMd5 / inlineStyleMd5 are pinned from the extracted port and checked
 * against content.ts in CI (no git refs required).
 */
export const HUB_PAGES = [
  {
    slug: "taf",
    source: "what-is-a-taf.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "a5db0ad87abced06cfd0a9f4b1962060",
    mainHtmlMd5: "ea91e1360cb55452e0403f03da10e7f6",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/taf",
  },
  {
    slug: "metar",
    source: "what-is-a-metar.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "e6153d054ff079f3812245cddb89f051",
    mainHtmlMd5: "0af0d54e31ad6d2ae69dd65994a4cbcb",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/metar",
  },
  {
    slug: "airmet-sigmet",
    source: "airmet-sigmet.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "cd52ca07f7d7ba24ed1d386ae44841a3",
    mainHtmlMd5: "bd1f5330694a3147fb1d0cfe804c8726",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/airmet-sigmet",
  },
  {
    slug: "pirep",
    source: "what-is-a-pirep.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "8407c8a6e7a12fe4af03fd4ecd60a05f",
    mainHtmlMd5: "06dedec99a157c1a0cef797ffa5a363a",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/pirep",
  },
  {
    slug: "winds-aloft",
    source: "winds-aloft.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "870a8ec3d07cb87a86acdd2d2bb8966c",
    mainHtmlMd5: "807992301c58af17bbf13162e7a165e1",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/winds-aloft",
  },
  {
    slug: "icing",
    source: "icing.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "82bb1a3c813fac18d3e2d0855a9cebae",
    mainHtmlMd5: "58fdfd4c01004fbb77a5929c47dcb1fb",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/icing",
  },
  {
    slug: "turbulence",
    source: "turbulence.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "3eafa44339db61e170feeb92d760cfdd",
    mainHtmlMd5: "afbde32f5e315b2d7773a1a7f40f68ec",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/turbulence",
  },
  {
    slug: "weather-radar",
    source: "weather-radar.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "061d5d93ae8456c1dea70248ab7b3ef1",
    mainHtmlMd5: "0b6bbad31c6c87ec342277fcda6ac8c4",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/weather-radar",
  },
  {
    slug: "density-altitude",
    source: "density-altitude.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "9afaccf09145f88a8ba75c5013533d10",
    mainHtmlMd5: "e4c855f9cffa86cd9bb55f03cf43f586",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/density-altitude",
  },
  {
    slug: "thunderstorms",
    source: "thunderstorms.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "b221d323eb82eb28a996300516745ad7",
    mainHtmlMd5: "62a266e6f566b9f184efa3d844007ac0",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/thunderstorms",
  },
  {
    slug: "ceiling-visibility",
    source: "ceiling-visibility.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "21b42ecae58c89bb28f0aee45c88c440",
    mainHtmlMd5: "d299a078d8965279cf9c412789389966",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/ceiling-visibility",
  },
  {
    slug: "fog",
    source: "fog.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "82d271353fefaeca28de3a0a75edb0b2",
    mainHtmlMd5: "c1a9c55b6d2d34840bacf7ac1a164299",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/fog",
  },
  {
    slug: "wind-shear-microburst",
    source: "wind-shear-microburst.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "33f5aa704def85004110811382d4d3aa",
    mainHtmlMd5: "6c50e755609b51f1cbd6a5e47a2fd9cd",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/wind-shear-microburst",
  },
  {
    slug: "mountain-wave",
    source: "mountain-wave.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "3d0c6ac331a96492b06f64b691fb6cc6",
    mainHtmlMd5: "0f2ec42f554b697f8e82b9b24fec26b4",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/mountain-wave",
  },
  {
    slug: "weather-briefings",
    source: "weather-briefings.html",
    // SF4 loop rename (Oct 23, 2026): Brief, Assess, Decide, Debrief; Assess / Decide labels,
    // Self Debrief on every plan, link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "6ceaace26fc49b4eef4318cbd0c97ab2",
    mainHtmlMd5: "6f0f4ff44be21d730ac690f5a89bf43d",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/weather-briefings",
  },
  {
    slug: "weather-risk",
    source: "weather-risk.html",
    // Loop name (Oct 21, 2026): Assess / Decide labels, Self Debrief on every plan,
    // link to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "668849c529daa7478626bb5e3e48c951",
    mainHtmlMd5: "4a81646de50995d1b7f42ea80778c2e3",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/weather-risk",
  },
  {
    slug: "flight-risk-assessment-tool",
    source: "flight-risk-assessment-tool.html",
    // SEO QA + CodeRabbit cell fix (Oct 7, 2026): meta 151 chars, GO / NO-GO,
    // nbsp restores, The record eFRAT cell matches help/frat (no FRAT email).
    // content.ts file md5 f0b866bae1258e6d04dda3a3b249e2b5; MAIN_HTML string md5 below.
    // Heading rewrite (#165, Oct 8, 2026): headings only; content.ts file md5
    // e1c49b5cd3e4fb34515e7b45d5dbab58, MAIN_HTML md5 re-pinned below.
    // FAQ + feature mentions (Oct 12, 2026): five FAQ entries added; MAIN_HTML re-pinned.
    // Need Help Now FAQ: opens 2 hours before departure (not within 4 hours); MAIN_HTML re-pinned.
    // SEO expand (Oct 21, 2026): FAASafety.gov FAAST FRAT library cite [8], civil twilight
    // night rule, four FAQ entries, Self Debrief on every plan, GO / NO-GO casing. MAIN_HTML re-pinned.
    // Review round 1 (Oct 21, 2026): imperatives rewritten descriptively, bare "go" to GO. MAIN_HTML re-pinned.
    // Requote (Oct 21, 2026): Risk Loop and WX Score help quotes from app PR #3161 (45b2d17f). MAIN_HTML re-pinned.
    // Loop name (Oct 21, 2026): Brief, Assess, Decide, Debrief step labels, links to
    // /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "30c4436e6bb40845c17a464236b1df5f",
    mainHtmlMd5: "c79db403362642a9206b02462f6ec597",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "flight-risk-assessment-tool",
  },
  {
    slug: "imsafe-checklist",
    source: "imsafe-checklist.html",
    // New guide (Oct 11, 2026): SEO brief BRIEF-IMSAFE.md. Source HTML is the
    // extracted <article>, so sourceMd5 equals mainHtmlMd5.
    // Gap fill (Oct 14, 2026): FAASTeam + CAP cites, shipped FRAT features,
    // directive wording softened, 61.53 key facts completed,
    // card prompts risk-positive (CodeRabbit). MAIN_HTML re-pinned.
    // Loop link (Oct 21, 2026): links to /learn/risk-management-loop. MAIN_HTML re-pinned.
    sourceMd5: "6de0739ef95d4273d799b969d57991af",
    mainHtmlMd5: "6de0739ef95d4273d799b969d57991af",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "imsafe-checklist",
  },
  {
    slug: "controlled-flight-into-terrain",
    source: "controlled-flight-into-terrain.html",
    // New guide (Oct 11, 2026): SEO brief BRIEF-CFIT.md. Source HTML is the
    // extracted <article>, so sourceMd5 equals mainHtmlMd5.
    sourceMd5: "569e848dd07d3d2228144aa3e24172c9",
    mainHtmlMd5: "569e848dd07d3d2228144aa3e24172c9",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "controlled-flight-into-terrain",
  },
  {
    slug: "risk-management-loop",
    source: "risk-management-loop.html",
    // New guide (Oct 21, 2026): SEO/AEO brief 2026-10-21-risk-management-loop.md.
    // Canonical definition of Brief, Assess, Decide, Debrief. Source HTML is the
    // extracted <article>, so sourceMd5 equals mainHtmlMd5.
    // CR round 1 (Oct 21, 2026): data-label on all 28 stacked-table cells. MAIN_HTML re-pinned.
    sourceMd5: "a2b7cd8e1550837a4ad6b31ef032d162",
    mainHtmlMd5: "a2b7cd8e1550837a4ad6b31ef032d162",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "risk-management-loop",
  },
]

export const HUB_ASSET_MD5 = {
  // Post-delta: SMS / ac12092d source_title and source_short use U+00A0 and U+2011.
  // Pre-delta glossary.json md5 (same as #125): c0ddbbbecdb9110a2a314b9357dc2dcc
  // Batch 4: merged 47 glossary additions (115 -> 162 terms).
  "glossary.json": "268227c49262a7d57a01f9b340e8f0a1",
  "hub.css": "9b057c4e999b136c17da01265393e834",
  "glossary.css": "36948050a68231ad3b4e8b2c1ea13eb1",
  "glossary.js": "2610af0a5436df351d153f6694bb6a19",
}

/** Optional reference checksums for the DA calculator JS box (docs only). */
export const HUB_CALCULATOR_SOURCE_MD5 = {
  "calculator/density-altitude.js": "bc7683f1ba2f2199626c5ecbfd2df499",
  "calculator/density-altitude.test.js": "afccdabc1e00212323aae391a4b9cb40",
}

const LEARN_ABS = "https://www.planewx.ai/learn/"

/** Rewrite absolute Learning Center URLs to root-relative paths. */
export function rewriteLearnLinks(html) {
  return html.split(LEARN_ABS).join("/learn/")
}

/** Extract the hub <article>...</article> from staged HTML. */
export function extractMainHtml(sourceHtml) {
  const m = sourceHtml.match(/<article\b[\s\S]*?<\/article>/)
  if (!m) throw new Error("No <article> found in hub source HTML")
  return rewriteLearnLinks(m[0])
}

/** Extract the first <style>...</style> body from staged HTML. */
export function extractInlineStyle(sourceHtml) {
  const m = sourceHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  if (!m) throw new Error("No <style> found in hub source HTML")
  return m[1]
}

export function extractFromHubSource(sourceHtml) {
  return {
    mainHtml: extractMainHtml(sourceHtml),
    inlineStyle: extractInlineStyle(sourceHtml),
  }
}

/** Parse MAIN_HTML / INLINE_STYLE string exports from a content.ts file. */
export function loadContentModule(contentTsPath) {
  const text = readFileSync(contentTsPath, "utf8")
  const main = text.match(
    /export const MAIN_HTML = ((?:`[\s\S]*?`|"(?:\\.|[^"\\])*"))\s*(?:;|\n)/,
  )
  if (!main) throw new Error(`MAIN_HTML not found in ${contentTsPath}`)
  const inline = text.match(
    /export const INLINE_STYLE = ((?:`[\s\S]*?`|"(?:\\.|[^"\\])*"))\s*(?:;|\n)/,
  )
  return {
    MAIN_HTML: JSON.parse(main[1]),
    INLINE_STYLE: inline ? JSON.parse(inline[1]) : null,
  }
}

export function formatContentTs(mainHtml, inlineStyle) {
  return (
    `export const MAIN_HTML = ${JSON.stringify(mainHtml)}\n` +
    `export const INLINE_STYLE = ${JSON.stringify(inlineStyle)}\n`
  )
}

export function contentTsPath(pageOrSlug) {
  const page =
    typeof pageOrSlug === "string"
      ? HUB_PAGES.find((p) => p.slug === pageOrSlug)
      : pageOrSlug
  if (!page) throw new Error(`Unknown hub page: ${pageOrSlug}`)
  return join(ROOT, "app/learn", page.dir, "content.ts")
}

/**
 * Optional local re-port from a directory of HTML files (for editors).
 * Never used by CI. Does not read git refs or staging branches.
 */
export function portAllFromDir(sourceDir) {
  if (!existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`)
  }
  const results = []
  for (const page of HUB_PAGES) {
    const sourceHtml = readFileSync(join(sourceDir, page.source), "utf8")
    const { mainHtml, inlineStyle } = extractFromHubSource(sourceHtml)
    const out = contentTsPath(page)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, formatContentTs(mainHtml, inlineStyle))
    results.push({
      slug: page.slug,
      source: page.source,
      mainLen: mainHtml.length,
      styleLen: inlineStyle.length,
      out,
    })
  }
  return results
}

if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("hub-port.mjs")
) {
  const dir = process.argv[2]
  if (!dir) {
    console.error(
      "Usage: node scripts/hub-port.mjs <local-html-dir>\n" +
        "CI uses scripts/check-hub-content.mjs against pinned MD5s (no git refs).",
    )
    process.exit(1)
  }
  const results = portAllFromDir(dir)
  for (const r of results) {
    console.log(
      `ported ${r.slug}: main=${r.mainLen} style=${r.styleLen} -> ${r.out}`,
    )
  }
}
