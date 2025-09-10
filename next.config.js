/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',

  // Build cache configuration
  generateBuildId: async () => {
    return 'build-cache-' + Date.now()
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Configuración experimental para mejor rendimiento
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
