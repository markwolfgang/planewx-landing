/**
 * Assert each Learning Center hub content.ts MAIN_HTML and INLINE_STYLE match
 * the pinned MD5s from the r12 production port. Also verify shared glossary /
 * hub CSS assets. Does not read any staging branch or git ref.
 */
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import {
  HUB_PAGES,
  HUB_ASSET_MD5,
  contentTsPath,
  loadContentModule,
} from "./hub-port.mjs"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const AW = join(ROOT, "app/learn/aviation-weather")

function md5(text) {
  return createHash("md5").update(text).digest("hex")
}

let failed = 0

for (const page of HUB_PAGES) {
  const stored = loadContentModule(contentTsPath(page))

  if (stored.INLINE_STYLE == null) {
    console.log(`${page.slug}: FAIL (INLINE_STYLE missing from content.ts)`)
    failed++
    continue
  }

  const mainHash = md5(stored.MAIN_HTML)
  const styleHash = md5(stored.INLINE_STYLE)
  const mainOk = mainHash === page.mainHtmlMd5
  const styleOk = styleHash === page.inlineStyleMd5

  console.log(
    `${page.slug}: MAIN_HTML=${mainOk ? "PASS" : "FAIL"}(${mainHash}) ` +
      `INLINE_STYLE=${styleOk ? "PASS" : "FAIL"}(${styleHash})`,
  )

  if (!mainOk || !styleOk) failed++
}

const assetPaths = {
  "glossary.json": join(AW, "glossary.json"),
  "hub.css": join(AW, "hub.css"),
  "glossary.css": join(AW, "glossary.css"),
  "glossary.js": join(AW, "glossary.js"),
}

for (const [name, expected] of Object.entries(HUB_ASSET_MD5)) {
  const buf = readFileSync(assetPaths[name])
  const hash = md5(buf)
  const ok = hash === expected
  console.log(`asset ${name}: md5=${ok ? "PASS" : "FAIL"}(${hash})`)
  if (!ok) failed++
}

const glossary = JSON.parse(readFileSync(assetPaths["glossary.json"], "utf8"))
const termCount = Array.isArray(glossary.terms) ? glossary.terms.length : 0
const termsOk = termCount === 162
console.log(`glossary terms: ${termsOk ? "PASS" : "FAIL"}(${termCount})`)
if (!termsOk) failed++

if (failed) {
  console.error(`hub content check: ${failed} check(s) failed`)
  process.exit(1)
}
console.log(
  `hub content check: all ${HUB_PAGES.length} pages + ${Object.keys(HUB_ASSET_MD5).length} assets + glossary terms PASS`,
)
