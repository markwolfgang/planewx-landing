import type { ReactNode } from "react"

/** Minimal inline markup for brand content strings: **bold** and *italic*. */
export function BrandText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const nodes: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    const token = match[0]
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="text-white">
          {token.slice(2, -2)}
        </strong>
      )
    } else {
      nodes.push(
        <em key={key++} className="text-white/90">
          {token.slice(1, -1)}
        </em>
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return <span className={className}>{nodes}</span>
}
