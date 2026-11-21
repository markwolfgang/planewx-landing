type JsonLdGraph = {
  "@context"?: string
  "@graph"?: Array<Record<string, unknown>>
  [key: string]: unknown
}

/** Server-rendered site-wide JSON-LD. Page-level FAQPage stays on matching pages. */
export function SiteJsonLd({ graph }: { graph: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
