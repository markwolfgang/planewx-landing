#!/usr/bin/env node
/**
 * Registry + signup link builder checks for /volunteer org call signs.
 * No jest/vitest in this repo; run via `npm test`.
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
  resolveVolunteerOrg,
  isSkyHopeRef,
  normalizeVolunteerCallSign,
  normalizeVolunteerCallSignForOrg,
  buildVolunteerSignupHrefForOrg,
  getVolunteerAppBaseUrl,
} = await loadLib()

assert.equal(VOLUNTEER_CAMPAIGN_CODE, "ACA")
assert.equal(SKYHOPE_CAMPAIGN_CODE, "SKYHOPE")
assert.equal(DEFAULT_APP_URL, "https://app.planewx.ai")
assert.equal(getVolunteerAppBaseUrl(), DEFAULT_APP_URL)

const aca = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.ACA
const sky = VOLUNTEER_ORG_CALL_SIGN_REGISTRY.SKYHOPE

assert.equal(aca.prefix, "CMF")
assert.equal(aca.signupParam, "cmf")
assert.equal(aca.storageKey, "planewx_cmf_call_sign")
assert.ok(aca.pattern.test("CMF1234"))
assert.ok(!aca.pattern.test("CMF12345"))
assert.ok(!aca.pattern.test("SYH1234"))

assert.equal(sky.prefix, "SYH")
assert.equal(sky.signupParam, "callsign")
assert.equal(sky.storageKey, "planewx_syh_call_sign")
assert.ok(sky.pattern.test("SYH1234"))
assert.ok(sky.pattern.test("syh1"))
assert.ok(!sky.pattern.test("SYH12345"))
assert.ok(!sky.pattern.test("CMF123"))

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

const skyHref = buildVolunteerSignupHrefForOrg({
  ref: "SKYHOPE",
  callSign: "SYH1234",
})
assert.equal(
  skyHref,
  "https://app.planewx.ai/auth/sign-up?lp=vol&ref=SKYHOPE&callsign=SYH1234"
)
assert.ok(!skyHref.includes("cmf="))

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
console.log("ACA Sign up href:", acaHref)
console.log("SKYHOPE Sign up href:", skyHref)
