// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Controlled
import { useState } from "react";

import { CellSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

const themes = [
  { id: "default", name: "Default" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

function ThemeItems() {
  return themes.map((item) => (
    <ListBox.Item id={item.id} key={item.id} textValue={item.name}>
      {item.name}
      <ListBox.ItemIndicator />
    </ListBox.Item>
  ));
}

export const DemoControlledExample = function Demo() {
  const [value, setValue] = useState("default");
  const selected = themes.find((item) => item.id === value);
  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSelect aria-label="Theme" value={value} onChange={setValue}>
        <CellSelect.Trigger>
          <CellSelect.Label>Theme</CellSelect.Label>
          <CellSelect.Value />
          <CellSelect.Indicator />
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            <ThemeItems />
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
      <p className="text-muted px-1 text-sm">
        Selected: {selected?.name ?? "None"}
      </p>
    </div>
  );
};
