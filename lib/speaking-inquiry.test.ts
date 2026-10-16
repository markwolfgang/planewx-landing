import { describe, expect, it } from "vitest"
import {
  buildSpeakingInquiryEmail,
  validateSpeakingInquiry,
  type SpeakingInquiry,
} from "./speaking-inquiry"

const VALID: SpeakingInquiry = {
  name: "Pat Pilot",
  email: "Pat@Example.com",
  org: "Example Pilots Association",
  eventName: "Example Safety Day",
  eventDates: "Mar 12-14, 2027",
  location: "Lakeland, FL",
  audienceSize: "",
  message: "We would like a 30 minute talk on go/no-go decisions.",
}

describe("validateSpeakingInquiry", () => {
  it("accepts a complete request and lowercases email", () => {
    const r = validateSpeakingInquiry({ ...VALID, name: "  Pat Pilot  " })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.data.email).toBe("pat@example.com")
      expect(r.data.name).toBe("Pat Pilot")
      expect(r.data.audienceSize).toBe("")
    }
  })

  it("treats audience size as optional", () => {
    const { audienceSize: _omit, ...rest } = VALID
    void _omit
    expect(validateSpeakingInquiry(rest).ok).toBe(true)
    expect(validateSpeakingInquiry({ ...VALID, audienceSize: "150" }).ok).toBe(true)
  })

  it.each(["name", "email", "org", "eventName", "eventDates", "location", "message"] as const)(
    "requires %s",
    (field) => {
      const r = validateSpeakingInquiry({ ...VALID, [field]: "   " })
      expect(r.ok).toBe(false)
      if (!r.ok) expect(r.errors[field]).toMatch(/is required$/)
    }
  )

  it("reports every missing required field for an empty form", () => {
    const r = validateSpeakingInquiry({})
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(
        ["email", "eventDates", "eventName", "location", "message", "name", "org"].sort()
      )
      expect(r.error).toBe("Name is required")
    }
  })

  it("rejects a bad email format", () => {
    const r = validateSpeakingInquiry({ ...VALID, email: "not-an-email" })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.email).toBe("Invalid email format")
  })

  it("enforces max lengths", () => {
    const r = validateSpeakingInquiry({ ...VALID, message: "x".repeat(4001), audienceSize: "9".repeat(51) })
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.errors.message).toBe("Message is too long")
      expect(r.errors.audienceSize).toBe("Audience size is too long")
    }
  })

  it("rejects non-string values and non-object bodies", () => {
    const r = validateSpeakingInquiry({ ...VALID, org: 42 })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.org).toBe("Organization is invalid")
    expect(validateSpeakingInquiry(null).ok).toBe(false)
    expect(validateSpeakingInquiry([VALID]).ok).toBe(false)
  })
})

describe("buildSpeakingInquiryEmail", () => {
  it("uses a speaking request subject and escapes HTML", () => {
    const r = validateSpeakingInquiry({ ...VALID, eventName: "Safety <Day>\r\nBcc: x@y.z" })
    expect(r.ok).toBe(true)
    if (!r.ok) return
    const { subject, html } = buildSpeakingInquiryEmail(r.data)
    expect(subject).toBe("Speaking request: Safety <Day> Bcc: x@y.z (Example Pilots Association)")
    expect(subject).not.toMatch(/[\r\n]/)
    expect(html).toContain("Safety &lt;Day&gt;")
    expect(html).not.toContain("<Day>")
    expect(html).toContain("Not provided")
  })
})

describe("speaking inquiry hardening", () => {
  it("strips every control character from the subject, not just CR/LF", () => {
    const nasty = "A\tB\u0000C\u000bD\u000cE\u007fF\u0085G\u2028H\u2029I\r\nJ"
    const { subject } = buildSpeakingInquiryEmail({ ...VALID, eventName: nasty, org: `Org${nasty}` })
    expect(subject).not.toMatch(/[\u0000-\u001f\u007f\u0085\u2028\u2029]/)
    expect(subject).toBe("Speaking request: A B C D E F G H I J (OrgA B C D E F G H I J)")
  })

  it("strips C1 controls from the subject", () => {
    const c1 = "A\u0080B\u008dC\u009bD\u009fE"
    const { subject } = buildSpeakingInquiryEmail({ ...VALID, eventName: c1, org: "Org" })
    expect(subject).not.toMatch(/[\u0080-\u009f]/)
    expect(subject).toBe("Speaking request: A B C D E (Org)")
  })

  it("removes bidi, zero-width and BOM characters from the subject", () => {
    const hidden =
      "Safe\u202eyaD\u202c \u200bSum\u200cm\u200dit\u200e\u200f \u2066x\u2067y\u2068z\u2069 \u202a\u202b\u202d\ufeff\u2060\u061c\u180e2027"
    const { subject } = buildSpeakingInquiryEmail({ ...VALID, eventName: hidden, org: "Org\u202e\ufeff" })
    expect(subject).not.toMatch(/[\u061c\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/)
    expect(subject).toBe("Speaking request: SafeyaD Summit xyz 2027 (Org)")
  })

  it("accepts plain email addresses", () => {
    for (const email of ["pat@example.com", "first.last+tag@sub.example.co.uk", "o'neil@example.org"]) {
      expect(validateSpeakingInquiry({ ...VALID, email }).ok).toBe(true)
    }
  })

  it("rejects reply-to values that are not one plain address", () => {
    for (const email of [
      "x<attacker@evil.test>",
      "pat@example.com>",
      "a,b@c.de",
      "a@b.de,c@d.de",
      "a;b@c.de",
      "a@b.de;c@d.de",
      "\"pat\"@example.com",
    ]) {
      const r = validateSpeakingInquiry({ ...VALID, email })
      expect(r.ok, email).toBe(false)
      if (!r.ok) expect(r.errors.email).toBe("Invalid email format")
    }
  })
})
