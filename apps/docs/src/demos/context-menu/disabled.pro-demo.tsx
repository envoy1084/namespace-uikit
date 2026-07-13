"use client";

// @demo-title Disabled
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

export const ProDisabledExample = () => (
  <ContextMenu isDisabled>
    <Trigger children="Right-click here (disabled)" />
    <ContextMenu.Popover>
      <ContextMenu.Menu>
        <Item label="Action 1" />
      </ContextMenu.Menu>
    </ContextMenu.Popover>
  </ContextMenu>
);
