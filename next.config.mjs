/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/favicon.ico', destination: '/icon.svg', permanent: true }]
  },
  async rewrites() {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, '').replace(/\/$/, '')
    if (!adminUrl) return []
    return { afterFiles: [
      { source: '/admin', destination: `${adminUrl}/admin` },
      { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
      { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
    ] }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'pub-c7a22068052144a5805830c30d280128.r2.dev' }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
