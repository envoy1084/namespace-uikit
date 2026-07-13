import type { ReactNode } from "react";

import { Blocks, BookOpen } from "lucide-react";

import { DocsLayout } from "@/components/fumadocs/layouts/notebook";
import { NamespaceLogo } from "@/components/namespace-logo";
import { source } from "@/lib/source";

export default function DocumentationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsLayout
      nav={{
        mode: "top",
        title: <NamespaceLogo />,
        url: "/docs",
      }}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 0,
        headerTabsProps: {
          filterByPathname: false,
        },
        tabs: [
          {
            icon: <BookOpen />,
            title: "Getting Started",
            url: "/docs/getting-started",
          },
          {
            icon: <Blocks />,
            title: "Components",
            url: "/docs/components",
          },
        ],
      }}
      tabMode="navbar"
      themeSwitch={{ mode: "light-dark-system" }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
