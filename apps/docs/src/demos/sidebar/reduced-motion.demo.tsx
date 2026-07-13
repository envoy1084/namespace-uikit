// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Reduced Motion
import { Breadcrumbs, Chip, Dropdown, Label } from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  Home01Icon,
  HugeiconsIcon,
  MoreVerticalIcon,
  Settings01Icon,
  Task01Icon,
} from "@thenamespace/uikit/icons";

const nav = [
  { icon: Home01Icon, label: "Dashboard" },
  {
    icon: Analytics01Icon,
    items: ["Overview", "Reports", "Conversions"],
    label: "Analytics",
  },
  { badge: "New", icon: Task01Icon, label: "Tracker" },
  {
    icon: Settings01Icon,
    items: ["General", "Team", "Notifications"],
    label: "Settings",
  },
] as const;

function MoreActions({ label }: { label: string }) {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label={`More actions for ${label}`}
        className="sidebar__menu-action"
        data-slot="sidebar-menu-action"
      >
        <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
      </Dropdown.Trigger>
      <Dropdown.Popover className="w-44" offset={6} placement="right top">
        <Dropdown.Menu aria-label={`${label} actions`}>
          <Dropdown.Item id="open" textValue="Open">
            <HugeiconsIcon
              className="text-muted size-4 shrink-0"
              icon={FolderOpenIcon}
            />
            <Label>Open</Label>
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            <HugeiconsIcon
              className="text-muted size-4 shrink-0"
              icon={Copy01Icon}
            />
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <HugeiconsIcon
              className="text-danger size-4 shrink-0"
              icon={Delete02Icon}
            />
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function Menu({
  analyticsItems = ["Overview", "Reports", "Conversions"],
  nested = true,
}: {
  analyticsItems?: readonly string[];
  nested?: boolean;
}) {
  return (
    <Sidebar.Menu
      aria-label="Navigation"
      defaultExpandedKeys={nested ? ["Analytics"] : []}
    >
      {nav.map((item) => (
        <Sidebar.MenuItem
          href={item.items ? undefined : "#"}
          id={item.label}
          isCurrent={item.label === "Dashboard"}
          key={item.label}
          textValue={item.label}
        >
          <Sidebar.MenuIcon>
            <HugeiconsIcon icon={item.icon} size={16} />
          </Sidebar.MenuIcon>
          <Sidebar.MenuLabel>
            {item.label}
            {nested && item.items ? (
              <Sidebar.MenuTrigger>
                <Sidebar.MenuIndicator />
              </Sidebar.MenuTrigger>
            ) : null}
          </Sidebar.MenuLabel>
          {"badge" in item ? (
            <Sidebar.MenuChip>
              <Chip color="success" size="sm" variant="soft">
                {item.badge}
              </Chip>
            </Sidebar.MenuChip>
          ) : null}
          {nested && item.items ? (
            <Sidebar.Submenu>
              {(item.label === "Analytics" ? analyticsItems : item.items).map(
                (child) => (
                  <Sidebar.MenuItem
                    href="#"
                    id={`${item.label}-${child}`}
                    key={child}
                    textValue={child}
                  >
                    <Sidebar.MenuLabel>{child}</Sidebar.MenuLabel>
                    <Sidebar.MenuActions className="ml-auto">
                      <MoreActions label={child} />
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ),
              )}
            </Sidebar.Submenu>
          ) : null}
        </Sidebar.MenuItem>
      ))}
    </Sidebar.Menu>
  );
}

function ReducedMotionDemo() {
  return (
    <Sidebar.Provider collapsible="icon" reduceMotion>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <span className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">H</span>
            </span>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label"
            >
              Namespace UIKit
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Menu analyticsItems={["Overview", "Reports", "Exports"]} nested />
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="text-muted min-w-0" href="#">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={Analytics01Icon} size={16} />
                <span className="truncate">Analytics</span>
              </span>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span>Reports</span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            reduceMotion is enabled, so nested sections open and close
            instantly.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoReducedMotionExample = () => <ReducedMotionDemo />;
