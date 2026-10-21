// @vitest-environment node
import { describe, expect, it } from "vitest"
import {
  PARTNER_PATH_CODES,
  RESERVED_PARTNER_PATH_SLUGS,
  partnerCodeFromPathname,
} from "@/lib/partner-paths"

describe("partner short-link allowlist", () => {
  it.each([
    ["/flightchops", "FLIGHTCHOPS"],
    ["/flightfollower", "FLIGHTFOLLOWER"],
    ["/runway", "RUNWAY"],
  ])("maps %s to campaign code %s", (path, code) => {
    expect(partnerCodeFromPathname(path)).toBe(code)
  })

  it.each(["/FlightChops", "/FLIGHTCHOPS", "/flightchops/", "/FlightChops//"])(
    "matches %s regardless of case or trailing slash",
    (path) => {
      expect(partnerCodeFromPathname(path)).toBe("FLIGHTCHOPS")
    },
  )

  it.each(["/FlightFollower", "/FLIGHTFOLLOWER", "/flightfollower/"])(
    "matches %s regardless of case or trailing slash",
    (path) => {
      expect(partnerCodeFromPathname(path)).toBe("FLIGHTFOLLOWER")
    },
  )

  it.each(["/", "/flightchops/extra", "/flightchops.png", "/news", "/flightchop", "/unknown"])(
    "leaves %s alone",
    (path) => {
      expect(partnerCodeFromPathname(path)).toBeNull()
    },
  )

  it("keeps every slug lowercase, every code uppercase, and no slug reserved", () => {
    for (const [slug, code] of Object.entries(PARTNER_PATH_CODES)) {
      expect(slug).toBe(slug.toLowerCase())
      expect(code).toBe(code.toUpperCase())
      expect(RESERVED_PARTNER_PATH_SLUGS.has(slug)).toBe(false)
    }
  })
})
