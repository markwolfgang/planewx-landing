/**
 * Capture cookie consent screenshots and verify preview host loads no trackers.
 * Run against local next start (hostname localhost is not on the allowlist).
 */
import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"

const BASE = process.env.SHOT_BASE || "http://127.0.0.1:3000"
const OUT = process.env.SHOT_OUT || "/opt/cursor/artifacts/screenshots"
fs.mkdirSync(OUT, { recursive: true })

const TRACKER_HOST_SNIPS = [
  "google-analytics.com",
  "googletagmanager.com",
  "googleadservices.com",
  "connect.facebook.net",
  "facebook.com/tr",
  "redditstatic.com",
]

async function shot(page, name) {
  const file = path.join(OUT, name)
  await page.screenshot({ path: file, fullPage: false })
  console.log("wrote", file)
}

async function collectRequests(page, ms = 2500) {
  const urls = []
  const onReq = (req) => {
    urls.push(req.url())
  }
  page.on("request", onReq)
  await page.waitForTimeout(ms)
  page.off("request", onReq)
  return urls
}

function trackerHits(urls) {
  return urls.filter((u) => TRACKER_HOST_SNIPS.some((s) => u.includes(s)))
}

async function main() {
  const browser = await chromium.launch({ headless: true })

  // Desktop banner 1280
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    })
    const page = await context.newPage()
    await page.goto(BASE + "/", { waitUntil: "networkidle" })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await shot(page, "cookie-banner-desktop-1280.png")

    const before = await collectRequests(page, 2000)
    console.log("desktop no-choice tracker hits:", trackerHits(before).length, trackerHits(before).slice(0, 5))

    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    await shot(page, "cookie-manage-panel-desktop-1280.png")
    await page.getByRole("button", { name: "Close" }).click()

    await page.getByRole("button", { name: "Accept all" }).click()
    await page.waitForTimeout(1500)
    const afterAccept = await collectRequests(page, 3000)
    const hits = trackerHits(afterAccept)
    console.log("desktop after Accept all (localhost) tracker hits:", hits.length)
    hits.slice(0, 10).forEach((u) => console.log("  ", u))

    await context.close()
  }

  // Phone 390
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()
    await page.goto(BASE + "/", { waitUntil: "networkidle" })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    // Check no horizontal overflow
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      }
    })
    console.log("phone overflow check:", overflow)
    await shot(page, "cookie-banner-phone-390.png")

    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    await shot(page, "cookie-manage-panel-phone-390.png")
    await context.close()
  }

  // ga_debug opt-in on localhost with analytics
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()
    const urls = []
    page.on("request", (req) => urls.push(req.url()))
    await page.goto(BASE + "/?ga_debug=1", { waitUntil: "domcontentloaded" })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByRole("button", { name: "Accept all" }).click()
    await page.waitForTimeout(4000)
    const ga = urls.filter((u) => u.includes("google-analytics.com") || u.includes("googletagmanager.com") || u.includes("/g/collect"))
    const marketing = urls.filter(
      (u) =>
        u.includes("googleadservices") ||
        u.includes("AW-180") ||
        u.includes("connect.facebook.net") ||
        u.includes("redditstatic"),
    )
    console.log("ga_debug GA-related count:", ga.length)
    ga.slice(0, 15).forEach((u) => console.log("  GA", u))
    console.log("ga_debug marketing count (should be 0):", marketing.length)
    marketing.slice(0, 10).forEach((u) => console.log("  MKT", u))
    const debugModeHit = urls.some((u) => u.includes("debug_mode") || u.includes("debug_mode%3D") || u.includes("_dbg"))
    console.log("debug_mode signal in URLs:", debugModeHit)
    await context.close()
  }

  await browser.close()
  console.log("done")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
