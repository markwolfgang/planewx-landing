/**
 * Shared Learning Center hub HTML port helpers.
 * Extract <article> + <style> from staged hub-source HTML the same way the
 * r5/r6/r7/r8/r9 port does, then rewrite absolute planewx.ai /learn links to
 * site-root paths so preview cross-links resolve.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")

export const HUB_SOURCE_REF = "origin/staging/learn-hub-source-r9"

export const HUB_PAGES = [
  {
    slug: "taf",
    source: "what-is-a-taf.html",
    expectedMd5: "5f1bb16e34aa746e95c32f2f0da20000",
  },
  {
    slug: "metar",
    source: "what-is-a-metar.html",
    expectedMd5: "7e93330cf6b7e7e48f6bdb6b5f7658d8",
  },
  {
    slug: "airmet-sigmet",
    source: "airmet-sigmet.html",
    expectedMd5: "d19a9141e910caacec59a8e13d949653",
  },
  {
    slug: "pirep",
    source: "what-is-a-pirep.html",
    expectedMd5: "4427be9a526b6bcb6de600f8bf51d817",
  },
  {
    slug: "winds-aloft",
    source: "winds-aloft.html",
    expectedMd5: "3883d307da9e722297448553a21d48c9",
  },
  {
    slug: "icing",
    source: "icing.html",
    expectedMd5: "be02bde62cced7d105eb83ac28e0a431",
  },
  {
    slug: "turbulence",
    source: "turbulence.html",
    expectedMd5: "002303c676f0d4d4d8583fe1d92aa582",
  },
  {
    slug: "weather-radar",
    source: "weather-radar.html",
    expectedMd5: "f345446dd66c19cec87e81b22243b2b4",
  },
]

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

export function contentTsPath(slug) {
  return join(ROOT, "app/learn/aviation-weather", slug, "content.ts")
}

export function readSourceFromGit(sourceFile, ref = HUB_SOURCE_REF) {
  return execFileSync(
    "git",
    ["show", `${ref}:hub-source/${sourceFile}`],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  )
}

export function portAllFromGit(ref = HUB_SOURCE_REF) {
  const results = []
  for (const page of HUB_PAGES) {
    const sourceHtml = readSourceFromGit(page.source, ref)
    const { mainHtml, inlineStyle } = extractFromHubSource(sourceHtml)
    const out = contentTsPath(page.slug)
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
