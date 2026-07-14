import type { Metadata } from "next";

import { ComponentGalleryCapture } from "@/components/component-gallery-capture";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "Component gallery capture",
};

export default async function ComponentGalleryCapturePage({
  searchParams,
}: {
  searchParams: Promise<{ component?: string; theme?: string }>;
}) {
  const params = await searchParams;
  const theme = params.theme === "light" ? "light" : "dark";

  return (
    <ComponentGalleryCapture
      component={params.component ?? "button"}
      theme={theme}
    />
  );
}
