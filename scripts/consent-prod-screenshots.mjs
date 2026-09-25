/**
 * Production screenshots for cookie consent review.
 * Requires: next start on SHOT_BASE_URL (default http://127.0.0.1:3000)
 */
import { chromium } from "playwright"
import fs from "fs"
import path from "path"

const OUT = "/opt/cursor/artifacts/screenshots"
const BASE = process.env.SHOT_BASE_URL || "http://127.0.0.1:3000"
fs.mkdirSync(OUT, { recursive: true })

async function freshPage(browser, headers, viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: "dark",
    extraHTTPHeaders: headers,
  })
  const page = await context.newPage()
  await page.goto(BASE + "/", { waitUntil: "networkidle" })
  await page.evaluate(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  await page.reload({ waitUntil: "networkidle" })
  return { context, page }
}

async function dismissEssential(page) {
  await page.getByRole("button", { name: "Essential only" }).click()
  await page.waitForSelector('[data-testid="cookie-consent-banner"]', {
    state: "detached",
  })
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true })

  // 1 strict banners
  for (const [w, h, name] of [
    [1280, 800, "strict-banner-1280.png"],
    [390, 844, "strict-banner-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "DE" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.waitForTimeout(500)
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // 2 manage panel
  for (const [w, h, name] of [
    [1280, 900, "manage-panel-open-1280.png"],
    [390, 844, "manage-panel-open-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "DE" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    // Defaults: essential on, analytics off, marketing off
    if (!(await page.getByTestId("toggle-essential").isChecked())) {
      throw new Error("essential should be on")
    }
    if (await page.getByTestId("toggle-analytics").isChecked()) {
      throw new Error("analytics should be off in strict manage")
    }
    if (await page.getByTestId("toggle-marketing").isChecked()) {
      throw new Error("marketing should be off in strict manage")
    }
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // 3 US notice
  for (const [w, h, name] of [
    [1280, 800, "us-notice-banner-1280.png"],
    [390, 844, "us-notice-banner-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "US" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.waitForSelector('[data-testid="banner-do-not-sell"]')
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // 4 US + GPC manage
  for (const [w, h, name] of [
    [1280, 900, "us-gpc-manage-1280.png"],
    [390, 844, "us-gpc-manage-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "US", "Sec-GPC": "1" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    await page.waitForSelector('[data-testid="gpc-note"]')
    if (await page.getByTestId("toggle-marketing").isChecked()) {
      throw new Error("marketing must be off under GPC")
    }
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // 5 banner closed mobile CTA
  {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "DE" },
      { width: 390, height: 844 },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await dismissEssential(page)
    await page.waitForTimeout(400)
    const cta = page.getByRole("link", { name: /Start Free 14-Day Trial/i }).first()
    await cta.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    await page.screenshot({ path: path.join(OUT, "banner-closed-390.png") })
    console.log("saved banner-closed-390.png")
    await context.close()
  }

  // 6 footer
  for (const [w, h, name] of [
    [1280, 900, "footer-1280.png"],
    [390, 844, "footer-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "US" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await dismissEssential(page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    const tagline = await page.locator("footer").innerText()
    if (!tagline.includes("The Pilot's Decision Support System")) {
      throw new Error("footer tagline incomplete: " + tagline.slice(0, 200))
    }
    if (!tagline.includes("Cookie settings")) {
      throw new Error("missing Cookie settings")
    }
    if (!tagline.includes("Do not sell or share")) {
      throw new Error("missing Do not sell or share")
    }
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // 7 privacy section
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: "dark",
      extraHTTPHeaders: { "x-vercel-ip-country": "US" },
    })
    const page = await context.newPage()
    await page.goto(BASE + "/privacy", { waitUntil: "networkidle" })
    await page.evaluate(() => localStorage.clear())
    await page.reload({ waitUntil: "networkidle" })
    const banner = page.locator('[data-testid="cookie-consent-banner"]')
    if (await banner.count()) {
      await page.getByRole("button", { name: "Essential only" }).click()
      await banner.waitFor({ state: "detached" })
    }
    await page.locator("#cookies-and-tracking").scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({
      path: path.join(OUT, "privacy-cookies-section-1280.png"),
    })
    console.log("saved privacy-cookies-section-1280.png")
    await context.close()
  }

  await browser.close()
  console.log("ALL_SHOTS_DONE")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
