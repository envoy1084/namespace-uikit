"use client";

import type { Key } from "@thenamespace/uikit";

import { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Controlled() {
  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>(["bold"]));

  return (
    <div className="flex flex-col gap-4">
      <ToggleButtonGroup
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <ToggleButton isIconOnly aria-label="Bold" id="bold">
          <HugeiconsIcon icon={TextBoldIcon} />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Italic" id="italic">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextItalicIcon} />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Underline" id="underline">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextUnderlineIcon} />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextStrikethroughIcon} />
        </ToggleButton>
      </ToggleButtonGroup>
      <p className="text-muted text-sm">
        Selected:{" "}
        <span className="font-medium">
          {selectedKeys.size > 0 ? [...selectedKeys].join(", ") : "None"}
        </span>
      </p>
    </div>
  );
}
