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
    ]
  },
}

export default nextConfig

