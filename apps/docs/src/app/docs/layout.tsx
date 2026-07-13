import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { site } from "@/lib/site";
import { source } from "@/lib/source";

export default function DocumentationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsLayout
      nav={{
        title: site.name,
        url: "/docs",
      }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
