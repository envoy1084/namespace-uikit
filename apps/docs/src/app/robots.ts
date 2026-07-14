import type { MetadataRoute } from "next";

import { absoluteSiteUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    host: site.url,
    rules: {
      allow: "/",
      disallow: ["/api/", "/component-gallery-capture"],
      userAgent: "*",
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
