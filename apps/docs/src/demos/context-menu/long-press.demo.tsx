"use client";

// @demo-title Long Press
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

export const DemoLongPressExample = () => (
  <ContextMenu>
    <Trigger children="Long-press here (touch devices)" />
    <ContextMenu.Popover>
      <ContextMenu.Menu>
        <Item label="Select" />
        <Item label="Select All" />
        <ContextMenu.Separator />
        <Item label="Cut" />
        <Item label="Copy" />
        <Item label="Paste" />
      </ContextMenu.Menu>
    </ContextMenu.Popover>
  </ContextMenu>
);
