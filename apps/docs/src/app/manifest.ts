import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#050505",
    description: site.description,
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "any",
        src: "/namespace-mark.svg",
        type: "image/svg+xml",
      },
    ],
    name: site.name,
    short_name: "Namespace UI",
    start_url: "/",
    theme_color: "#050505",
  };
}
