/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  outputFileTracingRoot: __dirname,

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
