"use client";

// @demo-title Pinned Columns Compact
import type { Selection } from "react-aria-components";

import { useMemo, useState } from "react";

import {
  ArrowDown01Icon,
  CircleIcon,
  FilterIcon,
  Link01Icon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { Input } from "@thenamespace/uikit/input";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Separator } from "@thenamespace/uikit/separator";

type Company = {
  categories: string[];
  connectionStrength:
    | "No communication"
    | "Strong"
    | "Very strong"
    | "Very weak"
    | "Weak";
  country: string;
  dotColor: string;
  id: number;
  lastInteraction: null | string;
  linkedin: string;
  name: string;
  twitterFollowers: number;
  twitterHandle: string;
};

const categoryClasses: Record<string, string> = {
  Airlines: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
  Automation:
    "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400",
  B2B: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  B2C: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  Broadcasting: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  "Consumer Discretionary":
    "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400",
  "Consumer Electronics":
    "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400",
  "E-commerce":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Enterprise:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Finance: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  "Financial Services":
    "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  Food: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
  ISP: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400",
  "Information Technology":
    "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400",
  Internet: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  Marketplace:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Mobile:
    "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-400",
  Performance:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  Publishing:
    "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-400",
  SaaS: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",
  Transportation:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
};

const companies: Company[] = [
  {
    categories: ["B2C", "Consumer Discretionary", "E-commerce"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-amber-500",
    id: 1,
    lastInteraction: null,
    linkedin: "lvmh",
    name: "LVMH",
    twitterFollowers: 198135,
    twitterHandle: "LVMH",
  },
  {
    categories: ["B2C", "E-commerce"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-emerald-500",
    id: 2,
    lastInteraction: null,
    linkedin: "disneymusicgroup",
    name: "Disney",
    twitterFollowers: 10140332,
    twitterHandle: "Disney",
  },
  {
    categories: [
      "B2C",
      "Finance",
      "Financial Services",
      "Information Technology",
    ],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-blue-500",
    id: 3,
    lastInteraction: null,
    linkedin: "paypal",
    name: "PayPal",
    twitterFollowers: 969425,
    twitterHandle: "PayPal",
  },
  {
    categories: ["Airlines", "B2C", "E-commerce", "Transportation"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-sky-500",
    id: 4,
    lastInteraction: null,
    linkedin: "united-airlines",
    name: "United Airlines",
    twitterFollowers: 1174209,
    twitterHandle: "united",
  },
  {
    categories: ["B2C", "Consumer Electronics", "E-commerce"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-gray-800 dark:bg-gray-300",
    id: 5,
    lastInteraction: null,
    linkedin: "apple",
    name: "Apple",
    twitterFollowers: 9119742,
    twitterHandle: "Apple",
  },
  {
    categories: ["B2B", "Enterprise", "Information Technology", "Publishing"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-red-500",
    id: 6,
    lastInteraction: null,
    linkedin: "microsoft",
    name: "Microsoft",
    twitterFollowers: 12814907,
    twitterHandle: "Microsoft",
  },
  {
    categories: ["B2C", "Internet", "Marketplace"],
    connectionStrength: "No communication",
    country: "US",
    dotColor: "bg-rose-500",
    id: 7,
    lastInteraction: null,
    linkedin: "airbnb",
    name: "Airbnb",
    twitterFollowers: 883549,
    twitterHandle: "Airbnb",
  },
  {
    categories: ["B2C", "E-commerce", "Food", "Marketplace"],
    connectionStrength: "Very strong",
    country: "US",
    dotColor: "bg-green-500",
    id: 8,
    lastInteraction: "about 2 hours ago",
    linkedin: "sweetgreen",
    name: "sweetgreen",
    twitterFollowers: 3200,
    twitterHandle: "sweetgreen",
  },
  {
    categories: ["B2B", "B2C", "SaaS", "Internet", "ISP"],
    connectionStrength: "Weak",
    country: "US",
    dotColor: "bg-indigo-500",
    id: 9,
    lastInteraction: "2 days ago",
    linkedin: "openphone",
    name: "OpenPhone",
    twitterFollowers: 8400,
    twitterHandle: "OpenPhone",
  },
  {
    categories: ["B2B", "B2C", "E-commerce", "Information Technology"],
    connectionStrength: "No communication",
    country: "UK",
    dotColor: "bg-blue-600",
    id: 10,
    lastInteraction: null,
    linkedin: "intercom",
    name: "Intercom",
    twitterFollowers: 42427,
    twitterHandle: "intercom",
  },
  {
    categories: ["Automation", "B2B", "Enterprise", "Information Technology"],
    connectionStrength: "Very weak",
    country: "UK",
    dotColor: "bg-purple-500",
    id: 11,
    lastInteraction: "about 3 hours ago",
    linkedin: "attio",
    name: "Attio",
    twitterFollowers: 1340,
    twitterHandle: "attio",
  },
  {
    categories: [
      "B2B",
      "B2C",
      "Information Technology",
      "Mobile",
      "Performance",
    ],
    connectionStrength: "Very weak",
    country: "DE",
    dotColor: "bg-red-600",
    id: 12,
    lastInteraction: "14 days ago",
    linkedin: "opera-software",
    name: "Opera",
    twitterFollowers: 63000,
    twitterHandle: "opera",
  },
  {
    categories: ["B2B", "B2C", "Broadcasting", "Information Technology"],
    connectionStrength: "Weak",
    country: "US",
    dotColor: "bg-blue-500",
    id: 13,
    lastInteraction: "9 days ago",
    linkedin: "google",
    name: "Google",
    twitterFollowers: 28946065,
    twitterHandle: "Google",
  },
];

const strengthRank: Record<Company["connectionStrength"], number> = {
  "No communication": 0,
  "Very weak": 1,
  Weak: 2,
  Strong: 3,
  "Very strong": 4,
};

const strengthClasses: Record<
  Company["connectionStrength"],
  { color: string; dot: string }
> = {
  "No communication": { color: "text-muted", dot: "text-muted" },
  Strong: {
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "text-emerald-500",
  },
  "Very strong": {
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "text-emerald-500",
  },
  "Very weak": { color: "text-red-600 dark:text-red-400", dot: "text-red-500" },
  Weak: { color: "text-amber-600 dark:text-amber-400", dot: "text-amber-500" },
};

function CompanyCategories({ categories }: { categories: string[] }) {
  const shown = categories.slice(0, 3);
  const remaining = categories.length - shown.length;
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {shown.map((category) => (
        <span
          key={category}
          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] leading-none font-medium ${categoryClasses[category] ?? "bg-default text-foreground"}`}
        >
          {category.length > 14 ? `${category.slice(0, 12)}…` : category}
        </span>
      ))}
      {remaining > 0 ? (
        <span className="text-muted text-[11px]">+{remaining}</span>
      ) : null}
    </span>
  );
}

function ConnectionStrength({
  strength,
}: {
  strength: Company["connectionStrength"];
}) {
  const classes = strengthClasses[strength];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${classes.color}`}
    >
      <HugeiconsIcon
        className={`size-2 ${classes.dot}`}
        icon={CircleIcon}
        fill="currentColor"
        strokeWidth={0}
      />
      {strength}
    </span>
  );
}

export const DemoPinnedColumnsCompactExample = function Demo() {
  const [selected, setSelected] = useState<Selection>(new Set());
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [strength, setStrength] = useState("all");
  const filtered = useMemo(() => {
    let result = companies;
    if (region === "us")
      result = result.filter((company) => company.country === "US");
    else if (region === "europe")
      result = result.filter((company) =>
        ["UK", "DE", "FR"].includes(company.country),
      );
    if (strength !== "all")
      result = result.filter(
        (company) =>
          company.connectionStrength.toLowerCase().replace(/\s+/g, "-") ===
          strength,
      );
    if (query) {
      const normalized = query.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(normalized) ||
          company.linkedin.toLowerCase().includes(normalized) ||
          company.categories.some((category) =>
            category.toLowerCase().includes(normalized),
          ),
      );
    }
    return result;
  }, [query, region, strength]);
  const companyColumns: DataGridColumn<Company>[] = [
    {
      accessorKey: "name",
      allowsSorting: true,
      cell: (company) => (
        <span className="inline-flex items-center gap-2">
          <span
            className={`size-2.5 shrink-0 rounded-full ${company.dotColor}`}
          />
          <span className="text-xs font-medium">{company.name}</span>
        </span>
      ),
      header: "Company",
      id: "name",
      isRowHeader: true,
      minWidth: 160,
      pinned: "start",
    },
    {
      cell: (company) => <CompanyCategories categories={company.categories} />,
      header: "Categories",
      id: "categories",
      minWidth: 240,
    },
    {
      accessorKey: "linkedin",
      cell: (company) => (
        <span className="text-muted inline-flex items-center gap-1 text-xs">
          <HugeiconsIcon
            aria-hidden
            className="size-3 shrink-0 opacity-50"
            icon={Link01Icon}
            strokeWidth={2}
          />
          {company.linkedin}
        </span>
      ),
      header: "LinkedIn",
      id: "linkedin",
      minWidth: 140,
    },
    {
      accessorKey: "lastInteraction",
      allowsSorting: true,
      cell: (company) => (
        <span className="text-muted text-xs">
          {company.lastInteraction ?? "No contact"}
        </span>
      ),
      header: "Last interaction",
      id: "lastInteraction",
      minWidth: 130,
    },
    {
      allowsSorting: true,
      cell: (company) => (
        <ConnectionStrength strength={company.connectionStrength} />
      ),
      header: "Connection strength",
      id: "connectionStrength",
      minWidth: 160,
      sortFn: (left, right) =>
        strengthRank[left.connectionStrength] -
        strengthRank[right.connectionStrength],
    },
    {
      accessorKey: "twitterFollowers",
      align: "end",
      allowsSorting: true,
      cell: (company) => (
        <span className="text-xs tabular-nums">
          {company.twitterFollowers.toLocaleString()}
        </span>
      ),
      header: "Twitter followers",
      id: "twitterFollowers",
      minWidth: 120,
    },
    {
      cell: (company) => (
        <span className="text-accent text-xs">{company.twitterHandle}</span>
      ),
      header: "Twitter",
      id: "twitter",
      minWidth: 100,
    },
  ];
  return (
    <div
      className="flex w-full flex-col gap-3"
      style={
        {
          "--radius": "0.375rem",
          "--spacing": "0.2rem",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold">Companies</h2>
          <Dropdown>
            <Button size="sm" variant="ghost">
              <span className="bg-success size-2 shrink-0 rounded-full" />
              {region === "all"
                ? "All Companies"
                : region === "us"
                  ? "US Companies"
                  : "UK & European Co."}
              <HugeiconsIcon
                className="text-muted size-3"
                icon={ArrowDown01Icon}
                strokeWidth={2}
              />
            </Button>
            <Dropdown.Popover className="min-w-[200px]">
              <Dropdown.Menu
                selectedKeys={new Set([region])}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const key = [...keys][0];
                  if (key) setRegion(String(key));
                }}
              >
                {[
                  ["all", "All Companies"],
                  ["us", "US Companies"],
                  ["europe", "UK & European Co."],
                ].map(([id, label]) => (
                  <Dropdown.Item id={id} key={id} textValue={label}>
                    <span>{label}</span>
                    <Dropdown.ItemIndicator />
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <HugeiconsIcon
              className="size-3.5"
              icon={SlidersHorizontalIcon}
              strokeWidth={2}
            />
            Sort
          </Button>
          <Dropdown>
            <Button size="sm" variant="ghost">
              <HugeiconsIcon
                className="size-3.5"
                icon={FilterIcon}
                strokeWidth={2}
              />
              Filter
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                selectedKeys={new Set([strength])}
                selectionMode="single"
                onSelectionChange={(keys) =>
                  setStrength(String([...keys][0] ?? "all"))
                }
              >
                {[
                  ["all", "All"],
                  ["very-strong", "Very strong"],
                  ["strong", "Strong"],
                  ["weak", "Weak"],
                  ["very-weak", "Very weak"],
                  ["no-communication", "No communication"],
                ].map(([id, label]) => (
                  <Dropdown.Item id={id} key={id} textValue={label}>
                    <span>{label}</span>
                    <Dropdown.ItemIndicator />
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <Separator className="!h-4 self-center" orientation="vertical" />
          <SearchField
            aria-label="Search companies"
            value={query}
            onChange={setQuery}
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[140px] text-xs"
                placeholder="Search..."
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>
      </div>
      <DataGrid
        showSelectionCheckboxes
        aria-label="Companies"
        className="[&_.table__cell]:py-1.5 [&_.table__cell]:text-xs [&_.table__column]:py-1.5 [&_.table__column]:text-[11px]"
        columns={companyColumns}
        contentClassName="min-w-[1100px]"
        data={filtered}
        getRowId={(company) => company.id}
        selectedKeys={selected}
        selectionMode="multiple"
        variant="primary"
        onSelectionChange={setSelected}
      />
      <span className="text-muted px-1 text-xs">{filtered.length} count</span>
    </div>
  );
};
