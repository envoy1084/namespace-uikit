// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Virtualized
import type { Selection } from "react-aria-components";

import { useMemo, useState } from "react";

import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { Input } from "@thenamespace/uikit/input";
import { Rating } from "@thenamespace/uikit/rating";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Segment } from "@thenamespace/uikit/segment";

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
    image: `/assets/generated/avatar-${(index % 26) + 1}.jpg`,
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

export const DemoVirtualizedExample = function Demo() {
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
            <SearchField.Input className="w-[180px]" placeholder="Search..." />
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
};
