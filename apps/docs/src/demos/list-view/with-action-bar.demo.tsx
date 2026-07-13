"use client";

// @demo-title With Action Bar
import type { Selection } from "react-aria-components";

import { useState } from "react";

import { ListView } from "@thenamespace/uikit";
import { ActionBar } from "@thenamespace/uikit/action-bar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

const files = [
  { icon: "folder", id: "1", name: "Documents", updated: "2 days ago" },
  { icon: "folder", id: "2", name: "Photos", updated: "1 week ago" },
  { icon: "file", id: "3", name: "README.md", updated: "3 hours ago" },
  { icon: "file", id: "4", name: "package.json", updated: "Yesterday" },
  { icon: "folder", id: "5", name: "src", updated: "Just now" },
  { icon: "file", id: "6", name: ".gitignore", updated: "2 weeks ago" },
];

function FileRows({ compact = false }: { compact?: boolean }) {
  return (item: (typeof files)[number]) => (
    <ListView.Item id={item.id} textValue={item.name}>
      <ListView.ItemContent>
        <Icon icon={item.icon === "folder" ? "lucide:folder" : "lucide:file"} />
        <div className="flex min-w-0 flex-col">
          <ListView.Title>{item.name}</ListView.Title>
          {compact ? null : (
            <ListView.Description>Updated {item.updated}</ListView.Description>
          )}
        </div>
      </ListView.ItemContent>
    </ListView.Item>
  );
}

function Actions({ count, clear }: { clear: () => void; count: number }) {
  return (
    <ActionBar aria-label="File actions" isOpen={count > 0}>
      <ActionBar.Prefix>
        <Chip className="shrink-0 tabular-nums" size="sm">
          {count}
        </Chip>
      </ActionBar.Prefix>
      <Separator />
      <ActionBar.Content>
        {[
          ["Edit", "lucide:pencil"],
          ["Export", "lucide:arrow-up-from-line"],
          ["Archive", "lucide:archive"],
        ].map(([label, icon]) => (
          <Button aria-label={label} key={label} size="sm" variant="ghost">
            <Icon icon={icon} />
            <span className="action-bar__label">{label}</span>
          </Button>
        ))}
        <Separator orientation="vertical" />
        <Button
          aria-label="Delete"
          className="bg-danger/10 text-danger"
          size="sm"
          variant="ghost"
        >
          <Icon icon="lucide:trash-2" />
          <span className="action-bar__label">Delete</span>
        </Button>
      </ActionBar.Content>
      <Separator />
      <ActionBar.Suffix>
        <Button
          isIconOnly
          aria-label="Clear selection"
          size="sm"
          variant="ghost"
          onPress={clear}
        >
          <Icon icon="lucide:x" />
        </Button>
      </ActionBar.Suffix>
    </ActionBar>
  );
}

function WithActionsDemo() {
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === "all" ? files.length : selected.size;
  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Project files"
        items={files}
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={setSelected}
      >
        {FileRows({})}
      </ListView>
      <Actions clear={() => setSelected(new Set())} count={count} />
    </div>
  );
}

export const DemoWithActionBarExample = () => <WithActionsDemo />;
