import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 820,
          height: 312,
          display: "flex",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern - subtle grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient overlay - left to right fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(90deg, rgba(14,165,233,0.15) 0%, transparent 30%, transparent 70%, rgba(99,102,241,0.15) 100%)",
          }}
        />

        {/* Weather icons on the right side */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: 0.6,
          }}
        >
          {/* Sun icon */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          
          {/* Cloud icon */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          
          {/* Wind icon */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" />
          </svg>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 60px",
            height: "100%",
            maxWidth: 600,
          }}
        >
          {/* Logo and badge row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <span style={{ fontSize: 28, fontWeight: 700, color: "white" }}>Plane</span>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#0ea5e9" }}>WX</span>
            </div>

            {/* Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                background: "rgba(14, 165, 233, 0.2)",
                border: "1px solid rgba(14, 165, 233, 0.4)",
                borderRadius: 20,
              }}
            >
              <span style={{ fontSize: 11, color: "#0ea5e9", fontWeight: 600, letterSpacing: 0.5 }}>
                AI-POWERED AVIATION INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
              Weather Intelligence for
            </span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#0ea5e9", lineHeight: 1.1 }}>
              Confident Decisions
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 3,
                height: 40,
                background: "linear-gradient(180deg, #0ea5e9 0%, #6366f1 100%)",
                borderRadius: 2,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", fontStyle: "italic" }}>
                "The confidence to GO,
              </span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", fontStyle: "italic" }}>
                or the courage to stay"
              </span>
            </div>
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Personal GO Score</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>14-Day Outlook</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Auto-Refresh</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 820,
      height: 312,
    }
  )
}
