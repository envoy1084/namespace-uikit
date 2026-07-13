"use client";

// @demo-title Disabled
import { DropZone } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoDisabledExample = () => (
  <DropZone className="w-[420px]">
    <DropZone.Area isDisabled>
      <DropZone.Icon />
      <DropZone.Label>File upload unavailable</DropZone.Label>
      <DropZone.Description>
        Uploads are temporarily disabled.
      </DropZone.Description>
      <DropZone.Trigger isDisabled>Select File</DropZone.Trigger>
    </DropZone.Area>
    <DropZone.Input />
  </DropZone>
);
