import { describe, expect, it } from "vitest"
import {
  buildConsentUpdatePayload,
  isTrackerDowngrade,
  newlyGrantedTrackers,
  planTrackingTransition,
} from "./tracking-runtime"

describe("isTrackerDowngrade / newlyGrantedTrackers", () => {
  it("detects Accept all then Essential only as a downgrade", () => {
    const prev = { ga: true, marketing: true }
    const next = { ga: false, marketing: false }
    expect(isTrackerDowngrade(prev, next)).toBe(true)
  })

  it("detects Marketing off while Analytics stays as a downgrade", () => {
    expect(
      isTrackerDowngrade({ ga: true, marketing: true }, { ga: true, marketing: false }),
    ).toBe(true)
  })

  it("treats Analytics then Marketing as an upgrade", () => {
    const prev = { ga: true, marketing: false }
    const next = { ga: true, marketing: true }
    expect(isTrackerDowngrade(prev, next)).toBe(false)
    expect(newlyGrantedTrackers(prev, next)).toEqual({ ga: false, marketing: true })
  })

  it("treats Marketing then Analytics as an upgrade", () => {
    const prev = { ga: false, marketing: true }
    const next = { ga: true, marketing: true }
    expect(isTrackerDowngrade(prev, next)).toBe(false)
    expect(newlyGrantedTrackers(prev, next)).toEqual({ ga: true, marketing: false })
  })
})

describe("buildConsentUpdatePayload", () => {
  it("sets ads_data_redaction when ad_storage is denied", () => {
    expect(buildConsentUpdatePayload({ ga: true, marketing: false })).toMatchObject({
      analytics_storage: "granted",
      ad_storage: "denied",
      ads_data_redaction: "true",
    })
  })

  it("omits ads_data_redaction when marketing is granted", () => {
    const payload = buildConsentUpdatePayload({ ga: true, marketing: true })
    expect(payload.ad_storage).toBe("granted")
    expect(payload.ads_data_redaction).toBeUndefined()
  })
})

describe("planTrackingTransition sequences", () => {
  it("Accept all then Essential only plans a downgrade reload", () => {
    const first = planTrackingTransition({
      prev: { ga: false, marketing: false },
      next: { ga: true, marketing: true },
      gtagAlreadyLoaded: false,
      debugMode: false,
    })
    expect(first.type).toBe("apply")
    if (first.type !== "apply") return
    expect(first.callGtagJs).toBe(true)
    expect(first.configGa).toBe(true)
    expect(first.configAds).toBe(true)
    expect(first.loadMetaReddit).toBe(true)

    const second = planTrackingTransition({
      prev: { ga: true, marketing: true },
      next: { ga: false, marketing: false },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(second.type).toBe("downgrade_reload")
  })

  it("Analytics then Marketing configs Ads and Meta without a second gtag.js bootstrap", () => {
    const first = planTrackingTransition({
      prev: { ga: false, marketing: false },
      next: { ga: true, marketing: false },
      gtagAlreadyLoaded: false,
      debugMode: false,
    })
    expect(first.type).toBe("apply")
    if (first.type !== "apply") return
    expect(first.configGa).toBe(true)
    expect(first.configAds).toBe(false)

    const second = planTrackingTransition({
      prev: { ga: true, marketing: false },
      next: { ga: true, marketing: true },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(second.type).toBe("apply")
    if (second.type !== "apply") return
    expect(second.callGtagJs).toBe(false)
    expect(second.configGa).toBe(false)
    expect(second.configAds).toBe(true)
    expect(second.loadMetaReddit).toBe(true)
  })

  it("Marketing then Analytics configs GA without reloading gtag.js", () => {
    const first = planTrackingTransition({
      prev: { ga: false, marketing: false },
      next: { ga: false, marketing: true },
      gtagAlreadyLoaded: false,
      debugMode: false,
    })
    expect(first.type).toBe("apply")
    if (first.type !== "apply") return
    expect(first.configAds).toBe(true)
    expect(first.configGa).toBe(false)

    const second = planTrackingTransition({
      prev: { ga: false, marketing: true },
      next: { ga: true, marketing: true },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(second.type).toBe("apply")
    if (second.type !== "apply") return
    expect(second.callGtagJs).toBe(false)
    expect(second.configGa).toBe(true)
    expect(second.configAds).toBe(false)
  })

  it("Do not sell marketing downgrade plans a reload", () => {
    const transition = planTrackingTransition({
      prev: { ga: true, marketing: true },
      next: { ga: true, marketing: false },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(transition.type).toBe("downgrade_reload")
  })
})
