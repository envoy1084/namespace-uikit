import type { ReactNode } from "react";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { SiteNavbar } from "@/components/site-navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout nav={{ enabled: false }} searchToggle={{ enabled: false }}>
      <SiteNavbar />
      {children}
    </HomeLayout>
  );
}
