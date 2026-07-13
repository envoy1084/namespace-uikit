import type { Metadata } from "next";

import { ThemeBuilder } from "@/components/theme-builder/theme-builder";

export const metadata: Metadata = {
  description:
    "Build a custom Namespace UIKit theme and copy its CSS variables.",
  title: "Theme Builder",
};

export default function ThemeBuilderPage() {
  return <ThemeBuilder />;
}
