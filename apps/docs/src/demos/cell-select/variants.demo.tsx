// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Variants
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

function ThemeSelect({
  variant = "default",
}: {
  variant?: "default" | "secondary";
}) {
  const [value, setValue] = useState("default");
  return (
    <CellSelect
      aria-label="Theme"
      value={value}
      variant={variant}
      onChange={setValue}
    >
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
  );
}

export const DemoVariantsExample = () => (
  <div className="flex w-[252px] flex-col gap-3">
    {(["default", "secondary"] as const).map((variant) => (
      <div className="flex flex-col gap-1" key={variant}>
        <span className="text-muted text-xs">{variant}</span>
        <ThemeSelect variant={variant} />
      </div>
    ))}
  </div>
);
