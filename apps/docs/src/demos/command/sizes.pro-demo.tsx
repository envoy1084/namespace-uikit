"use client";

// @demo-title Sizes
import { useState } from "react";

import { Button, Chip, Kbd } from "@thenamespace/uikit";
import { Command } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

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

function SizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      {(["sm", "md", "lg"] as const).map((value) => (
        <Button
          key={value}
          variant="tertiary"
          onPress={() => {
            setSize(value);
            setOpen(true);
          }}
        >
          Size: {value}
        </Button>
      ))}
      <Command>
        <Command.Backdrop isOpen={open} onOpenChange={setOpen}>
          <Command.Container size={size}>
            <Command.Dialog>
              <Contents />
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </div>
  );
}

export const ProSizesExample = () => <SizesDemo />;
