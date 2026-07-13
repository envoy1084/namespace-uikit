import type { ReactNode } from "react";

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
        tabs: {
          transform: (tab) => ({
            ...tab,
            title: (
              <span className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.title}</span>
              </span>
            ),
          }),
        },
      }}
      tabMode="navbar"
      themeSwitch={{ mode: "light-dark-system" }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
