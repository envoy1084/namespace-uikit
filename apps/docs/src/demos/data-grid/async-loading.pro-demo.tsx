"use client";

// @demo-title Async Loading
import { useState } from "react";

import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import { Spinner } from "@thenamespace/uikit/spinner";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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

export const ProAsyncLoadingExample = function Demo() {
  const [data, setData] = useState(() => generateInvoices(0, invoicePageSize));
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
};
