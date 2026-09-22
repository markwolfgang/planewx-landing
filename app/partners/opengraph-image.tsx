import { ImageResponse } from "next/og"

export const alt = "Partners | PlaneWX"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)",
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
            background:
              "radial-gradient(circle at center, rgba(14,165,233,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        <span style={{ fontSize: "28px", fontWeight: 700, color: "#38bdf8" }}>
          PlaneWX
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Partners
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Partners who help pilots fly safer.
          </span>
        </div>
        <span
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          planewx.ai/partners
        </span>
      </div>
    ),
    { ...size }
  )
}
