import type { Meta, StoryObj } from "@storybook/react";
import type { Selection } from "react-aria-components";

import { useState } from "react";

import { Icon } from "../../icon";
import { Button } from "../button";
import { Chip } from "../chip";
import { DataGrid, type DataGridColumn } from "../data-grid";
import { ListView } from "../list-view";
import { Separator } from "../separator";
import { ActionBar } from "./index";

const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/ActionBar",
} satisfies Meta<typeof ActionBar>;
export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = { render: () => <DefaultDemo /> };
export const WithDataGrid: Story = { render: () => <WithDataGridDemo /> };
