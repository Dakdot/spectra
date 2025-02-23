/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' as it's not needed for development
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;