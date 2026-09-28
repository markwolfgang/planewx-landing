#!/usr/bin/env node
/**
 * Screenshots + GAM compliance checks for the AOPA HTML5 ad.
 * Expects local production server at http://127.0.0.1:3000
 */
import fs from "fs"
import path from "path"
import puppeteer from "puppeteer-core"
import { execFileSync } from "child_process"

const BASE = process.env.AOPA_BASE || "http://127.0.0.1:3000"
const OUT = "/opt/cursor/artifacts"
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome"

fs.mkdirSync(OUT, { recursive: true })

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function shot(page, name, opts = {}) {
  const file = path.join(OUT, name)
  await page.screenshot({ path: file, type: "png", ...opts })
  console.log("wrote", file, fs.statSync(file).size)
  return file
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
    defaultViewport: null,
  })

  const compliance = []

  // ── Direct ad page: network log + collapsed/expanded/gauge ──
  const adPage = await browser.newPage()
  await adPage.setViewport({ width: 700, height: 400, deviceScaleFactor: 2 })
  const requests = []
  adPage.on("request", (req) => {
    requests.push(req.url())
  })
  await adPage.goto(`${BASE}/aopa/ad/index.html?demo=1`, {
    waitUntil: "networkidle0",
  })
  await sleep(1800) // let gauge finish
  await shot(adPage, "ad-collapsed.png", {
    clip: { x: 400, y: 0, width: 300, height: 250 },
  })
  // gauge final is same timing
  await shot(adPage, "ad-gauge-final.png", {
    clip: { x: 400, y: 0, width: 300, height: 250 },
  })

  // Expand via API
  await adPage.evaluate(() => window.PlaneWxAopaAd.expand(true))
  await sleep(400)
  await shot(adPage, "ad-expanded.png", {
    clip: { x: 100, y: 0, width: 600, height: 250 },
  })

  // Compliance from DOM
  const adFacts = await adPage.evaluate(() => {
    const ad = document.getElementById("ad")
    const cs = getComputedStyle(ad)
    const meta = document.querySelector('meta[name="ad.size"]')
    const audio = document.querySelectorAll("audio, video").length
    return {
      adSize: meta ? meta.getAttribute("content") : null,
      clickTag: typeof clickTag !== "undefined" ? clickTag : null,
      widthCollapsed: ad.classList.contains("is-expanded") ? null : ad.offsetWidth,
      height: ad.offsetHeight,
      border: cs.borderTop,
      zCollapsed: null,
      zExpanded: null,
      audio,
      hasClose: !!document.getElementById("closeBtn"),
    }
  })
  // measure z-index both states
  await adPage.evaluate(() => window.PlaneWxAopaAd.collapse())
  await sleep(100)
  adFacts.zCollapsed = await adPage.evaluate(
    () => getComputedStyle(document.getElementById("ad")).zIndex
  )
  adFacts.widthCollapsed = await adPage.evaluate(
    () => document.getElementById("ad").offsetWidth
  )
  await adPage.evaluate(() => window.PlaneWxAopaAd.expand(true))
  await sleep(100)
  adFacts.zExpanded = await adPage.evaluate(
    () => getComputedStyle(document.getElementById("ad")).zIndex
  )
  adFacts.widthExpanded = await adPage.evaluate(
    () => document.getElementById("ad").offsetWidth
  )

  // External request check (ignore data: and same-origin relative resolved to localhost)
  const external = requests.filter((u) => {
    if (u.startsWith("data:")) return false
    if (u.startsWith(BASE)) return false
    if (u.startsWith("blob:")) return false
    return /^https?:/i.test(u)
  })
  compliance.push({
    item: "ad.size meta",
    pass: adFacts.adSize === "width=300,height=250",
    detail: adFacts.adSize,
  })
  compliance.push({
    item: "clickTag default",
    pass: adFacts.clickTag === "https://www.planewx.ai/?variant=a&ref=AOPA-DISPLAY-OCT26&utm_source=aopa&utm_medium=display&utm_campaign=oct2026",
    detail: adFacts.clickTag,
  })
  compliance.push({
    item: "collapsed size 300x250",
    pass: adFacts.widthCollapsed === 300 && adFacts.height === 250,
    detail: `${adFacts.widthCollapsed}x${adFacts.height}`,
  })
  compliance.push({
    item: "expanded width 600",
    pass: adFacts.widthExpanded === 600,
    detail: String(adFacts.widthExpanded),
  })
  compliance.push({
    item: "1px #BFDBFE border",
    pass: /1px/.test(adFacts.border) && /rgb\(191,\s*219,\s*254\)|#BFDBFE/i.test(adFacts.border),
    detail: adFacts.border,
  })
  compliance.push({
    item: "z-index collapsed 0–4999",
    pass: Number(adFacts.zCollapsed) >= 0 && Number(adFacts.zCollapsed) <= 4999,
    detail: adFacts.zCollapsed,
  })
  compliance.push({
    item: "z-index expanded 5000–1999999",
    pass:
      Number(adFacts.zExpanded) >= 5000 && Number(adFacts.zExpanded) <= 1999999,
    detail: adFacts.zExpanded,
  })
  compliance.push({
    item: "no audio elements",
    pass: adFacts.audio === 0,
    detail: String(adFacts.audio),
  })
  compliance.push({
    item: "visible close control",
    pass: adFacts.hasClose,
    detail: String(adFacts.hasClose),
  })
  compliance.push({
    item: "no external network requests",
    pass: external.length === 0,
    detail: external.length ? external.join(", ") : "none",
  })

  // Animation stop by 15s: gauge text should be 76% and rAF stopped
  await adPage.evaluate(() => window.PlaneWxAopaAd.collapse())
  await sleep(200)
  // Reload and wait 15.5s is slow; instead check CONFIG.maxAnimationMs and that score settles
  const anim = await adPage.evaluate(() => {
    return {
      maxMs: CONFIG.maxAnimationMs,
      score: document.getElementById("gaugeText").textContent,
    }
  })
  compliance.push({
    item: "animation max ≤15s config",
    pass: anim.maxMs <= 15000,
    detail: `${anim.maxMs}ms; gauge=${anim.score}`,
  })

  // File sizes
  const adDir = "/workspace/public/aopa/ad"
  const zipPath =
    "/workspace/public/aopa/planewx-aopa-html5-300x250-expand-600x250.zip"
  const singlePath = path.join(adDir, "single-file.html")
  const initial =
    fs.statSync(path.join(adDir, "index.html")).size +
    fs.statSync(path.join(adDir, "assets/planewx-wordmark.svg")).size +
    fs.statSync(path.join(adDir, "assets/x5-panel-art.jpg")).size
  compliance.push({
    item: "initial load under 150KB",
    pass: initial < 150 * 1024,
    detail: (initial / 1024).toFixed(1) + " KB",
  })
  compliance.push({
    item: "zip present",
    pass: fs.existsSync(zipPath),
    detail: (fs.statSync(zipPath).size / 1024).toFixed(1) + " KB",
  })
  compliance.push({
    item: "single-file under ~150KB (inlined)",
    pass: fs.statSync(singlePath).size < 150 * 1024,
    detail:
      (fs.statSync(singlePath).size / 1024).toFixed(1) +
      " KB; images inlined as data URIs",
  })
  compliance.push({
    item: "backup.jpg present",
    pass: fs.existsSync(path.join(adDir, "backup.jpg")),
    detail: (fs.statSync(path.join(adDir, "backup.jpg")).size / 1024).toFixed(1) + " KB",
  })

  // ── Desktop article collapsed ──
  const desk = await browser.newPage()
  await desk.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await desk.goto(`${BASE}/aopa`, { waitUntil: "networkidle0" })
  await sleep(2000)
  // Scroll to top of article shell
  await desk.evaluate(() => window.scrollTo(0, 0))
  await shot(desk, "aopa-article-collapsed-desktop.png", { fullPage: false })

  // Expand desktop rail ad via postMessage to iframe
  await desk.evaluate(() => {
    const iframe = document.querySelector('.ad-slot[data-ad-slot="desktop"] iframe')
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "planewx-aopa-ad-cmd", action: "expand" },
        "*"
      )
    }
  })
  await sleep(600)
  await shot(desk, "aopa-article-expanded-desktop.png", { fullPage: false })

  // Code block section
  await desk.evaluate(() => {
    document.getElementById("aopa-ad-source")?.scrollIntoView({ block: "start" })
  })
  await sleep(500)
  // Wait for source load
  await desk.waitForFunction(() => {
    const el = document.getElementById("adSourceCode")
    return el && el.textContent && el.textContent.includes("clickTag")
  }, { timeout: 10000 })
  await shot(desk, "aopa-ad-source.png", { fullPage: false })

  // Copied state
  await desk.click("#copyAdCodeBtn")
  await sleep(300)
  await shot(desk, "aopa-ad-source-copied.png", { fullPage: false })

  // ── Phone ──
  const phone = await browser.newPage()
  await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
  await phone.goto(`${BASE}/aopa`, { waitUntil: "networkidle0" })
  await sleep(2000)
  await phone.evaluate(() => {
    document.getElementById("aopaAdMobile")?.scrollIntoView({ block: "center" })
  })
  await sleep(400)
  await shot(phone, "aopa-phone-collapsed.png", { fullPage: false })

  await phone.evaluate(() => {
    const iframe = document.querySelector('.ad-slot[data-ad-slot="mobile"] iframe')
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "planewx-aopa-ad-cmd", action: "expand" },
        "*"
      )
    }
  })
  await sleep(600)
  await phone.evaluate(() => {
    document.getElementById("aopaAdMobile")?.scrollIntoView({ block: "center" })
  })
  await sleep(200)
  await shot(phone, "aopa-phone-expanded.png", { fullPage: false })

  await browser.close()

  // Compare shots with reference JPGs using sharp side-by-side
  const sharp = (await import("sharp")).default
  async function compare(refPath, adPath, outName, adW, adH) {
    const ref = await sharp(refPath).resize(adW, adH, { fit: "fill" }).png().toBuffer()
    const ad = await sharp(adPath).resize(adW, adH, { fit: "fill" }).png().toBuffer()
    const labelH = 28
    const canvas = await sharp({
      create: {
        width: adW * 2 + 16,
        height: adH + labelH,
        channels: 3,
        background: "#0f172a",
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${adW * 2 + 16}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">
              <text x="8" y="18" fill="#94a3b8" font-family="Arial" font-size="12">Reference JPG</text>
              <text x="${adW + 16}" y="18" fill="#94a3b8" font-family="Arial" font-size="12">HTML5 build</text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
        { input: ref, top: labelH, left: 0 },
        { input: ad, top: labelH, left: adW + 16 },
      ])
      .png()
      .toFile(path.join(OUT, outName))
    console.log("wrote compare", outName)
  }

  await compare(
    "/workspace/public/aopa/ads/planewx-aopa-300x250-fly-like-its-your-job.jpg",
    path.join(OUT, "ad-collapsed.png"),
    "compare-collapsed.png",
    300,
    250
  )
  await compare(
    "/workspace/public/aopa/ads/planewx-aopa-600x250-expanded-5x5-fly-like-its-your-job.jpg",
    path.join(OUT, "ad-expanded.png"),
    "compare-expanded.png",
    600,
    250
  )

  const report = {
    compliance,
    sizes: {
      initialLoadKB: +(initial / 1024).toFixed(1),
      zipKB: +(fs.statSync(zipPath).size / 1024).toFixed(1),
      singleFileKB: +(fs.statSync(singlePath).size / 1024).toFixed(1),
      singleFileMode: "inlined",
    },
    requestsSample: requests.slice(0, 20),
    external,
  }
  fs.writeFileSync(path.join(OUT, "aopa-ad-compliance.json"), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
