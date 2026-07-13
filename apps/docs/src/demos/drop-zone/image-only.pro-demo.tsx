"use client";

// @demo-title Image Only
import { DropZone } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

export const ProImageOnlyExample = () => (
  <DropZone className="w-[420px]">
    <DropZone.Area
      getDropOperation={(types) =>
        [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ].some((type) => types.has(type))
          ? "copy"
          : "cancel"
      }
    >
      <DropZone.Icon>
        <Icon icon="solar:gallery-outline" />
      </DropZone.Icon>
      <DropZone.Label>Drop your images here</DropZone.Label>
      <DropZone.Description>
        Accepts PNG, JPG, GIF, WebP, and SVG.
      </DropZone.Description>
      <DropZone.Trigger>Select Images</DropZone.Trigger>
    </DropZone.Area>
    <DropZone.Input accept="image/*" />
  </DropZone>
);
