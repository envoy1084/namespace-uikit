"use client";

// @demo-title Custom Icon
import { DropZone } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

export const ProCustomIconExample = () => (
  <DropZone className="w-[420px]">
    <DropZone.Area>
      <DropZone.Icon>
        <Icon icon="solar:gallery-outline" />
      </DropZone.Icon>
      <DropZone.Label>Set your profile photo</DropZone.Label>
      <DropZone.Description>
        PNG or JPG under 2 MB. Best at 400 x 400 px.
      </DropZone.Description>
      <DropZone.Trigger>Pick Image</DropZone.Trigger>
    </DropZone.Area>
    <DropZone.Input accept="image/png,image/jpeg" />
  </DropZone>
);
