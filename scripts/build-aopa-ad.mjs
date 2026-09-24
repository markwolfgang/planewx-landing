#!/usr/bin/env node
/**
 * Rebuild AOPA HTML5 ad deliverables:
 *  - public/aopa/planewx-aopa-html5-300x250-expand-600x250.zip  (index.html at zip root)
 *  - public/aopa/ad/single-file.html  (self-contained for /aopa copy block)
 *
 * Usage: npm run build:aopa-ad
 */
import fs from "fs"
import path from "path"
import { execFileSync } from "child_process"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const AD_DIR = path.join(ROOT, "public/aopa/ad")
const ZIP_PATH = path.join(
  ROOT,
  "public/aopa/planewx-aopa-html5-300x250-expand-600x250.zip"
)
const SINGLE_PATH = path.join(AD_DIR, "single-file.html")
const ABS_BASE = "https://www.planewx.ai/aopa/ad"

const INLINE_BUDGET = 150 * 1024

function kb(n) {
  return (n / 1024).toFixed(1) + " KB"
}

function listInitialAssets(html) {
  const files = new Set(["index.html"])
  const re = /(?:src|href)=["'](assets\/[^"']+)["']/g
  let m
  while ((m = re.exec(html))) files.add(m[1])
  return [...files]
}

function initialLoadBytes(html) {
  let total = 0
  const rows = []
  for (const rel of listInitialAssets(html)) {
    const full = path.join(AD_DIR, rel)
    if (!fs.existsSync(full)) {
      throw new Error("Missing asset referenced by index.html: " + rel)
    }
    const size = fs.statSync(full).size
    total += size
    rows.push({ rel, size })
  }
  return { total, rows }
}

function buildZip() {
  if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH)
  const args = [
    "-r",
    "-X",
    ZIP_PATH,
    "index.html",
    "backup.jpg",
    "assets/planewx-wordmark.svg",
    "assets/tbm-stripes.png",
    "assets/5x5-wordmark.svg",
    "README.md",
  ]
  execFileSync("zip", args, { cwd: AD_DIR, stdio: "inherit" })
  return fs.statSync(ZIP_PATH).size
}

function toDataUri(filePath) {
  const buf = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  if (ext === ".svg") {
    const utf8 = buf.toString("utf8")
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(utf8)
  }
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
          ? "image/webp"
          : "application/octet-stream"
  return "data:" + mime + ";base64," + buf.toString("base64")
}

function buildSingleFile(html) {
  const assetMap = {}
  const re = /(?:src|href)=["'](assets\/[^"']+)["']/g
  let m
  while ((m = re.exec(html))) {
    assetMap[m[1]] = path.join(AD_DIR, m[1])
  }

  let inlined = html
  let mode = "inlined"
  for (const [rel, full] of Object.entries(assetMap)) {
    const uri = toDataUri(full)
    inlined = inlined.split(rel).join(uri)
  }

  if (!/name="ad\.size"/.test(inlined)) {
    throw new Error("single-file missing ad.size meta")
  }
  if (!/var\s+clickTag\s*=/.test(inlined)) {
    throw new Error("single-file missing clickTag")
  }

  let out = inlined
  let size = Buffer.byteLength(out, "utf8")

  if (size > INLINE_BUDGET) {
    mode = "absolute-urls"
    out = html
    for (const rel of Object.keys(assetMap)) {
      out = out.split(rel).join(ABS_BASE + "/" + rel)
    }
    out = out.replace(
      "<title>",
      "<!-- Assets use absolute planewx.ai URLs (inline exceeded ~150KB). GAM may flag external requests; prefer the zip with local assets. -->\n<title>"
    )
    size = Buffer.byteLength(out, "utf8")
  }

  fs.writeFileSync(SINGLE_PATH, out, "utf8")
  return { size, mode }
}

function main() {
  const html = fs.readFileSync(path.join(AD_DIR, "index.html"), "utf8")
  const load = initialLoadBytes(html)
  const zipSize = buildZip()
  const single = buildSingleFile(html)

  console.log("\nAOPA HTML5 ad build")
  console.log("-------------------")
  for (const row of load.rows) {
    console.log("  " + row.rel.padEnd(36) + kb(row.size))
  }
  console.log("  " + "INITIAL LOAD TOTAL".padEnd(36) + kb(load.total))
  console.log("  " + "ZIP".padEnd(36) + kb(zipSize) + " -> " + path.relative(ROOT, ZIP_PATH))
  console.log(
    "  " +
      "SINGLE-FILE".padEnd(36) +
      kb(single.size) +
      " (" +
      single.mode +
      ") -> " +
      path.relative(ROOT, SINGLE_PATH)
  )

  if (load.total > INLINE_BUDGET) {
    console.warn(
      "WARNING: initial load " + kb(load.total) + " exceeds 150KB target"
    )
    process.exitCode = 1
  }
}

main()
