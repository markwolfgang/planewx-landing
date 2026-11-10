import { buildLlmsFull } from "@/lib/markdown-pages"

export const dynamic = "force-static"
export const revalidate = 3600

export async function GET() {
  return new Response(buildLlmsFull(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
