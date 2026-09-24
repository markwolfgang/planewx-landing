#!/usr/bin/env node
/**
 * Headless geometry + transition checks for JPEG-face AOPA ad.
 * Serves from public/ via AOPA_BASE (default http://127.0.0.1:8765).
 */
import fs from "fs"
import path from "path"
import puppeteer from "puppeteer-core"

const BASE = process.env.AOPA_BASE || "http://127.0.0.1:8765"
const OUT = "/opt/cursor/artifacts"
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome"

fs.mkdirSync(OUT, { recursive: true })

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
    defaultViewport: { width: 700, height: 400, deviceScaleFactor: 1 },
  })
  const page = await browser.newPage()
  await page.goto(`${BASE}/aopa/ad/index.html?demo=1`, {
    waitUntil: "networkidle0",
  })
  // Wait for preload ready
  await page.waitForFunction(
    () => window.PlaneWxAopaAd && window.PlaneWxAopaAd.isReady(),
    { timeout: 10000 }
  )
  await sleep(100)

  const collapsed = await page.evaluate(() => {
    const ad = document.getElementById("ad")
    const img = document.getElementById("faceCollapsed")
    const exp = document.getElementById("faceExpanded")
    const ar = ad.getBoundingClientRect()
    const ir = img.getBoundingClientRect()
    const er = exp.getBoundingClientRect()
    return {
      adW: Math.round(ar.width),
      adH: Math.round(ar.height),
      adX: Math.round(ar.left),
      imgX: Math.round(ir.left - ar.left),
      imgW: Math.round(ir.width),
      expX: Math.round(er.left - ar.left),
      expW: Math.round(er.width),
      expandedClass: ad.classList.contains("is-expanded"),
      imgSrc: img.currentSrc || img.src,
      expSrc: exp.currentSrc || exp.src,
    }
  })
  console.log("COLLAPSED", JSON.stringify(collapsed, null, 2))

  await page.screenshot({
    path: path.join(OUT, "headless-collapsed.png"),
    clip: { x: 0, y: 0, width: 300, height: 250 },
  })

  // Sample transition frames while expanding
  const frames = []
  await page.evaluate(() => {
    const ad = document.getElementById("ad")
    ad.style.transition = "width 220ms linear"
  })
  const expandPromise = page.evaluate(() => window.PlaneWxAopaAd.expand(true))
  for (const t of [40, 110, 180]) {
    await sleep(t === 40 ? 40 : t - (frames.length ? [40, 110, 180][frames.length - 1] : 0))
    const snap = await page.evaluate(() => {
      const ad = document.getElementById("ad")
      const col = document.getElementById("faceCollapsed")
      const exp = document.getElementById("faceExpanded")
      const ar = ad.getBoundingClientRect()
      // Detect non-JPEG face art: any text nodes / svg / hand-built panels
      const hasSvg = !!ad.querySelector("svg")
      const hasWordmark = !!ad.querySelector(".wordmark, .x5-panel, .stripes, .gauge")
      const kids = [...ad.querySelectorAll("*")].map((el) => el.tagName + (el.className ? "." + String(el.className).replace(/\s+/g, ".") : ""))
      return {
        adW: Math.round(ar.width),
        colOpacity: parseFloat(getComputedStyle(col).opacity),
        expVisible: getComputedStyle(exp).display !== "none",
        hasSvg,
        hasWordmark,
        onlyImgFaces:
          !hasSvg &&
          !hasWordmark &&
          !!document.getElementById("faceCollapsed") &&
          !!document.getElementById("faceExpanded"),
        tags: kids.slice(0, 20),
      }
    })
    const name = `headless-transition-${t}ms.png`
    await page.screenshot({
      path: path.join(OUT, name),
      clip: { x: 0, y: 0, width: Math.min(600, Math.max(300, snap.adW)), height: 250 },
    })
    frames.push({ t, ...snap, file: name })
  }
  await expandPromise
  await sleep(250)

  const expanded = await page.evaluate(() => {
    const ad = document.getElementById("ad")
    const img = document.getElementById("faceExpanded")
    const col = document.getElementById("faceCollapsed")
    const close = document.getElementById("closeBtn")
    const ar = ad.getBoundingClientRect()
    const ir = img.getBoundingClientRect()
    const cr = close.getBoundingClientRect()
    return {
      adW: Math.round(ar.width),
      adH: Math.round(ar.height),
      imgX: Math.round(ir.left - ar.left),
      imgW: Math.round(ir.width),
      colOpacity: parseFloat(getComputedStyle(col).opacity),
      close: {
        display: getComputedStyle(close).display,
        x: Math.round(cr.left - ar.left),
        y: Math.round(cr.top - ar.top),
        w: Math.round(cr.width),
        h: Math.round(cr.height),
        right: Math.round(ar.right - cr.right),
        top: Math.round(cr.top - ar.top),
      },
    }
  })
  console.log("EXPANDED", JSON.stringify(expanded, null, 2))
  console.log("FRAMES", JSON.stringify(frames, null, 2))

  await page.screenshot({
    path: path.join(OUT, "headless-expanded.png"),
    clip: { x: 0, y: 0, width: 600, height: 250 },
  })

  // Close-X crop (magnified region around button)
  const closeClip = {
    x: Math.max(0, expanded.close.x - 8),
    y: Math.max(0, expanded.close.y - 8),
    width: expanded.close.w + 40,
    height: expanded.close.h + 40,
  }
  await page.screenshot({
    path: path.join(OUT, "headless-close-x-crop.png"),
    clip: closeClip,
  })
  // Also wider context of top-right 5X5 corner
  await page.screenshot({
    path: path.join(OUT, "headless-close-x-context.png"),
    clip: { x: 520, y: 0, width: 80, height: 50 },
  })

  // Pass/fail
  const checks = [
    {
      name: "collapsed ad at x=0 width 300",
      pass:
        collapsed.adX === 0 &&
        collapsed.adW === 300 &&
        collapsed.imgX <= 1 &&
        collapsed.imgW === 300,
    },
    {
      name: "expanded ad width 600, image at x=0",
      pass: expanded.adW === 600 && expanded.imgX <= 1 && expanded.imgW === 600,
    },
    {
      name: "transition frames only approved art (no svg/hand-built)",
      pass: frames.every((f) => f.onlyImgFaces && !f.hasSvg && !f.hasWordmark),
    },
    {
      name: "close X visible top-right small",
      pass:
        expanded.close.display === "block" &&
        expanded.close.w <= 22 &&
        expanded.close.h <= 22 &&
        expanded.close.right <= 12 &&
        expanded.close.top <= 12,
    },
    {
      name: "faces are JPEG assets",
      pass: /collapsed/.test(collapsed.imgSrc) && /expanded/.test(collapsed.expSrc),
    },
  ]
  console.log("\nCHECKS")
  let all = true
  for (const c of checks) {
    console.log((c.pass ? "PASS" : "FAIL") + "  " + c.name)
    if (!c.pass) all = false
  }
  await browser.close()
  if (!all) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
