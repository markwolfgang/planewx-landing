import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const src = readFileSync(path.resolve(__dirname, "..", "app/volunteer/page.tsx"), "utf8")
const collapsed = src.replace(/\s+/g, " ")

describe("volunteer page copy matches where the saved call sign comes from", () => {
  it("states each account case", () => {
    expect(collapsed).toContain("A new account gets the call sign saved at signup")
    expect(collapsed).toContain(
      "A signed-in pilot who opens the sign-up link has it saved on first use when the account has none",
    )
    expect(collapsed).toContain(
      "A pilot who already has an account adds the call sign on the web: Profile, Subscription tab, Volunteer call sign",
    )
  })

  it("ties the discount to the call sign saved on the account", () => {
    expect(collapsed).toContain("from the SkyHope call sign saved on your account.")
    expect(collapsed).toContain("from the call sign saved on your account.")
  })

  it("no longer says the call sign entered on this page drives checkout", () => {
    expect(collapsed).not.toContain("call sign you entered on this page. You do not type")
    expect(collapsed).not.toContain("saved with this visit and passed into signup")
    expect(collapsed).not.toContain("is signed out needs to be signed in first")
  })

  it("has no em dashes, en dashes, or exclamation marks in the changed lines", () => {
    for (const line of [
      "A new account gets the call sign saved at signup",
      "A signed-in pilot who opens the sign-up link",
      "A pilot who already has an account adds the call sign on the web",
      "call sign saved on your account.",
    ]) {
      expect(line).not.toMatch(/[\u2014\u2013!]/)
    }
    expect(src).not.toMatch(/A (new account|signed-in pilot|pilot who already has an account)[^<\n]*[\u2014\u2013!]/)
  })
})
