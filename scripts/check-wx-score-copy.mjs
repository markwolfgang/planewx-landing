#!/usr/bin/env node
/**
 * Fail if pilot-facing copy uses the deprecated "GO Score" / "Go Score" name.
 * Brand portal pages may still name the old term as a "don't say" example.
 */
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
// Do not match "Go/No-Go score" — that is the decision, not the product name.
const BANNED =
  /(?<![Nn][Oo]-)\bGO Score\b|(?<![Nn][Oo]-)\bGo Score\b|(?<![Nn][Oo]-)\bGO score\b|(?<![Nn][Oo]-)\bGo score\b/
const SCAN_DIRS = ["app", "components", "public/talk", "public/talks"]
const TEXT_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".html", ".md"])
const ALLOW = new Set([
  "app/brand/terminology/page.tsx",
  "app/brand/social/page.tsx",
])

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue
      walk(full, out)
    } else if (TEXT_EXT.has(entry.name.slice(entry.name.lastIndexOf(".")))) {
      out.push(full)
    }
  }
  return out
}

const hits = []
for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file)
    if (ALLOW.has(rel)) continue
    const text = readFileSync(file, "utf8")
    if (BANNED.test(text)) hits.push(rel)
  }
}

if (hits.length) {
  console.error("Deprecated 'GO Score' / 'Go Score' in pilot-facing copy. Use WX Score.")
  for (const hit of hits) console.error(`  ${hit}`)
  process.exit(1)
}

console.log("WX Score copy check passed.")
