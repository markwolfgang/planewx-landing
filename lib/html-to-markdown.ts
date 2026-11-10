/**
 * Small HTML-to-markdown converter for Learning Center and GA Customs
 * bodies. Same input the HTML pages already render (MAIN_HTML / body HTML).
 * Not a general-purpose browser.
 */
const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  mdash: " - ",
  ndash: "-",
  hellip: "...",
  times: "x",
  minus: "-",
}

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&([a-zA-Z][a-zA-Z0-9]+);/g, (match, name: string) => {
      const mapped = NAMED_ENTITIES[name.toLowerCase()]
      return mapped === undefined ? match : mapped
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      codePointToAscii(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      codePointToAscii(parseInt(dec, 10)),
    )
}

function codePointToAscii(code: number): string {
  if (code === 160) return " "
  if (code === 8211 || code === 0x2013) return "-"
  if (code === 8212 || code === 0x2014) return " - "
  if (code === 8216 || code === 8217) return "'"
  if (code === 8220 || code === 8221) return '"'
  if (code === 8230) return "..."
  return String.fromCodePoint(code)
}

/** Replace typographic punctuation that sometimes appears already-decoded. */
function foldTypography(input: string): string {
  return input
    .replace(/\u00a0/g, " ")
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, "...")
}

function stripComments(input: string): string {
  return input.replace(/<!--[\s\S]*?-->/g, "")
}

function textContent(html: string): string {
  return foldTypography(
    decodeHtmlEntities(
      html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    ),
  )
}

function attr(tag: string, name: string): string | undefined {
  const match = new RegExp(
    `\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  ).exec(tag)
  if (!match) return undefined
  return match[2] ?? match[3] ?? match[4]
}

function convertInline(html: string): string {
  let out = html
  // Linked citations like <a class="cite" href="#ref-1">[1]</a> already have
  // bracket text; keep the href.
  out = out.replace(
    /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
    (full, rawAttrs: string, inner: string) => {
      const href = attr(`<a ${rawAttrs}>`, "href") ?? ""
      const label = convertInline(inner).replace(/\s+/g, " ").trim()
      if (!label) return ""
      if (!href || href.startsWith("javascript:")) return label
      return `[${label}](${href})`
    },
  )
  out = out.replace(
    /<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi,
    (_, _tag: string, inner: string) => {
      const text = convertInline(inner).trim()
      return text ? `**${text}**` : ""
    },
  )
  out = out.replace(
    /<(em|i|dfn)\b[^>]*>([\s\S]*?)<\/\1>/gi,
    (_, _tag: string, inner: string) => {
      const text = convertInline(inner).trim()
      return text ? `*${text}*` : ""
    },
  )
  out = out.replace(
    /<code\b[^>]*>([\s\S]*?)<\/code>/gi,
    (_, inner: string) => `\`${textContent(inner)}\``,
  )
  out = out.replace(/<br\s*\/?>/gi, "\n")
  out = out.replace(/<\/?(span|abbr|time|cite|small)\b[^>]*>/gi, "")
  out = foldTypography(decodeHtmlEntities(out))
  out = out.replace(/<[^>]+>/g, "")
  return out
}

function convertList(html: string, ordered: boolean): string {
  const items = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
  return items
    .map((match, i) => {
      const inner = match[1]
        .replace(/<(ul|ol)\b[^>]*>[\s\S]*?<\/\1>/gi, (nested) => {
          const nestedMd = htmlToMarkdown(nested)
          return (
            "\n" +
            nestedMd
              .split("\n")
              .map((line) => (line ? `  ${line}` : line))
              .join("\n")
          )
        })
      const text = convertInline(inner).replace(/\s*\n\s*/g, "\n").trim()
      const bullet = ordered ? `${i + 1}.` : "-"
      return `${bullet} ${text}`
    })
    .join("\n")
}

function convertTable(html: string): string {
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
  if (rows.length === 0) return ""
  const parsed = rows.map((row) =>
    [...row[1].matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((cell) =>
      convertInline(cell[2]).replace(/\s+/g, " ").trim().replace(/\|/g, "\\|"),
    ),
  )
  const width = Math.max(...parsed.map((r) => r.length), 1)
  const padded = parsed.map((r) => {
    const copy = [...r]
    while (copy.length < width) copy.push("")
    return copy
  })
  const header = padded[0]
  const body = padded.slice(1)
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ]
  const captionMatch = /<caption\b[^>]*>([\s\S]*?)<\/caption>/i.exec(html)
  if (captionMatch) {
    const caption = convertInline(captionMatch[1]).trim()
    if (caption) lines.unshift(`*${caption}*`)
  }
  return lines.join("\n")
}

function convertDefinitionList(html: string): string {
  const parts: string[] = []
  const re = /<dt\b[^>]*>([\s\S]*?)<\/dt>|<dd\b[^>]*>([\s\S]*?)<\/dd>/gi
  let match: RegExpExecArray | null
  while ((match = re.exec(html))) {
    if (match[1] !== undefined) {
      parts.push(`**${convertInline(match[1]).trim()}**`)
    } else if (match[2] !== undefined) {
      parts.push(convertInline(match[2]).trim())
    }
  }
  return parts.filter(Boolean).join("\n\n")
}

/**
 * Convert a page-body HTML fragment to markdown. Block structure is preserved
 * so H1, sections, lists, tables, and FAQ-style copy survive.
 */
export function htmlToMarkdown(html: string): string {
  let remaining = stripComments(html)
  const blocks: string[] = []

  const blockRe =
    /<(h[1-6]|p|ul|ol|table|pre|blockquote|dl|details|hr)\b([^>]*)>([\s\S]*?)<\/\1>|<hr\s*\/?>/gi

  let last = 0
  let match: RegExpExecArray | null
  while ((match = blockRe.exec(remaining))) {
    const between = remaining.slice(last, match.index).trim()
    if (between) {
      const leftover = convertInline(between).replace(/\s+/g, " ").trim()
      if (leftover) blocks.push(leftover)
    }
    last = match.index + match[0].length
    const tag = (match[1] || "hr").toLowerCase()
    const inner = match[3] ?? ""
    if (tag === "hr") {
      blocks.push("---")
      continue
    }
    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag[1])
      blocks.push(`${"#".repeat(level)} ${convertInline(inner).replace(/\s+/g, " ").trim()}`)
      continue
    }
    if (tag === "p") {
      const text = convertInline(inner).replace(/[ \t]+\n/g, "\n").trim()
      if (text) blocks.push(text)
      continue
    }
    if (tag === "ul") {
      blocks.push(convertList(inner, false))
      continue
    }
    if (tag === "ol") {
      blocks.push(convertList(inner, true))
      continue
    }
    if (tag === "table") {
      blocks.push(convertTable(match[0]))
      continue
    }
    if (tag === "pre") {
      const code = textContent(inner.replace(/<\/?code\b[^>]*>/gi, ""))
      blocks.push("```\n" + code + "\n```")
      continue
    }
    if (tag === "blockquote") {
      const text = htmlToMarkdown(inner)
        .split("\n")
        .map((line) => (line ? `> ${line}` : ">"))
        .join("\n")
      blocks.push(text)
      continue
    }
    if (tag === "dl") {
      blocks.push(convertDefinitionList(inner))
      continue
    }
    if (tag === "details") {
      const summaryMatch = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i.exec(inner)
      const rest = inner.replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/i, "")
      const summary = summaryMatch
        ? convertInline(summaryMatch[1]).trim()
        : "Details"
      blocks.push(`**${summary}**\n\n${htmlToMarkdown(rest)}`.trim())
    }
  }
  const tail = remaining.slice(last).trim()
  if (tail) {
    const leftover = convertInline(tail).replace(/\s+/g, " ").trim()
    if (leftover) blocks.push(leftover)
  }

  return blocks
    .join("\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
