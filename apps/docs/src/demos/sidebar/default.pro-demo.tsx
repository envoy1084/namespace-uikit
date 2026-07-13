// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Default
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Label,
} from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  HelpCircleIcon,
  Home01Icon,
  HugeiconsIcon,
  Logout01Icon,
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

function UserMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button className="w-full justify-start" variant="ghost">
          <Avatar className="size-7">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <span>Jordan Davis</span>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="profile">Profile</Dropdown.Item>
          <Dropdown.Item id="settings">Settings</Dropdown.Item>
          <Dropdown.Item id="logout" variant="danger">
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function Demo({
  collapsible = "icon",
  defaultOpen = true,
  description = "Main content area. Resize to mobile to see the Sheet sidebar.",
  nested = false,
  side = "left",
  variant = "sidebar",
  title = "Workspace",
  user = false,
}: {
  collapsible?: "icon" | "none" | "offcanvas";
  defaultOpen?: boolean;
  description?: string;
  nested?: boolean;
  side?: "left" | "right";
  title?: string;
  user?: boolean;
  variant?: "floating" | "inset" | "sidebar";
}) {
  const sidebar = (
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
            {title}
          </span>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>{Menu({ nested })}</Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        {user ? (
          <UserMenu />
        ) : (
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="help" textValue="Help & Information">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={HelpCircleIcon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help & Information</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="logout" textValue="Log out">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Logout01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        )}
      </Sidebar.Footer>
      <Sidebar.Rail />
    </Sidebar>
  );
  const main = (
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
        <p className="text-muted">{description}</p>
      </div>
    </Sidebar.Main>
  );

  return (
    <Sidebar.Provider
      collapsible={collapsible}
      defaultOpen={defaultOpen}
      side={side}
      variant={variant}
    >
      {side === "right" ? (
        <>
          {main}
          {sidebar}
        </>
      ) : (
        <>
          {sidebar}
          {main}
        </>
      )}
    </Sidebar.Provider>
  );
}

export const ProDefaultExample = () => <Demo nested title="Namespace UIKit" />;
