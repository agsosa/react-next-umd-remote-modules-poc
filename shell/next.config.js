/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    MF1_BASE_URL: process.env.MF1_BASE_URL || 'http://localhost:3001',
  },

    // ignore eslint/typescript for now, this is just a PoC
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;