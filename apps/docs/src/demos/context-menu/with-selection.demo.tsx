// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Selection
import { useState } from "react";

import { Header, Kbd } from "@thenamespace/uikit";
import { ContextMenu } from "@thenamespace/uikit";

const Trigger = ({ children = "Right-click here" }: { children?: string }) => (
  <ContextMenu.Trigger>
    <div className="border-border text-muted flex h-48 w-80 items-center justify-center rounded-xl border border-dashed text-sm select-none">
      {children}
    </div>
  </ContextMenu.Trigger>
);

const Item = ({
  disabled = false,
  label,
  shortcut,
}: {
  disabled?: boolean;
  label: string;
  shortcut?: string;
}) => (
  <ContextMenu.Item
    isDisabled={disabled}
    id={label.toLowerCase().replaceAll(" ", "-")}
    textValue={label}
  >
    <span>{label}</span>
    {shortcut ? (
      <Kbd className="ms-auto" variant="light">
        {shortcut}
      </Kbd>
    ) : null}
  </ContextMenu.Item>
);

function Selection() {
  const [selected, setSelected] = useState(new Set(["grid"]));
  return (
    <ContextMenu>
      <Trigger children="Right-click to change view" />
      <ContextMenu.Popover>
        <ContextMenu.Menu
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={setSelected}
        >
          <ContextMenu.Section>
            <Header>View</Header>
            {["grid", "list", "columns"].map((view) => (
              <ContextMenu.Item id={view} key={view} textValue={view}>
                <ContextMenu.ItemIndicator />
                <span className="capitalize">{view}</span>
              </ContextMenu.Item>
            ))}
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  );
}

export const DemoWithSelectionExample = () => <Selection />;
