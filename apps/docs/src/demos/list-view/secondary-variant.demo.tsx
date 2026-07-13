"use client";

// @demo-title Secondary Variant
import type { Selection } from "react-aria-components";

import { useState } from "react";

import { ListView } from "@thenamespace/uikit";

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

function SecondaryDemo() {
  const [selected, setSelected] = useState<Selection>(new Set());
  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Files"
        items={files.slice(0, 5)}
        selectedKeys={selected}
        selectionMode="multiple"
        variant="secondary"
        onSelectionChange={setSelected}
      >
        {FileRows({})}
      </ListView>
    </div>
  );
}

export const DemoSecondaryVariantExample = () => <SecondaryDemo />;
