// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Custom Indicator
import { useState } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { ArrowRight01Icon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { ListBox } from "@thenamespace/uikit/list-box";

export const DemoCustomIndicatorExample = function Demo() {
  const [value, setValue] = useState("editor");
  return (
    <InlineSelect aria-label="Role" value={value} onChange={setValue}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator>
          <HugeiconsIcon
            aria-hidden
            icon={ArrowRight01Icon}
            size={12}
            strokeWidth={2}
          />
        </InlineSelect.Indicator>
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-[124px]">
        <ListBox>
          {["Viewer", "Editor", "Admin"].map((name) => (
            <ListBox.Item id={name.toLowerCase()} key={name} textValue={name}>
              {name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  );
};
