import { describe, expect, it } from "vitest"
import {
  allowsAnalytics,
  allowsMarketing,
  consentModeFromCountry,
  hasGlobalPrivacyControl,
  parseConsentMode,
} from "./consent-region"

describe("consentModeFromCountry", () => {
  it("defaults to strict when country is missing or unknown", () => {
    expect(consentModeFromCountry(null)).toBe("strict")
    expect(consentModeFromCountry(undefined)).toBe("strict")
    expect(consentModeFromCountry("")).toBe("strict")
    expect(consentModeFromCountry("XX")).toBe("strict")
    expect(consentModeFromCountry("T1")).toBe("strict")
  })

  it("uses strict for EU, UK, EEA, and Switzerland", () => {
    for (const code of ["DE", "FR", "IE", "GB", "UK", "NO", "IS", "LI", "CH", "NL"]) {
      expect(consentModeFromCountry(code)).toBe("strict")
    }
  })

  it("uses notice for US and other non-strict countries", () => {
    expect(consentModeFromCountry("US")).toBe("notice")
    expect(consentModeFromCountry("CA")).toBe("notice")
    expect(consentModeFromCountry("AU")).toBe("notice")
    expect(consentModeFromCountry("us")).toBe("notice")
  })
})

describe("parseConsentMode", () => {
  it("only accepts notice; everything else is strict", () => {
    expect(parseConsentMode("notice")).toBe("notice")
    expect(parseConsentMode("strict")).toBe("strict")
    expect(parseConsentMode(null)).toBe("strict")
    expect(parseConsentMode("nope")).toBe("strict")
  })
})

describe("hasGlobalPrivacyControl", () => {
  it("is true when navigator.globalPrivacyControl is true", () => {
    expect(hasGlobalPrivacyControl({ globalPrivacyControl: true }, "")).toBe(true)
  })

  it("is true when pw_gpc=1 cookie is set (Sec-GPC from middleware)", () => {
    expect(hasGlobalPrivacyControl({ globalPrivacyControl: false }, "pw_gpc=1; path=/")).toBe(true)
  })

  it("is false when neither signal is present", () => {
    expect(hasGlobalPrivacyControl({ globalPrivacyControl: false }, "pw_consent_region=notice")).toBe(
      false,
    )
  })
})

describe("allowsAnalytics / allowsMarketing", () => {
  it("strict mode blocks until stored opt-in", () => {
    expect(allowsAnalytics({ mode: "strict", prefs: null })).toBe(false)
    expect(allowsMarketing({ mode: "strict", prefs: null, gpc: false })).toBe(false)
    expect(
      allowsAnalytics({ mode: "strict", prefs: { analytics: true } }),
    ).toBe(true)
    expect(
      allowsMarketing({ mode: "strict", prefs: { marketing: true }, gpc: false }),
    ).toBe(true)
  })

  it("notice mode allows analytics by default; honors stored Essential only", () => {
    expect(allowsAnalytics({ mode: "notice", prefs: null })).toBe(true)
    expect(
      allowsAnalytics({ mode: "notice", prefs: { analytics: false } }),
    ).toBe(false)
  })

  it("GPC opts out of marketing in notice and strict modes", () => {
    expect(allowsMarketing({ mode: "notice", prefs: null, gpc: true })).toBe(false)
    expect(
      allowsMarketing({ mode: "notice", prefs: { marketing: true }, gpc: true }),
    ).toBe(false)
    expect(
      allowsMarketing({ mode: "strict", prefs: { marketing: true }, gpc: true }),
    ).toBe(false)
    expect(allowsMarketing({ mode: "notice", prefs: null, gpc: false })).toBe(true)
  })

  it("stored choice is honored in notice mode", () => {
    expect(
      allowsMarketing({ mode: "notice", prefs: { marketing: false }, gpc: false }),
    ).toBe(false)
    expect(
      allowsMarketing({ mode: "notice", prefs: { marketing: true }, gpc: false }),
    ).toBe(true)
  })
})
