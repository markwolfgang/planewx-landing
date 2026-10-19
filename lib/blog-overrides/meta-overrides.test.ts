import { describe, expect, it } from "vitest"
import { BLOG_META_OVERRIDES } from "./index"

describe("BLOG_META_OVERRIDES", () => {
  for (const [slug, meta] of Object.entries(BLOG_META_OVERRIDES)) {
    describe(slug, () => {
      it("keeps the title within 60 characters", () => {
        expect(meta.title.length).toBeLessThanOrEqual(60)
      })
      it("keeps the description within 155 characters", () => {
        expect(meta.description.length).toBeLessThanOrEqual(155)
      })
      it("uses no em dashes, en dashes, or arrows", () => {
        const text = `${meta.title} ${meta.description}`
        expect(text).not.toMatch(/[\u2013\u2014\u2190-\u21FF]|->|=>/)
      })
      it("never frames the free plan as a trial", () => {
        const text = `${meta.title} ${meta.description}`.toLowerCase()
        expect(text).not.toMatch(/free trial|free to start|no credit card/)
      })
    })
  }
})
