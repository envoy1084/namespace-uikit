import type { Meta, StoryObj } from "@storybook/react";
import type { Selection, SortDescriptor } from "react-aria-components";

import { useMemo, useState } from "react";

import {
  Add01Icon,
  Archive02Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Cancel01Icon,
  Copy01Icon,
  Delete02Icon,
  Download04Icon,
  File01Icon,
  File02Icon,
  Folder01Icon,
  FolderOpenIcon,
  FilterIcon,
  Image01Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
  Tick02Icon,
  LayoutThreeColumnIcon,
  SlidersHorizontalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionBar } from "@thenamespace/uikit/action-bar";
import { AreaChart } from "@thenamespace/uikit/area-chart";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { EmptyState as EmptyStateComponent } from "@thenamespace/uikit/empty-state";
import { Link } from "@thenamespace/uikit/link";
import { ListBox } from "@thenamespace/uikit/list-box";
import { NumberStepper } from "@thenamespace/uikit/number-stepper";
import { ProgressCircle } from "@thenamespace/uikit/progress-circle";
import { Rating } from "@thenamespace/uikit/rating";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Segment } from "@thenamespace/uikit/segment";
import { Select } from "@thenamespace/uikit/select";
import { Spinner } from "@thenamespace/uikit/spinner";
import { Switch } from "@thenamespace/uikit/switch";
import { TextField } from "@thenamespace/uikit/textfield";
import { Tooltip } from "@thenamespace/uikit/tooltip";

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
type Server = {
  capacity: number;
  clusterId: string;
  cost: number;
  id: number;
  instances: number;
  region: string;
  requests: { value: number }[];
  status: "Active" | "Inactive";
};
const serverRegions = [
  "US-West 1",
  "US-East 2",
  "EU-Central 1",
  "AP-South 1",
  "US-West 2",
  "EU-West 1",
  "CA-Central 1",
  "AP-Northeast 1",
] as const;
const serverSeeded = (seed: number) => {
  const value = Math.sin(seed) * 10_000;
  return value - Math.floor(value);
};
const generateRequests = (seed: number) => {
  const values = [{ value: 30 + serverSeeded(seed * 3) * 30 }];
  for (let index = 1; index < 16; index++) {
    const previous = values[index - 1]!.value;
    const change = (serverSeeded(seed * 13 + index * 7) - 0.45) * 8;
    values.push({ value: Math.max(10, Math.min(90, previous + change)) });
  }
  return values;
};
const servers: Server[] = Array.from({ length: 8 }, (_, index) => {
  const random = (offset: number) => serverSeeded(index * 11 + offset);
  return {
    capacity: Math.round(random(3) * 10_000) / 100,
    clusterId: `#${4_586_930 + index}`,
    cost: Math.round(random(4) * 80_000 + 5000) / 100,
    id: index,
    instances: Math.round(5 + random(1) * 28),
    region: serverRegions[index % serverRegions.length]!,
    requests: generateRequests(index),
    status: random(2) > 0.4 ? "Active" : "Inactive",
  };
});
const serverColumnIds = [
  "clusterId",
  "instances",
  "status",
  "region",
  "capacity",
  "cost",
  "requests",
] as const;

function ClusterId({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-medium tabular-nums">{value}</span>
      <Tooltip>
        <Button
          isIconOnly
          aria-label="Copy cluster ID"
          size="sm"
          variant="ghost"
          onPress={() => void navigator.clipboard.writeText(value)}
        >
          <HugeiconsIcon
            className="text-muted size-4"
            icon={Copy01Icon}
            strokeWidth={2}
          />
        </Button>
        <Tooltip.Content>Copy</Tooltip.Content>
      </Tooltip>
    </div>
  );
}

function Capacity({ value }: { value: number }) {
  const color =
    value >= 90
      ? "danger"
      : value >= 60
        ? "warning"
        : value >= 20
          ? "accent"
          : "default";
  const textColor =
    value >= 90 ? "text-danger" : value >= 60 ? "text-warning" : "";
  return (
    <div className="flex items-center gap-2">
      <ProgressCircle
        aria-label={`${value}% capacity`}
        color={color}
        size="sm"
        value={value}
      >
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <span className={`tabular-nums ${textColor}`}>{value.toFixed(2)}%</span>
    </div>
  );
}

let sparklineId = 0;
function RequestsSparkline({ data }: { data: { value: number }[] }) {
  const gradientId = useMemo(() => `server-spark-${++sparklineId}`, []);
  return (
    <div
      className="w-[90px] overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <AreaChart
        data={data}
        height={36}
        margin={{ bottom: 0, left: 0, right: 0, top: 2 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity={0.2}
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <AreaChart.Area
          dataKey="value"
          dot={false}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          type="monotone"
        />
      </AreaChart>
    </div>
  );
}

export const WithCharts: Story = {
  render: function Demo() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Selection>(new Set());
    const [sort, setSort] = useState<SortDescriptor>({
      column: "clusterId",
      direction: "ascending",
    });
    const [status, setStatus] = useState("all");
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
      new Set(serverColumnIds),
    );
    const filtered = useMemo(() => {
      let result = servers;
      if (query) {
        const normalized = query.toLowerCase();
        result = result.filter(
          (server) =>
            server.clusterId.toLowerCase().includes(normalized) ||
            server.region.toLowerCase().includes(normalized),
        );
      }
      if (status !== "all")
        result = result.filter(
          (server) => server.status.toLowerCase() === status,
        );
      return result.toSorted((left, right) => {
        const key = sort.column as keyof Server;
        const leftValue = left[key];
        const rightValue = right[key];
        const comparison =
          typeof leftValue === "number" && typeof rightValue === "number"
            ? leftValue - rightValue
            : String(leftValue).localeCompare(String(rightValue));
        return sort.direction === "descending" ? -comparison : comparison;
      });
    }, [query, sort, status]);
    const visible =
      visibleColumns === "all"
        ? new Set<string>(serverColumnIds)
        : visibleColumns;
    const allColumns: DataGridColumn<Server>[] = [
      {
        accessorKey: "clusterId",
        allowsSorting: true,
        cell: (server) => <ClusterId value={server.clusterId} />,
        header: "Cluster ID",
        id: "clusterId",
        isRowHeader: true,
      },
      {
        accessorKey: "instances",
        align: "center",
        allowsSorting: true,
        header: "Instances",
        id: "instances",
      },
      {
        accessorKey: "status",
        allowsSorting: true,
        cell: (server) => (
          <Chip
            color={server.status === "Active" ? "success" : "default"}
            size="sm"
            variant="soft"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            <Chip.Label>{server.status}</Chip.Label>
          </Chip>
        ),
        header: "Status",
        id: "status",
      },
      {
        accessorKey: "region",
        allowsSorting: true,
        header: "Region",
        id: "region",
      },
      {
        accessorKey: "capacity",
        allowsSorting: true,
        cell: (server) => <Capacity value={server.capacity} />,
        header: "Capacity",
        id: "capacity",
      },
      {
        accessorKey: "cost",
        align: "end",
        allowsSorting: true,
        cell: (server) => (
          <span className="font-medium tabular-nums">
            {formatCurrency(server.cost)}
          </span>
        ),
        header: "Cost",
        id: "cost",
      },
      {
        cell: (server) => <RequestsSparkline data={server.requests} />,
        header: "Requests",
        id: "requests",
      },
    ];
    const serverColumns = allColumns.filter((column) => visible.has(column.id));

    return (
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Servers</h2>
            <Chip size="sm" variant="soft">
              {servers.length}
            </Chip>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Dropdown>
              <Button size="sm" variant="secondary">
                <StoryIcon icon={FilterIcon} /> Filter
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  selectedKeys={new Set([status])}
                  selectionMode="single"
                  onSelectionChange={(keys) =>
                    setStatus(String([...keys][0] ?? "all"))
                  }
                >
                  {[
                    ["all", "All"],
                    ["active", "Active"],
                    ["inactive", "Inactive"],
                  ].map(([id, label]) => (
                    <Dropdown.Item id={id} key={id} textValue={label}>
                      <span>{label}</span>
                      <Dropdown.ItemIndicator />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            <Dropdown>
              <Button size="sm" variant="secondary">
                <StoryIcon icon={SlidersHorizontalIcon} /> Sort
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  selectedKeys={new Set([String(sort.column)])}
                  selectionMode="single"
                  onSelectionChange={(keys) => {
                    const column = [...keys][0];
                    if (!column) return;
                    setSort((current) => ({
                      column,
                      direction:
                        current.column === column &&
                        current.direction === "ascending"
                          ? "descending"
                          : "ascending",
                    }));
                  }}
                >
                  {allColumns
                    .filter((column) => column.allowsSorting)
                    .map((column) => (
                      <Dropdown.Item
                        id={column.id}
                        key={column.id}
                        textValue={String(column.header)}
                      >
                        <span>{column.header}</span>
                        <Dropdown.ItemIndicator />
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            <Dropdown>
              <Button size="sm" variant="secondary">
                <StoryIcon icon={LayoutThreeColumnIcon} /> Columns
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  disallowEmptySelection
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {allColumns.map((column) => (
                    <Dropdown.Item
                      id={column.id}
                      key={column.id}
                      textValue={String(column.header)}
                    >
                      <span>{column.header}</span>
                      <Dropdown.ItemIndicator />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            <SearchField
              aria-label="Search servers"
              value={query}
              onChange={setQuery}
            >
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input
                  className="w-[160px]"
                  placeholder="Search..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>
        </div>
        <DataGrid
          showSelectionCheckboxes
          aria-label="Servers"
          columns={serverColumns}
          data={filtered}
          getRowId={(server) => server.id}
          selectedKeys={selected}
          selectionMode="multiple"
          sortDescriptor={sort}
          variant="primary"
          onSelectionChange={setSelected}
          onSortChange={setSort}
        />
      </div>
    );
  },
};
type Product = {
  cost: number;
  id: number;
  image: string;
  name: string;
  price: number;
  rating: number;
  sku: string;
  sold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  stock: number;
};
const productPrefixes = [
  "Wireless",
  "Portable",
  "Premium",
  "Ultra",
  "Pro",
  "Smart",
  "Compact",
  "Elite",
  "Advanced",
  "Slim",
  "Turbo",
  "Eco",
  "Classic",
  "Deluxe",
  "Mini",
] as const;
const productKinds = [
  "Headphones",
  "Keyboard",
  "Monitor",
  "Mouse",
  "Speaker",
  "Webcam",
  "Charger",
  "Hub",
  "Stand",
  "Lamp",
  "Microphone",
  "Router",
  "Cable",
  "Tablet",
  "Controller",
  "Drive",
  "Dock",
  "Chair",
  "Projector",
  "Sensor",
] as const;
const productBrands = [
  "TechFlow",
  "NovaPeak",
  "ZenCore",
  "PixelForge",
  "CloudNine",
  "ArcWave",
  "PrimeByte",
  "EchoLink",
  "SwiftEdge",
  "NeonPulse",
] as const;
const imageKinds = [
  "dashboard",
  "game",
  "furniture",
  "album",
  "movie",
  "sports",
  "fashion",
  "book",
] as const;
const skuPrefixes = [
  "AUD",
  "KEY",
  "MON",
  "MSE",
  "SPK",
  "CAM",
  "ACC",
  "NET",
  "FRN",
  "LGT",
] as const;
const productSeeded = (seed: number) => {
  const value = Math.sin(seed) * 10_000;
  return value - Math.floor(value);
};
const products: Product[] = Array.from({ length: 1000 }, (_, index) => {
  const random = (offset: number) => productSeeded(index * 7 + offset);
  const prefix =
    productPrefixes[Math.floor(random(1) * productPrefixes.length)]!;
  const kind = productKinds[Math.floor(random(2) * productKinds.length)]!;
  const brand = productBrands[Math.floor(random(3) * productBrands.length)]!;
  const imageKind = imageKinds[index % imageKinds.length]!;
  const skuPrefix = skuPrefixes[Math.floor(random(4) * skuPrefixes.length)]!;
  const availability = random(5);
  const status =
    availability > 0.7
      ? "In Stock"
      : availability > 0.25
        ? "Low Stock"
        : "Out of Stock";
  const price = Math.round(20 + random(6) * 2000);
  return {
    cost: Math.round(price * (0.3 + random(7) * 0.4)),
    id: index + 1,
    image: `https://img.heroui.chat/image/${imageKind}?w=80&h=80&u=${index + 1}`,
    name: `${brand} ${prefix} ${kind}`,
    price,
    rating: Math.round((2.5 + random(10) * 2.5) * 10) / 10,
    sku: `${skuPrefix}-${String(Math.floor(random(8) * 9000 + 1000))}`,
    sold: Math.floor(random(11) * 800) + 5,
    status,
    stock:
      status === "Out of Stock"
        ? 0
        : status === "Low Stock"
          ? Math.floor(random(9) * 5) + 1
          : Math.floor(random(9) * 200) + 5,
  };
});
const productStatusColor = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
} as const;
const productStatusIcon = {
  "In Stock": CheckmarkCircle02Icon,
  "Low Stock": Clock01Icon,
  "Out of Stock": CancelCircleIcon,
} as const;
const formatWholeCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export const Virtualized: Story = {
  render: function Demo() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [selected, setSelected] = useState<Selection>(new Set());
    const filtered = useMemo(() => {
      const statusNames = {
        "in-stock": "In Stock",
        "low-stock": "Low Stock",
        "out-of-stock": "Out of Stock",
      } as const;
      let current = products;
      if (status !== "all")
        current = current.filter(
          (product) =>
            product.status === statusNames[status as keyof typeof statusNames],
        );
      if (query) {
        const normalized = query.toLowerCase();
        current = current.filter(
          (product) =>
            product.name.toLowerCase().includes(normalized) ||
            product.sku.toLowerCase().includes(normalized),
        );
      }
      return current;
    }, [query, status]);
    const profit = useMemo(
      () =>
        filtered.reduce(
          (total, product) =>
            total + (product.price - product.cost) * product.sold,
          0,
        ),
      [filtered],
    );
    const sales = useMemo(
      () => filtered.reduce((total, product) => total + product.sold, 0),
      [filtered],
    );
    const productColumns: DataGridColumn<Product>[] = [
      {
        accessorKey: "name",
        cell: (product) => (
          <div className="flex items-center gap-3">
            <img
              alt={product.name}
              className="bg-surface-secondary size-10 shrink-0 rounded-lg object-cover"
              loading="lazy"
              src={product.image}
            />
            <span className="text-sm font-medium">{product.name}</span>
          </div>
        ),
        header: "Product",
        id: "name",
        isRowHeader: true,
        minWidth: 280,
      },
      {
        accessorKey: "sku",
        cellClassName: "text-muted font-mono text-xs",
        header: "SKU",
        id: "sku",
      },
      {
        accessorKey: "status",
        cell: (product) => (
          <Chip
            className="whitespace-nowrap"
            color={productStatusColor[product.status]}
            size="sm"
            variant="soft"
          >
            <HugeiconsIcon
              className="size-3.5"
              icon={productStatusIcon[product.status]}
              strokeWidth={2}
            />
            <Chip.Label>{product.status}</Chip.Label>
          </Chip>
        ),
        header: "Status",
        id: "status",
        minWidth: 140,
      },
      { accessorKey: "stock", align: "center", header: "Stock", id: "stock" },
      {
        accessorKey: "price",
        align: "end",
        cell: (product) => (
          <span className="tabular-nums">
            {formatWholeCurrency(product.price)}
          </span>
        ),
        header: "Price",
        id: "price",
      },
      {
        accessorKey: "cost",
        align: "end",
        cell: (product) => (
          <span className="tabular-nums">
            {formatWholeCurrency(product.cost)}
          </span>
        ),
        cellClassName: "text-muted",
        header: "Cost",
        id: "cost",
      },
      {
        accessorKey: "rating",
        cell: (product) => (
          <Rating
            isReadOnly
            aria-label={`${product.rating} stars`}
            size="sm"
            value={product.rating}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Rating.Item key={value} value={value} />
            ))}
          </Rating>
        ),
        header: "Rating",
        id: "rating",
      },
      {
        accessorKey: "sold",
        align: "end",
        cell: (product) => (
          <span className="tabular-nums">{product.sold.toLocaleString()}</span>
        ),
        header: "Sales",
        id: "sold",
      },
    ];
    const selectedCount = selected === "all" ? filtered.length : selected.size;

    return (
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <Segment selectedKey={status} onSelectionChange={setStatus}>
            <Segment.Item id="all">All</Segment.Item>
            <Segment.Item id="in-stock">In Stock</Segment.Item>
            <Segment.Item id="out-of-stock">Out of Stock</Segment.Item>
            <Segment.Item id="low-stock">Low Stock</Segment.Item>
          </Segment>
          <SearchField
            aria-label="Search products"
            value={query}
            onChange={setQuery}
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[180px]"
                placeholder="Search..."
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>
        <DataGrid
          showSelectionCheckboxes
          virtualized
          aria-label="Product inventory"
          columns={productColumns}
          contentClassName="h-[600px] min-w-[900px] overflow-auto"
          data={filtered}
          getRowId={(product) => product.id}
          headingHeight={37}
          renderEmptyState={() => "No products match the current filters."}
          rowHeight={58}
          selectedKeys={selected}
          selectionMode="multiple"
          variant="primary"
          onSelectionChange={setSelected}
        />
        <div className="flex items-center justify-between px-4 text-sm">
          <span className="text-muted">
            {filtered.length.toLocaleString()} products
            {selectedCount > 0
              ? ` · ${selectedCount.toLocaleString()} selected`
              : null}
          </span>
          <div className="flex gap-6">
            <span className="text-muted">
              Profit:{" "}
              <span className="text-foreground font-medium tabular-nums">
                {formatWholeCurrency(profit)}
              </span>
            </span>
            <span className="text-muted">
              Sales:{" "}
              <span className="text-foreground font-medium tabular-nums">
                {sales.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>
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
type Feature = {
  effort: number;
  enabled: boolean;
  id: string;
  priority: "high" | "low" | "medium";
  title: string;
};
const features: Feature[] = [
  {
    effort: 8,
    enabled: true,
    id: "feat-1",
    priority: "high",
    title: "Dark mode",
  },
  {
    effort: 3,
    enabled: true,
    id: "feat-2",
    priority: "medium",
    title: "CSV export",
  },
  {
    effort: 5,
    enabled: false,
    id: "feat-3",
    priority: "low",
    title: "Keyboard shortcuts",
  },
  {
    effort: 13,
    enabled: true,
    id: "feat-4",
    priority: "high",
    title: "Two-factor auth",
  },
  {
    effort: 8,
    enabled: false,
    id: "feat-5",
    priority: "medium",
    title: "Bulk import",
  },
  {
    effort: 5,
    enabled: true,
    id: "feat-6",
    priority: "high",
    title: "Audit log",
  },
  {
    effort: 3,
    enabled: false,
    id: "feat-7",
    priority: "low",
    title: "Webhooks",
  },
  {
    effort: 8,
    enabled: true,
    id: "feat-8",
    priority: "medium",
    title: "Custom branding",
  },
];
const featurePriorities = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
] as const;

function EditableTitle({
  onSave,
  value,
}: {
  onSave: (value: string) => void;
  value: string;
}) {
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const save = () => {
    if (draft.trim()) onSave(draft.trim());
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return isEditing ? (
    <div className="flex items-center gap-1">
      <TextField
        autoFocus
        aria-label="Edit title"
        value={draft}
        onChange={setDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") save();
          if (event.key === "Escape") cancel();
        }}
      >
        <Input className="h-7 w-[180px] text-sm" />
      </TextField>
      <Button
        isIconOnly
        aria-label="Save"
        size="sm"
        variant="ghost"
        onPress={save}
      >
        <HugeiconsIcon className="size-3" icon={Tick02Icon} strokeWidth={2} />
      </Button>
      <Button
        isIconOnly
        aria-label="Cancel"
        size="sm"
        variant="ghost"
        onPress={cancel}
      >
        <HugeiconsIcon className="size-3" icon={Cancel01Icon} strokeWidth={2} />
      </Button>
    </div>
  ) : (
    <div className="group/edit flex items-center gap-1.5">
      <span className="text-sm font-medium">{value}</span>
      <Button
        isIconOnly
        aria-label="Edit title"
        className="opacity-0 group-hover/edit:opacity-100"
        size="sm"
        variant="ghost"
        onPress={() => setEditing(true)}
      >
        <HugeiconsIcon
          className="size-3"
          icon={PencilEdit01Icon}
          strokeWidth={2}
        />
      </Button>
    </div>
  );
}

export const EditableCells: Story = {
  render: function Demo() {
    const [data, setData] = useState(features);
    const update = (id: string, values: Partial<Feature>) =>
      setData((current) =>
        current.map((feature) =>
          feature.id === id ? { ...feature, ...values } : feature,
        ),
      );
    const editableColumns: DataGridColumn<Feature>[] = [
      {
        cell: (feature) => (
          <EditableTitle
            value={feature.title}
            onSave={(title) => update(feature.id, { title })}
          />
        ),
        header: "Feature",
        id: "title",
        isRowHeader: true,
        minWidth: 260,
      },
      {
        accessorKey: "priority",
        cell: (feature) => (
          <Select
            aria-label="Priority"
            selectedKey={feature.priority}
            onSelectionChange={(priority) => {
              if (priority)
                update(feature.id, {
                  priority: priority as Feature["priority"],
                });
            }}
          >
            <Select.Trigger>
              <Select.Value>
                <Chip
                  color={priorityColor[feature.priority]}
                  size="sm"
                  variant="soft"
                >
                  <Chip.Label className="capitalize">
                    {feature.priority}
                  </Chip.Label>
                </Chip>
              </Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {featurePriorities.map((priority) => (
                  <ListBox.Item
                    id={priority.id}
                    key={priority.id}
                    textValue={priority.label}
                  >
                    <Chip
                      color={priorityColor[priority.id]}
                      size="sm"
                      variant="soft"
                    >
                      <Chip.Label>{priority.label}</Chip.Label>
                    </Chip>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        ),
        header: "Priority",
        id: "priority",
        minWidth: 150,
      },
      {
        accessorKey: "effort",
        align: "center",
        cell: (feature) => (
          <NumberStepper
            aria-label="Story points"
            maxValue={21}
            minValue={1}
            size="sm"
            value={feature.effort}
            onChange={(effort) => update(feature.id, { effort })}
          >
            <NumberStepper.Group>
              <NumberStepper.DecrementButton />
              <NumberStepper.Value />
              <NumberStepper.IncrementButton />
            </NumberStepper.Group>
          </NumberStepper>
        ),
        header: "Story Points",
        id: "effort",
        minWidth: 120,
      },
      {
        accessorKey: "enabled",
        align: "center",
        cell: (feature) => (
          <Switch
            aria-label="Enabled"
            isSelected={feature.enabled}
            onChange={(enabled) => update(feature.id, { enabled })}
          >
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        ),
        header: "Enabled",
        id: "enabled",
        minWidth: 100,
      },
    ];
    const enabled = data.filter((feature) => feature.enabled).length;
    const effort = data.reduce((total, feature) => total + feature.effort, 0);

    return (
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Feature Flags</h2>
          <p className="text-muted text-sm">
            Edit titles, change priorities, adjust story points, and toggle
            features inline.
          </p>
        </div>
        <DataGrid
          aria-label="Feature flags"
          columns={editableColumns}
          data={data}
          getRowId={(feature) => feature.id}
        />
        <div className="text-muted flex items-center gap-4 text-sm">
          <span>
            {enabled} of {data.length} enabled
          </span>
          <span>Total effort: {effort} pts</span>
        </div>
      </div>
    );
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
