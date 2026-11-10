// @vitest-environment node
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"
import type { Metadata } from "next"
import { middleware } from "@/middleware"

// The homepage HTML is whatever page the middleware rewrites "/" to, so the
// markdown alternate has to live on that page's metadata, not app/page.tsx.
vi.mock("@/components/landing-variant-a", () => ({ LandingVariantA: () => null }))
vi.mock("@/components/landing-variant-b", () => ({ LandingVariantB: () => null }))
vi.mock("@/components/landing-variant-c", () => ({ LandingVariantC: () => null }))
vi.mock("@/components/landing-variant-d", () => ({ LandingVariantD: () => null }))
vi.mock("@/components/landing-variant-e", () => ({ LandingVariantE: () => null }))
vi.mock("@/components/landing-variant-f", () => ({ LandingVariantF: () => null }))
vi.mock("@/components/landing-page-v3", () => ({ LandingPageV3: () => null }))

const HOME_MD = "https://www.planewx.ai/index.md"
const ROOT = join(__dirname, "..")

const UAS = {
  browser:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
  ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
}

function markdownType(metadata: Metadata | undefined): unknown {
  const alternates = metadata?.alternates
  if (!alternates || typeof alternates !== "object") return undefined
  return (alternates.types as Record<string, unknown> | undefined)?.["text/markdown"]
}

const PAGE_MODULES: Record<string, () => Promise<object>> = {
  "/variants/a": () => import("@/app/variants/a/page"),
  "/variants/b": () => import("@/app/variants/b/page"),
  "/variants/c": () => import("@/app/variants/c/page"),
  "/variants/d": () => import("@/app/variants/d/page"),
  "/variants/e": () => import("@/app/variants/e/page"),
  "/variants/f": () => import("@/app/variants/f/page"),
  "/v3": () => import("@/app/v3/page"),
}

async function variantMetadata(path: string): Promise<Metadata | undefined> {
  const load = PAGE_MODULES[path]
  if (!load) throw new Error(`no page module mapped for ${path}`)
  return ((await load()) as { metadata?: Metadata }).metadata
}

function servedPathFor(ua: string): string | null {
  const res = middleware(new NextRequest("https://www.planewx.ai/", { headers: { "user-agent": ua } }))
  const rewrite = res.headers.get("x-middleware-rewrite")
  return rewrite ? new URL(rewrite).pathname : null
}

function pageFiles(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...pageFiles(full))
    else if (name === "page.tsx") out.push(relative(ROOT, full))
  }
  return out
}

describe("homepage markdown alternate on the HTML actually served at /", () => {
  it.each(Object.entries(UAS))("the %s request for / lands on a page that links /index.md", async (_name, ua) => {
    const served = servedPathFor(ua)
    expect(served).toBe("/variants/a")
    const metadata = await variantMetadata(served!)
    expect(markdownType(metadata)).toBe(HOME_MD)
    // Keeps the root canonical so the variant does not self-canonicalize.
    expect((metadata?.alternates as { canonical?: string } | undefined)?.canonical).toBe("/")
  })

  it.each(["/variants/b", "/variants/c", "/variants/d", "/variants/e", "/variants/f", "/v3"])(
    "%s does not inherit /index.md",
    async (path) => {
      expect(markdownType(await variantMetadata(path))).toBeUndefined()
    },
  )

  it("no other page file or the root layout references /index.md", () => {
    const allowed = new Set(["app/page.tsx", "app/variants/a/page.tsx"])
    const offenders = pageFiles(join(ROOT, "app"))
      .filter((file) => !allowed.has(file))
      .filter((file) => {
        const src = readFileSync(join(ROOT, file), "utf8")
        return src.includes("/index.md") || src.includes("HOME_MARKDOWN_ALTERNATES")
      })
    expect(offenders).toEqual([])
    const layout = readFileSync(join(ROOT, "app/layout.tsx"), "utf8")
    expect(layout).not.toContain("index.md")
    expect(layout).not.toContain("text/markdown")
  })
})
