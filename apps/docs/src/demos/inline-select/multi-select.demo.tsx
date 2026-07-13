// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Multi Select
import { useState } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

export const DemoMultiSelectExample = function Demo() {
  const [value, setValue] = useState(["email", "push"]);
  return (
    <InlineSelect
      aria-label="Notification channels"
      selectionMode="multiple"
      value={value}
      onChange={setValue}
    >
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-48 max-w-48 min-w-48">
        <ListBox selectionMode="multiple">
          {[
            ["email", "Email"],
            ["whatsapp", "WhatsApp"],
            ["push", "Push Notification"],
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
