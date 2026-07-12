import type { Meta, StoryObj } from "@storybook/react";
import type { Selection } from "react-aria-components";

import { useMemo, useState } from "react";

import {
  Add01Icon,
  Archive02Icon,
  Cancel01Icon,
  Copy01Icon,
  Delete02Icon,
  Download04Icon,
  File01Icon,
  File02Icon,
  Folder01Icon,
  FolderOpenIcon,
  Image01Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionBar } from "@thenamespace/uikit/action-bar";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { EmptyState as EmptyStateComponent } from "@thenamespace/uikit/empty-state";
import { Link } from "@thenamespace/uikit/link";
import { Spinner } from "@thenamespace/uikit/spinner";

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
type User = {
  email: string;
  id: number;
  name: string;
  role: string;
  title: string;
};
const users: User[] = [
  {
    email: "lindsay.walton@example.com",
    id: 1,
    name: "Lindsay Walton",
    role: "Member",
    title: "Front-end Developer",
  },
  {
    email: "courtney.henry@example.com",
    id: 2,
    name: "Courtney Henry",
    role: "Admin",
    title: "Designer",
  },
  {
    email: "tom.cook@example.com",
    id: 3,
    name: "Tom Cook",
    role: "Member",
    title: "Director of Product",
  },
  {
    email: "whitney.francis@example.com",
    id: 4,
    name: "Whitney Francis",
    role: "Admin",
    title: "Copywriter",
  },
  {
    email: "leonard.krasner@example.com",
    id: 5,
    name: "Leonard Krasner",
    role: "Owner",
    title: "Senior Designer",
  },
  {
    email: "floyd.miles@example.com",
    id: 6,
    name: "Floyd Miles",
    role: "Member",
    title: "Principal Designer",
  },
];
const userColumns: DataGridColumn<User>[] = [
  {
    accessorKey: "name",
    cellClassName: "font-medium",
    header: "Name",
    id: "name",
    isRowHeader: true,
  },
  { accessorKey: "title", header: "Title", id: "title" },
  { accessorKey: "email", header: "Email", id: "email" },
  { accessorKey: "role", header: "Role", id: "role" },
  {
    align: "end",
    cell: () => <Link className="text-sm">Edit</Link>,
    header: "",
    id: "edit",
  },
];
export const Simple: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-muted text-sm">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <Button size="sm" variant="secondary">
          Add user
        </Button>
      </div>
      <DataGrid
        aria-label="Users"
        columns={userColumns}
        data={users}
        getRowId={(user) => user.id}
        variant="secondary"
      />
    </div>
  ),
};
type Task = {
  assignee: string;
  id: string;
  priority: "high" | "low" | "medium";
  status: "done" | "in-progress" | "todo";
  title: string;
};
const tasks: Task[] = [
  {
    assignee: "Olivia",
    id: "task-1",
    priority: "high",
    status: "in-progress",
    title: "Design system audit",
  },
  {
    assignee: "Jackson",
    id: "task-2",
    priority: "high",
    status: "todo",
    title: "API rate limiting",
  },
  {
    assignee: "Isabella",
    id: "task-3",
    priority: "medium",
    status: "in-progress",
    title: "Onboarding flow redesign",
  },
  {
    assignee: "William",
    id: "task-4",
    priority: "high",
    status: "todo",
    title: "Database migration script",
  },
  {
    assignee: "Sofia",
    id: "task-5",
    priority: "low",
    status: "done",
    title: "Unit test coverage report",
  },
  {
    assignee: "Liam",
    id: "task-6",
    priority: "medium",
    status: "todo",
    title: "Performance profiling",
  },
  {
    assignee: "Emma",
    id: "task-7",
    priority: "medium",
    status: "in-progress",
    title: "Accessibility audit",
  },
  {
    assignee: "Noah",
    id: "task-8",
    priority: "low",
    status: "done",
    title: "CI pipeline optimization",
  },
];
const priorityColor = {
  high: "danger",
  low: "default",
  medium: "warning",
} as const;
const taskStatusColor = {
  done: "success",
  "in-progress": "warning",
  todo: "default",
} as const;
const taskStatusLabel = {
  done: "Done",
  "in-progress": "In Progress",
  todo: "To Do",
} as const;
const taskColumns: DataGridColumn<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    id: "title",
    isRowHeader: true,
  },
  {
    accessorKey: "priority",
    cell: (task) => (
      <Chip color={priorityColor[task.priority]} size="sm" variant="soft">
        <Chip.Label className="capitalize">{task.priority}</Chip.Label>
      </Chip>
    ),
    header: "Priority",
    id: "priority",
  },
  { accessorKey: "assignee", header: "Assignee", id: "assignee" },
  {
    accessorKey: "status",
    cell: (task) => (
      <Chip color={taskStatusColor[task.status]} size="sm" variant="soft">
        <Chip.Label>{taskStatusLabel[task.status]}</Chip.Label>
      </Chip>
    ),
    header: "Status",
    id: "status",
  },
];
export const DragAndDropReorder: Story = {
  render: function Demo() {
    const [data, setData] = useState(tasks);
    return (
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <p className="text-muted text-sm">
          Drag rows to reorder. Use keyboard (Enter to grab, arrows to move,
          Enter to drop).
        </p>
        <DataGrid
          aria-label="Task backlog"
          columns={taskColumns}
          data={data}
          getRowId={(task) => task.id}
          variant="primary"
          onReorder={(event) => setData(event.reorderedData)}
        />
      </div>
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
type Invoice = {
  amount: number;
  client: string;
  id: string;
  issuedAt: string;
  status: "overdue" | "paid" | "pending";
};
const invoiceClients = [
  "Acme Corp",
  "Globex Inc",
  "Initech",
  "Umbrella LLC",
  "Stark Industries",
  "Wayne Enterprises",
  "Hooli",
  "Pied Piper",
  "Soylent Corp",
  "Massive Dynamic",
  "Cyberdyne Systems",
  "Tyrell Corp",
  "Oscorp",
  "LexCorp",
  "Wonka Industries",
] as const;
const invoiceStatuses = ["paid", "pending", "overdue"] as const;
const seeded = (seed: number) => {
  const value = Math.sin(seed) * 10_000;
  return value - Math.floor(value);
};
const generateInvoices = (page: number, count: number): Invoice[] => {
  const start = page * count;
  return Array.from({ length: count }, (_, index) => {
    const seed = start + index;
    const random = (offset: number) => seeded(seed * 7 + offset);
    const month = (seed % 12) + 1;
    const day = Math.floor(random(3) * 28) + 1;
    return {
      amount: Math.round(200 + random(2) * 9800),
      client: invoiceClients[Math.floor(random(1) * invoiceClients.length)]!,
      id: `INV-${String(1000 + seed)}`,
      issuedAt: `2025-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      status: invoiceStatuses[Math.floor(random(4) * invoiceStatuses.length)]!,
    };
  });
};
const invoiceStatusColor = {
  overdue: "danger",
  paid: "success",
  pending: "warning",
} as const;
const invoiceColumns: DataGridColumn<Invoice>[] = [
  {
    accessorKey: "id",
    cellClassName: "font-medium font-mono text-xs",
    header: "Invoice",
    id: "id",
    isRowHeader: true,
  },
  { accessorKey: "client", header: "Client", id: "client" },
  {
    accessorKey: "amount",
    align: "end",
    cell: (invoice) => (
      <span className="font-medium tabular-nums">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          maximumFractionDigits: 0,
          style: "currency",
        }).format(invoice.amount)}
      </span>
    ),
    header: "Amount",
    id: "amount",
  },
  {
    accessorKey: "status",
    cell: (invoice) => (
      <Chip color={invoiceStatusColor[invoice.status]} size="sm" variant="soft">
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        <Chip.Label className="capitalize">{invoice.status}</Chip.Label>
      </Chip>
    ),
    header: "Status",
    id: "status",
  },
  {
    accessorKey: "issuedAt",
    cell: (invoice) => (
      <span className="text-muted tabular-nums">
        {formatDate(invoice.issuedAt)}
      </span>
    ),
    header: "Issued",
    id: "issuedAt",
  },
];
const invoicePageSize = 8;
const invoiceTotal = 50;
export const AsyncLoading: Story = {
  render: function Demo() {
    const [data, setData] = useState(() =>
      generateInvoices(0, invoicePageSize),
    );
    const [isLoading, setLoading] = useState(false);
    const hasMore = data.length < invoiceTotal;

    return (
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Invoices</h2>
          {data.length > 0 ? (
            <Chip size="sm" variant="soft">
              {data.length} / {invoiceTotal}
            </Chip>
          ) : null}
        </div>
        <DataGrid
          aria-label="Invoices"
          columns={invoiceColumns}
          data={data}
          getRowId={(invoice) => invoice.id}
          isLoadingMore={isLoading}
          loadMoreContent={<Spinner size="md" />}
          renderEmptyState={() => "No invoices found."}
          scrollContainerClassName="max-h-[400px] overflow-y-auto"
          onLoadMore={
            hasMore
              ? () => {
                  if (isLoading) return;
                  setLoading(true);
                  setTimeout(() => {
                    setData((current) => [
                      ...current,
                      ...generateInvoices(
                        Math.floor(current.length / invoicePageSize),
                        invoicePageSize,
                      ),
                    ]);
                    setLoading(false);
                  }, 1200);
                }
              : undefined
          }
        />
        {!hasMore && data.length > 0 ? (
          <span className="text-muted text-center text-sm">
            All {invoiceTotal} invoices loaded
          </span>
        ) : null}
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

type BulkEmployee = {
  avatar: string;
  department: string;
  email: string;
  id: number;
  joinDate: string;
  name: string;
  status: "Active" | "Inactive" | "Pending";
};

const bulkEmployees: BulkEmployee[] = [
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=20",
    department: "HR",
    email: "elena.rodriguez@company.com",
    id: 1,
    joinDate: "2024-01-28",
    name: "Elena Rodriguez",
    status: "Active",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=21",
    department: "Design",
    email: "marcus.chen@company.com",
    id: 2,
    joinDate: "2024-02-03",
    name: "Marcus Chen",
    status: "Pending",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=22",
    department: "HR",
    email: "priya.patel@company.com",
    id: 3,
    joinDate: "2024-03-04",
    name: "Priya Patel",
    status: "Active",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=23",
    department: "Finance",
    email: "james.o.brien@company.com",
    id: 4,
    joinDate: "2024-04-14",
    name: "James O'Brien",
    status: "Active",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=24",
    department: "Product",
    email: "yuki.tanaka@company.com",
    id: 5,
    joinDate: "2024-05-08",
    name: "Yuki Tanaka",
    status: "Inactive",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=25",
    department: "Support",
    email: "amara.okafor@company.com",
    id: 6,
    joinDate: "2024-06-27",
    name: "Amara Okafor",
    status: "Pending",
  },
  {
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=26",
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

export const BulkActions: Story = {
  render: function Demo() {
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
  },
};
type EmptyProject = {
  files: number;
  id: string;
  name: string;
  owner: string;
  updatedAt: string;
};
const emptyProjectColumns: DataGridColumn<EmptyProject>[] = [
  {
    accessorKey: "name",
    cellClassName: "font-medium",
    header: "Project",
    id: "name",
    isRowHeader: true,
  },
  { accessorKey: "owner", header: "Owner", id: "owner" },
  {
    accessorKey: "files",
    align: "center",
    header: "Files",
    id: "files",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    id: "updatedAt",
  },
];
export const EmptyState: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <h2 className="text-xl font-bold">Projects</h2>
      <DataGrid
        aria-label="Projects"
        columns={emptyProjectColumns}
        data={[]}
        getRowId={(project) => project.id}
        renderEmptyState={() => (
          <div className="py-6">
            <EmptyStateComponent size="sm">
              <EmptyStateComponent.Header>
                <EmptyStateComponent.Media className="border" variant="icon">
                  <StoryIcon icon={FolderOpenIcon} />
                </EmptyStateComponent.Media>
                <EmptyStateComponent.Title>
                  No Projects Yet
                </EmptyStateComponent.Title>
                <EmptyStateComponent.Description>
                  Get started by creating your first project. You can always
                  import existing projects later.
                </EmptyStateComponent.Description>
              </EmptyStateComponent.Header>
              <EmptyStateComponent.Content className="flex-row gap-2">
                <Button variant="outline">
                  <StoryIcon icon={Add01Icon} />
                  Create Project
                </Button>
              </EmptyStateComponent.Content>
            </EmptyStateComponent>
          </div>
        )}
      />
    </div>
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
export const ExpandableRows: Story = {
  render: function Demo() {
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
  },
};
