import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  ...(isProd && {
    async headers() {
      return [
        {
          source: "/remote-modules/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=300, stale-while-revalidate=86400",
            },
          ],
        },
      ];
    },
  }),

  // ignore eslint/typescript for now, this is just a PoC
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
