/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "afocirmbqdxnkyescnev.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy AirVenture deck URL → archive under /talks
      { source: "/talk", destination: "/talks/osh", permanent: false },
      { source: "/talk/", destination: "/talks/osh/", permanent: false },
      { source: "/talk/remote.html", destination: "/talks/remote.html", permanent: false },
      // Exact-phrase slug for the loop's canonical definition page
      {
        source: "/learn/brief-assess-decide-debrief",
        destination: "/learn/risk-management-loop",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // public/ static HTML landings (Vercel serves them; local next start needs rewrites)
      { source: "/aopa", destination: "/aopa/index.html" },
      { source: "/aopa/ad-kit", destination: "/aopa/ad-kit/index.html" },
      { source: "/aopa/ad-kit/", destination: "/aopa/ad-kit/index.html" },
      // Markdown versions of key pages (same body for every visitor; no UA sniffing)
      { source: "/index.md", destination: "/md-content/index" },
      { source: "/about.md", destination: "/md-content/about" },
      { source: "/mcp.md", destination: "/md-content/mcp" },
      { source: "/learn.md", destination: "/md-content/learn" },
      { source: "/ga-customs.md", destination: "/md-content/ga-customs" },
      { source: "/ios.md", destination: "/md-content/ios" },
      { source: "/apps.md", destination: "/md-content/apps" },
      { source: "/learn/risk-management-loop.md", destination: "/md-content/learn/risk-management-loop" },
      { source: "/learn/hazardous-attitudes.md", destination: "/md-content/learn/hazardous-attitudes" },
      { source: "/learn/aviation-weather/airmet-sigmet.md", destination: "/md-content/learn/aviation-weather/airmet-sigmet" },
      { source: "/learn/swiss-cheese-model-three-strikes-rule.md", destination: "/md-content/learn/swiss-cheese-model-three-strikes-rule" },
    ]
  },
  async headers() {
    return [
      {
        source: "/aopa/ad-kit",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/aopa/ad-kit/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/aopa/ad/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ]
  },
}


export default nextConfig

