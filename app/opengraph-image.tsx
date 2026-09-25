import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = "PlaneWX | Fly like it's your job."
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const logoPath = path.join(process.cwd(), 'public', 'brand', 'planewx-og-wordmark.png')
  const logoSrc = fs.existsSync(logoPath)
    ? `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`
    : null

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle at center, rgba(14,165,233,0.12) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            width={320}
            height={64}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            alt="PlaneWX"
          />
        ) : (
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#38bdf8' }}>PlaneWX</span>
        )}

        {/* Headline: locked tagline as H1 voice */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#38bdf8',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Fly like it&apos;s your job.
          </span>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxWidth: '980px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.35,
              }}
            >
              The risk-management loop for pilots without a dispatcher.
            </span>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.35,
              }}
            >
              Beyond the weather briefing.
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            The Pilot&apos;s Decision Support System
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { label: 'WX Score briefing', color: '#38bdf8' },
              { label: 'FRAT', color: '#a78bfa' },
              { label: 'GO / NO‑GO', color: '#34d399' },
              { label: 'Self Debrief', color: '#fbbf24' },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: color,
                    display: 'flex',
                  }}
                />
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
