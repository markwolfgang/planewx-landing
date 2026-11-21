#!/usr/bin/env node
/**
 * IndexNow ping for https://www.planewx.ai
 *
 * Not wired into `npm run build`. Run manually after deploy (or from a
 * post-deploy hook) when the sitemap changes:
 *
 *   node scripts/indexnow-ping.mjs
 *   node scripts/indexnow-ping.mjs --dry-run
 *
 * Key file: public/<key>.txt (must be served at https://www.planewx.ai/<key>.txt)
 * Endpoint: https://api.indexnow.org/indexnow
 */

import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const HOST = "www.planewx.ai"
const BASE = `https://${HOST}`
const ENDPOINT = "https://api.indexnow.org/indexnow"
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const PUBLIC = join(ROOT, "public")
const dryRun = process.argv.includes("--dry-run")

function findKey() {
  const files = readdirSync(PUBLIC).filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name))
  if (files.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file matching /^[a-f0-9]{32}\\.txt$/ in public/ (found ${files.length})`,
    )
  }
  const keyFile = files[0]
  const key = readFileSync(join(PUBLIC, keyFile), "utf8").trim()
  if (key !== keyFile.replace(/\.txt$/i, "")) {
    throw new Error(`IndexNow key file contents must match filename (${keyFile})`)
  }
  return { key, keyLocation: `${BASE}/${keyFile}` }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`)
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  const unique = [...new Set(urls)].filter((u) => u.startsWith(BASE))
  if (unique.length === 0) throw new Error("No sitemap URLs found")
  return unique
}

async function main() {
  const { key, keyLocation } = findKey()
  const urlList = await fetchSitemapUrls()
  const body = {
    host: HOST,
    key,
    keyLocation,
    urlList,
  }

  console.log(`IndexNow: ${urlList.length} URLs, key ${key}`)
  if (dryRun) {
    console.log(JSON.stringify(body, null, 2))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`IndexNow ping failed: ${res.status} ${text}`)
  }
  console.log(`IndexNow ping ok: ${res.status}${text ? ` ${text}` : ""}`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
