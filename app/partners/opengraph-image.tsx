import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"

export const alt = "Partners | PlaneWX"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "brand", "planewx-og-wordmark.png")
  const logoSrc = fs.existsSync(logoPath)
    ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`
    : null

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
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            width={320}
            height={64}
            style={{ objectFit: "contain", objectPosition: "left" }}
            alt="PlaneWX"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.planewx.ai"}/logos/planewx-wordmark-transparent.svg`}
            width={280}
            height={56}
            alt="PlaneWX"
          />
        )}
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
            Work with the pilots who still own the call.
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
