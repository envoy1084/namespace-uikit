import type { Metadata } from "next";

import { site } from "@/lib/site";

const socialImage = {
  alt: `${site.name} — accessible React components`,
  height: 630,
  url: "/opengraph-image",
  width: 1200,
};

export function createPageMetadata({
  description,
  path,
  title,
  type = "website",
}: {
  description: string;
  path: string;
  title: string;
  type?: "article" | "website";
}): Metadata {
  return {
    alternates: { canonical: path },
    description,
    openGraph: {
      description,
      images: [socialImage],
      locale: "en_US",
      siteName: site.name,
      title,
      type,
      url: path,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: ["/twitter-image"],
      title,
    },
  };
}
