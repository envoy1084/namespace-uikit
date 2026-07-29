"use client";

import type { ReactNode } from "react";

import dynamic from "next/dynamic";

import { RootProvider } from "fumadocs-ui/provider/next";

const SearchDialog = dynamic(() => import("@/components/search-dialog"), {
  ssr: false,
});

export function DocsProvider({ children }: { children: ReactNode }) {
  return <RootProvider search={{ SearchDialog }}>{children}</RootProvider>;
}
