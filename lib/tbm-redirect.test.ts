import { describe, expect, it } from "vitest"
import nextConfig from "../next.config.mjs"

const APP_TBM = "https://app.planewx.ai/tbm"

describe("/tbm redirect to the app waitlist", () => {
  it("sends /tbm, /tbm/ and case variants to the app with a temporary redirect", async () => {
    const redirects = await nextConfig.redirects!()
    for (const source of ["/tbm", "/tbm/", "/TBM", "/TBM/", "/Tbm", "/Tbm/"]) {
      const r = redirects.find((x) => x.source === source)
      expect(r, source).toBeDefined()
      expect(r).toMatchObject({ destination: APP_TBM, permanent: false })
      // No query in the destination, so the incoming query string (UTMs) is passed through.
      expect(r!.destination).not.toContain("?")
      expect("has" in r! || "missing" in r!).toBe(false)
    }
  })

  it("is the only redirect that leaves the site, and does not catch nearby paths", async () => {
    const redirects = await nextConfig.redirects!()
    const external = redirects.filter((x) => /^https?:\/\//.test(x.destination))
    expect(external.every((x) => x.destination === APP_TBM)).toBe(true)
    expect(external.some((x) => x.source.includes(":") || x.source.includes("("))).toBe(false)
  })
})
