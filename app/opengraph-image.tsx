import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'PlaneWX — Weather Intelligence for Confident Decisions'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await fetch('https://www.planewx.ai/brand/planewx-og-wordmark.png')
    .then(r => r.arrayBuffer())
    .catch(() => null)
  const logoSrc = logoData
    ? `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`
    : null

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #0a0f1e 100%)',
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

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Weather Intelligence for
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#38bdf8',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Confident Decisions
          </span>
          <span
            style={{
              marginTop: '20px',
              fontSize: '26px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Know your WX Score 14 days out.
          </span>
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
              fontSize: '20px',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            The confidence to go, or the courage to stay.™
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { label: 'WX Score', color: '#38bdf8' },
              { label: '14-Day Outlook', color: '#10b981' },
              { label: 'Personal Minimums', color: '#f59e0b' },
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
