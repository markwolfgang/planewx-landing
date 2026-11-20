// @vitest-environment node
import { describe, expect, it } from "vitest"
import { NextRequest } from "next/server"
import { middleware } from "@/middleware"
import { PARTNER_PATHS } from "@/lib/partner-paths"
import {
  PARTNER_REDIRECT_STATUS,
  partnerLandingRedirectTarget,
} from "@/lib/partner-landing-redirect"

const WWW = "https://www.planewx.ai"
const HUMAN = { cookie: "planewx-variant=a", "user-agent": "Mozilla/5.0 (iPhone) Mobile Safari" }

function run(url: string, headers: Record<string, string> = HUMAN, method = "GET") {
  const res = middleware(new NextRequest(url, { headers, method }))
  const rewrite = res.headers.get("x-middleware-rewrite")
  const location = res.headers.get("location")
  return {
    res,
    status: res.status,
    rewrite: rewrite ? new URL(rewrite) : null,
    location: location ? new URL(location, url) : null,
  }
}

/** Follow middleware redirects the way a browser would, counting hops. */
function follow(url: string, headers: Record<string, string> = HUMAN) {
  const hops: string[] = []
  let current = url
  for (let i = 0; i < 5; i++) {
    const r = run(current, headers)
    if (!r.location) return { final: current, hops, last: r }
    hops.push(r.location.toString())
    current = r.location.toString()
  }
  throw new Error(`redirect loop from ${url}: ${hops.join(" then ")}`)
}

// Frozen literal of prod campaign_codes (code, utm_source, utm_medium, utm_campaign),
// read-only query 2026-11-01. Not derived from PARTNER_PATHS, so a code edit that drifts
// from Supabase fails here. If a row changes in Supabase, change both on purpose.
const CAMPAIGN_CODES_PROD = Object.freeze({
  runway: Object.freeze({ code: "RUNWAY", utm_source: "runway", utm_medium: "partner", utm_campaign: "runway-to-oshkosh-2026" }),
  flightchops: Object.freeze({ code: "FLIGHTCHOPS", utm_source: "flightchops", utm_medium: "partner", utm_campaign: "flightchops-2026" }),
  flightfollower: Object.freeze({ code: "FLIGHTFOLLOWER", utm_source: "flightfollower", utm_medium: "partner", utm_campaign: "flightfollower-2026" }),
})
const EXPECTED_TAGGED: Record<string, string> = {
  runway: `${WWW}/runway?utm_source=runway&utm_medium=partner&utm_campaign=runway-to-oshkosh-2026&ref=RUNWAY`,
  flightchops: `${WWW}/flightchops?utm_source=flightchops&utm_medium=partner&utm_campaign=flightchops-2026&ref=FLIGHTCHOPS`,
  flightfollower: `${WWW}/flightfollower?utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER`,
}

describe("partner vanity paths put UTMs and ref in the browser URL", () => {
  it("PARTNER_PATHS matches the frozen prod campaign_codes literal", () => {
    expect(Object.keys(PARTNER_PATHS).sort()).toEqual(Object.keys(CAMPAIGN_CODES_PROD).sort())
    for (const [slug, p] of Object.entries(PARTNER_PATHS)) {
      const prod = CAMPAIGN_CODES_PROD[slug as keyof typeof CAMPAIGN_CODES_PROD]
      expect({ code: p.code, ...p.utm }).toEqual({ ...prod })
    }
  })

  it("redirects /flightfollower to the exact tagged URL in one temporary hop", () => {
    const r = run(`${WWW}/flightfollower`)
    expect(r.status).toBe(307)
    expect(PARTNER_REDIRECT_STATUS).toBe(307)
    expect(r.location?.toString()).toBe(
      `${WWW}/flightfollower?utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER`,
    )
  })

  it.each(Object.keys(EXPECTED_TAGGED))("redirects /%s to its exact tagged URL", (slug) => {
    const r = run(`${WWW}/${slug}`)
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(EXPECTED_TAGGED[slug])
  })

  it("answers HEAD with the same 307 and Location as GET", () => {
    const head = run(`${WWW}/flightchops`, HUMAN, "HEAD")
    expect(head.status).toBe(307)
    expect(head.location?.toString()).toBe(EXPECTED_TAGGED.flightchops)
  })

  it("treats a blank utm_source= as no visitor UTM and adds the partner tags", () => {
    const r = run(`${WWW}/runway?utm_source=`)
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(EXPECTED_TAGGED.runway)
  })

  it("counts only the 6 standard utm keys as visitor UTMs, so utm_foo alone does not block partner tags", () => {
    const r = run(`${WWW}/flightfollower?utm_foo=1`)
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(
      `${WWW}/flightfollower?utm_foo=1&utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER`,
    )
  })

  it.each(["utm_content", "utm_term", "utm_id"])("treats %s as a visitor UTM", (key) => {
    const r = run(`${WWW}/flightfollower?${key}=x`)
    expect(r.location?.toString()).toBe(`${WWW}/flightfollower?${key}=x&ref=FLIGHTFOLLOWER`)
  })

  it("a trailing slash reaching middleware goes to the tagged URL in a single hop", () => {
    const { hops } = follow(`${WWW}/flightfollower/`)
    expect(hops).toEqual([EXPECTED_TAGGED.flightfollower])
  })

  it("normalizes case to the lowercase slug", () => {
    const r = run(`${WWW}/FlightFollower`)
    expect(r.location?.pathname).toBe("/flightfollower")
    expect(r.location?.searchParams.get("ref")).toBe("FLIGHTFOLLOWER")
  })

  it("the tagged URL is served (rewrite) without another redirect, so there is no loop", () => {
    const { final, hops, last } = follow(`${WWW}/flightfollower`)
    expect(hops).toHaveLength(1)
    expect(new URL(final).pathname).toBe("/flightfollower")
    expect(last.rewrite?.pathname).toBe("/variants/a")
    expect(last.rewrite?.searchParams.get("ref")).toBe("FLIGHTFOLLOWER")
    expect(last.rewrite?.searchParams.get("utm_campaign")).toBe("flightfollower-2026")
  })

  it("keeps a visitor's own UTMs untouched and adds only ref", () => {
    const r = run(`${WWW}/flightfollower?utm_source=youtube&utm_medium=video&utm_content=desc`)
    expect(r.status).toBe(307)
    const q = r.location!.searchParams
    expect(q.get("utm_source")).toBe("youtube")
    expect(q.get("utm_medium")).toBe("video")
    expect(q.get("utm_content")).toBe("desc")
    expect(q.get("utm_campaign")).toBeNull()
    expect(q.get("ref")).toBe("FLIGHTFOLLOWER")
  })

  it("keeps an explicit ?ref= and still adds the partner UTMs", () => {
    const r = run(`${WWW}/flightchops?ref=OTHER`)
    const q = r.location!.searchParams
    expect(q.get("ref")).toBe("OTHER")
    expect(q.get("utm_source")).toBe("flightchops")
    expect(q.getAll("ref")).toHaveLength(1)
  })

  it("keeps unrelated params such as fbclid and the variant QA override", () => {
    const r = run(`${WWW}/flightfollower?fbclid=abc&variant=b`)
    expect(r.location?.searchParams.get("fbclid")).toBe("abc")
    expect(r.location?.searchParams.get("variant")).toBe("b")
  })

  it("does not redirect when the URL already has UTMs and ref", () => {
    const r = run(`${WWW}/flightfollower?utm_source=youtube&ref=FLIGHTFOLLOWER`)
    expect(r.location).toBeNull()
    expect(r.rewrite?.searchParams.get("utm_source")).toBe("youtube")
  })

  it("does not redirect link-unfurl bots, so preview cards stay stable", () => {
    const r = run(`${WWW}/flightfollower`, { "user-agent": "Mozilla/5.0 (compatible; Discordbot/2.0)" })
    expect(r.location).toBeNull()
    expect(r.rewrite?.pathname).toBe("/variants/a")
    expect(r.rewrite?.searchParams.get("ref")).toBe("FLIGHTFOLLOWER")
  })

  it("does not redirect non-GET methods", () => {
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/flightfollower`), { method: "POST" })).toBeNull()
  })

  it("leaves the homepage and unknown paths alone", () => {
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/`))).toBeNull()
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/news`))).toBeNull()
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/flightchop`))).toBeNull()
  })
})

describe("/ref/<CODE> on www", () => {
  it("sends /ref/FLIGHTFOLLOWER straight to the tagged partner URL in one hop", () => {
    const { final, hops, last } = follow(`${WWW}/ref/FLIGHTFOLLOWER`)
    expect(hops).toEqual([
      `${WWW}/flightfollower?utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER`,
    ])
    expect(new URL(final).pathname).toBe("/flightfollower")
    expect(last.rewrite?.pathname).toBe("/variants/a")
  })

  it("accepts lowercase and a trailing slash, and keeps incoming UTMs", () => {
    const r = run(`${WWW}/ref/flightfollower/?utm_source=newsletter`)
    expect(r.status).toBe(307)
    expect(r.location?.pathname).toBe("/flightfollower")
    expect(r.location?.searchParams.get("utm_source")).toBe("newsletter")
    expect(r.location?.searchParams.get("utm_campaign")).toBeNull()
    expect(r.location?.searchParams.get("ref")).toBe("FLIGHTFOLLOWER")
  })

  it("sends a non-partner code to the homepage with ref", () => {
    const r = run(`${WWW}/ref/FLIGHTFOLLOWER20`)
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(`${WWW}/?ref=FLIGHTFOLLOWER20`)
  })

  it("accepts /REF/ and /Ref/ in any case", () => {
    expect(run(`${WWW}/REF/FLIGHTFOLLOWER`).location?.toString()).toBe(EXPECTED_TAGGED.flightfollower)
    expect(run(`${WWW}/Ref/flightfollower`).location?.toString()).toBe(EXPECTED_TAGGED.flightfollower)
    expect(run(`${WWW}/REF/OTHERCODE`).location?.toString()).toBe(`${WWW}/?ref=OTHERCODE`)
  })

  it("answers HEAD on /ref/CODE with the same 307", () => {
    const r = run(`${WWW}/ref/RUNWAY`, HUMAN, "HEAD")
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(EXPECTED_TAGGED.runway)
  })

  it("/ref/OTHER keeps every incoming param and sets only ref", () => {
    const r = run(`${WWW}/ref/OTHERCODE?utm_source=newsletter&utm_medium=email&fbclid=abc&variant=b`)
    expect(r.status).toBe(307)
    expect(r.location?.toString()).toBe(
      `${WWW}/?utm_source=newsletter&utm_medium=email&fbclid=abc&variant=b&ref=OTHERCODE`,
    )
  })

  it("ignores malformed codes", () => {
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/ref/`))).toBeNull()
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/ref/a`))).toBeNull()
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/ref/bad%20code`))).toBeNull()
    expect(partnerLandingRedirectTarget(new URL(`${WWW}/ref/A/B`))).toBeNull()
  })
})
