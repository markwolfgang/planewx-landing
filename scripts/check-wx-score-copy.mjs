#!/usr/bin/env node
/**
 * Fail if pilot-facing copy uses the deprecated "GO Score" / "Go Score" name.
 * Brand portal pages may still name the old term as a "don't say" example.
 */
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
// Do not match "Go/No-Go score" — that is the decision, not the product name.
const BANNED = /(?<!no-)\bgo score\b/iu
const SCAN_DIRS = ["app", "components", "public"]
const TEXT_EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".html", ".md", ".txt", ".json"])
const ALLOW = new Set([
  "app/brand/terminology/page.tsx",
  "app/brand/social/page.tsx",
])

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Configured scan root is missing: ${dir}`)
    }
    throw new Error(`Unable to scan ${dir}`, { cause: error })
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
    const rel = relative(ROOT, file).split(sep).join("/")
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
