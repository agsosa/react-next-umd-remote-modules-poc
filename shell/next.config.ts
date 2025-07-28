import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    urlImports: ['http://localhost:3001/remote-components/'],
  }
};

export default nextConfig;
