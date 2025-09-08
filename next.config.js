/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    // En producción, añadir el dominio real
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Configuración específica para Cloudflare Pages
  ...(process.env.CF_PAGES && {
    // Deshabilitar la optimización de imágenes en Pages para evitar problemas
    images: {
      unoptimized: true,
    },
    // Configuración de output para Pages
    output: 'export',
    trailingSlash: true,
  }),

  // Forzar HTTPS en producción
  ...(process.env.NODE_ENV === 'production' && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ];
    },
  }),

  // Configuración experimental para mejor rendimiento
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
