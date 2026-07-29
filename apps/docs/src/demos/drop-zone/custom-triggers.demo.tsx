"use client";

// @demo-title Custom Triggers
import { DropZone, useDropZone } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Link } from "@thenamespace/uikit/link";

import { Icon } from "@/demos/icon";

function CustomButtons({ kind }: { kind: "browse" | "spreadsheet" | "upload" }) {
  const { openFilePicker } = useDropZone();
  if (kind === "browse") {
    return (
      <Link className="mt-1 cursor-pointer text-sm" onPress={openFilePicker}>
        Browse from your device
      </Link>
    );
  }
  return (
    <Button
      className="mt-2"
      size={kind === "spreadsheet" ? "sm" : "md"}
      variant={kind === "spreadsheet" ? "secondary" : "primary"}
      onPress={openFilePicker}
    >
      {kind === "spreadsheet" ? "Choose Spreadsheet" : "Upload Files"}
    </Button>
  );
}

export const DemoCustomTriggersExample = () => (
  <div className="flex w-[480px] flex-col gap-8">
    <DropZone>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Drag files here to get started</DropZone.Label>
        <DropZone.Description>PDF, DOCX, or TXT up to 25 MB.</DropZone.Description>
        <CustomButtons kind="upload" />
      </DropZone.Area>
      <DropZone.Input multiple />
    </DropZone>
    <DropZone>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Attach supporting documents</DropZone.Label>
        <DropZone.Description>Any format, 10 MB limit.</DropZone.Description>
        <CustomButtons kind="browse" />
      </DropZone.Area>
      <DropZone.Input multiple />
    </DropZone>
    <DropZone>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Import spreadsheet data</DropZone.Label>
        <DropZone.Description>CSV or XLSX files only.</DropZone.Description>
        <CustomButtons kind="spreadsheet" />
      </DropZone.Area>
      <DropZone.Input accept=".csv,.xls,.xlsx" />
    </DropZone>
  </div>
);
