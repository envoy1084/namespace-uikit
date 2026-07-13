"use client";

// @demo-title With Data Grid
import type { Selection } from "react-aria-components";

import { useState } from "react";

import { ActionBar } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit/data-grid";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

type Employee = {
  department: string;
  id: number;
  name: string;
  status: string;
};

const employees: Employee[] = [
  {
    department: "Engineering",
    id: 1,
    name: "Elena Rodriguez",
    status: "Active",
  },
  { department: "Design", id: 2, name: "Marcus Chen", status: "Active" },
  { department: "Marketing", id: 3, name: "Priya Patel", status: "Pending" },
  { department: "Sales", id: 4, name: "James O'Brien", status: "Inactive" },
];

const employeeColumns: DataGridColumn<Employee>[] = [
  {
    accessorKey: "name",
    allowsSorting: true,
    header: "Employee",
    id: "name",
    isRowHeader: true,
  },
  { accessorKey: "department", header: "Department", id: "department" },
  { accessorKey: "status", header: "Status", id: "status" },
];

function WithDataGridDemo() {
  const [data, setData] = useState(employees);
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === "all" ? data.length : selected.size;
  const remove = () => {
    const keys =
      selected === "all" ? new Set(data.map((item) => item.id)) : selected;
    setData((current) => current.filter((item) => !keys.has(item.id)));
    setSelected(new Set());
  };
  return (
    <div className="w-full max-w-4xl">
      <DataGrid
        aria-label="Employees"
        columns={employeeColumns}
        data={data}
        defaultSortDescriptor={{ column: "name", direction: "ascending" }}
        getRowId={(item) => item.id}
        selectedKeys={selected}
        selectionMode="multiple"
        showSelectionCheckboxes
        onSelectionChange={setSelected}
      />
      <ActionBar aria-label="Bulk actions" isOpen={count > 0}>
        <ActionBar.Prefix>
          <Chip size="sm">{count}</Chip>
        </ActionBar.Prefix>
        <Separator />
        <ActionBar.Content>
          <Button size="sm" variant="ghost">
            <Icon icon="lucide:pencil" />
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            <Icon icon="lucide:download" />
            Export
          </Button>
          <Button
            aria-label="Delete"
            className="bg-danger/10 text-danger"
            size="sm"
            variant="ghost"
            onPress={remove}
          >
            <Icon icon="lucide:trash-2" />
            Delete
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
            <Icon icon="lucide:x" />
          </Button>
        </ActionBar.Suffix>
      </ActionBar>
    </div>
  );
}

export const DemoWithDataGridExample = () => <WithDataGridDemo />;
