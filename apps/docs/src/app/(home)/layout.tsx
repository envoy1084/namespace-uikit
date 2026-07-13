import type { ReactNode } from "react";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { GitHubLink } from "@/components/github-link";
import { NamespaceLogo } from "@/components/namespace-logo";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      links={[
        {
          active: "nested-url",
          on: "nav",
          text: "Docs",
          url: "/docs/getting-started",
        },
        {
          active: "nested-url",
          on: "nav",
          text: "Components",
          url: "/docs/components",
        },
        {
          active: "nested-url",
          on: "nav",
          text: "Themes",
          url: "/themes",
        },
        {
          children: <GitHubLink />,
          on: "nav",
          secondary: true,
          type: "custom",
        },
        {
          children: <GitHubLink />,
          on: "menu",
          secondary: true,
          type: "custom",
        },
      ]}
      nav={{ title: <NamespaceLogo />, url: "/" }}
      searchToggle={{ enabled: false }}
      themeSwitch={{ mode: "light-dark-system" }}
    >
      {children}
    </HomeLayout>
  );
}
