"use client";

// @demo-title Default
import type { Selection } from "react-aria-components";

import { useState } from "react";

import { ActionBar } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { ListView } from "@thenamespace/uikit/list-view";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

const files = [
  "Project proposal.pdf",
  "Q4 financial report.xlsx",
  "Brand guidelines.fig",
  "Team photo.jpg",
  "Meeting notes.md",
  "API documentation.pdf",
].map((label, index) => ({ id: index + 1, label }));

function Bar({ clear, count }: { clear: () => void; count: number }) {
  return (
    <ActionBar isOpen={count > 0}>
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

function DefaultDemo() {
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === "all" ? files.length : selected.size;
  return (
    <div className="w-full max-w-lg p-4">
      <ListView
        aria-label="Files"
        items={files}
        selectedKeys={selected}
        selectionMode="multiple"
        variant="primary"
        onSelectionChange={setSelected}
      >
        {(item) => (
          <ListView.Item id={item.id} textValue={item.label}>
            <ListView.ItemContent>
              <ListView.Title>{item.label}</ListView.Title>
            </ListView.ItemContent>
          </ListView.Item>
        )}
      </ListView>
      <Bar clear={() => setSelected(new Set())} count={count} />
    </div>
  );
}

export const DemoDefaultExample = () => <DefaultDemo />;
