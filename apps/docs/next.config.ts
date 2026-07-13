import type { NextConfig } from "next";

import { createMDX } from "fumadocs-mdx/next";

const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "");

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: "/docs/getting-started",
        permanent: false,
        source: "/docs",
      },
    ];
  },
  async rewrites() {
    const rewrites = [
      {
        destination: "/llms.mdx/:path*",
        source: "/docs/:path*.mdx",
      },
    ];

    if (cdnUrl) {
      rewrites.push({
        destination: `${cdnUrl}/assets/:path*`,
        source: "/assets/:path*",
      });
    }

    return rewrites;
  },
  transpilePackages: ["@thenamespace/uikit"],
};

export default createMDX()(config);
