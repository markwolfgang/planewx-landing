import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  MCP_CHATGPT_DEMO_VIDEO,
  MCP_CLAUDE_DEMO_VIDEOS,
  mcpDemoEmbedUrl,
} from "./demo-videos"

const page = readFileSync(join(process.cwd(), "app/mcp/page.tsx"), "utf8")

describe("/mcp demo videos", () => {
  it("lists the three connector demos", () => {
    expect(MCP_CLAUDE_DEMO_VIDEOS.map((v) => v.id)).toEqual(["ceqc-hAsQtE", "N2HkQ1ubu0I"])
    expect(MCP_CHATGPT_DEMO_VIDEO.id).toBe("xqgcr0vAAVs")
    for (const v of [...MCP_CLAUDE_DEMO_VIDEOS, MCP_CHATGPT_DEMO_VIDEO]) {
      expect(v.title.length).toBeGreaterThan(0)
    }
  })

  it("uses the privacy-enhanced nocookie player", () => {
    expect(mcpDemoEmbedUrl("abc")).toBe("https://www.youtube-nocookie.com/embed/abc?rel=0")
  })

  it("renders responsive titled iframes next to the Claude and ChatGPT steps", () => {
    expect(page).toContain('className="aspect-video w-full"')
    expect(page).toContain("title={video.title}")
    expect(page).toContain("MCP_CLAUDE_DEMO_VIDEOS.map")
    expect(page).toContain("<DemoVideo video={MCP_CHATGPT_DEMO_VIDEO} />")
  })

  it("no CSP or X-Frame-Options in next.config blocks the embed", () => {
    const cfg = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8")
    const csp = cfg.match(/frame-src[^;"]*/)
    if (csp) expect(csp[0]).toContain("https://www.youtube-nocookie.com")
  })
})
