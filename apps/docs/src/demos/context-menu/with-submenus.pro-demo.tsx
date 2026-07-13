// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Submenus
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

function Submenus() {
  const [bookmarks, setBookmarks] = useState(new Set(["bookmarks"]));
  const [person, setPerson] = useState(new Set(["junior"]));
  return (
    <ContextMenu>
      <Trigger />
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <Item label="Back" shortcut="⌘ [" />
          <Item disabled label="Forward" shortcut="⌘ ]" />
          <Item label="Reload" shortcut="⌘ R" />
          <ContextMenu.SubmenuTrigger>
            <ContextMenu.Item id="more-tools" textValue="More Tools">
              <span>More Tools</span>
              <ContextMenu.SubmenuIndicator />
            </ContextMenu.Item>
            <ContextMenu.Popover>
              <ContextMenu.Menu>
                <Item label="Save Page As…" shortcut="⌘ S" />
                <Item label="Create Shortcut…" />
                <Item label="Name Window…" />
                <ContextMenu.Separator />
                <Item label="Developer Tools" />
              </ContextMenu.Menu>
            </ContextMenu.Popover>
          </ContextMenu.SubmenuTrigger>
          <ContextMenu.Separator />
          <ContextMenu.Section
            selectedKeys={bookmarks}
            selectionMode="multiple"
            onSelectionChange={setBookmarks}
          >
            <ContextMenu.Item id="bookmarks" textValue="Show Bookmarks">
              <ContextMenu.ItemIndicator />
              <span>Show Bookmarks</span>
            </ContextMenu.Item>
            <ContextMenu.Item id="urls" textValue="Show Full URLs">
              <ContextMenu.ItemIndicator />
              <span>Show Full URLs</span>
            </ContextMenu.Item>
          </ContextMenu.Section>
          <ContextMenu.Separator />
          <ContextMenu.Section
            selectedKeys={person}
            selectionMode="single"
            onSelectionChange={setPerson}
          >
            <Header>People</Header>
            {["junior", "andres", "volodymyr", "diego"].map((name) => (
              <ContextMenu.Item id={name} key={name} textValue={name}>
                <ContextMenu.ItemIndicator type="dot" />
                <span className="capitalize">{name}</span>
              </ContextMenu.Item>
            ))}
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  );
}

export const ProWithSubmenusExample = () => <Submenus />;
