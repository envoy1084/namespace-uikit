// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Floating Variant
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
  ReceiptTextIcon,
  Settings01Icon,
  Task01Icon,
  UserMultipleIcon,
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

const collapsibleNav = [
  { icon: Home01Icon, label: "Dashboard" },
  { icon: ReceiptTextIcon, label: "Orders" },
  { badge: "New", icon: Task01Icon, label: "Tracker" },
  { icon: Analytics01Icon, label: "Analytics" },
  { icon: UserMultipleIcon, label: "Team" },
  { icon: Settings01Icon, label: "Settings" },
] as const;

function SimpleNavigation({
  current = "Dashboard",
  showBadge = false,
}: {
  current?: string;
  showBadge?: boolean;
}) {
  return (
    <Sidebar.Menu aria-label="Navigation">
      {collapsibleNav.map((item) => (
        <Sidebar.MenuItem
          id={item.label}
          isCurrent={item.label === current}
          key={item.label}
          textValue={item.label}
        >
          <Sidebar.MenuIcon>
            <HugeiconsIcon icon={item.icon} size={16} />
          </Sidebar.MenuIcon>
          <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
          {showBadge && "badge" in item ? (
            <Sidebar.MenuChip>
              <Chip color="success" size="sm" variant="soft">
                {item.badge}
              </Chip>
            </Sidebar.MenuChip>
          ) : null}
        </Sidebar.MenuItem>
      ))}
    </Sidebar.Menu>
  );
}

function FloatingVariantDemo() {
  return (
    <Sidebar.Provider collapsible="offcanvas" variant="floating">
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
            <SimpleNavigation current="" />
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={Home01Icon} size={16} />
                <span className="truncate">Dashboard</span>
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Floating sidebar with rounded corners and shadow
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoFloatingVariantExample = () => <FloatingVariantDemo />;
