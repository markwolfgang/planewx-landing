/**
 * Capture consolidated consent screenshots from a production build.
 * Uses window overrides so middleware geo cookies do not fight the intended region.
 */
import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"

const BASE = process.env.SHOT_BASE || "http://127.0.0.1:3000"
const OUT = process.env.SHOT_OUT || "/opt/cursor/artifacts/screenshots"
fs.mkdirSync(OUT, { recursive: true })

async function shot(page, name) {
  const file = path.join(OUT, name)
  await page.screenshot({ path: file, fullPage: false })
  console.log("wrote", file)
}

async function withRegion(browser, opts) {
  const { width, height, region, gpc, pathName = "/", mobile = false } = opts
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: mobile,
    hasTouch: mobile,
  })
  await context.addInitScript(
    ({ region: r, gpc: g }) => {
      window.__PLANWX_CONSENT_MODE__ = r
      window.__PLANWX_GPC__ = g
    },
    { region, gpc },
  )
  const page = await context.newPage()
  await page.goto(BASE + pathName, { waitUntil: "networkidle" })
  await page.evaluate(() => localStorage.removeItem("cookie_prefs_v1"))
  await page.reload({ waitUntil: "networkidle" })
  return { context, page }
}

async function expectAttr(page, attr, value) {
  const actual = await page.getByTestId("cookie-consent-banner").getAttribute(attr)
  console.log("banner", attr, actual)
  if (actual !== value) throw new Error(`expected ${attr}=${value}, got ${actual}`)
}

async function main() {
  const browser = await chromium.launch({ headless: true })

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "strict",
      gpc: false,
    })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await expectAttr(page, "data-consent-mode", "strict")
    await shot(page, "consent-strict-banner-1280.png")
    await context.close()
  }
  {
    const { context, page } = await withRegion(browser, {
      width: 390,
      height: 844,
      region: "strict",
      gpc: false,
      mobile: true,
    })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    console.log("strict phone overflow", overflow)
    await shot(page, "consent-strict-banner-390.png")
    await context.close()
  }

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "notice",
      gpc: false,
    })
    await page.waitForSelector('[data-testid="cookie-consent-banner"]')
    await expectAttr(page, "data-consent-mode", "notice")
    await page.waitForSelector('[data-testid="banner-do-not-sell"]')
    await shot(page, "consent-us-banner-1280.png")
    await context.close()
  }
  {
    const { context, page } = await withRegion(browser, {
      width: 390,
      height: 844,
      region: "notice",
      gpc: false,
      mobile: true,
    })
    await page.waitForSelector('[data-testid="banner-do-not-sell"]')
    await shot(page, "consent-us-banner-390.png")
    await context.close()
  }

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "notice",
      gpc: false,
    })
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="cookie-manage-panel"]')
    await page.waitForSelector('[data-testid="manage-accept-all"]')
    const analyticsChecked = await page.getByTestId("toggle-analytics").isChecked()
    const marketingChecked = await page.getByTestId("toggle-marketing").isChecked()
    console.log("manage defaults", { analyticsChecked, marketingChecked })
    await shot(page, "consent-manage-accept-all-1280.png")
    await context.close()
  }
  {
    const { context, page } = await withRegion(browser, {
      width: 390,
      height: 844,
      region: "notice",
      gpc: false,
      mobile: true,
    })
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="manage-accept-all"]')
    await shot(page, "consent-manage-accept-all-390.png")
    await context.close()
  }

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "notice",
      gpc: true,
    })
    await page.getByTestId("cookie-manage-button").click()
    await page.waitForSelector('[data-testid="gpc-note"]')
    const marketingDisabled = await page.getByTestId("toggle-marketing").isDisabled()
    console.log("gpc marketing disabled", marketingDisabled)
    await shot(page, "consent-gpc-manage-1280.png")
    await context.close()
  }

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "notice",
      gpc: false,
    })
    await page.getByTestId("banner-do-not-sell").click()
    await page.waitForSelector('[data-testid="do-not-sell-confirmation"]')
    await shot(page, "consent-do-not-sell-confirm-1280.png")
    await context.close()
  }

  {
    const { context, page } = await withRegion(browser, {
      width: 1280,
      height: 800,
      region: "notice",
      gpc: false,
      pathName: "/about",
    })
    await page.getByRole("button", { name: "Essential only" }).click()
    await page.waitForTimeout(400)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForSelector('[data-testid="footer-ambassadors"]')
    await shot(page, "consent-footer-ambassadors-1280.png")
    await context.close()
  }
  {
    const { context, page } = await withRegion(browser, {
      width: 390,
      height: 844,
      region: "notice",
      gpc: false,
      pathName: "/about",
      mobile: true,
    })
    await page.getByRole("button", { name: "Essential only" }).click()
    await page.waitForTimeout(400)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForSelector('[data-testid="footer-ambassadors"]')
    await shot(page, "consent-footer-ambassadors-390.png")
    await context.close()
  }

  await browser.close()
  console.log("done")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
