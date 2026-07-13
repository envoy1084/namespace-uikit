// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Custom Value
import { useState } from "react";

import { CellSelect } from "@thenamespace/uikit";
import {
  Globe02Icon,
  PaintBoardIcon,
  SmileIcon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon, type IconSvgElement } from "@thenamespace/uikit/icons";
import { ListBox } from "@thenamespace/uikit/list-box";

const iconSets = [
  { icon: SmileIcon, id: "gravity", name: "Gravity" },
  { icon: PaintBoardIcon, id: "heroicons", name: "Heroicons" },
  { icon: Globe02Icon, id: "lucide", name: "Lucide" },
];

function IconSetGlyph({ icon }: { icon: IconSvgElement }) {
  return <HugeiconsIcon aria-hidden icon={icon} size={16} strokeWidth={2} />;
}

export const DemoCustomValueExample = function Demo() {
  const [value, setValue] = useState("gravity");
  return (
    <div className="w-[252px]">
      <CellSelect aria-label="Icon set" value={value} onChange={setValue}>
        <CellSelect.Trigger>
          <CellSelect.Label>Icons</CellSelect.Label>
          <CellSelect.Value>
            {({ defaultChildren, isPlaceholder, state }) => {
              if (isPlaceholder || state.selectedItems.length === 0)
                return defaultChildren;
              const item = iconSets.find(
                (option) => option.id === state.selectedItems[0]?.key,
              );
              return item ? (
                <span className="flex items-center justify-end gap-1.5 text-end">
                  {item.name}
                  <span className="text-muted">
                    <IconSetGlyph icon={item.icon} />
                  </span>
                </span>
              ) : (
                defaultChildren
              );
            }}
          </CellSelect.Value>
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            {iconSets.map((item) => (
              <ListBox.Item id={item.id} key={item.id} textValue={item.name}>
                <IconSetGlyph icon={item.icon} />
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
    </div>
  );
};
