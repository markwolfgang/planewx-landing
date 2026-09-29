/**
 * Assert each aviation-weather content.ts MAIN_HTML and INLINE_STYLE match
 * the article + style extracted from staging/learn-hub-source-r6 the same way
 * the port does (no hand edits).
 */
import { createHash } from "node:crypto"
import {
  HUB_PAGES,
  contentTsPath,
  extractFromHubSource,
  loadContentModule,
  readSourceFromGit,
} from "./hub-port.mjs"

const REF = "origin/staging/learn-hub-source-r6"
let failed = 0

for (const page of HUB_PAGES) {
  const sourceHtml = readSourceFromGit(page.source, REF)
  const md5 = createHash("md5").update(sourceHtml).digest("hex")
  const md5Ok = md5 === page.expectedMd5
  const extracted = extractFromHubSource(sourceHtml)
  const stored = loadContentModule(contentTsPath(page.slug))

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

if (failed) {
  console.error(`hub content check: ${failed} page(s) failed`)
  process.exit(1)
}
console.log("hub content check: all four PASS")
