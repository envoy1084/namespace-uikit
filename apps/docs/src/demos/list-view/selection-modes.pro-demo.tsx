"use client";

// @demo-title Selection Modes
import type { Selection, SelectionMode } from "react-aria-components";

import { useState } from "react";

import { ListView } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

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

function SelectionDemo({
  label,
  selectionMode,
}: {
  label: string;
  selectionMode: SelectionMode;
}) {
  const [selected, setSelected] = useState<Selection>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {selectionMode !== "none" ? (
          <span className="text-muted text-xs">
            {selected === "all"
              ? "All selected"
              : selected.size
                ? `${selected.size} selected`
                : "None selected"}
          </span>
        ) : null}
      </div>
      <ListView
        aria-label={label}
        items={files.slice(0, 5)}
        selectedKeys={selected}
        selectionMode={selectionMode}
        onSelectionChange={setSelected}
      >
        {FileRows({})}
      </ListView>
    </div>
  );
}

function SelectionModesDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8 sm:flex-row">
      <div className="flex-1">
        <SelectionDemo label="None" selectionMode="none" />
      </div>
      <div className="flex-1">
        <SelectionDemo label="Single" selectionMode="single" />
      </div>
      <div className="flex-1">
        <SelectionDemo label="Multiple" selectionMode="multiple" />
      </div>
    </div>
  );
}

export const ProSelectionModesExample = () => <SelectionModesDemo />;
