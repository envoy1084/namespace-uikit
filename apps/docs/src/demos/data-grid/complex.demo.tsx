// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Complex
import type { Selection, SortDescriptor } from "react-aria-components";

import { useMemo, useState } from "react";

import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import {
  Add01Icon,
  Calendar03Icon,
  Cancel01Icon,
  Copy01Icon,
  FilterIcon,
  MoreVerticalIcon,
  LayoutThreeColumnIcon,
  SlidersHorizontalIcon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { Input } from "@thenamespace/uikit/input";
import { Link } from "@thenamespace/uikit/link";
import { ListBox } from "@thenamespace/uikit/list-box";
import { Pagination } from "@thenamespace/uikit/pagination";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Select } from "@thenamespace/uikit/select";
import { Separator } from "@thenamespace/uikit/separator";
import { Tooltip } from "@thenamespace/uikit/tooltip";

function StoryIcon({ icon }: { icon: typeof MoreVerticalIcon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

function MemberActions() {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Row actions" size="sm" variant="tertiary">
        <StoryIcon icon={MoreVerticalIcon} />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu aria-label="Row actions">
          <Dropdown.Item id="view" textValue="View">
            <span>View</span>
          </Dropdown.Item>
          <Dropdown.Item id="edit" textValue="Edit">
            <span>Edit</span>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <span>Delete</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

type Country = { code: string; name: string };

type Worker = {
  avatar: string;
  country: Country;
  email: string;
  externalWorkerId: string;
  id: number;
  name: string;
  role: string;
  startDate: string;
  status: "Active" | "Inactive" | "Vacation";
  teams: string[];
  workerId: string;
  workerType: "Contractor" | "Employee";
};

const workerNames = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "David Wilson",
  "Eve Martinez",
  "Frank Thompson",
  "Grace Garcia",
  "Hannah Lee",
  "Isaac Anderson",
  "Julia Roberts",
  "Liam Williams",
  "Mia White",
  "Noah Harris",
  "Olivia Martin",
  "Peyton Jones",
  "Quinn Taylor",
  "Ryan Moore",
  "Sophia Davis",
  "Marcus Lopez",
  "Uma Thomas",
  "Victoria Jackson",
  "William Green",
  "Xavier Hill",
  "Yara Scott",
  "Zoe Baker",
  "Aaron Carter",
  "Bella Brown",
  "Carter Black",
  "Daisy Clark",
  "Ethan Hunt",
  "Fiona Apple",
  "George King",
  "Harper Knight",
  "Ivy Lane",
  "Jack Frost",
  "Kylie Reed",
  "Lucas Grant",
  "Molly Shaw",
  "Nathan Ford",
  "Oliver Stone",
  "Penelope Cruz",
  "Quentin Cook",
  "Ruby Fox",
  "Sarah Miles",
  "Travis Shaw",
  "Ursula Major",
  "Vera Mindy",
  "Wesley Snipes",
  "Xena Warrior",
  "Yvette Fielding",
] as const;

const workerRoles = [
  "Software Engineer",
  "Marketing Specialist",
  "HR Manager",
  "Data Analyst",
  "Project Manager",
  "Sales Executive",
  "Graphic Designer",
  "Operations Coordinator",
  "Product Manager",
  "Customer Service Representative",
  "Network Administrator",
  "QA Tester",
  "Business Analyst",
  "Content Writer",
  "UX/UI Designer",
  "Accountant",
  "Supply Chain Analyst",
  "Social Media Manager",
  "Web Developer",
  "Technical Support Specialist",
  "Logistics Manager",
  "Environmental Scientist",
] as const;

const countries: Country[] = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "cn", name: "China" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "jp", name: "Japan" },
  { code: "pt", name: "Portugal" },
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "in", name: "India" },
  { code: "mx", name: "Mexico" },
  { code: "kr", name: "South Korea" },
  { code: "es", name: "Spain" },
];

const teamNames = [
  "Product",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Support",
  "Management",
  "Other",
] as const;

const workerStatuses = ["Active", "Inactive", "Vacation"] as const;

const workerTypes = ["Employee", "Contractor"] as const;

const workerSeeded = (seed: number) => {
  const value = Math.sin(seed) * 10_000;
  return value - Math.floor(value);
};

const randomDate = (seed: number) => {
  const start = new Date(2025, 0, 1).getTime();
  const range = 500 * 24 * 60 * 60 * 1000;
  return new Date(start + workerSeeded(seed) * range)
    .toISOString()
    .split("T")[0]!;
};

const randomTeams = (seed: number) => {
  const count = Math.floor(workerSeeded(seed) * 5) + 1;
  return [...teamNames]
    .toSorted(() => workerSeeded(seed + 99) - 0.5)
    .slice(0, count);
};

const workerId = (seed: number) =>
  `WRK-${Math.floor(workerSeeded(seed) * 9_000_000) + 1_000_000}`;

const externalId = (seed: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let value = "EXT-";
  for (let index = 0; index < 8; index++)
    value +=
      alphabet[Math.floor(workerSeeded(seed + index * 3) * alphabet.length)];
  return value;
};

const workers: Worker[] = Array.from({ length: 100 }, (_, index) => {
  const random = (offset: number) => workerSeeded(index * 7 + offset);
  const name = workerNames[Math.floor(random(1) * workerNames.length)]!;
  const statusIndex =
    (index * 3 + Math.floor(random(5) * 7)) % workerStatuses.length;
  return {
    avatar: `/assets/generated/avatar-${(index % 26) + 1}.jpg`,
    country: countries[Math.floor(random(3) * countries.length)]!,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    externalWorkerId: externalId(index * 17 + 5),
    id: index + 1,
    name,
    role: workerRoles[Math.floor(random(2) * workerRoles.length)]!,
    startDate: randomDate(index * 13 + 7),
    status: workerStatuses[statusIndex]!,
    teams: randomTeams(index * 11 + 3),
    workerId: workerId(index * 13 + 1),
    workerType: workerTypes[Math.floor(random(4) * workerTypes.length)]!,
  };
});

const workerColumnIds = [
  "workerId",
  "externalWorkerId",
  "name",
  "country",
  "role",
  "workerType",
  "status",
  "startDate",
  "teams",
  "actions",
] as const;

const workerStatusColor = {
  Active: "success",
  Inactive: "danger",
  Vacation: "warning",
} as const;

function CopyValue({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Tooltip>
        <Button
          isIconOnly
          aria-label="Copy"
          className="text-muted hover:text-foreground size-5 min-h-5 min-w-5"
          size="sm"
          variant="ghost"
          onPress={() => void navigator.clipboard.writeText(children)}
        >
          <HugeiconsIcon className="size-3" icon={Copy01Icon} strokeWidth={2} />
        </Button>
        <Tooltip.Content>Copy</Tooltip.Content>
      </Tooltip>
      <span className="text-muted text-xs">{children}</span>
    </span>
  );
}

function CountryCell({ country }: { country: Country }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        alt={country.name}
        className="shrink-0 rounded-sm object-cover"
        height={14}
        src={`/assets/flags/${country.code}.png`}
        width={20}
      />
      <span className="text-sm">{country.name}</span>
    </span>
  );
}

function TeamChips({ teams }: { teams: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {teams.slice(0, 3).map((team) => (
        <Chip key={team} size="sm" variant="secondary">
          <Chip.Label>{team}</Chip.Label>
        </Chip>
      ))}
      {teams.length > 3 ? (
        <Chip size="sm" variant="secondary">
          <Chip.Label>+{teams.length - 3}</Chip.Label>
        </Chip>
      ) : null}
    </span>
  );
}

export const DemoComplexExample = function Demo() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Selection>(new Set());
  const [sort, setSort] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(workerColumnIds),
  );
  const filtered = useMemo(() => {
    let result = workers;
    if (query) {
      const normalized = query.toLowerCase();
      result = result.filter((worker) =>
        [
          worker.name,
          worker.email,
          worker.workerId,
          worker.externalWorkerId,
        ].some((value) => value.toLowerCase().includes(normalized)),
      );
    }
    if (status !== "all")
      result = result.filter(
        (worker) => worker.status.toLowerCase() === status,
      );
    if (type !== "all")
      result = result.filter(
        (worker) => worker.workerType.toLowerCase() === type,
      );
    return result;
  }, [query, status, type]);
  const sorted = useMemo(
    () =>
      filtered.toSorted((left, right) => {
        const key = sort.column as keyof Worker;
        const leftValue =
          key === "country"
            ? left.country.name
            : key === "teams"
              ? left.teams.join(", ")
              : String(left[key] ?? "");
        const rightValue =
          key === "country"
            ? right.country.name
            : key === "teams"
              ? right.teams.join(", ")
              : String(right[key] ?? "");
        const comparison = leftValue.localeCompare(rightValue);
        return sort.direction === "descending" ? -comparison : comparison;
      }),
    [filtered, sort],
  );
  const pageCount = Math.ceil(sorted.length / pageSize) || 1;
  const currentPage = Math.min(page, pageCount);
  const paginationPages: (number | "ellipsis")[] =
    pageCount <= 5
      ? Array.from({ length: pageCount }, (_, index) => index + 1)
      : [1, 2, "ellipsis", pageCount];
  const pageData = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const visible =
    visibleColumns === "all"
      ? new Set<string>(workerColumnIds)
      : visibleColumns;
  const selectedCount = selected === "all" ? sorted.length : selected.size;
  const allColumns: DataGridColumn<Worker>[] = [
    {
      accessorKey: "workerId",
      allowsSorting: true,
      cell: (worker) => <CopyValue>{worker.workerId}</CopyValue>,
      header: "Worker ID",
      id: "workerId",
      isRowHeader: true,
      minWidth: 100,
    },
    {
      accessorKey: "externalWorkerId",
      allowsSorting: true,
      cell: (worker) => <CopyValue>{worker.externalWorkerId}</CopyValue>,
      header: "External Worker ID",
      id: "externalWorkerId",
      minWidth: 160,
    },
    {
      accessorKey: "name",
      allowsSorting: true,
      cell: (worker) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image alt={worker.name} src={worker.avatar} />
            <Avatar.Fallback>
              {worker.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{worker.name}</span>
            <span className="text-muted text-xs">{worker.email}</span>
          </div>
        </div>
      ),
      header: "Member",
      id: "name",
      minWidth: 220,
      pinned: "start",
    },
    {
      accessorKey: "country",
      allowsSorting: true,
      cell: (worker) => <CountryCell country={worker.country} />,
      header: "Country",
      id: "country",
      minWidth: 140,
    },
    {
      accessorKey: "role",
      allowsSorting: true,
      header: "Role",
      id: "role",
      minWidth: 140,
    },
    {
      accessorKey: "workerType",
      allowsSorting: true,
      header: "Worker Type",
      id: "workerType",
      minWidth: 110,
    },
    {
      accessorKey: "status",
      allowsSorting: true,
      cell: (worker) => (
        <Chip color={workerStatusColor[worker.status]} size="sm" variant="soft">
          <span aria-hidden className="size-1.5 rounded-full bg-current" />
          <Chip.Label>{worker.status}</Chip.Label>
        </Chip>
      ),
      header: "Status",
      id: "status",
      minWidth: 100,
    },
    {
      accessorKey: "startDate",
      allowsSorting: true,
      cell: (worker) => (
        <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap">
          <HugeiconsIcon
            className="text-muted size-3.5"
            icon={Calendar03Icon}
            strokeWidth={2}
          />
          {new Date(worker.startDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      ),
      header: "Start Date",
      id: "startDate",
      minWidth: 150,
    },
    {
      accessorKey: "teams",
      cell: (worker) => <TeamChips teams={worker.teams} />,
      header: "Teams",
      id: "teams",
      minWidth: 260,
    },
    {
      align: "end",
      cell: () => <MemberActions />,
      header: "",
      id: "actions",
      minWidth: 50,
      pinned: "end",
      width: 50,
    },
  ];
  const displayedColumns = allColumns.map((column) => ({
    ...column,
    isHidden: column.id !== "actions" && !visible.has(column.id),
  }));
  const filterMenu = (
    value: string,
    setValue: (value: string) => void,
    items: [string, string][],
  ) => (
    <Dropdown.Popover>
      <Dropdown.Menu
        selectedKeys={new Set([value])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          setValue(String([...keys][0] ?? "all"));
          setPage(1);
        }}
      >
        {items.map(([id, label]) => (
          <Dropdown.Item id={id} key={id} textValue={label}>
            <span>{label}</span>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Team Members</h2>
          <Chip size="sm" variant="soft">
            {workers.length}
          </Chip>
        </div>
        <Button variant="primary">
          Add Member <StoryIcon icon={Add01Icon} />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <SearchField
          aria-label="Search members"
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
        >
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[200px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Dropdown>
          <Button size="sm" variant="secondary">
            <StoryIcon icon={FilterIcon} /> Worker Type
          </Button>
          {filterMenu(type, setType, [
            ["all", "All"],
            ["employee", "Employee"],
            ["contractor", "Contractor"],
          ])}
        </Dropdown>
        <Dropdown>
          <Button size="sm" variant="secondary">
            <StoryIcon icon={FilterIcon} /> Status
          </Button>
          {filterMenu(status, setStatus, [
            ["all", "All"],
            ["active", "Active"],
            ["inactive", "Inactive"],
            ["vacation", "Vacation"],
          ])}
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
                if (column)
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
              {allColumns
                .filter((column) => column.id !== "actions")
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
        {selectedCount > 0 ? (
          <>
            <Separator className="!h-5 self-center" orientation="vertical" />
            <span className="text-muted text-sm whitespace-nowrap">
              {selectedCount} Selected
            </span>
          </>
        ) : null}
      </div>
      {query || type !== "all" || status !== "all" ? (
        <div className="flex flex-wrap items-center gap-2">
          {query ? (
            <Chip size="sm" variant="secondary">
              <Chip.Label>Search: {query}</Chip.Label>
              <button
                aria-label="Clear search"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                type="button"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
              >
                <HugeiconsIcon className="size-3" icon={Cancel01Icon} />
              </button>
            </Chip>
          ) : null}
          {type !== "all" ? (
            <Chip size="sm" variant="secondary">
              <Chip.Label>
                Type: <span className="capitalize">{type}</span>
              </Chip.Label>
              <button
                aria-label="Clear worker type filter"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                type="button"
                onClick={() => setType("all")}
              >
                <HugeiconsIcon className="size-3" icon={Cancel01Icon} />
              </button>
            </Chip>
          ) : null}
          {status !== "all" ? (
            <Chip size="sm" variant="secondary">
              <Chip.Label>
                Status: <span className="capitalize">{status}</span>
              </Chip.Label>
              <button
                aria-label="Clear status filter"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                type="button"
                onClick={() => setStatus("all")}
              >
                <HugeiconsIcon className="size-3" icon={Cancel01Icon} />
              </button>
            </Chip>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              setQuery("");
              setType("all");
              setStatus("all");
              setPage(1);
            }}
          >
            Clear all
          </Button>
        </div>
      ) : null}
      <DataGrid
        allowsColumnResize
        showSelectionCheckboxes
        aria-label="Team Members"
        columns={displayedColumns}
        contentClassName="min-w-[1600px]"
        data={pageData}
        getRowId={(worker) => worker.id}
        selectedKeys={selected}
        selectionMode="multiple"
        sortDescriptor={sort}
        variant="primary"
        onSelectionChange={setSelected}
        onSortChange={setSort}
      />
      <div className="flex items-center justify-between text-xs whitespace-nowrap">
        <Pagination size="sm">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage === 1}
                onPress={() => setPage((value) => Math.max(1, value - 1))}
              >
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            {paginationPages.map((value, index) =>
              value === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${index}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={value}>
                  <Pagination.Link
                    isActive={currentPage === value}
                    onPress={() => setPage(value)}
                  >
                    {value}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage === pageCount}
                onPress={() =>
                  setPage((value) => Math.min(pageCount, value + 1))
                }
              >
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
        <div className="flex items-center gap-3">
          <Select
            aria-label="Rows per page"
            selectedKey={String(pageSize)}
            onSelectionChange={(value) => {
              if (value) {
                setPageSize(Number(value));
                setPage(1);
              }
            }}
          >
            <Select.Trigger>
              <span className="text-muted">Rows per page</span>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="w-[80px]">
              <ListBox>
                {[10, 25, 50, 100].map((value) => (
                  <ListBox.Item
                    id={String(value)}
                    key={value}
                    textValue={String(value)}
                  >
                    {value}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <Separator className="!h-4" orientation="vertical" />
          <span className="text-muted">
            {selectedCount} of {sorted.length} selected
          </span>
          <div className="flex gap-2">
            <Button
              isDisabled={currentPage === 1}
              size="sm"
              variant="secondary"
              onPress={() => setPage((value) => Math.max(1, value - 1))}
            >
              Previous
            </Button>
            <Button
              isDisabled={currentPage === pageCount}
              size="sm"
              variant="secondary"
              onPress={() => setPage((value) => Math.min(pageCount, value + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
