import { ImageResponse } from "next/og";

import { SocialCard } from "@/components/social-card";

export const alt = "Namespace UIKit — accessible React components";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default function TwitterImage() {
  return new ImageResponse(<SocialCard eyebrow="Namespace UIKit docs" />, {
    ...size,
  });
}
