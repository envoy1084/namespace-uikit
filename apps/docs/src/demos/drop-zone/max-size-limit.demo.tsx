"use client";

// @demo-title Max Size Limit
import { useState } from "react";

import { DropZone } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoMaxSizeLimitExample = function Demo() {
  const [error, setError] = useState<string | null>(null);
  return (
    <DropZone className="w-[420px]">
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Attach files (5 MB limit per file)</DropZone.Label>
        <DropZone.Description>
          Any file type accepted. Files over 5 MB will be rejected.
        </DropZone.Description>
        <DropZone.Trigger>Select Files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input
        multiple
        onSelect={(files) => {
          const rejected = Array.from(files).filter(
            (file) => file.size > 5 * 1024 * 1024,
          );
          setError(
            rejected.length
              ? `Rejected (over 5 MB): ${rejected.map((file) => file.name).join(", ")}`
              : null,
          );
        }}
      />
      {error ? <p className="text-danger m-0 text-[13px]">{error}</p> : null}
    </DropZone>
  );
};
