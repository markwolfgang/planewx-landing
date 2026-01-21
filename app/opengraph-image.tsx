import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'PlaneWX - AI-Powered Aviation Weather Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
        
        {/* Logo and brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#0ea5e9',
              letterSpacing: '-0.02em',
            }}
          >
            PlaneWX
          </span>
        </div>

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
            AI-POWERED AVIATION INTELLIGENCE
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
                  Personal GO Score
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
