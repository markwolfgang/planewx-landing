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

const GENERIC_HINT =
  "Enter your CMF or NGF call sign from your volunteer pilot organization. We'll validate it, then unlock signup."
const GENERIC_ERROR =
  "That doesn't look like a valid volunteer call sign. Use your CMF or NGF call sign from your volunteer pilot organization."

describe("ACA / CMF and SkyHope / SYH", () => {
  const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
  const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE

  it("keeps campaign codes and generic CMF/NGF bare pattern", () => {
    expect(VOLUNTEER_CAMPAIGN_CODE).toBe("ACA")
    expect(SKYHOPE_CAMPAIGN_CODE).toBe("SKYHOPE")
    expect(aca.prefix).toBe("CMF")
    expect(aca.signupParam).toBe("cmf")
    expect(aca.storageKey).toBe("planewx_cmf_call_sign")
    expect(aca.pattern.source).toBe("^CMF\\d{1,4}$")
    expect(aca.hint).toBe(GENERIC_HINT)
    expect(aca.error).toBe(GENERIC_ERROR)
    expect(sky.prefix).toBe("SYH")
    expect(sky.signupParam).toBe("callsign")
    expect(sky.storageKey).toBe("planewx_syh_call_sign")
    expect(sky.pattern.source).toBe("^SYH\\d{1,4}$")
    expect(BARE_VOLUNTEER_CALL_SIGN_PATTERN.source).toBe("^(CMF|NGF)\\d{1,4}$")
    expect(BARE_VOLUNTEER_CALL_SIGN_ERROR).toBe(aca.error)
  })

  it("keeps SkyHope resolve / normalize behavior", () => {
    expect(resolveVolunteerOrg("ACA").ref).toBe("ACA")
    expect(resolveVolunteerOrg("SKYHOPE").ref).toBe("SKYHOPE")
    expect(resolveVolunteerOrg(null).ref).toBe("ACA")
    expect(isSkyHopeRef("skyhope")).toBe(true)
    expect(isBareVolunteerGate(null)).toBe(true)
    expect(isBareVolunteerGate("ACA")).toBe(true)
    expect(isBareVolunteerGate("SKYHOPE")).toBe(false)
    expect(isBareVolunteerGate("ANGELFLIGHT")).toBe(true)

    expect(normalizeVolunteerCallSign("cmf42")).toBe("CMF42")
    expect(normalizeVolunteerCallSign("SYH1234")).toBeNull()
    expect(normalizeVolunteerCallSignForOrg("syh99", sky)).toBe("SYH99")
    expect(normalizeVolunteerCallSignForOrg("CMF123", sky)).toBeNull()

    expect(normalizeVolunteerCallSignForPage("syh123", null)).toBeNull()
    expect(normalizeVolunteerCallSignForPage("syh123", "ACA")).toBeNull()

    const bareCmf = normalizeVolunteerCallSignForPage("cmf42", "ACA")
    expect(bareCmf?.callSign).toBe("CMF42")
    expect(bareCmf?.org.ref).toBe("ACA")

    expect(normalizeVolunteerCallSignForPage("CMF123", "SKYHOPE")).toBeNull()
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

describe("Generic CMF/NGF gate and ANGELFLIGHT tracking", () => {
  const angel = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT

  it("registers NGF storage/pattern with generic volunteer copy", () => {
    expect(ANGEL_FLIGHT_CAMPAIGN_CODE).toBe("ANGELFLIGHT")
    expect(angel.ref).toBe("ANGELFLIGHT")
    expect(angel.prefix).toBe("NGF")
    expect(angel.signupParam).toBe("callsign")
    expect(angel.storageKey).toBe("planewx_ngf_call_sign")
    expect(angel.pattern.source).toBe("^NGF\\d{1,4}$")
    expect(angel.pattern.flags).toBe("i")
    expect(angel.label).toBe("Your volunteer call sign")
    expect(angel.hint).toBe(GENERIC_HINT)
    expect(angel.error).toBe(GENERIC_ERROR)
    expect(angel.pattern.test("NGF1234")).toBe(true)
    expect(angel.pattern.test("ngf1")).toBe(true)
    expect(angel.pattern.test("NGF9999")).toBe(true)
    expect(angel.pattern.test("NGF12345")).toBe(false)
    expect(angel.pattern.test("NGF")).toBe(false)
    expect(angel.pattern.test("CMF123")).toBe(false)
    expect(angel.pattern.test("SYH1234")).toBe(false)
    expect(angel.pattern.test("NGF0A")).toBe(false)
    expect(angel.label.includes("Angel Flight")).toBe(false)
    expect(angel.hint.includes("Angel Flight")).toBe(false)
  })

  it("accepts NGF on bare as ACA, and keeps ref=ANGELFLIGHT tracking", () => {
    expect(resolveVolunteerOrg("ANGELFLIGHT").ref).toBe("ANGELFLIGHT")
    expect(resolveVolunteerOrg("angelflight").ref).toBe("ANGELFLIGHT")
    expect(isAngelFlightRef("angelflight")).toBe(true)
    expect(isAngelFlightRef("SKYHOPE")).toBe(false)

    const bareNgf = normalizeVolunteerCallSignForPage("ngf99", null)
    expect(bareNgf?.callSign).toBe("NGF99")
    expect(bareNgf?.org.ref).toBe("ACA")
    expect(bareNgf?.org.signupParam).toBe("callsign")

    const tracked = normalizeVolunteerCallSignForPage("ngf99", "ANGELFLIGHT")
    expect(tracked?.callSign).toBe("NGF99")
    expect(tracked?.org.ref).toBe("ANGELFLIGHT")

    const trackedCmf = normalizeVolunteerCallSignForPage("CMF123", "ANGELFLIGHT")
    expect(trackedCmf?.callSign).toBe("CMF123")
    expect(trackedCmf?.org.ref).toBe("ANGELFLIGHT")
    expect(trackedCmf?.org.signupParam).toBe("cmf")

    expect(normalizeVolunteerCallSignForPage("SYH1234", "ANGELFLIGHT")).toBeNull()
    expect(normalizeVolunteerCallSignForOrg("NGF1234", angel)).toBe("NGF1234")
    expect(normalizeVolunteerCallSignForOrg(" ngf 12 ", angel)).toBe("NGF12")
    expect(resolveVolunteerOrgFromCallSign("NGF1234")?.prefix).toBe("NGF")
  })

  it("builds signup hrefs with ACA for bare NGF and ANGELFLIGHT when tracked", () => {
    const bare = normalizeVolunteerCallSignForPage("NGF1234", null)
    expect(bare).not.toBeNull()
    expect(
      buildVolunteerSignupHrefForOrg({
        ref: bare!.org.ref,
        callSign: bare!.callSign,
        gateOrg: bare!.org,
      })
    ).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&callsign=NGF1234"
    )

    expect(
      buildVolunteerSignupHrefForOrg({
        ref: "ANGELFLIGHT",
        callSign: "NGF1234",
        gateOrg: { ...angel, ref: "ANGELFLIGHT" },
      })
    ).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ANGELFLIGHT&callsign=NGF1234"
    )

    const trackedCmf = normalizeVolunteerCallSignForPage("CMF1234", "ANGELFLIGHT")
    expect(
      buildVolunteerSignupHrefForOrg({
        ref: trackedCmf!.org.ref,
        callSign: trackedCmf!.callSign,
        gateOrg: trackedCmf!.org,
      })
    ).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ANGELFLIGHT&cmf=CMF1234"
    )
  })
})
