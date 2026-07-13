// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Font Family
import { useState } from "react";

import { CellSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

const fonts = [
  { id: "inter", name: "Inter" },
  { id: "roboto", name: "Roboto" },
  { id: "system", name: "System" },
  { id: "georgia", name: "Georgia" },
];

function FontSelect({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "secondary";
}) {
  const [value, setValue] = useState("inter");
  return (
    <CellSelect
      aria-label={`${label} font`}
      value={value}
      variant={variant}
      onChange={setValue}
    >
      <CellSelect.Trigger>
        <CellSelect.Label>{label}</CellSelect.Label>
        <CellSelect.Value>
          {({ defaultChildren, isPlaceholder, state }) => {
            if (isPlaceholder || state.selectedItems.length === 0)
              return defaultChildren;
            const item = fonts.find(
              (option) => option.id === state.selectedItems[0]?.key,
            );
            return item ? (
              <span className="flex items-center justify-end gap-1.5 text-end">
                {item.name}
                <span className="text-foreground text-sm font-medium">Ag</span>
              </span>
            ) : (
              defaultChildren
            );
          }}
        </CellSelect.Value>
      </CellSelect.Trigger>
      <CellSelect.Popover>
        <ListBox>
          {fonts.map((item) => (
            <ListBox.Item id={item.id} key={item.id} textValue={item.name}>
              {item.name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </CellSelect.Popover>
    </CellSelect>
  );
}

export const ProFontFamilyExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    <span className="text-muted text-sm">Font Family</span>
    <FontSelect label="Heading" />
    <FontSelect label="Body" variant="secondary" />
  </div>
);
