import type { Metadata } from "next";

import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Build an accessible Namespace UIKit theme, customize every design token, preview components, and copy production-ready CSS.";

export const metadata: Metadata = createPageMetadata({
  description,
  path: "/themes",
  title: "Theme Builder",
});

export default function ThemeBuilderPage() {
  return <ThemeBuilder />;
}
