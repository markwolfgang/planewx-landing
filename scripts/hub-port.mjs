/**
 * Shared Learning Center hub HTML port helpers.
 * Extract <article> + <style> from staged hub-source HTML the same way the
 * r5/r6/r7/r8/r9/r10 port does, then rewrite absolute planewx.ai /learn links to
 * site-root paths so preview cross-links resolve.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")

export const HUB_SOURCE_REF = "origin/staging/learn-hub-source-r10"
/** r11 typography pass for DA (+ FRAT until r12) lives under seo-source-r11/ on this ref. */
export const HUB_SOURCE_REF_R11 = "origin/staging/learn-hub-source-r11"
/** r12 FRAT nit pass lives under seo-source-r12/ on this ref. */
export const HUB_SOURCE_REF_R12 = "origin/staging/learn-hub-source-r12"

/**
 * All Learning Center hub pages ported from hub-source.
 * dir is relative to app/learn (aviation-weather/<slug> or top-level slug).
 * Optional sourceRef/sourceDir override the default hub-source/ on HUB_SOURCE_REF.
 */
export const HUB_PAGES = [
  {
    slug: "taf",
    source: "what-is-a-taf.html",
    expectedMd5: "a5db0ad87abced06cfd0a9f4b1962060",
    dir: "aviation-weather/taf",
  },
  {
    slug: "metar",
    source: "what-is-a-metar.html",
    expectedMd5: "e6153d054ff079f3812245cddb89f051",
    dir: "aviation-weather/metar",
  },
  {
    slug: "airmet-sigmet",
    source: "airmet-sigmet.html",
    expectedMd5: "cd52ca07f7d7ba24ed1d386ae44841a3",
    dir: "aviation-weather/airmet-sigmet",
  },
  {
    slug: "pirep",
    source: "what-is-a-pirep.html",
    expectedMd5: "8407c8a6e7a12fe4af03fd4ecd60a05f",
    dir: "aviation-weather/pirep",
  },
  {
    slug: "winds-aloft",
    source: "winds-aloft.html",
    expectedMd5: "870a8ec3d07cb87a86acdd2d2bb8966c",
    dir: "aviation-weather/winds-aloft",
  },
  {
    slug: "icing",
    source: "icing.html",
    expectedMd5: "82bb1a3c813fac18d3e2d0855a9cebae",
    dir: "aviation-weather/icing",
  },
  {
    slug: "turbulence",
    source: "turbulence.html",
    expectedMd5: "3eafa44339db61e170feeb92d760cfdd",
    dir: "aviation-weather/turbulence",
  },
  {
    slug: "weather-radar",
    source: "weather-radar.html",
    expectedMd5: "061d5d93ae8456c1dea70248ab7b3ef1",
    dir: "aviation-weather/weather-radar",
  },
  {
    slug: "density-altitude",
    source: "density-altitude.html",
    expectedMd5: "9afaccf09145f88a8ba75c5013533d10",
    dir: "aviation-weather/density-altitude",
    sourceRef: HUB_SOURCE_REF_R11,
    sourceDir: "seo-source-r11",
  },
  {
    slug: "flight-risk-assessment-tool",
    source: "flight-risk-assessment-tool.html",
    expectedMd5: "9aa50782fe209223a142ae79a35b3a64",
    dir: "flight-risk-assessment-tool",
    sourceRef: HUB_SOURCE_REF_R12,
    sourceDir: "seo-source-r12",
  },
]

export const HUB_ASSET_MD5 = {
  "glossary.json": "c0ddbbbecdb9110a2a314b9357dc2dcc",
  "hub.css": "9b057c4e999b136c17da01265393e834",
  "glossary.css": "36948050a68231ad3b4e8b2c1ea13eb1",
  "glossary.js": "2610af0a5436df351d153f6694bb6a19",
}

const LEARN_ABS = "https://www.planewx.ai/learn/"

/** Rewrite absolute Learning Center URLs to root-relative paths. */
export function rewriteLearnLinks(html) {
  return html.split(LEARN_ABS).join("/learn/")
}

/** Extract the hub <article>...</article> from a staged HTML file. */
export function extractMainHtml(sourceHtml) {
  const m = sourceHtml.match(/<article\b[\s\S]*?<\/article>/)
  if (!m) throw new Error("No <article> found in hub source HTML")
  return rewriteLearnLinks(m[0])
}

/** Extract the first <style>...</style> body from a staged HTML file. */
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

export function readSourceFromGit(
  sourceFile,
  ref = HUB_SOURCE_REF,
  sourceDir = "hub-source",
) {
  return execFileSync(
    "git",
    ["show", `${ref}:${sourceDir}/${sourceFile}`],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  )
}

export function readPageSource(page) {
  const ref = page.sourceRef || HUB_SOURCE_REF
  const dir = page.sourceDir || "hub-source"
  return readSourceFromGit(page.source, ref, dir)
}

export function portAllFromGit(ref = HUB_SOURCE_REF) {
  const results = []
  for (const page of HUB_PAGES) {
    const sourceHtml = page.sourceRef
      ? readPageSource(page)
      : readSourceFromGit(page.source, ref)
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
  const results = portAllFromGit()
  for (const r of results) {
    console.log(
      `ported ${r.slug}: main=${r.mainLen} style=${r.styleLen} -> ${r.out}`,
    )
  }
}
