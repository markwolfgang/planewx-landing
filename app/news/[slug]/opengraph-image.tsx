import { ImageResponse } from "next/og"
import { NEWS_ITEMS, getNewsItem } from "../news-data"

export const alt = "PlaneWX Newsroom"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export function generateStaticParams() {
  return NEWS_ITEMS.map((n) => ({ slug: n.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getNewsItem(slug)
  const title = item?.title ?? "News from PlaneWX"
  const category = item?.category ?? "Newsroom"
  const date = item?.date ?? ""
  const titleSize = title.length > 70 ? 42 : title.length > 48 ? 50 : 58

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #0a0f1e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle at center, rgba(14,165,233,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "-0.02em",
            }}
          >
            PlaneWX
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(125, 211, 252, 0.85)",
              }}
            >
              {category}
            </span>
            {date ? (
              <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)" }}>{date}</span>
            ) : null}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 1050,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            The confidence to go, or the courage to stay.™
          </span>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.4)" }}>planewx.ai/news</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
