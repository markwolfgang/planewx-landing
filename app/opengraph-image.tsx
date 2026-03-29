import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'PlaneWX — Weather Intelligence for Pilots'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  const logoData = await fetch(`${baseUrl}/brand/planewx-og-wordmark.png`).then(r => r.arrayBuffer())
  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={350} height={70} style={{ objectFit: 'contain', objectPosition: 'left' }} alt="PlaneWX" />

        {/* Badge */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
          }}
        >
          <div
            style={{
              background: 'rgba(14, 165, 233, 0.15)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '9999px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0ea5e9',
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            WEATHER INTELLIGENCE FOR PILOTS
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Weather Intelligence for
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#0ea5e9',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Confident Decisions
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '80px',
              background: '#0ea5e9',
              borderRadius: '4px',
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
              }}
            >
              "The confidence to GO,
            </span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
              }}
            >
              or the courage to stay"
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'white',
              }}
            >
              Know if your flight will happen — days in advance
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#0ea5e9',
                    display: 'flex',
                  }}
                />
                <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  AI-Powered Predictions
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'flex',
                  }}
                />
                <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Personal WX Score
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    display: 'flex',
                  }}
                />
                <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  14-Day Outlook
                </span>
              </div>
            </div>
          </div>

          {/* Weather icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v6M8 14v6M12 16v6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
