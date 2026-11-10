import { getMarkdownForSlug, MARKDOWN_PAGES } from "@/lib/markdown-pages"

export const dynamic = "force-static"
export const revalidate = 3600

const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
} as const

export function generateStaticParams() {
  return MARKDOWN_PAGES.map((page) => ({
    slug: page.mdPath.replace(/^\//, "").replace(/\.md$/, "").split("/"),
  }))
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params
  const slugPath = slug.join("/")
  const body = getMarkdownForSlug(slugPath)
  if (!body) {
    return new Response("Not found", { status: 404 })
  }
  return new Response(body, { status: 200, headers: MARKDOWN_HEADERS })
}
