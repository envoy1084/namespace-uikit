// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Bulk Actions
import type { Selection } from "react-aria-components";

import { useState } from "react";

import {
  Archive02Icon,
  Cancel01Icon,
  Delete02Icon,
  Download04Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { ActionBar } from "@thenamespace/uikit/action-bar";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Separator } from "@thenamespace/uikit/separator";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function StoryIcon({ icon }: { icon: typeof MoreVerticalIcon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

type BulkEmployee = {
  avatar: string;
  department: string;
  email: string;
  id: number;
  joinDate: string;
  name: string;
  status: "Active" | "Inactive" | "Pending";
};

const statusColor: Record<
  BulkEmployee["status"],
  "danger" | "success" | "warning"
> = {
  Active: "success",
  Inactive: "danger",
  Pending: "warning",
};

const bulkEmployees: BulkEmployee[] = [
  {
    avatar: "/assets/generated/avatar-20.jpg",
    department: "HR",
    email: "elena.rodriguez@company.com",
    id: 1,
    joinDate: "2024-01-28",
    name: "Elena Rodriguez",
    status: "Active",
  },
  {
    avatar: "/assets/generated/avatar-21.jpg",
    department: "Design",
    email: "marcus.chen@company.com",
    id: 2,
    joinDate: "2024-02-03",
    name: "Marcus Chen",
    status: "Pending",
  },
  {
    avatar: "/assets/generated/avatar-22.jpg",
    department: "HR",
    email: "priya.patel@company.com",
    id: 3,
    joinDate: "2024-03-04",
    name: "Priya Patel",
    status: "Active",
  },
  {
    avatar: "/assets/generated/avatar-23.jpg",
    department: "Finance",
    email: "james.o.brien@company.com",
    id: 4,
    joinDate: "2024-04-14",
    name: "James O'Brien",
    status: "Active",
  },
  {
    avatar: "/assets/generated/avatar-24.jpg",
    department: "Product",
    email: "yuki.tanaka@company.com",
    id: 5,
    joinDate: "2024-05-08",
    name: "Yuki Tanaka",
    status: "Inactive",
  },
  {
    avatar: "/assets/generated/avatar-25.jpg",
    department: "Support",
    email: "amara.okafor@company.com",
    id: 6,
    joinDate: "2024-06-27",
    name: "Amara Okafor",
    status: "Pending",
  },
  {
    avatar: "/assets/generated/avatar-26.jpg",
    department: "Engineering",
    email: "luca.bianchi@company.com",
    id: 7,
    joinDate: "2024-07-25",
    name: "Luca Bianchi",
    status: "Active",
  },
];

const bulkColumns: DataGridColumn<BulkEmployee>[] = [
  {
    accessorKey: "name",
    allowsSorting: true,
    cell: (employee) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <Avatar.Image alt={employee.name} src={employee.avatar} />
          <Avatar.Fallback>
            {employee.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{employee.name}</span>
          <span className="text-muted text-xs">{employee.email}</span>
        </div>
      </div>
    ),
    header: "Employee",
    id: "name",
    isRowHeader: true,
    minWidth: 240,
  },
  {
    accessorKey: "department",
    allowsSorting: true,
    header: "Department",
    id: "department",
  },
  {
    accessorKey: "status",
    allowsSorting: true,
    cell: (employee) => (
      <Chip color={statusColor[employee.status]} size="sm" variant="soft">
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        <Chip.Label>{employee.status}</Chip.Label>
      </Chip>
    ),
    header: "Status",
    id: "status",
  },
  {
    accessorKey: "joinDate",
    allowsSorting: true,
    cell: (employee) => (
      <span className="text-muted text-sm tabular-nums">
        {formatDate(employee.joinDate)}
      </span>
    ),
    header: "Joined",
    id: "joinDate",
  },
];

export const DemoBulkActionsExample = function Demo() {
  const [data, setData] = useState(bulkEmployees);
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === "all" ? data.length : selected.size;
  const selectedIds =
    selected === "all" ? new Set(data.map((item) => item.id)) : selected;

  return (
    <>
      <div className="w-full max-w-4xl">
        <DataGrid
          showSelectionCheckboxes
          aria-label="Employees"
          columns={bulkColumns}
          data={data}
          defaultSortDescriptor={{ column: "name", direction: "ascending" }}
          getRowId={(employee) => employee.id}
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={setSelected}
        />
      </div>
      <ActionBar aria-label="Bulk actions" isOpen={count > 0}>
        <ActionBar.Prefix>
          <Chip className="size-5 shrink-0 tabular-nums" size="sm">
            {count}
          </Chip>
        </ActionBar.Prefix>
        <Separator />
        <ActionBar.Content>
          <Button aria-label="Edit" size="sm" variant="ghost">
            <StoryIcon icon={PencilEdit01Icon} />
            <span className="action-bar__label">Edit</span>
          </Button>
          <Button aria-label="Export" size="sm" variant="ghost">
            <StoryIcon icon={Download04Icon} />
            <span className="action-bar__label">Export</span>
          </Button>
          <Button aria-label="Archive" size="sm" variant="ghost">
            <StoryIcon icon={Archive02Icon} />
            <span className="action-bar__label">Archive</span>
          </Button>
          <Button
            aria-label="Delete"
            className="text-danger bg-danger/10"
            size="sm"
            variant="ghost"
            onPress={() => {
              setData((current) =>
                current.filter((item) => !selectedIds.has(item.id)),
              );
              setSelected(new Set());
            }}
          >
            <StoryIcon icon={Delete02Icon} />
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
            onPress={() => setSelected(new Set())}
          >
            <StoryIcon icon={Cancel01Icon} />
          </Button>
        </ActionBar.Suffix>
      </ActionBar>
    </>
  );
};
