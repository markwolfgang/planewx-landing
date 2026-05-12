/**
 * Generates PNG exports for all PlaneWX logo variants using Chrome headless.
 * Run once with: node scripts/generate-brand-pngs.mjs
 */
import { execSync } from "child_process"
import { writeFileSync, mkdirSync, unlinkSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicBrand = resolve(__dirname, "../public/brand")
const tmp = resolve(__dirname, "../.tmp-brand-render")
mkdirSync(tmp, { recursive: true })

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

function renderHtmlToPng(html, outputPath, width, height) {
  const htmlFile = resolve(tmp, `render-${Date.now()}.html`)
  writeFileSync(htmlFile, html)
  execSync(
    `"${CHROME}" --headless=new --screenshot="${outputPath}" \
     --window-size=${width},${height} \
     --hide-scrollbars \
     --no-sandbox \
     "file://${htmlFile}"`,
    { stdio: "pipe" }
  )
  unlinkSync(htmlFile)
}

// Wordmark: viewBox 720×140, render at 2x = 1440×280
function wordmarkHtml(bg) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; }
  body { background: ${bg}; width: 1440px; height: 280px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  img { width: 1440px; height: 280px; }
</style>
</head>
<body>
  <img src="file://${publicBrand}/planewx-${bg === "white" ? "" : "og-"}wordmark${bg === "white" ? "" : ""}.svg" />
</body>
</html>`
}

// Build correct wordmark HTML manually
function wordmarkDarkHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; }
  body { background: #0a0f1a; width: 1440px; height: 280px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  img { width: 1200px; height: auto; }
</style>
</head>
<body>
  <img src="file://${publicBrand}/planewx-wordmark-dark.svg" />
</body>
</html>`
}

function wordmarkLightHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; }
  body { background: white; width: 1440px; height: 280px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  img { width: 1200px; height: auto; }
</style>
</head>
<body>
  <img src="file://${publicBrand}/planewx-wordmark.svg" />
</body>
</html>`
}

function iconHtml(bg) {
  const svgFile = bg === "white"
    ? `${publicBrand}/planewx-icon-light.svg`
    : `${publicBrand}/planewx-icon.svg`
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; }
  body { background: ${bg === "white" ? "white" : "#0a0f1a"}; width: 512px; height: 512px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  img { width: 360px; height: 360px; }
</style>
</head>
<body>
  <img src="file://${svgFile}" />
</body>
</html>`
}

console.log("Generating PNG brand assets…\n")

console.log("→ planewx-wordmark-dark.png")
renderHtmlToPng(wordmarkDarkHtml(), resolve(publicBrand, "planewx-wordmark-dark.png"), 1440, 280)

console.log("→ planewx-wordmark-light.png")
renderHtmlToPng(wordmarkLightHtml(), resolve(publicBrand, "planewx-wordmark-light.png"), 1440, 280)

console.log("→ planewx-icon-dark.png")
renderHtmlToPng(iconHtml("dark"), resolve(publicBrand, "planewx-icon-dark.png"), 512, 512)

console.log("→ planewx-icon-light.png")
renderHtmlToPng(iconHtml("white"), resolve(publicBrand, "planewx-icon-light.png"), 512, 512)

// Clean up tmp dir
try { execSync(`rm -rf "${tmp}"`) } catch {}

console.log("\nDone. Files written to public/brand/")
