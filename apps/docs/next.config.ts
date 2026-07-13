import type { NextConfig } from "next";

import { createMDX } from "fumadocs-mdx/next";

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "/llms.mdx/:path*",
        source: "/docs/:path*.mdx",
      },
    ];
  },
  transpilePackages: ["@thenamespace/uikit"],
};

export default createMDX()(config);
