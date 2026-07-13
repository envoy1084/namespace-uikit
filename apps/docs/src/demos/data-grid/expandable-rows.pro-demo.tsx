"use client";

// @demo-title Expandable Rows
import type { Selection } from "react-aria-components";

import { useState } from "react";

import {
  File01Icon,
  File02Icon,
  Folder01Icon,
  FolderOpenIcon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";

type TreeRow = {
  children?: TreeRow[];
  id: string;
  kind: "document" | "folder" | "image" | "text";
  modified: string;
  name: string;
  size: string;
};

const tree: TreeRow[] = [
  {
    children: [
      {
        children: [
          {
            id: "3",
            kind: "document",
            modified: "Jul 10, 2025",
            name: "Weekly Report.pdf",
            size: "1.2 MB",
          },
          {
            id: "4",
            kind: "document",
            modified: "Aug 20, 2025",
            name: "Budget.xlsx",
            size: "48 KB",
          },
        ],
        id: "2",
        kind: "folder",
        modified: "Aug 2, 2025",
        name: "Project Alpha",
        size: "2 items",
      },
      {
        id: "8",
        kind: "text",
        modified: "Sep 14, 2025",
        name: "Meeting Notes.md",
        size: "12 KB",
      },
    ],
    id: "1",
    kind: "folder",
    modified: "Oct 20, 2025",
    name: "Documents",
    size: "3 items",
  },
  {
    children: [
      {
        id: "6",
        kind: "image",
        modified: "Jan 23, 2026",
        name: "hero-1.png",
        size: "2.4 MB",
      },
      {
        id: "7",
        kind: "image",
        modified: "Feb 3, 2026",
        name: "hero-2.png",
        size: "3.1 MB",
      },
    ],
    id: "5",
    kind: "folder",
    modified: "Feb 3, 2026",
    name: "Photos",
    size: "2 items",
  },
  {
    id: "9",
    kind: "text",
    modified: "Mar 1, 2026",
    name: "readme.txt",
    size: "4 KB",
  },
];

export const ProExpandableRowsExample = function Demo() {
  const [expanded, setExpanded] = useState<Selection>(new Set(["1"]));
  const isExpanded = (id: string) => expanded === "all" || expanded.has(id);
  const typeLabel = {
    document: "Document",
    folder: "Folder",
    image: "Image",
    text: "Text",
  } as const;
  const typeColor = {
    document: "accent",
    folder: "warning",
    image: "success",
    text: "default",
  } as const;
  const fileColumns: DataGridColumn<TreeRow>[] = [
    {
      accessorKey: "name",
      cell: (item) => {
        const icon =
          item.kind === "folder"
            ? isExpanded(item.id)
              ? FolderOpenIcon
              : Folder01Icon
            : item.kind === "image"
              ? Image01Icon
              : item.kind === "document"
                ? File02Icon
                : File01Icon;
        return (
          <span className="flex min-w-0 items-center gap-2">
            <HugeiconsIcon
              className={
                item.kind === "folder"
                  ? "text-warning size-4 shrink-0"
                  : "text-muted size-4 shrink-0"
              }
              icon={icon}
              strokeWidth={2}
            />
            <span className="truncate text-sm font-medium">{item.name}</span>
          </span>
        );
      },
      header: "Name",
      id: "name",
      isRowHeader: true,
      minWidth: 280,
    },
    {
      accessorKey: "kind",
      cell: (item) => (
        <Chip color={typeColor[item.kind]} size="sm" variant="soft">
          <Chip.Label>{typeLabel[item.kind]}</Chip.Label>
        </Chip>
      ),
      header: "Type",
      id: "kind",
      minWidth: 120,
    },
    {
      accessorKey: "size",
      align: "end",
      cellClassName: "text-muted text-sm tabular-nums",
      header: "Size",
      id: "size",
      minWidth: 100,
    },
    {
      accessorKey: "modified",
      cellClassName: "text-muted text-sm tabular-nums",
      header: "Date Modified",
      id: "modified",
      minWidth: 160,
    },
  ];

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <DataGrid
        aria-label="Files"
        columns={fileColumns}
        contentClassName="min-w-[660px]"
        data={tree}
        expandedKeys={expanded}
        getChildren={(item) => item.children}
        getRowId={(item) => item.id}
        treeColumn="name"
        variant="primary"
        onExpandedChange={setExpanded}
      />
    </div>
  );
};
