// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Charts
import type { Selection, SortDescriptor } from "react-aria-components";

import { useMemo, useState } from "react";

import {
  Copy01Icon,
  FilterIcon,
  MoreVerticalIcon,
  LayoutThreeColumnIcon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { AreaChart } from "@thenamespace/uikit/area-chart";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { Input } from "@thenamespace/uikit/input";
import { ProgressCircle } from "@thenamespace/uikit/progress-circle";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Tooltip } from "@thenamespace/uikit/tooltip";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);

function StoryIcon({ icon }: { icon: typeof MoreVerticalIcon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

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

export const ProWithChartsExample = function Demo() {
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
};
