import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 170,
          height: 170,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          borderRadius: "50%",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            width: 160,
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
            padding: 3,
          }}
        >
          {/* Inner dark circle */}
          <div
            style={{
              width: 154,
              height: 154,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            {/* Cloud icon */}
            <svg
              width="70"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            
            {/* PlaneWX text */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "-0.5px",
                }}
              >
                Plane
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0ea5e9",
                  letterSpacing: "-0.5px",
                }}
              >
                WX
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 170,
      height: 170,
    }
  )
}
