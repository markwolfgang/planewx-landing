import { createHash } from "node:crypto"
import { describe, expect, it } from "vitest"
import { GA_CUSTOMS_BODY_HTML } from "./ga-customs-body"

describe("GA_CUSTOMS_BODY_HTML", () => {
  it("matches the handoff ga-customs.html md5 including trailing newline", () => {
    const digest = createHash("md5")
      .update(GA_CUSTOMS_BODY_HTML + "\n", "utf8")
      .digest("hex")
    expect(digest).toBe("a1ff4e1bd02131469c163f004319c697")
  })
})
