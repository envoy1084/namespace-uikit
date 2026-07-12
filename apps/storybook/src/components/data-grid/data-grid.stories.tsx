import type { Meta, StoryObj } from "@storybook/react";
import type { Selection } from "react-aria-components";

import { useMemo, useState } from "react";

import { Icon } from "@iconify/react";
import { ActionBar } from "@thenamespace/uikit/action-bar";

import { Button } from "../button";
import { Chip } from "../chip";
import { Input } from "../input";
import { Separator } from "../separator";
import { DataGrid, type DataGridColumn } from "./index";

const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/DataGrid",
} satisfies Meta<typeof DataGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

type Person = {
  department: string;
  email: string;
  id: number;
  name: string;
  salary: number;
  status: "Active" | "Inactive" | "Pending";
};
const people: Person[] = [
  {
    department: "Engineering",
    email: "elena@company.com",
    id: 1,
    name: "Elena Rodriguez",
    salary: 128000,
    status: "Active",
  },
  {
    department: "Design",
    email: "marcus@company.com",
    id: 2,
    name: "Marcus Chen",
    salary: 112000,
    status: "Active",
  },
  {
    department: "Marketing",
    email: "priya@company.com",
    id: 3,
    name: "Priya Patel",
    salary: 98000,
    status: "Pending",
  },
  {
    department: "Sales",
    email: "james@company.com",
    id: 4,
    name: "James O'Brien",
    salary: 105000,
    status: "Inactive",
  },
  {
    department: "Product",
    email: "yuki@company.com",
    id: 5,
    name: "Yuki Tanaka",
    salary: 135000,
    status: "Active",
  },
  {
    department: "Support",
    email: "amara@company.com",
    id: 6,
    name: "Amara Okafor",
    salary: 82000,
    status: "Pending",
  },
];
const statusColor = {
  Active: "success",
  Inactive: "danger",
  Pending: "warning",
} as const;
const columns: DataGridColumn<Person>[] = [
  {
    accessorKey: "name",
    allowsSorting: true,
    cell: (person) => (
      <div className="flex flex-col">
        <span className="font-medium">{person.name}</span>
        <span className="text-muted text-xs">{person.email}</span>
      </div>
    ),
    header: "Employee",
    id: "name",
    isRowHeader: true,
    minWidth: 220,
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
    cell: (person) => (
      <Chip color={statusColor[person.status]} size="sm" variant="soft">
        {person.status}
      </Chip>
    ),
    header: "Status",
    id: "status",
  },
  {
    accessorKey: "salary",
    align: "end",
    allowsSorting: true,
    cell: (person) => (
      <span className="tabular-nums">${person.salary.toLocaleString()}</span>
    ),
    header: "Salary",
    id: "salary",
  },
];
function Grid({
  data = people,
  ...props
}: Partial<Parameters<typeof DataGrid<Person>>[0]> & { data?: Person[] }) {
  return (
    <div className="w-full max-w-4xl">
      <DataGrid
        aria-label="Employees"
        columns={columns}
        data={data}
        getRowId={(item) => item.id}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <Grid
      defaultSortDescriptor={{ column: "name", direction: "ascending" }}
      selectionMode="multiple"
      showSelectionCheckboxes
    />
  ),
};
export const Simple: Story = { render: () => <Grid variant="secondary" /> };
export const DragAndDropReorder: Story = {
  render: function Demo() {
    const [data, setData] = useState(people);
    return (
      <Grid data={data} onReorder={(event) => setData(event.reorderedData)} />
    );
  },
};
export const WithCharts: Story = {
  render: () => (
    <Grid
      columns={[
        columns[0]!,
        {
          cell: (person) => (
            <div className="bg-default h-2 w-32 overflow-hidden rounded-full">
              <div
                className="bg-accent h-full"
                style={{ width: `${person.salary / 1500}%` }}
              />
            </div>
          ),
          header: "Compensation",
          id: "chart",
        },
        columns[2]!,
      ]}
    />
  ),
};
export const Virtualized: Story = {
  render: () => {
    const rows = Array.from({ length: 1000 }, (_, index) => ({
      ...people[index % people.length]!,
      id: index + 1,
      name: `${people[index % people.length]!.name} ${index + 1}`,
    }));
    return (
      <Grid
        contentClassName="h-[500px]"
        data={rows}
        headingHeight={37}
        rowHeight={58}
        virtualized
      />
    );
  },
};
export const Complex: Story = {
  render: function Demo() {
    const [query, setQuery] = useState("");
    const filtered = useMemo(
      () =>
        people.filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase()),
        ),
      [query],
    );
    return (
      <div className="grid gap-4">
        <Input
          aria-label="Search members"
          className="w-56"
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Grid
          allowsColumnResize
          contentClassName="min-w-[800px]"
          data={filtered}
          selectionMode="multiple"
          showSelectionCheckboxes
        />
      </div>
    );
  },
};
export const AsyncLoading: Story = {
  render: function Demo() {
    const [data, setData] = useState(people.slice(0, 3));
    return (
      <div className="grid gap-3">
        <Grid
          data={data}
          isLoadingMore={data.length < people.length}
          loadMoreContent="Loading…"
          onLoadMore={() => setData(people)}
        />
        <Button className="w-fit" size="sm" onPress={() => setData(people)}>
          Load more
        </Button>
      </div>
    );
  },
};
export const EditableCells: Story = {
  render: function Demo() {
    const [data, setData] = useState(people);
    const editable: DataGridColumn<Person>[] = [
      {
        ...columns[0]!,
        cell: (person) => (
          <Input
            aria-label={`Name for ${person.name}`}
            value={person.name}
            onChange={(event) =>
              setData((current) =>
                current.map((item) =>
                  item.id === person.id
                    ? { ...item, name: event.target.value }
                    : item,
                ),
              )
            }
          />
        ),
      },
      ...columns.slice(1),
    ];
    return <Grid columns={editable} data={data} />;
  },
};
export const BulkActions: Story = {
  render: function Demo() {
    const [selected, setSelected] = useState<Selection>(new Set());
    const count = selected === "all" ? people.length : selected.size;
    return (
      <>
        <Grid
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
            <Button className="text-danger" size="sm" variant="ghost">
              <Icon icon="lucide:trash-2" />
              Delete
            </Button>
          </ActionBar.Content>
        </ActionBar>
      </>
    );
  },
};
export const EmptyState: Story = {
  render: () => (
    <Grid
      data={[]}
      renderEmptyState={() => (
        <div className="grid place-items-center gap-2">
          <Icon className="size-8" icon="lucide:folder-open" />
          <span>No employees found.</span>
        </div>
      )}
    />
  ),
};
export const PinnedColumnsCompact: Story = {
  render: () => (
    <Grid
      columns={[
        { ...columns[0]!, pinned: "start", width: 240 },
        columns[1]!,
        columns[2]!,
        { ...columns[3]!, pinned: "end", width: 140 },
      ]}
      contentClassName="min-w-[900px]"
    />
  ),
};
type TreeRow = {
  id: string;
  name: string;
  owner: string;
  children?: TreeRow[];
};
const tree: TreeRow[] = [
  {
    id: "design",
    name: "Design",
    owner: "Marcus",
    children: [
      { id: "brand", name: "Brand assets", owner: "Priya" },
      { id: "product", name: "Product screens", owner: "Elena" },
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    owner: "Yuki",
    children: [{ id: "web", name: "Web app", owner: "Amara" }],
  },
];
export const ExpandableRows: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DataGrid
        aria-label="Projects"
        columns={[
          {
            accessorKey: "name",
            header: "Project",
            id: "name",
            isRowHeader: true,
          },
          { accessorKey: "owner", header: "Owner", id: "owner" },
        ]}
        data={tree}
        defaultExpandedKeys={new Set(["design"])}
        getChildren={(item) => item.children}
        getRowId={(item) => item.id}
        treeColumn="name"
      />
    </div>
  ),
};
