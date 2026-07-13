"use client";

// @demo-title Multiple Search Terms
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

export const DemoMultipleSearchTermsExample = () => (
  <Palette label="Multiple Search Terms" size="lg">
    <Command.InputGroup>
      <Command.InputGroup.Prefix>
        <Icon icon="lucide:search" />
      </Command.InputGroup.Prefix>
      <Command.InputGroup.Input placeholder="Search or jump to" />
      <Command.InputGroup.ClearButton />
      <Command.InputGroup.Suffix>
        <Kbd>⌘ K</Kbd>
      </Command.InputGroup.Suffix>
    </Command.InputGroup>
    <Command.Header>
      <div className="flex flex-wrap gap-1.5">
        {["Projects", "Tasks", "People", "Documents", "Channels"].map((x) => (
          <span className="bg-default rounded px-2 py-1 text-xs" key={x}>
            {x}
          </span>
        ))}
      </div>
    </Command.Header>
    <Command.List renderEmptyState={() => <>No results found.</>}>
      <Command.Group heading="Smart Prompt Examples">
        {[
          "Summarize this week's progress",
          "Create a task for the team",
          "Draft a project brief",
          "Schedule a standup meeting",
        ].map((x) => (
          <Command.Item key={x} textValue={x}>
            <Icon icon="lucide:sparkles" />
            {x}
          </Command.Item>
        ))}
      </Command.Group>
    </Command.List>
    <Command.Footer>↑↓ Navigate · ↵ Select</Command.Footer>
  </Palette>
);
