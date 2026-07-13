"use client";

// @demo-title Split View
import { useState } from "react";

import { Button, Chip, Kbd } from "@thenamespace/uikit";
import { Command } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

const actions = [
  ["Create new file...", "lucide:file-plus-2"],
  ["Create new folder...", "lucide:folder-plus"],
  ["Assign to me", "lucide:user-round-pen"],
] as const;

const settings = [
  ["Preferences", "lucide:settings"],
  ["Change theme", "lucide:palette"],
  ["Keyboard shortcuts", "lucide:keyboard"],
] as const;

function Contents({ minimal = false }: { minimal?: boolean }) {
  return (
    <>
      {minimal ? null : (
        <Command.Header>
          <Chip size="sm">Home</Chip>
        </Command.Header>
      )}
      <Command.InputGroup>
        <Command.InputGroup.Prefix>
          <Icon icon="lucide:search" />
        </Command.InputGroup.Prefix>
        <Command.InputGroup.Input
          placeholder={
            minimal ? "What do you need?" : "Type a command or search..."
          }
        />
        <Command.InputGroup.ClearButton />
        <Command.InputGroup.Suffix>
          <Kbd>Esc</Kbd>
        </Command.InputGroup.Suffix>
      </Command.InputGroup>
      <Command.List renderEmptyState={() => <>No results found.</>}>
        <Command.Group heading={minimal ? undefined : "Actions"}>
          {actions.map(([label, icon]) => (
            <Command.Item key={label} textValue={label}>
              <Icon icon={icon} />
              <span>{label}</span>
            </Command.Item>
          ))}
        </Command.Group>
        {minimal ? null : (
          <Command.Group heading="Settings">
            {settings.map(([label, icon]) => (
              <Command.Item key={label} textValue={label}>
                <Icon icon={icon} />
                <span>{label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
      {minimal ? null : (
        <Command.Footer>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <span>Navigate</span>
          <Kbd>↵</Kbd>
          <span>Select</span>
        </Command.Footer>
      )}
    </>
  );
}

function Palette({
  label = "Open Command Palette",
  size = "md",
  variant = "opaque",
  children,
}: {
  children?: React.ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "transparent" | "opaque" | "blur";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        {label} <Kbd>⌘ K</Kbd>
      </Button>
      <Command>
        <Command.Backdrop
          isOpen={open}
          variant={variant}
          onOpenChange={setOpen}
        >
          <Command.Container size={size}>
            <Command.Dialog>{children ?? <Contents />}</Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  );
}

function Split() {
  const [selected, setSelected] = useState("Button");
  const items = [
    "Button",
    "Input",
    "Radio",
    "Chip",
    "Slider",
    "Avatar",
    "Switch",
  ];
  return (
    <Palette label="Split View" size="lg">
      <Command.InputGroup>
        <Command.InputGroup.Prefix>
          <Icon icon="lucide:search" />
        </Command.InputGroup.Prefix>
        <Command.InputGroup.Input placeholder="Find components, packages, and interactions..." />
        <Command.InputGroup.ClearButton />
      </Command.InputGroup>
      <div className="flex min-h-[308px]">
        <Command.List
          className="!w-2/5 !flex-none"
          onAction={(key) => setSelected(String(key))}
        >
          <Command.Group heading="Components">
            {items.map((x) => (
              <Command.Item id={x} key={x} textValue={x}>
                <Icon icon="lucide:component" />
                <div>
                  <div>{x}</div>
                  <div className="text-muted text-xs">UI component</div>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="bg-separator w-px" />
        <div className="flex flex-1 items-center justify-center p-4">
          <Button>{selected}</Button>
        </div>
      </div>
    </Palette>
  );
}

export const DemoSplitViewExample = () => <Split />;
