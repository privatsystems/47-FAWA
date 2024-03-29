/** @type {import('next').NextConfig} */
// const withExportImages = require('next-export-optimize-images')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'fawa-wafa.org', 'back.fawa-wafa.org', 'localhost'
    ],
    deviceSizes: [640, 750, 1080, 1200, 1920, 2048],
  },
}

module.exports = nextConfig
