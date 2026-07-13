// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Settings Group
import { useState } from "react";

import { CellSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

const themes = [
  { id: "default", name: "Default" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

const settings = [
  { label: "Theme", options: themes, value: "default" },
  {
    label: "Language",
    options: [
      { id: "en", name: "English" },
      { id: "es", name: "Spanish" },
      { id: "fr", name: "French" },
    ],
    value: "en",
  },
  {
    label: "Font size",
    options: [
      { id: "sm", name: "Small" },
      { id: "md", name: "Medium" },
      { id: "lg", name: "Large" },
    ],
    value: "md",
  },
];

function SettingSelect({ setting }: { setting: (typeof settings)[number] }) {
  const [value, setValue] = useState(setting.value);
  return (
    <CellSelect aria-label={setting.label} value={value} onChange={setValue}>
      <CellSelect.Trigger>
        <CellSelect.Label>{setting.label}</CellSelect.Label>
        <CellSelect.Value />
        <CellSelect.Indicator />
      </CellSelect.Trigger>
      <CellSelect.Popover>
        <ListBox>
          {setting.options.map((item) => (
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

export const ProSettingsGroupExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    {settings.map((setting) => (
      <SettingSelect key={setting.label} setting={setting} />
    ))}
  </div>
);
