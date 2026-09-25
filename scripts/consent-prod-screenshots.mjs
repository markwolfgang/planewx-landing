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

  // US notice Manage panel: correct checked state + Accept all
  for (const [w, h, name] of [
    [1280, 900, "us-notice-manage-1280.png"],
    [390, 844, "us-notice-manage-390.png"],
  ]) {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "US" },
      { width: w, height: h },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    if (!(await page.getByTestId("toggle-essential").isChecked())) {
      throw new Error("essential should be on")
    }
    if (!(await page.getByTestId("toggle-analytics").isChecked())) {
      throw new Error("analytics should be on in US notice manage")
    }
    if (!(await page.getByTestId("toggle-marketing").isChecked())) {
      throw new Error("marketing should be on in US notice manage (no GPC)")
    }
    if (!(await page.getByTestId("manage-accept-all").isVisible())) {
      throw new Error("Accept all must be in Manage panel")
    }
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // Strict Manage panel at 1280
  {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "DE" },
      { width: 1280, height: 900 },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    if (await page.getByTestId("toggle-analytics").isChecked()) {
      throw new Error("analytics should be off in strict manage")
    }
    if (await page.getByTestId("toggle-marketing").isChecked()) {
      throw new Error("marketing should be off in strict manage")
    }
    if (!(await page.getByTestId("manage-accept-all").isVisible())) {
      throw new Error("Accept all must be in Manage panel")
    }
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(OUT, "strict-manage-1280.png") })
    console.log("saved strict-manage-1280.png")
    await context.close()
  }

  // Footer showing Ambassadors
  for (const [w, h, name] of [
    [1280, 900, "footer-ambassadors-1280.png"],
    [390, 844, "footer-ambassadors-390.png"],
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
    if (!tagline.includes("Ambassadors")) {
      throw new Error("footer missing Ambassadors: " + tagline.slice(0, 300))
    }
    if (!tagline.includes("The Pilot's Decision Support System")) {
      throw new Error("footer tagline incomplete")
    }
    await page.screenshot({ path: path.join(OUT, name) })
    console.log("saved", name)
    await context.close()
  }

  // Do not sell: confirmation, then Manage panel afterwards
  {
    const { context, page } = await freshPage(
      browser,
      { "x-vercel-ip-country": "US" },
      { width: 1280, height: 900 },
    )
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await dismissEssential(page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
    await page.getByTestId("do-not-sell-link").click()
    await page.waitForSelector('[data-testid="do-not-sell-confirmation"]')
    await page.waitForTimeout(400)
    await page.screenshot({
      path: path.join(OUT, "do-not-sell-confirmation-1280.png"),
    })
    console.log("saved do-not-sell-confirmation-1280.png")

    // Open Manage afterwards: Analytics on, Marketing off
    await page.getByTestId("cookie-settings-link").click()
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    if (!(await page.getByTestId("toggle-analytics").isChecked())) {
      throw new Error("after Do not sell, analytics should stay on in notice")
    }
    if (await page.getByTestId("toggle-marketing").isChecked()) {
      throw new Error("after Do not sell, marketing should be off")
    }
    await page.waitForTimeout(400)
    await page.screenshot({
      path: path.join(OUT, "do-not-sell-manage-after-1280.png"),
    })
    console.log("saved do-not-sell-manage-after-1280.png")
    await context.close()
  }

  await browser.close()
  console.log("ALL_SHOTS_DONE")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
