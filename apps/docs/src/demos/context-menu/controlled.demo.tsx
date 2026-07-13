"use client";

// @demo-title Controlled
import { useState } from "react";

import { Kbd } from "@thenamespace/uikit";
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

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted text-sm">Menu is {open ? "open" : "closed"}</p>
      <ContextMenu open={open} onOpenChange={setOpen}>
        <Trigger children="Right-click here (controlled)" />
        <ContextMenu.Popover>
          <ContextMenu.Menu>
            {[1, 2, 3].map((x) => (
              <Item key={x} label={`Action ${x}`} />
            ))}
          </ContextMenu.Menu>
        </ContextMenu.Popover>
      </ContextMenu>
    </div>
  );
}

export const DemoControlledExample = () => <ControlledDemo />;
