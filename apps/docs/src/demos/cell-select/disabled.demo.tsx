"use client";

// @demo-title Disabled
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

export const DemoDisabledExample = () => (
  <div className="w-[252px]">
    <CellSelect isDisabled aria-label="Theme" value="default">
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
  </div>
);
