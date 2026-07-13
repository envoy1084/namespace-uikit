"use client";

// @demo-title Default
import type { Selection } from "react-aria-components";

import { useState } from "react";

import {
  Copy01Icon,
  Delete02Icon,
  MoreVerticalIcon,
  PencilEdit01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Dropdown } from "@thenamespace/uikit/dropdown";

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

export const DemoDefaultExample = function DefaultDemo() {
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
};
