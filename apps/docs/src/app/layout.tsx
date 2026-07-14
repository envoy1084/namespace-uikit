import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsProvider } from "@/components/docs-provider";
import { site } from "@/lib/site";
import { absoluteSiteUrl, siteKeywords } from "@/lib/site";

// oxlint-disable-next-line import/no-unassigned-import -- Next.js loads global CSS from the root layout.
import "./global.css";

export const metadata: Metadata = {
  applicationName: site.name,
  authors: [{ name: "Namespace", url: site.url }],
  category: "technology",
  classification: "Developer documentation",
  creator: "Namespace",
  description: site.description,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    apple: "/namespace-mark.svg",
    icon: "/namespace-mark.svg",
    shortcut: "/namespace-mark.svg",
  },
  keywords: [...siteKeywords],
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(site.url),
  openGraph: {
    description: site.description,
    images: [
      {
        alt: `${site.name} — accessible React components`,
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    type: "website",
    url: site.url,
  },
  publisher: "Namespace",
  referrer: "origin-when-cross-origin",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: site.description,
    images: ["/twitter-image"],
    title: site.name,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@id": absoluteSiteUrl("/#website"),
      "@type": "WebSite",
      description: site.description,
      name: site.name,
      publisher: {
        "@type": "Organization",
        name: "Namespace",
        url: site.url,
      },
      url: site.url,
    },
    {
      "@context": "https://schema.org",
      "@id": absoluteSiteUrl("/#software"),
      "@type": "SoftwareSourceCode",
      codeRepository: site.repository,
      description: site.description,
      name: site.name,
      programmingLanguage: ["TypeScript", "CSS"],
      runtimePlatform: "React",
      url: site.url,
    },
  ];

  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
          }}
          type="application/ld+json"
        />
        <DocsProvider>{children}</DocsProvider>
      </body>
    </html>
  );
}
