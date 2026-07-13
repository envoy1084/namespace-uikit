"use client";

// @demo-title Custom Triggers
import { DropZone, useDropZone } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Link } from "@thenamespace/uikit/link";

import { Icon } from "@/demos/icon";

function CustomButtons() {
  const { openFilePicker } = useDropZone();
  return (
    <>
      <Button className="mt-2" onPress={openFilePicker}>
        Upload Files
      </Button>
      <Link className="mt-1 cursor-pointer text-sm" onPress={openFilePicker}>
        Browse from your device
      </Link>
    </>
  );
}

export const DemoCustomTriggersExample = () => (
  <DropZone className="w-[480px]">
    <DropZone.Area>
      <DropZone.Icon />
      <DropZone.Label>Drag files here to get started</DropZone.Label>
      <DropZone.Description>
        PDF, DOCX, or TXT up to 25 MB.
      </DropZone.Description>
      <CustomButtons />
    </DropZone.Area>
    <DropZone.Input multiple />
  </DropZone>
);
