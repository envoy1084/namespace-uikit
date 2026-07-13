// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Compact With User Menu
import {
  Avatar,
  Breadcrumbs,
  Chip,
  Dropdown,
  Kbd,
  Label,
} from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  ArrowDown01Icon,
  Activity01Icon,
  Add01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  File01Icon,
  Globe02Icon,
  Home01Icon,
  HugeiconsIcon,
  LibraryIcon,
  MoreVerticalIcon,
  Search01Icon,
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

const compactMainNav = [
  { icon: Search01Icon, isButton: true, label: "Search" },
  { icon: Home01Icon, label: "Home" },
  { icon: Activity01Icon, label: "Activity" },
  { icon: Globe02Icon, label: "Browse" },
] as const;

const compactLibraryItems = ["Design Tokens", "Color Palette", "Typography"];

function CompactWithUserMenuDemo() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ "--spacing": "0.2rem" } as React.CSSProperties}>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-green-600">
              <span className="text-sm font-bold text-white">H</span>
            </span>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label"
            >
              Namespace UIKit Labs
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Main navigation">
              {compactMainNav.map((item) => (
                <Sidebar.MenuItem
                  href={item.isButton ? undefined : "#"}
                  id={`compact-user-menu-nav-${item.label}`}
                  isCurrent={item.label === "Home"}
                  key={item.label}
                  textValue={item.label}
                >
                  <Sidebar.MenuIcon>
                    <HugeiconsIcon icon={item.icon} size={16} />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.label === "Search" ? (
                    <Sidebar.MenuChip>
                      <Kbd className="text-xs">
                        <Kbd.Abbr keyValue="command" />
                        <Kbd.Content>K</Kbd.Content>
                      </Kbd>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
            <Sidebar.Menu
              aria-label="Spaces"
              defaultExpandedKeys={["compact-user-menu-my-library"]}
            >
              <Sidebar.MenuItem
                id="compact-user-menu-my-library"
                textValue="My library"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={LibraryIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>
                  My library
                  <Sidebar.MenuTrigger>
                    <Sidebar.MenuIndicator />
                  </Sidebar.MenuTrigger>
                </Sidebar.MenuLabel>
                <Sidebar.Submenu>
                  {compactLibraryItems.map((item) => (
                    <Sidebar.MenuItem
                      href="#"
                      id={`compact-user-menu-sp-${item}`}
                      key={item}
                      textValue={item}
                    >
                      <Sidebar.MenuIcon>
                        <HugeiconsIcon icon={File01Icon} size={16} />
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Submenu>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                href="#"
                id="compact-user-menu-design-team"
                textValue="Design team"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={UserMultipleIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Design team</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="compact-user-menu-add-space"
                textValue="Add space"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={Add01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel className="text-muted">
                  Add space
                </Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Separator />
        <Sidebar.Footer className="px-2 pt-0 pb-2">
          <Dropdown>
            <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none">
              <Avatar size="sm">
                <Avatar.Image
                  alt="Junior Garcia"
                  src="/assets/avatars/orange.jpg"
                />
                <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
              </Avatar>
              <span
                className="text-foreground text-sm font-medium"
                data-sidebar="label"
              >
                Junior
              </span>
              <HugeiconsIcon
                className="text-muted ml-auto size-3"
                data-sidebar="label"
                icon={ArrowDown01Icon}
              />
            </Dropdown.Trigger>
            <Dropdown.Popover placement="top start">
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <Avatar.Image
                      alt="Junior Garcia"
                      src="/assets/avatars/orange.jpg"
                    />
                    <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">
                      Junior Garcia
                    </p>
                    <p className="text-muted text-xs leading-none">
                      junior@namespace.ninja
                    </p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item id="compact-user-menu-dd-dashboard">
                  <Label>Dashboard</Label>
                </Dropdown.Item>
                <Dropdown.Item id="compact-user-menu-dd-profile">
                  <Label>Profile</Label>
                </Dropdown.Item>
                <Dropdown.Item id="compact-user-menu-dd-settings">
                  <Label>Settings</Label>
                </Dropdown.Item>
                <Dropdown.Item id="compact-user-menu-dd-create-team">
                  <Label>Create Team</Label>
                </Dropdown.Item>
                <Dropdown.Item
                  id="compact-user-menu-dd-logout"
                  variant="danger"
                >
                  <Label>Log Out</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={Home01Icon} size={16} />
                <span className="truncate">Home</span>
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Compact sidebar with user dropdown menu. Uses{" "}
            <code className="bg-default rounded px-1 py-0.5 text-xs">
              --spacing: 0.2rem
            </code>{" "}
            for dense layout.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoCompactWithUserMenuExample = () => <CompactWithUserMenuDemo />;
