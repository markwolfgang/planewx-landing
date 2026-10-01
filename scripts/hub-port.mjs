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
    sourceMd5: "a5db0ad87abced06cfd0a9f4b1962060",
    mainHtmlMd5: "acec8a221ea7c31137ebbbb02df0f544",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/taf",
  },
  {
    slug: "metar",
    source: "what-is-a-metar.html",
    sourceMd5: "e6153d054ff079f3812245cddb89f051",
    mainHtmlMd5: "b53d555a51cd8c0bb58160411df3a69b",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/metar",
  },
  {
    slug: "airmet-sigmet",
    source: "airmet-sigmet.html",
    sourceMd5: "cd52ca07f7d7ba24ed1d386ae44841a3",
    mainHtmlMd5: "b49d47ae8796d1b243af7be23d8a617c",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/airmet-sigmet",
  },
  {
    slug: "pirep",
    source: "what-is-a-pirep.html",
    sourceMd5: "8407c8a6e7a12fe4af03fd4ecd60a05f",
    mainHtmlMd5: "d3a5bc5fbb7846525f8bb20b444c4b29",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/pirep",
  },
  {
    slug: "winds-aloft",
    source: "winds-aloft.html",
    sourceMd5: "870a8ec3d07cb87a86acdd2d2bb8966c",
    mainHtmlMd5: "4a5c995cd735bdfada7bffd9313ef817",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/winds-aloft",
  },
  {
    slug: "icing",
    source: "icing.html",
    sourceMd5: "82bb1a3c813fac18d3e2d0855a9cebae",
    mainHtmlMd5: "76adf40885949a1f87655490060aaec7",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/icing",
  },
  {
    slug: "turbulence",
    source: "turbulence.html",
    sourceMd5: "3eafa44339db61e170feeb92d760cfdd",
    mainHtmlMd5: "9b387ce789fb6141fd376c4b7eb6e055",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/turbulence",
  },
  {
    slug: "weather-radar",
    source: "weather-radar.html",
    sourceMd5: "061d5d93ae8456c1dea70248ab7b3ef1",
    mainHtmlMd5: "fb6fa5dd3af59be81258049de2f26ece",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/weather-radar",
  },
  {
    slug: "density-altitude",
    source: "density-altitude.html",
    sourceMd5: "9afaccf09145f88a8ba75c5013533d10",
    mainHtmlMd5: "68ff68feedf55d501b0b592d30fba9de",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "aviation-weather/density-altitude",
  },
  {
    slug: "flight-risk-assessment-tool",
    source: "flight-risk-assessment-tool.html",
    sourceMd5: "9aa50782fe209223a142ae79a35b3a64",
    // Intentional deltas on MAIN_HTML after extract of 9aa50782:
    // 1) "14 CFR 91.3" -> "14&nbsp;CFR&nbsp;91.3"
    // 2) on-page glossary link text "FAA AC 120-92D, Chapter 1"
    //    -> "FAA AC&nbsp;120&#8209;92D, Chapter 1"
    // Pre-extract MAIN_HTML md5: f9a3b98d44a33450437804f5fdd3a993
    // After delta 1: 973d36d19cdad0e58a207735ba0acb16
    mainHtmlMd5: "8c294c3ceccd91df39ffd4307ea670c3",
    inlineStyleMd5: "259b147a9ac6e882449c0c000f983c3e",
    dir: "flight-risk-assessment-tool",
  },
]

export const HUB_ASSET_MD5 = {
  // Post-delta: SMS / ac12092d source_title and source_short use U+00A0 and U+2011.
  // Pre-delta glossary.json md5 (same as #125): c0ddbbbecdb9110a2a314b9357dc2dcc
  "glossary.json": "1ece906d58bd6108d55129c7927f0ffa",
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
