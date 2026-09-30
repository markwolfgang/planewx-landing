import { describe, expect, it } from "vitest"
import {
  ANGEL_FLIGHT_CAMPAIGN_CODE,
  BARE_VOLUNTEER_CALL_SIGN_ERROR,
  BARE_VOLUNTEER_CALL_SIGN_PATTERN,
  buildVolunteerSignupHrefForOrg,
  isAngelFlightRef,
  isBareVolunteerGate,
  isSkyHopeRef,
  normalizeVolunteerCallSign,
  normalizeVolunteerCallSignForOrg,
  normalizeVolunteerCallSignForPage,
  resolveVolunteerOrg,
  resolveVolunteerOrgFromCallSign,
  SKYHOPE_CAMPAIGN_CODE,
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY,
} from "./volunteer-landing"

describe("ACA / CMF and SkyHope / SYH stay unchanged", () => {
  const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
  const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE

  it("keeps campaign codes and bare dual-org pattern", () => {
    expect(VOLUNTEER_CAMPAIGN_CODE).toBe("ACA")
    expect(SKYHOPE_CAMPAIGN_CODE).toBe("SKYHOPE")
    expect(aca.prefix).toBe("CMF")
    expect(aca.signupParam).toBe("cmf")
    expect(aca.storageKey).toBe("planewx_cmf_call_sign")
    expect(aca.pattern.source).toBe("^CMF\\d{1,4}$")
    expect(sky.prefix).toBe("SYH")
    expect(sky.signupParam).toBe("callsign")
    expect(sky.storageKey).toBe("planewx_syh_call_sign")
    expect(sky.pattern.source).toBe("^SYH\\d{1,4}$")
    expect(BARE_VOLUNTEER_CALL_SIGN_PATTERN.source).toBe("^(CMF|SYH)\\d{1,4}$")
    expect(BARE_VOLUNTEER_CALL_SIGN_ERROR).toBe(aca.error)
  })

  it("keeps bare and SkyHope resolve / normalize behavior", () => {
    expect(resolveVolunteerOrg("ACA").ref).toBe("ACA")
    expect(resolveVolunteerOrg("SKYHOPE").ref).toBe("SKYHOPE")
    expect(resolveVolunteerOrg(null).ref).toBe("ACA")
    expect(isSkyHopeRef("skyhope")).toBe(true)
    expect(isBareVolunteerGate(null)).toBe(true)
    expect(isBareVolunteerGate("ACA")).toBe(true)
    expect(isBareVolunteerGate("SKYHOPE")).toBe(false)

    expect(normalizeVolunteerCallSign("cmf42")).toBe("CMF42")
    expect(normalizeVolunteerCallSign("SYH1234")).toBeNull()
    expect(normalizeVolunteerCallSignForOrg("syh99", sky)).toBe("SYH99")
    expect(normalizeVolunteerCallSignForOrg("CMF123", sky)).toBeNull()

    const bareSyh = normalizeVolunteerCallSignForPage("syh123", null)
    expect(bareSyh?.callSign).toBe("SYH123")
    expect(bareSyh?.org.ref).toBe("SKYHOPE")

    const bareCmf = normalizeVolunteerCallSignForPage("cmf42", "ACA")
    expect(bareCmf?.callSign).toBe("CMF42")
    expect(bareCmf?.org.ref).toBe("ACA")

    expect(normalizeVolunteerCallSignForPage("CMF123", "SKYHOPE")).toBeNull()
    expect(normalizeVolunteerCallSignForPage("NGF1234", null)).toBeNull()
    expect(normalizeVolunteerCallSignForPage("NGF1234", "ACA")).toBeNull()
  })

  it("keeps ACA and SkyHope signup hrefs", () => {
    expect(
      buildVolunteerSignupHrefForOrg({ ref: "ACA", callSign: "CMF1234" })
    ).toBe("https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&cmf=CMF1234")
    expect(
      buildVolunteerSignupHrefForOrg({ ref: "SKYHOPE", callSign: "SYH1234" })
    ).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE&callsign=SYH1234"
    )
  })
})

describe("Angel Flight / NGF mirrors SkyHope", () => {
  const angel = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT

  it("registers ANGELFLIGHT with NGF prefix + 1 to 4 digits", () => {
    expect(ANGEL_FLIGHT_CAMPAIGN_CODE).toBe("ANGELFLIGHT")
    expect(angel.ref).toBe("ANGELFLIGHT")
    expect(angel.prefix).toBe("NGF")
    expect(angel.signupParam).toBe("callsign")
    expect(angel.storageKey).toBe("planewx_ngf_call_sign")
    expect(angel.pattern.source).toBe("^NGF\\d{1,4}$")
    expect(angel.pattern.flags).toBe("i")
    expect(angel.label).toBe("Your Angel Flight call sign")
    expect(angel.pattern.test("NGF1234")).toBe(true)
    expect(angel.pattern.test("ngf1")).toBe(true)
    expect(angel.pattern.test("NGF9999")).toBe(true)
    expect(angel.pattern.test("NGF12345")).toBe(false)
    expect(angel.pattern.test("NGF")).toBe(false)
    expect(angel.pattern.test("CMF123")).toBe(false)
    expect(angel.pattern.test("SYH1234")).toBe(false)
    expect(angel.pattern.test("NGF0A")).toBe(false)
  })

  it("resolves ref=ANGELFLIGHT and rejects foreign signs on that page", () => {
    expect(resolveVolunteerOrg("ANGELFLIGHT").ref).toBe("ANGELFLIGHT")
    expect(resolveVolunteerOrg("angelflight").ref).toBe("ANGELFLIGHT")
    expect(isAngelFlightRef("angelflight")).toBe(true)
    expect(isAngelFlightRef("SKYHOPE")).toBe(false)
    expect(isBareVolunteerGate("ANGELFLIGHT")).toBe(false)

    const lower = normalizeVolunteerCallSignForPage("ngf99", "ANGELFLIGHT")
    expect(lower?.callSign).toBe("NGF99")
    expect(lower?.org.ref).toBe("ANGELFLIGHT")

    expect(normalizeVolunteerCallSignForPage("CMF123", "ANGELFLIGHT")).toBeNull()
    expect(normalizeVolunteerCallSignForPage("SYH1234", "ANGELFLIGHT")).toBeNull()
    expect(normalizeVolunteerCallSignForOrg("NGF1234", angel)).toBe("NGF1234")
    expect(normalizeVolunteerCallSignForOrg(" ngf 12 ", angel)).toBe("NGF12")
    expect(resolveVolunteerOrgFromCallSign("NGF1234")?.ref).toBe("ANGELFLIGHT")
  })

  it("builds signup href with ref=ANGELFLIGHT and callsign=", () => {
    expect(
      buildVolunteerSignupHrefForOrg({
        ref: "ANGELFLIGHT",
        callSign: "NGF1234",
      })
    ).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ANGELFLIGHT&callsign=NGF1234"
    )
    expect(
      buildVolunteerSignupHrefForOrg({
        ref: "ANGELFLIGHT",
        callSign: "CMF1234",
      })
    ).toBe("https://app.planewx.ai/auth/sign-up?lp=vol&ref=ANGELFLIGHT")
  })
})
