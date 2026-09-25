#!/usr/bin/env node
/**
 * Registry + signup link builder + preview-guard checks for /volunteer.
 * No jest/vitest in this repo; run via `npm test`.
 *
 * Named checks (reported on failure / for PR report):
 * - production_syh_signup_href_carries_callsign
 * - preview_unlocked_control_is_not_a_link
 * - isVolunteerProductionDeploy_branches
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
  DEFAULT_APP_URL,
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  resolveVolunteerOrg,
  isSkyHopeRef,
  isVolunteerProductionDeploy,
  normalizeVolunteerCallSign,
  normalizeVolunteerCallSignForOrg,
  buildVolunteerSignupHrefForOrg,
  buildVolunteerUnlockedSignupControl,
  getVolunteerAppBaseUrl,
} = await loadLib()

assert.equal(VOLUNTEER_CAMPAIGN_CODE, "ACA")
assert.equal(SKYHOPE_CAMPAIGN_CODE, "SKYHOPE")
assert.equal(DEFAULT_APP_URL, "https://app.planewx.ai")
assert.equal(getVolunteerAppBaseUrl(), DEFAULT_APP_URL)
assert.equal(
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  "Preview. Please don't create an account."
)

const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE

assert.equal(aca.prefix, "CMF")
assert.equal(aca.signupParam, "cmf")
assert.equal(aca.storageKey, "planewx_cmf_call_sign")
assert.ok(aca.pattern.test("CMF1234"))
assert.ok(!aca.pattern.test("CMF12345"))
assert.ok(!aca.pattern.test("SYH1234"))
assert.match(
  aca.unlockBody,
  /30% off the first year of an annual plan from the call sign you entered here/,
  "cmf_unlock_body_first_year_annual"
)
assert.match(
  aca.unlockBody,
  /You do not type a separate coupon code\./,
  "cmf_unlock_body_keeps_coupon_sentence"
)
assert.equal(
  aca.unlockBody.includes("30% off the annual plan at purchase"),
  false,
  "cmf_unlock_body_not_renewing_annual"
)
assert.match(
  sky.unlockBody,
  /30% off the first year of an annual plan from the SkyHope call sign you entered here/,
  "syh_unlock_body_unchanged"
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

console.log("Volunteer org registry + link builder checks passed.")
console.log("Tests: production_syh_signup_href_carries_callsign, preview_unlocked_control_is_not_a_link, isVolunteerProductionDeploy_branches")
console.log("ACA Sign up href:", acaHref)
console.log("SKYHOPE Sign up href:", skyHref)
