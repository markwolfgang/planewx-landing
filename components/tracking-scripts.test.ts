import { describe, expect, it } from "vitest"
import { planTrackingTransition } from "@/lib/tracking-runtime"

/**
 * Component-level tracking behavior is covered via planTrackingTransition:
 * TrackingScripts is a null-render effect host that applies these plans.
 */
describe("TrackingScripts transition contract", () => {
  it("loads gtag once across analytics-then-marketing", () => {
    const a = planTrackingTransition({
      prev: { ga: false, marketing: false },
      next: { ga: true, marketing: false },
      gtagAlreadyLoaded: false,
      debugMode: false,
    })
    const b = planTrackingTransition({
      prev: { ga: true, marketing: false },
      next: { ga: true, marketing: true },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(a.type).toBe("apply")
    expect(b.type).toBe("apply")
    if (a.type === "apply" && b.type === "apply") {
      expect(a.callGtagJs).toBe(true)
      expect(b.callGtagJs).toBe(false)
      expect(b.configAds).toBe(true)
    }
  })

  it("reloads on Accept all then Essential only", () => {
    const t = planTrackingTransition({
      prev: { ga: true, marketing: true },
      next: { ga: false, marketing: false },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(t.type).toBe("downgrade_reload")
  })
})
