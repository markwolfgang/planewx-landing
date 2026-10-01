#!/usr/bin/env node
/**
 * Registry + signup link builder + preview-guard checks for /volunteer.
 * No jest/vitest in this repo; run via `npm test`.
 *
 * Named checks (reported on failure / for PR report):
 * - production_syh_signup_href_carries_callsign
 * - preview_unlocked_control_is_not_a_link
 * - isVolunteerProductionDeploy_branches
 * - bare_ngf_accepted_attributes_aca
 * - bare_syh_lowercase_accepted_routes_skyhope
 * - bare_cmf_accepted
 * - bare_garbage_shows_new_error
 * - ref_skyhope_cmf_rejected
 * - ref_skyhope_syh_lowercase_accepted
 * - ref_angelflight_ngf_keeps_tracking
 */
import assert from "node:assert/strict"
import fs from "node:fs"
import { dirname, join } from "node:path"
import { pathToFileURL, fileURLToPath } from "node:url"
import ts from "typescript"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")

async function loadLib() {
  const source = fs.readFileSync(join(ROOT, "lib/volunteer-landing.ts"), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: "volunteer-landing.ts",
  })
  const tmp = join(ROOT, "scripts/.tmp-volunteer-landing.mjs")
  fs.writeFileSync(tmp, outputText)
  try {
    return await import(pathToFileURL(tmp).href + `?t=${Date.now()}`)
  } finally {
    try {
      fs.unlinkSync(tmp)
    } catch {
      /* ignore */
    }
  }
}

const {
  VOLUNTEER_ORG_CALL_SIGN_REGISTRY,
  VOLUNTEER_CAMPAIGN_CODE,
  SKYHOPE_CAMPAIGN_CODE,
  ANGEL_FLIGHT_CAMPAIGN_CODE,
  DEFAULT_APP_URL,
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  BARE_VOLUNTEER_CALL_SIGN_PATTERN,
  BARE_VOLUNTEER_CALL_SIGN_ERROR,
  resolveVolunteerOrg,
  resolveVolunteerOrgFromCallSign,
  isSkyHopeRef,
  isAngelFlightRef,
  isBareVolunteerGate,
  isVolunteerProductionDeploy,
  normalizeVolunteerCallSign,
  normalizeVolunteerCallSignForOrg,
  normalizeVolunteerCallSignForPage,
  buildVolunteerSignupHrefForOrg,
  buildVolunteerUnlockedSignupControl,
  getVolunteerAppBaseUrl,
} = await loadLib()

const GENERIC_HINT =
  "Enter your CMF or NGF call sign from your volunteer pilot organization. We'll validate it, then unlock signup."
const GENERIC_ERROR =
  "That doesn't look like a valid volunteer call sign. Use your CMF or NGF call sign from your volunteer pilot organization."

assert.equal(VOLUNTEER_CAMPAIGN_CODE, "ACA")
assert.equal(SKYHOPE_CAMPAIGN_CODE, "SKYHOPE")
assert.equal(ANGEL_FLIGHT_CAMPAIGN_CODE, "ANGELFLIGHT")
assert.equal(DEFAULT_APP_URL, "https://app.planewx.ai")
assert.equal(getVolunteerAppBaseUrl(), DEFAULT_APP_URL)
assert.equal(
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  "Preview. Please don't create an account."
)

const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE
const angel = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ANGELFLIGHT

assert.equal(aca.prefix, "CMF")
assert.equal(aca.signupParam, "cmf")
assert.equal(aca.storageKey, "planewx_cmf_call_sign")

assert.equal(aca.label, "Your volunteer call sign", "bare_aca_label_is_volunteer_call_sign")
assert.equal(aca.hint, GENERIC_HINT, "bare_aca_hint_cmf_or_ngf")
assert.equal(
  aca.lockedHint,
  "Enter your CMF or NGF call sign from your volunteer pilot organization. We'll validate it, then unlock signup",
  "bare_aca_locked_hint_matches_hint_without_trailing_period"
)
assert.equal(
  aca.srHint,
  "Enter your CMF or NGF call sign from your volunteer pilot organization.",
  "bare_aca_sr_hint_matches"
)
assert.equal(sky.label, "Your SkyHope call sign", "skyhope_label_unchanged")
assert.equal(
  sky.hint,
  "Enter your SkyHope call sign. We'll validate it, then unlock signup.",
  "skyhope_hint_unchanged"
)
assert.equal(
  sky.error,
  "That doesn't look like a valid SkyHope call sign. Use your SkyHope call sign, not a Compassion Flight one.",
  "skyhope_error_unchanged"
)
assert.equal(angel.label, "Your volunteer call sign", "angelflight_label_is_generic")
assert.equal(angel.hint, GENERIC_HINT, "angelflight_hint_is_generic")
assert.equal(angel.error, GENERIC_ERROR, "angelflight_error_is_generic")
assert.equal(angel.hint.includes("Angel Flight"), false, "angelflight_copy_not_org_specific")
assert.ok(aca.pattern.test("CMF1234"))
assert.ok(!aca.pattern.test("CMF12345"))
assert.ok(!aca.pattern.test("SYH1234"))
assert.ok(!aca.pattern.test("NGF1234"))
assert.match(
  aca.unlockBody,
  /30% off the annual plan for each year you're an active volunteer pilot/,
  "cmf_unlock_body_each_year_active_volunteer"
)
assert.match(
  aca.unlockBody,
  /You do not type a separate coupon code\./,
  "cmf_unlock_body_keeps_coupon_sentence"
)
assert.equal(
  aca.unlockBody.includes("re-confirm"),
  false,
  "cmf_unlock_body_no_reconfirm"
)
assert.equal(
  aca.unlockBody.includes("first year"),
  false,
  "cmf_unlock_body_not_first_year_only"
)
assert.equal(
  aca.acceptedLead.includes("At purchase,"),
  false,
  "cmf_accepted_lead_drops_at_purchase"
)
assert.match(
  aca.acceptedLead,
  /PlaneWX applies the volunteer discount from the call sign you entered$/,
  "cmf_accepted_lead_discount_line"
)
assert.match(
  sky.unlockBody,
  /30% off the annual plan for each year you're an active volunteer pilot/,
  "syh_unlock_body_each_year_active_volunteer"
)
assert.match(
  sky.unlockBody,
  /You do not type a separate coupon code\./,
  "syh_unlock_body_keeps_coupon_sentence"
)
assert.equal(
  sky.unlockBody.includes("re-confirm"),
  false,
  "syh_unlock_body_no_reconfirm"
)
assert.equal(
  sky.acceptedLead.includes("At purchase,"),
  false,
  "syh_accepted_lead_drops_at_purchase"
)

assert.equal(sky.prefix, "SYH")
assert.equal(sky.signupParam, "callsign")
assert.equal(sky.storageKey, "planewx_syh_call_sign")
assert.equal(sky.pattern.source, "^SYH\\d{1,4}$", "syh_pattern_matches_cmf_shape")
assert.equal(sky.pattern.flags, "i", "syh_pattern_matches_cmf_shape")
assert.equal(aca.pattern.source, "^CMF\\d{1,4}$", "cmf_pattern_unchanged")
assert.equal(aca.pattern.flags, "i", "cmf_pattern_unchanged")
assert.ok(sky.pattern.test("SYH1234"))
assert.ok(sky.pattern.test("syh1"))
assert.ok(sky.pattern.test("SYH9999"))
assert.ok(!sky.pattern.test("SYH12345"))
assert.ok(!sky.pattern.test("SYH"))
assert.ok(!sky.pattern.test("CMF123"))
assert.ok(!sky.pattern.test("SYH0A"))

assert.equal(resolveVolunteerOrg("SKYHOPE").ref, "SKYHOPE")
assert.equal(resolveVolunteerOrg("skyhope").ref, "SKYHOPE")
assert.equal(resolveVolunteerOrg("ACA").ref, "ACA")
assert.equal(resolveVolunteerOrg(null).ref, "ACA")
assert.equal(resolveVolunteerOrg("OTHER").ref, "ACA")
assert.equal(isSkyHopeRef("skyhope"), true)
assert.equal(isSkyHopeRef("ACA"), false)
assert.equal(isAngelFlightRef("angelflight"), true)
assert.equal(isAngelFlightRef("ACA"), false)

assert.equal(normalizeVolunteerCallSign("cmf42"), "CMF42")
assert.equal(normalizeVolunteerCallSign("SYH1234"), null)
assert.equal(normalizeVolunteerCallSignForOrg("syh99", sky), "SYH99")
assert.equal(normalizeVolunteerCallSignForOrg("CMF123", sky), null)
assert.equal(normalizeVolunteerCallSignForOrg("SYH1234", aca), null)

const acaHref = buildVolunteerSignupHrefForOrg({
  ref: "ACA",
  callSign: "CMF1234",
})
assert.equal(
  acaHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&cmf=CMF1234"
)

// production_syh_signup_href_carries_callsign
const skyHref = buildVolunteerSignupHrefForOrg({
  ref: "SKYHOPE",
  callSign: "SYH1234",
})
assert.equal(
  skyHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE&callsign=SYH1234",
  "production_syh_signup_href_carries_callsign"
)
assert.ok(!skyHref.includes("cmf="), "production_syh_signup_href_carries_callsign")

const productionControl = buildVolunteerUnlockedSignupControl({
  isProduction: true,
  ref: "SKYHOPE",
  callSign: "SYH1234",
  gateOrg: sky,
})
assert.equal(productionControl.kind, "link", "production_syh_signup_href_carries_callsign")
assert.equal(
  productionControl.href,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE&callsign=SYH1234",
  "production_syh_signup_href_carries_callsign"
)

// preview_unlocked_control_is_not_a_link
const previewControl = buildVolunteerUnlockedSignupControl({
  isProduction: false,
  ref: "SKYHOPE",
  callSign: "SYH1234",
  gateOrg: sky,
})
assert.equal(previewControl.kind, "preview", "preview_unlocked_control_is_not_a_link")
assert.equal(
  previewControl.notice,
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  "preview_unlocked_control_is_not_a_link"
)
assert.equal(
  "href" in previewControl,
  false,
  "preview_unlocked_control_is_not_a_link"
)

const previewAca = buildVolunteerUnlockedSignupControl({
  isProduction: false,
  ref: "ACA",
  callSign: "CMF1234",
  gateOrg: aca,
})
assert.equal(previewAca.kind, "preview", "preview_unlocked_control_is_not_a_link")

// isVolunteerProductionDeploy_branches
assert.equal(
  isVolunteerProductionDeploy("production"),
  true,
  "isVolunteerProductionDeploy_branches"
)
assert.equal(
  isVolunteerProductionDeploy("preview"),
  false,
  "isVolunteerProductionDeploy_branches"
)
assert.equal(
  isVolunteerProductionDeploy("development"),
  false,
  "isVolunteerProductionDeploy_branches"
)
assert.equal(
  isVolunteerProductionDeploy(undefined),
  false,
  "isVolunteerProductionDeploy_branches"
)

const leaked = buildVolunteerSignupHrefForOrg({
  ref: "SKYHOPE",
  callSign: "CMF1234",
})
assert.equal(leaked, "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE")

const leakedAca = buildVolunteerSignupHrefForOrg({
  ref: "ACA",
  callSign: "SYH1234",
})
assert.equal(leakedAca, "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA")

// bare_ngf_accepted_attributes_aca
assert.equal(BARE_VOLUNTEER_CALL_SIGN_PATTERN.source, "^(CMF|NGF|SYH)\\d{1,4}$")
assert.equal(BARE_VOLUNTEER_CALL_SIGN_PATTERN.flags, "i")
assert.equal(isBareVolunteerGate(null), true, "bare_ngf_accepted_attributes_aca")
assert.equal(isBareVolunteerGate("ACA"), true, "bare_ngf_accepted_attributes_aca")
assert.equal(isBareVolunteerGate("ANGELFLIGHT"), true, "bare_ngf_accepted_attributes_aca")
assert.equal(isBareVolunteerGate("SKYHOPE"), false, "bare_ngf_accepted_attributes_aca")
const bareNgf = normalizeVolunteerCallSignForPage("ngf123", null)
assert.ok(bareNgf, "bare_ngf_accepted_attributes_aca")
assert.equal(bareNgf.callSign, "NGF123", "bare_ngf_accepted_attributes_aca")
assert.equal(bareNgf.org.ref, "ACA", "bare_ngf_accepted_attributes_aca")
assert.equal(bareNgf.org.signupParam, "callsign", "bare_ngf_accepted_attributes_aca")
assert.equal(
  resolveVolunteerOrgFromCallSign("ngf123")?.prefix,
  "NGF",
  "bare_ngf_accepted_attributes_aca"
)
const bareNgfHref = buildVolunteerSignupHrefForOrg({
  ref: bareNgf.org.ref,
  callSign: bareNgf.callSign,
  gateOrg: bareNgf.org,
})
assert.equal(
  bareNgfHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&callsign=NGF123",
  "bare_ngf_accepted_attributes_aca"
)

// bare_syh_lowercase_accepted_routes_skyhope
const bareSyh = normalizeVolunteerCallSignForPage("syh123", null)
assert.ok(bareSyh, "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(bareSyh.callSign, "SYH123", "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(bareSyh.org.ref, "SKYHOPE", "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(
  resolveVolunteerOrgFromCallSign("syh123")?.ref,
  "SKYHOPE",
  "bare_syh_lowercase_accepted_routes_skyhope"
)
const bareSyhHref = buildVolunteerSignupHrefForOrg({
  ref: bareSyh.org.ref,
  callSign: bareSyh.callSign,
  gateOrg: bareSyh.org,
})
assert.equal(
  bareSyhHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE&callsign=SYH123",
  "bare_syh_lowercase_accepted_routes_skyhope"
)
const acaSyh = normalizeVolunteerCallSignForPage("syh99", "ACA")
assert.ok(acaSyh, "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(acaSyh.org.ref, "SKYHOPE", "bare_syh_lowercase_accepted_routes_skyhope")
const afSyh = normalizeVolunteerCallSignForPage("syh1", "ANGELFLIGHT")
assert.ok(afSyh, "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(afSyh.org.ref, "SKYHOPE", "bare_syh_lowercase_accepted_routes_skyhope")
assert.equal(aca.hint.includes("SYH"), false, "generic_copy_does_not_name_syh")
assert.equal(aca.error.includes("SYH"), false, "generic_copy_does_not_name_syh")

// bare_cmf_accepted
const bareCmf = normalizeVolunteerCallSignForPage("cmf42", "ACA")
assert.ok(bareCmf, "bare_cmf_accepted")
assert.equal(bareCmf.callSign, "CMF42", "bare_cmf_accepted")
assert.equal(bareCmf.org.ref, "ACA", "bare_cmf_accepted")
const bareCmfHref = buildVolunteerSignupHrefForOrg({
  ref: bareCmf.org.ref,
  callSign: bareCmf.callSign,
  gateOrg: bareCmf.org,
})
assert.equal(
  bareCmfHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ACA&cmf=CMF42",
  "bare_cmf_accepted"
)

// bare_garbage_shows_new_error
assert.equal(
  BARE_VOLUNTEER_CALL_SIGN_ERROR,
  GENERIC_ERROR,
  "bare_garbage_shows_new_error"
)
assert.equal(aca.error, BARE_VOLUNTEER_CALL_SIGN_ERROR, "bare_garbage_shows_new_error")
assert.equal(
  normalizeVolunteerCallSignForPage("notasign", null),
  null,
  "bare_garbage_shows_new_error"
)
assert.equal(
  normalizeVolunteerCallSignForPage("SYH", "ACA"),
  null,
  "bare_garbage_shows_new_error"
)
assert.equal(
  normalizeVolunteerCallSignForPage("CMF12345", null),
  null,
  "bare_garbage_shows_new_error"
)

// ref_skyhope_cmf_rejected
assert.equal(
  normalizeVolunteerCallSignForPage("CMF123", "SKYHOPE"),
  null,
  "ref_skyhope_cmf_rejected"
)
assert.equal(
  normalizeVolunteerCallSignForOrg("CMF123", sky),
  null,
  "ref_skyhope_cmf_rejected"
)
assert.match(
  sky.error,
  /not a Compassion Flight one/,
  "ref_skyhope_cmf_rejected"
)

// ref_skyhope_syh_lowercase_accepted
const skyLower = normalizeVolunteerCallSignForPage("syh99", "SKYHOPE")
assert.ok(skyLower, "ref_skyhope_syh_lowercase_accepted")
assert.equal(skyLower.callSign, "SYH99", "ref_skyhope_syh_lowercase_accepted")
assert.equal(skyLower.org.ref, "SKYHOPE", "ref_skyhope_syh_lowercase_accepted")
assert.equal(
  normalizeVolunteerCallSignForOrg("syh99", sky),
  "SYH99",
  "ref_skyhope_syh_lowercase_accepted"
)

// ref_angelflight_ngf_keeps_tracking
const trackedNgf = normalizeVolunteerCallSignForPage("ngf99", "ANGELFLIGHT")
assert.ok(trackedNgf, "ref_angelflight_ngf_keeps_tracking")
assert.equal(trackedNgf.callSign, "NGF99", "ref_angelflight_ngf_keeps_tracking")
assert.equal(trackedNgf.org.ref, "ANGELFLIGHT", "ref_angelflight_ngf_keeps_tracking")
const trackedHref = buildVolunteerSignupHrefForOrg({
  ref: trackedNgf.org.ref,
  callSign: trackedNgf.callSign,
  gateOrg: trackedNgf.org,
})
assert.equal(
  trackedHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=ANGELFLIGHT&callsign=NGF99",
  "ref_angelflight_ngf_keeps_tracking"
)

// how_offer_works_has_no_duplicate_subtitle
const volunteerPage = fs.readFileSync(join(ROOT, "app/volunteer/page.tsx"), "utf8")
assert.equal(
  volunteerPage.includes(
    "unlock signup for your Pro Plus trial and volunteer discount"
  ),
  false,
  "how_offer_works_has_no_duplicate_subtitle"
)
assert.equal(
  volunteerPage.includes("Enter your volunteer call sign"),
  true,
  "bare_step1_heading_is_volunteer_call_sign"
)
assert.equal(
  volunteerPage.includes(
    "Use your CMF or NGF call sign from your volunteer pilot organization. We validate it before signup unlocks."
  ),
  true,
  "bare_step1_body_cmf_or_ngf"
)
assert.equal(
  volunteerPage.includes(
    "Use your SkyHope (SYH) call sign. We validate it before signup unlocks."
  ),
  true,
  "skyhope_step1_body_no_gate_hint_repeat"
)
assert.equal(
  volunteerPage.includes(
    "Enter your CMF or NGF call sign from your volunteer pilot organization below."
  ),
  true,
  "bare_pressure_cta_cmf_or_ngf"
)
assert.equal(
  volunteerPage.includes("Enter your Compassion Flight call sign below."),
  false,
  "bare_pressure_cta_not_cmf_only"
)
assert.equal(
  volunteerPage.includes("Angel Flight"),
  false,
  "page_copy_not_angel_flight_specific"
)
assert.equal(
  volunteerPage.includes("We'll validate it, then unlock signup."),
  false,
  "step1_body_not_gate_hint_repeat"
)
assert.match(
  volunteerPage,
  /isSkyHope\s*\?\s*"Enter your SkyHope call sign"\s*:\s*"Enter your volunteer call sign"/,
  "bare_step1_heading_skyhope_unchanged"
)
assert.equal(
  volunteerPage.includes("format-checked only") ||
    volunteerPage.includes("Format-only validation") ||
    volunteerPage.includes("Format only (CMF"),
  false,
  "page_does_not_say_format_checked_only"
)

console.log("Volunteer org registry + link builder checks passed.")
console.log(
  "Tests: production_syh_signup_href_carries_callsign, preview_unlocked_control_is_not_a_link, isVolunteerProductionDeploy_branches, bare_ngf_accepted_attributes_aca, bare_syh_lowercase_accepted_routes_skyhope, bare_cmf_accepted, bare_garbage_shows_new_error, ref_skyhope_cmf_rejected, ref_skyhope_syh_lowercase_accepted, ref_angelflight_ngf_keeps_tracking, how_offer_works_has_no_duplicate_subtitle, bare_aca_label_is_volunteer_call_sign, bare_step1_body_cmf_or_ngf, skyhope_step1_body_no_gate_hint_repeat, bare_pressure_cta_cmf_or_ngf"
)
console.log("ACA Sign up href:", acaHref)
console.log("SKYHOPE Sign up href:", skyHref)
console.log("Bare NGF123 Sign up href:", bareNgfHref)
console.log("Bare SYH123 Sign up href:", bareSyhHref)
console.log("ANGELFLIGHT NGF99 Sign up href:", trackedHref)
