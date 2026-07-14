const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteSiteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export const site = {
  description:
    "Accessible React components for building Namespace products and modern web applications.",
  name: "Namespace UIKit",
  repository: "https://github.com/thenamespace/uikit",
  url: siteUrl,
} as const;
