import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsProvider } from "@/components/docs-provider";
import { site } from "@/lib/site";

// oxlint-disable-next-line import/no-unassigned-import -- Next.js loads global CSS from the root layout.
import "./global.css";

export const metadata: Metadata = {
  description: site.description,
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <DocsProvider>{children}</DocsProvider>
      </body>
    </html>
  );
}
