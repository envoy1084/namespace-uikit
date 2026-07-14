import type { MetadataRoute } from "next";

import { absoluteSiteUrl } from "@/lib/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: absoluteSiteUrl("/"),
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.7,
      url: absoluteSiteUrl("/themes"),
    },
  ];
  const documentationRoutes: MetadataRoute.Sitemap = source
    .getPages()
    .filter((page) => page.slugs.length > 0)
    .map((page) => ({
      changeFrequency: "weekly" as const,
      lastModified: now,
      priority: page.slugs[0] === "components" ? 0.8 : 0.7,
      url: absoluteSiteUrl(page.url),
    }));

  return [...staticRoutes, ...documentationRoutes];
}
