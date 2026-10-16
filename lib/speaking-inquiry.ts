/**
 * Speaking request inquiry (/events "Interested in Mark coming to speak" form).
 * Shared by the client form and POST /api/events/speaking-inquiry so both use
 * the same rules. Same limits and escaping style as the partners and
 * ambassadors inquiry routes.
 */

export type SpeakingInquiryField =
  | "name"
  | "email"
  | "org"
  | "eventName"
  | "eventDates"
  | "location"
  | "audienceSize"
  | "message"

type FieldSpec = { label: string; max: number; required: boolean }

export const SPEAKING_INQUIRY_FIELDS: Record<SpeakingInquiryField, FieldSpec> = {
  name: { label: "Name", max: 120, required: true },
  email: { label: "Email", max: 254, required: true },
  org: { label: "Organization", max: 200, required: true },
  eventName: { label: "Event name", max: 200, required: true },
  eventDates: { label: "Event date(s)", max: 200, required: true },
  location: { label: "Location", max: 200, required: true },
  audienceSize: { label: "Audience size", max: 50, required: false },
  message: { label: "Message", max: 4000, required: true },
}

export const SPEAKING_INQUIRY_FIELD_ORDER: SpeakingInquiryField[] = [
  "name",
  "email",
  "org",
  "eventName",
  "eventDates",
  "location",
  "audienceSize",
  "message",
]

export type SpeakingInquiry = Record<SpeakingInquiryField, string>

export type SpeakingInquiryValidation =
  | { ok: true; data: SpeakingInquiry }
  | {
      ok: false
      /** First error, for the API response. */
      error: string
      errors: Partial<Record<SpeakingInquiryField, string>>
    }

/**
 * One plain addr-spec only (it becomes the Reply-To). No display names, no
 * lists: rejects < > , ; " ( ) : and whitespace.
 */
const EMAIL_REGEX = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/

/**
 * Honeypot field name. The form renders it hidden from people and assistive
 * tech; a filled value means a bot, and the route drops the request silently.
 */
export const SPEAKING_INQUIRY_HONEYPOT = "website"

export function validateSpeakingInquiry(input: unknown): SpeakingInquiryValidation {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Invalid request body", errors: {} }
  }
  const fields = input as Record<string, unknown>
  const data = {} as SpeakingInquiry
  const errors: Partial<Record<SpeakingInquiryField, string>> = {}

  for (const key of SPEAKING_INQUIRY_FIELD_ORDER) {
    const spec = SPEAKING_INQUIRY_FIELDS[key]
    const raw = fields[key]
    if (raw !== undefined && raw !== null && typeof raw !== "string") {
      errors[key] = `${spec.label} is invalid`
      continue
    }
    const value = typeof raw === "string" ? raw.trim() : ""
    if (!value) {
      if (spec.required) errors[key] = `${spec.label} is required`
      data[key] = ""
      continue
    }
    if (value.length > spec.max) {
      errors[key] = `${spec.label} is too long`
      continue
    }
    data[key] = value
  }

  if (!errors.email && data.email) {
    data.email = data.email.toLowerCase()
    if (!EMAIL_REGEX.test(data.email)) errors.email = "Invalid email format"
  }

  const first = SPEAKING_INQUIRY_FIELD_ORDER.find((key) => errors[key])
  if (first) return { ok: false, error: errors[first]!, errors }
  return { ok: true, data }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Keep user text on one clean header line:
 * - C0 controls, DEL, C1 controls (U+0080-U+009F, including NEL) and the
 *   Unicode line and paragraph separators become a space.
 * - Invisible format characters are removed: bidi marks, embeddings,
 *   overrides and isolates (U+061C, U+200E, U+200F, U+202A-U+202E,
 *   U+2066-U+2069), zero-width characters (U+180E, U+200B-U+200D,
 *   U+2060-U+2064) and the BOM (U+FEFF). This stops an RLO or similar from
 *   visually reordering the subject in an inbox.
 */
const SUBJECT_BREAK_CHARS = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g
const SUBJECT_INVISIBLE_CHARS = /[\u061c\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/g

function oneLine(value: string): string {
  return value
    .replace(SUBJECT_INVISIBLE_CHARS, "")
    .replace(SUBJECT_BREAK_CHARS, " ")
    .replace(/ {2,}/g, " ")
    .trim()
}

export function buildSpeakingInquiryEmail(data: SpeakingInquiry): {
  subject: string
  html: string
} {
  const subject = oneLine(`Speaking request: ${data.eventName} (${data.org})`)
  const rows = SPEAKING_INQUIRY_FIELD_ORDER.filter((key) => key !== "message")
    .map((key) => {
      const value = data[key] || "Not provided"
      return `
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">${SPEAKING_INQUIRY_FIELDS[key].label}</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(value)}</td>
            </tr>`
    })
    .join("")
  const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Speaking request</h2>
          <p>New speaking request for Mark from the PlaneWX Events page:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">${rows}
          </table>
          <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(data.message)}</p>
        </div>
      `
  return { subject, html }
}
