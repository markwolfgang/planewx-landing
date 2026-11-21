import { describe, expect, it } from "vitest"
import {
  BARE_VOLUNTEER_CALL_SIGN_ERROR,
  BARE_VOLUNTEER_CALL_SIGN_PATTERN,
  buildVolunteerSignupHrefForOrg,
  normalizeVolunteerCallSignForPage,
  resolveVolunteerOrgFromCallSign,
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY,
} from "./volunteer-landing"

describe("HRF on the generic volunteer gate (HRF + 1-4 digits)", () => {
  it("accepts HRF6 and HRF1234, any case, on bare and tracked pages", () => {
    for (const raw of ["HRF6", "HRF1234", "hrf6", " hrf 12 "]) {
      const parsed = normalizeVolunteerCallSignForPage(raw, null)
      expect(parsed).not.toBeNull()
      expect(parsed?.callSign).toBe(raw.trim().toUpperCase().replace(/\s+/g, ""))
      expect(parsed?.org.prefix).toBe("HRF")
    }
    expect(normalizeVolunteerCallSignForPage("HRF6", "ANGELFLIGHT")?.callSign).toBe("HRF6")
    expect(BARE_VOLUNTEER_CALL_SIGN_PATTERN.test("HRF1234")).toBe(true)
  })

  it("rejects HRF12345, HRF6A, bare HRF, and HRF on the SkyHope gate", () => {
    for (const raw of ["HRF12345", "HRF6A", "HRF", "HRF-6", "XHRF6"]) {
      expect(normalizeVolunteerCallSignForPage(raw, null)).toBeNull()
    }
    expect(normalizeVolunteerCallSignForPage("HRF6", "SKYHOPE")).toBeNull()
  })

  it("routes HRF to ACA attribution with callsign= and its own storage key", () => {
    const parsed = normalizeVolunteerCallSignForPage("hrf6", null)
    expect(parsed?.org.ref).toBe("ACA")
    expect(parsed?.org.signupParam).toBe("callsign")
    expect(parsed?.org.storageKey).toBe("planewx_hrf_call_sign")
    expect(
      buildVolunteerSignupHrefForOrg({
        ref: parsed!.org.ref,
        callSign: parsed!.callSign,
        gateOrg: parsed!.org,
      })
    ).toBe("https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&callsign=HRF6")
    const tracked = normalizeVolunteerCallSignForPage("HRF6", "ANGELFLIGHT")
    expect(tracked?.org.ref).toBe("ANGELFLIGHT")
    expect(resolveVolunteerOrgFromCallSign("HRF1234")?.prefix).toBe("HRF")
    expect(VOLUNTEER_ORG_CALL_SIGN_REGISTRY.HRF.pattern.source).toBe("^HRF\\d{1,4}$")
  })

  it("leaves CMF, NGF, SYH behavior unchanged", () => {
    expect(normalizeVolunteerCallSignForPage("CMF123", null)?.org.signupParam).toBe("cmf")
    expect(normalizeVolunteerCallSignForPage("ngf99", null)?.org.ref).toBe("ACA")
    expect(normalizeVolunteerCallSignForPage("syh1", null)?.org.ref).toBe("SKYHOPE")
    expect(normalizeVolunteerCallSignForPage("CMF12345", null)).toBeNull()
    expect(normalizeVolunteerCallSignForPage("NGF1A", null)).toBeNull()
    expect(normalizeVolunteerCallSignForPage("SYH12345", null)).toBeNull()
  })
})

describe("visible volunteer gate copy names all four orgs", () => {
  const NAMES = "CMF, SYH, NGF or HRF"
  it("generic gate hint, error, locked hint and sr hint", () => {
    for (const key of ["ACA", "ANGELFLIGHT", "HRF"]) {
      const org = VOLUNTEER_ORG_CALL_SIGN_REGISTRY[key]
      expect(org.hint).toContain(`Enter your ${NAMES} call sign`)
      expect(org.error).toContain(`Use your ${NAMES} call sign`)
      expect(org.lockedHint).toContain(`Enter your ${NAMES} call sign`)
      expect(org.srHint).toBe(
        `Enter your ${NAMES} call sign from your volunteer pilot organization.`
      )
      expect(org.hint).not.toContain("CMF or NGF")
    }
    expect(BARE_VOLUNTEER_CALL_SIGN_ERROR).toContain(NAMES)
  })
  it("leaves SkyHope copy unchanged", () => {
    const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
    expect(sky.hint).toBe(
      "Enter your SkyHope call sign. We'll validate it, then unlock signup."
    )
  })
})
