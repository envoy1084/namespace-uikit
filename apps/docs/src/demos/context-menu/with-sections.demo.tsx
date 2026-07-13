"use client";

// @demo-title With Sections
import { Header, Kbd } from "@thenamespace/uikit";
import { ContextMenu } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

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

function Sections() {
  return (
    <ContextMenu>
      <Trigger />
      <ContextMenu.Popover>
        <ContextMenu.Menu>
          <ContextMenu.Section>
            <Header>Edit</Header>
            {[
              ["Cut", "lucide:scissors", "⌘ X"],
              ["Copy", "lucide:copy", "⌘ C"],
              ["Paste", "lucide:clipboard", "⌘ V"],
            ].map(([label, icon, key]) => (
              <ContextMenu.Item id={label} key={label} textValue={label}>
                <Icon className="text-muted size-4" icon={icon!} />
                <span>{label}</span>
                <Kbd className="ms-auto" variant="light">
                  {key}
                </Kbd>
              </ContextMenu.Item>
            ))}
          </ContextMenu.Section>
          <ContextMenu.Separator />
          <ContextMenu.Section>
            <Header>Manage</Header>
            {[
              ["Rename", "lucide:pencil"],
              ["Copy Link", "lucide:link"],
              ["Delete", "lucide:trash-2"],
            ].map(([label, icon]) => (
              <ContextMenu.Item
                id={label}
                key={label}
                textValue={label}
                variant={label === "Delete" ? "danger" : undefined}
              >
                <Icon className="size-4" icon={icon!} />
                <span>{label}</span>
              </ContextMenu.Item>
            ))}
          </ContextMenu.Section>
        </ContextMenu.Menu>
      </ContextMenu.Popover>
    </ContextMenu>
  );
}

export const DemoWithSectionsExample = () => <Sections />;
