/** @type {import('next').NextConfig} */
const nextConfig = {

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "planewx.ai" }],
        destination: "https://www.planewx.ai/:path*",
        permanent: true,
      },
    ]
  },

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
    ]
  },
  async rewrites() {
    return [
      // public/ static HTML landings (Vercel serves them; local next start needs rewrites)
      { source: "/aopa", destination: "/aopa/index.html" },
      { source: "/aopa/ad-kit", destination: "/aopa/ad-kit/index.html" },
      { source: "/aopa/ad-kit/", destination: "/aopa/ad-kit/index.html" },
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
    ]
  },
}


export default nextConfig

