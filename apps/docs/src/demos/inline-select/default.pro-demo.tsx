// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Default
import { useState } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

export const ProDefaultExample = function Demo() {
  const [value, setValue] = useState("en");
  return (
    <InlineSelect aria-label="Language" value={value} onChange={setValue}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-[140px]">
        <ListBox>
          {[
            ["en", "English"],
            ["es", "Spanish"],
            ["fr", "French"],
            ["ja", "Japanese"],
          ].map(([id, name]) => (
            <ListBox.Item id={id} key={id} textValue={name}>
              {name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  );
};
