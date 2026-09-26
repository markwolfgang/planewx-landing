/**
 * Resolve To recipients for /partners and /ambassadors inquiry emails.
 *
 * Default: hello@planewx.ai and sara@planewx.ai.
 * If PARTNERSHIP_INQUIRY_EMAIL or ADMIN_NOTIFICATION_EMAIL is set, use that
 * as the base (comma/semicolon separated allowed) and always add
 * sara@planewx.ai unless she is already listed.
 *
 * Advisors use resolveAdvisorInquiryRecipients (mark@ + sara@).
 */
export const INQUIRY_HELLO_EMAIL = "hello@planewx.ai"
export const INQUIRY_SARA_EMAIL = "sara@planewx.ai"
export const INQUIRY_MARK_EMAIL = "mark@planewx.ai"

function parseAddressList(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
}

export function resolveInquiryRecipients(
  env: Partial<NodeJS.ProcessEnv> = process.env,
): string[] {
  const override =
    env.PARTNERSHIP_INQUIRY_EMAIL?.trim() ||
    env.ADMIN_NOTIFICATION_EMAIL?.trim() ||
    ""
  const base = override
    ? parseAddressList(override)
    : [INQUIRY_HELLO_EMAIL]

  const recipients = new Set(base)
  recipients.add(INQUIRY_SARA_EMAIL)
  return Array.from(recipients)
}

/**
 * Advisor inquiries: mark@planewx.ai and sara@planewx.ai.
 * Optional ADVISOR_INQUIRY_EMAIL override becomes the base; mark@ and sara@
 * are always included unless already listed.
 */
export function resolveAdvisorInquiryRecipients(
  env: Partial<NodeJS.ProcessEnv> = process.env,
): string[] {
  const override = env.ADVISOR_INQUIRY_EMAIL?.trim() || ""
  const base = override
    ? parseAddressList(override)
    : [INQUIRY_MARK_EMAIL, INQUIRY_SARA_EMAIL]

  const recipients = new Set(base)
  recipients.add(INQUIRY_MARK_EMAIL)
  recipients.add(INQUIRY_SARA_EMAIL)
  return Array.from(recipients)
}
