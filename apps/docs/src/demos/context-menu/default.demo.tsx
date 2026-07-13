"use client";

// @demo-title Default
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

function DefaultDemo() {
  return (
    <ContextMenu>
      <Trigger />
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <Item label="Back" shortcut="⌘ [" />
          <Item disabled label="Forward" shortcut="⌘ ]" />
          <Item label="Reload" shortcut="⌘ R" />
          <ContextMenu.Separator />
          <Item label="View Page Source" />
          <Item label="Inspect" />
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  );
}

export const DemoDefaultExample = () => <DefaultDemo />;
