"use client";

// @demo-title Placements
import type { Placement } from "react-aria-components";

import { useState } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

const placements: Placement[] = [
  "bottom",
  "bottom start",
  "bottom end",
  "top",
  "top start",
  "top end",
  "left",
  "left top",
  "left bottom",
  "right",
  "right top",
  "right bottom",
];

export const DemoPlacementsExample = function Demo() {
  const [value, setValue] = useState<Placement>("bottom end");
  return (
    <div className="flex items-center justify-center px-10">
      <InlineSelect
        aria-label="Placement"
        value={value}
        onChange={(next) => setValue(next as Placement)}
      >
        <InlineSelect.Trigger>
          <InlineSelect.Value />
          <InlineSelect.Indicator />
        </InlineSelect.Trigger>
        <InlineSelect.Popover placement={value}>
          <ListBox>
            {placements.map((placement) => (
              <ListBox.Item
                id={placement}
                key={placement}
                textValue={placement}
              >
                {placement === "bottom end"
                  ? "bottom end (default)"
                  : placement}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </InlineSelect.Popover>
      </InlineSelect>
    </div>
  );
};
