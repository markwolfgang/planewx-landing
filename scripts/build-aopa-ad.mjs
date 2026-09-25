#!/usr/bin/env node
/**
 * Rebuild AOPA HTML5 ad deliverables:
 *  - public/aopa/planewx-aopa-html5-300x250-expand-600x250.zip  (index.html at zip root)
 *  - public/aopa/ad/single-file.html  (absolute planewx.ai /aopa/ads/ image URLs for embed copy)
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
const ADS_DIR = path.join(ROOT, "public/aopa/ads")
const ZIP_PATH = path.join(
  ROOT,
  "public/aopa/planewx-aopa-html5-300x250-expand-600x250.zip"
)
const SINGLE_PATH = path.join(AD_DIR, "single-file.html")
const ADS_ABS = "https://www.planewx.ai/aopa/ads"

const INLINE_BUDGET = 150 * 1024

// Map local asset filenames used by index.html → production /aopa/ads/ filenames
const ASSET_TO_ADS = {
  "assets/collapsed.jpg": "planewx-aopa-300x250-fly-like-its-your-job.jpg",
  "assets/collapsed@2x.jpg": "planewx-aopa-300x250-fly-like-its-your-job@2x.jpg",
  "assets/expanded.jpg":
    "planewx-aopa-600x250-expanded-5x5-fly-like-its-your-job.jpg",
  "assets/expanded@2x.jpg":
    "planewx-aopa-600x250-expanded-5x5-fly-like-its-your-job@2x.jpg",
}

function kb(n) {
  return (n / 1024).toFixed(1) + " KB"
}

function listInitialAssets(html) {
  // Collapsed face only for first paint; expanded is preloaded after
  const files = new Set(["index.html", "assets/collapsed.jpg"])
  if (/collapsed@2x/.test(html)) files.add("assets/collapsed@2x.jpg")
  return [...files]
}

function listAllBundledAssets() {
  return [
    "index.html",
    "backup.jpg",
    "assets/collapsed.jpg",
    "assets/collapsed@2x.jpg",
    "assets/expanded.jpg",
    "assets/expanded@2x.jpg",
    "README.md",
  ]
}

function initialLoadBytes() {
  const html = fs.readFileSync(path.join(AD_DIR, "index.html"), "utf8")
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

function syncAssetsFromAds() {
  const pairs = [
    ["planewx-aopa-300x250-fly-like-its-your-job.jpg", "collapsed.jpg"],
    ["planewx-aopa-300x250-fly-like-its-your-job@2x.jpg", "collapsed@2x.jpg"],
    [
      "planewx-aopa-600x250-expanded-5x5-fly-like-its-your-job.jpg",
      "expanded.jpg",
    ],
    [
      "planewx-aopa-600x250-expanded-5x5-fly-like-its-your-job@2x.jpg",
      "expanded@2x.jpg",
    ],
  ]
  for (const [from, to] of pairs) {
    fs.copyFileSync(path.join(ADS_DIR, from), path.join(AD_DIR, "assets", to))
  }
  fs.copyFileSync(
    path.join(ADS_DIR, "planewx-aopa-300x250-fly-like-its-your-job.jpg"),
    path.join(AD_DIR, "backup.jpg")
  )
}

function buildZip() {
  if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH)
  const args = ["-r", "-X", ZIP_PATH, ...listAllBundledAssets()]
  execFileSync("zip", args, { cwd: AD_DIR, stdio: "inherit" })
  return fs.statSync(ZIP_PATH).size
}

function buildSingleFile(html) {
  // Absolute production URLs under /aopa/ads/ (resolve after merge to main)
  let out = html
  for (const [rel, adsName] of Object.entries(ASSET_TO_ADS)) {
    out = out.split(rel).join(ADS_ABS + "/" + adsName)
  }
  out = out.replace(
    "<title>",
    "<!-- Image faces use absolute https://www.planewx.ai/aopa/ads/ URLs (available after merge). Prefer the GAM zip with bundled local assets for trafficking. -->\n<title>"
  )
  if (!/name="ad\.size"/.test(out)) {
    throw new Error("single-file missing ad.size meta")
  }
  if (!/var\s+clickTag\s*=/.test(out)) {
    throw new Error("single-file missing clickTag")
  }
  if (!/AOPA-DISPLAY-OCT26/.test(out)) {
    throw new Error("single-file missing display clickTag URL")
  }
  fs.writeFileSync(SINGLE_PATH, out, "utf8")
  return { size: Buffer.byteLength(out, "utf8"), mode: "absolute-ads-urls" }
}

function main() {
  syncAssetsFromAds()
  const html = fs.readFileSync(path.join(AD_DIR, "index.html"), "utf8")
  const load = initialLoadBytes()
  const zipSize = buildZip()
  const single = buildSingleFile(html)

  const bundledTotal = listAllBundledAssets().reduce((sum, rel) => {
    return sum + fs.statSync(path.join(AD_DIR, rel)).size
  }, 0)

  console.log("\nAOPA HTML5 ad build")
  console.log("-------------------")
  for (const row of load.rows) {
    console.log("  " + row.rel.padEnd(36) + kb(row.size))
  }
  console.log("  " + "INITIAL LOAD (collapsed)".padEnd(36) + kb(load.total))
  console.log("  " + "ZIP (all faces bundled)".padEnd(36) + kb(zipSize))
  console.log("  " + "ZIP uncompressed sum".padEnd(36) + kb(bundledTotal))
  console.log(
    "  " +
      "SINGLE-FILE".padEnd(36) +
      kb(single.size) +
      " (" +
      single.mode +
      ")"
  )
  console.log("  -> " + path.relative(ROOT, ZIP_PATH))
  console.log("  -> " + path.relative(ROOT, SINGLE_PATH))

  if (load.total > INLINE_BUDGET) {
    console.warn(
      "WARNING: collapsed initial load " + kb(load.total) + " exceeds 150KB"
    )
    process.exitCode = 1
  }
}

main()
