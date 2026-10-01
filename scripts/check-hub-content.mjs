/**
 * Assert each Learning Center hub content.ts MAIN_HTML and INLINE_STYLE match
 * the article + style extracted from staging hub-source (r10) / seo-source-r11
 * / seo-source-r12 the same way the port does (no hand edits). Also verify shared
 * glossary/hub CSS assets.
 */
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import {
  HUB_PAGES,
  HUB_ASSET_MD5,
  contentTsPath,
  extractFromHubSource,
  loadContentModule,
  readPageSource,
} from "./hub-port.mjs"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const AW = join(ROOT, "app/learn/aviation-weather")

let failed = 0

for (const page of HUB_PAGES) {
  const sourceHtml = readPageSource(page)
  const md5 = createHash("md5").update(sourceHtml).digest("hex")
  const md5Ok = md5 === page.expectedMd5
  const extracted = extractFromHubSource(sourceHtml)
  const stored = loadContentModule(contentTsPath(page))

  if (stored.INLINE_STYLE == null) {
    console.log(`${page.slug}: FAIL (INLINE_STYLE missing from content.ts)`)
    failed++
    continue
  }

  const mainOk = extracted.mainHtml === stored.MAIN_HTML
  const styleOk = extracted.inlineStyle === stored.INLINE_STYLE

  console.log(
    `${page.slug}: md5=${md5Ok ? "PASS" : "FAIL"}(${md5}) ` +
      `MAIN_HTML=${mainOk ? "PASS" : "FAIL"} ` +
      `INLINE_STYLE=${styleOk ? "PASS" : "FAIL"}`,
  )

  if (!md5Ok || !mainOk || !styleOk) failed++
}

const assetPaths = {
  "glossary.json": join(AW, "glossary.json"),
  "hub.css": join(AW, "hub.css"),
  "glossary.css": join(AW, "glossary.css"),
  "glossary.js": join(AW, "glossary.js"),
}

for (const [name, expected] of Object.entries(HUB_ASSET_MD5)) {
  const buf = readFileSync(assetPaths[name])
  const md5 = createHash("md5").update(buf).digest("hex")
  const ok = md5 === expected
  console.log(`asset ${name}: md5=${ok ? "PASS" : "FAIL"}(${md5})`)
  if (!ok) failed++
}

if (failed) {
  console.error(`hub content check: ${failed} check(s) failed`)
  process.exit(1)
}
console.log(
  `hub content check: all ${HUB_PAGES.length} pages + ${Object.keys(HUB_ASSET_MD5).length} assets PASS`,
)
