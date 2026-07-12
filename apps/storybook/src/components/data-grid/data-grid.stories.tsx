import type { Meta, StoryObj } from "@storybook/react";
import type { Selection } from "react-aria-components";

import { useMemo, useState } from "react";

import {
  Copy01Icon,
  Delete02Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@iconify/react";
import { ActionBar } from "@thenamespace/uikit/action-bar";
import { Dropdown } from "@thenamespace/uikit/dropdown";

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

type Payment = {
  amount: number;
  customer: string;
  date: string;
  description: string;
  email: string;
  fee: number;
  id: string;
  method: string;
  net: number;
  region: string;
  status: "failed" | "processing" | "refunded" | "succeeded";
};

const payments: Payment[] = [
  {
    amount: 1999,
    customer: "Olivia Martin",
    date: "2025-12-01",
    description: "Annual subscription — Pro plan",
    email: "olivia@example.com",
    fee: 59.97,
    id: "pay_1N3x7K",
    method: "Visa •••• 4242",
    net: 1939.03,
    region: "North America",
    status: "succeeded",
  },
  {
    amount: 39,
    customer: "Jackson Lee",
    date: "2025-12-02",
    description: "Monthly add-on — Extra seats",
    email: "jackson@example.com",
    fee: 1.43,
    id: "pay_1N3x8L",
    method: "Mastercard •••• 5555",
    net: 37.57,
    region: "North America",
    status: "processing",
  },
  {
    amount: 299,
    customer: "Isabella Nguyen",
    date: "2025-12-03",
    description: "Quarterly subscription — Team plan",
    email: "isabella@example.com",
    fee: 8.97,
    id: "pay_1N3x9M",
    method: "Visa •••• 1234",
    net: 290.03,
    region: "Asia Pacific",
    status: "succeeded",
  },
  {
    amount: 99,
    customer: "William Kim",
    date: "2025-12-04",
    description: "Monthly subscription — Starter plan",
    email: "will@example.com",
    fee: 3.17,
    id: "pay_1N3xAN",
    method: "Amex •••• 3782",
    net: 95.83,
    region: "Asia Pacific",
    status: "failed",
  },
  {
    amount: 450,
    customer: "Sofia Davis",
    date: "2025-12-05",
    description: "One-time purchase — Enterprise setup",
    email: "sofia@example.com",
    fee: 13.5,
    id: "pay_1N3xBP",
    method: "Visa •••• 9012",
    net: 436.5,
    region: "Europe",
    status: "succeeded",
  },
  {
    amount: 150,
    customer: "Liam Johnson",
    date: "2025-12-06",
    description: "Monthly subscription — Pro plan",
    email: "liam@example.com",
    fee: 4.5,
    id: "pay_1N3xCQ",
    method: "Mastercard •••• 6789",
    net: 145.5,
    region: "Europe",
    status: "refunded",
  },
  {
    amount: 2450,
    customer: "Emma Wilson",
    date: "2025-12-07",
    description: "Annual subscription — Enterprise plan",
    email: "emma@example.com",
    fee: 73.5,
    id: "pay_1N3xDR",
    method: "Visa •••• 4242",
    net: 2376.5,
    region: "North America",
    status: "succeeded",
  },
];

const paymentStatusColor = {
  failed: "danger",
  processing: "warning",
  refunded: "default",
  succeeded: "success",
} as const;
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);
const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function StoryIcon({ icon }: { icon: typeof MoreVerticalIcon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

function PaymentActions({ paymentId }: { paymentId: string }) {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Row actions" size="sm" variant="tertiary">
        <StoryIcon icon={MoreVerticalIcon} />
      </Button>
      <Dropdown.Popover className="min-w-[180px]">
        <Dropdown.Menu
          onAction={(key) => {
            if (key === "copy") void navigator.clipboard.writeText(paymentId);
          }}
        >
          <Dropdown.Item id="copy" textValue="Copy payment ID">
            <StoryIcon icon={Copy01Icon} />
            Copy payment ID
          </Dropdown.Item>
          <Dropdown.Item id="view" textValue="View details">
            <StoryIcon icon={ViewIcon} />
            View details
          </Dropdown.Item>
          <Dropdown.Item id="edit" textValue="Edit payment">
            <StoryIcon icon={PencilEdit01Icon} />
            Edit payment
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <StoryIcon icon={Delete02Icon} />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

const paymentColumns: DataGridColumn<Payment>[] = [
  {
    accessorKey: "customer",
    allowsResizing: true,
    allowsSorting: true,
    cell: (payment) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{payment.customer}</span>
        <span className="text-muted text-xs">{payment.email}</span>
      </div>
    ),
    header: "Customer",
    id: "customer",
    isRowHeader: true,
    minWidth: 200,
  },
  {
    accessorKey: "id",
    allowsResizing: true,
    cellClassName: "font-mono text-xs text-muted",
    header: "Transaction ID",
    id: "id",
    minWidth: 130,
  },
  {
    accessorKey: "status",
    allowsResizing: true,
    allowsSorting: true,
    cell: (payment) => (
      <Chip color={paymentStatusColor[payment.status]} size="sm" variant="soft">
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        <Chip.Label className="capitalize">{payment.status}</Chip.Label>
      </Chip>
    ),
    header: "Status",
    id: "status",
    minWidth: 120,
  },
  ...(
    [
      ["amount", "Amount", "font-medium tabular-nums", 110],
      ["fee", "Fee", "text-muted tabular-nums", 90],
      ["net", "Net", "font-medium tabular-nums", 110],
    ] as const
  ).map(
    ([key, header, className, minWidth]): DataGridColumn<Payment> => ({
      accessorKey: key,
      align: "end",
      allowsResizing: true,
      allowsSorting: true,
      cell: (payment) => (
        <span className={className}>{formatCurrency(payment[key])}</span>
      ),
      header,
      id: key,
      minWidth,
    }),
  ),
  {
    accessorKey: "method",
    allowsResizing: true,
    header: "Payment Method",
    id: "method",
    minWidth: 170,
  },
  {
    accessorKey: "region",
    allowsResizing: true,
    allowsSorting: true,
    header: "Region",
    id: "region",
    minWidth: 130,
  },
  {
    accessorKey: "description",
    allowsResizing: true,
    cellClassName: "text-muted",
    header: "Description",
    id: "description",
    minWidth: 240,
  },
  {
    accessorKey: "date",
    allowsResizing: true,
    allowsSorting: true,
    cell: (payment) => (
      <span className="text-muted tabular-nums">
        {formatDate(payment.date)}
      </span>
    ),
    header: "Date",
    id: "date",
    minWidth: 120,
  },
  {
    align: "end",
    allowsResizing: false,
    cell: (payment) => <PaymentActions paymentId={payment.id} />,
    header: "",
    id: "actions",
    pinned: "end",
    width: 50,
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
  render: function DefaultDemo() {
    const [selected, setSelected] = useState<Selection>(new Set());
    const count = selected === "all" ? payments.length : selected.size;

    return (
      <div className="flex w-full max-w-5xl flex-col gap-3">
        <DataGrid
          allowsColumnResize
          showSelectionCheckboxes
          aria-label="Payments"
          columns={paymentColumns}
          contentClassName="min-w-[1400px]"
          data={payments}
          defaultSortDescriptor={{
            column: "customer",
            direction: "ascending",
          }}
          getRowId={(payment) => payment.id}
          renderEmptyState={() => "No payments found."}
          selectedKeys={selected}
          selectionMode="multiple"
          variant="primary"
          onSelectionChange={setSelected}
        />
        {count > 0 ? (
          <div className="text-muted text-sm">
            {count} of {payments.length} row(s) selected
          </div>
        ) : null}
      </div>
    );
  },
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
