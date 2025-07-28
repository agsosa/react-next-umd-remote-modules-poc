/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    MF1_BASE_URL: process.env.MF1_BASE_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;