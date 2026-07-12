import type { Meta, StoryObj } from "@storybook/react";

import { Fragment } from "react";

import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Label,
} from "@thenamespace/uikit";
import {
  Analytics01Icon,
  BookOpen01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  HelpCircleIcon,
  Home01Icon,
  HugeiconsIcon,
  Logout01Icon,
  MoreVerticalIcon,
  Notification01Icon,
  ReceiptTextIcon,
  Settings01Icon,
  Task01Icon,
  UserMultipleIcon,
} from "@thenamespace/uikit/icons";

import { Sidebar } from "./index";

const meta = {
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  title: "Components/Sidebar",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
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

const collapsibleNav = [
  { icon: Home01Icon, label: "Dashboard" },
  { icon: ReceiptTextIcon, label: "Orders" },
  { badge: "New", icon: Task01Icon, label: "Tracker" },
  { icon: Analytics01Icon, label: "Analytics" },
  { icon: UserMultipleIcon, label: "Team" },
  { icon: Settings01Icon, label: "Settings" },
] as const;

function CollapsibleDemo() {
  return (
    <Sidebar.Provider collapsible="icon">
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
              HeroUI
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Navigation">
              {collapsibleNav.map((item) => (
                <Sidebar.MenuItem
                  href="#"
                  id={item.label}
                  isCurrent={item.label === "Dashboard"}
                  key={item.label}
                  textValue={item.label}
                >
                  <Sidebar.MenuIcon>
                    <HugeiconsIcon icon={item.icon} size={16} />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {"badge" in item ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
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
            Click the rail edge or trigger button to collapse. Press Cmd+B.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

function IconOnlyDemo() {
  return (
    <Sidebar.Provider collapsible="none">
      <Sidebar className="[--sidebar-width:56px]">
        <Sidebar.Header className="items-center justify-center p-0 py-4">
          <Avatar className="size-8 shrink-0">
            <Avatar.Image
              alt="Kate Moore"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
            />
            <Avatar.Fallback>KM</Avatar.Fallback>
          </Avatar>
        </Sidebar.Header>
        <Sidebar.Content className="items-center justify-center px-1.5">
          <Sidebar.Group>
            <Sidebar.Menu
              aria-label="Navigation"
              className="items-center gap-1"
            >
              {collapsibleNav.map((item) => (
                <Sidebar.MenuItem
                  id={item.label}
                  key={item.label}
                  textValue={item.label}
                  tooltipProps={{ content: item.label, delay: 0 }}
                >
                  <Sidebar.MenuItemContent className="justify-center gap-0 p-2.5">
                    <Sidebar.MenuIcon>
                      <HugeiconsIcon icon={item.icon} size={16} />
                    </Sidebar.MenuIcon>
                  </Sidebar.MenuItemContent>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className="items-center justify-center p-0 py-4">
          <Sidebar.Menu
            aria-label="Footer actions"
            className="items-center gap-1"
          >
            <Sidebar.MenuItem
              id="support"
              textValue="Help & Support"
              tooltipProps={{ content: "Help & Support", delay: 0 }}
            >
              <Sidebar.MenuItemContent className="justify-center gap-0 p-2.5">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={HelpCircleIcon} size={16} />
                </Sidebar.MenuIcon>
              </Sidebar.MenuItemContent>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar>
      <Sidebar.Main>
        <div className="flex flex-col px-10 py-6">
          <h1 className="text-foreground text-lg font-semibold">Dashboard</h1>
          <p className="text-muted">
            Icon-only sidebar that is always collapsed.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

const groupSections = [
  {
    label: "Platform",
    items: [
      { icon: Home01Icon, label: "Dashboard" },
      { icon: Analytics01Icon, label: "Analytics" },
      { icon: ReceiptTextIcon, label: "Orders" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: Settings01Icon, label: "General" },
      { icon: UserMultipleIcon, label: "Team" },
      { icon: Notification01Icon, label: "Notifications" },
    ],
  },
] as const;

function WithGroupsDemo() {
  return (
    <Sidebar.Provider>
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
              HeroUI
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          {groupSections.map((section, index) => (
            <Fragment key={section.label}>
              {index > 0 ? <Sidebar.Separator /> : null}
              <Sidebar.Group>
                <Sidebar.GroupLabel>{section.label}</Sidebar.GroupLabel>
                <Sidebar.Menu aria-label={section.label}>
                  {section.items.map((item) => (
                    <Sidebar.MenuItem
                      id={item.label.toLowerCase()}
                      key={item.label}
                      textValue={item.label}
                    >
                      <Sidebar.MenuIcon>
                        <HugeiconsIcon icon={item.icon} size={16} />
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Menu>
              </Sidebar.Group>
            </Fragment>
          ))}
        </Sidebar.Content>
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
          <p className="text-muted">Main content area</p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

const documentationSections = [
  { items: ["Installation", "Project Structure"], label: "Getting Started" },
  {
    items: [
      "Routing",
      "Data Fetching",
      "Rendering",
      "Caching",
      "Styling",
      "Testing",
    ],
    label: "Build Your Application",
  },
  {
    items: ["Components", "Functions", "Hooks", "Config"],
    label: "API Reference",
  },
] as const;

function DocumentationMenu() {
  return (
    <Sidebar.Menu
      aria-label="Documentation navigation"
      defaultExpandedKeys={["Build Your Application"]}
      showGuideLines="hover"
    >
      {documentationSections.map((section) => (
        <Sidebar.MenuSection key={section.label}>
          <Sidebar.MenuHeader>{section.label}</Sidebar.MenuHeader>
          <Sidebar.MenuItem id={section.label} textValue={section.label}>
            <Sidebar.MenuLabel>{section.label}</Sidebar.MenuLabel>
            <Sidebar.MenuTrigger>
              <Sidebar.MenuIndicator />
            </Sidebar.MenuTrigger>
            <Sidebar.Submenu>
              {section.items.map((item) => (
                <Sidebar.MenuItem
                  href="#"
                  id={`${section.label}-${item}`}
                  isCurrent={item === "Data Fetching"}
                  key={item}
                  textValue={item}
                >
                  <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                  <Sidebar.MenuActions className="ml-auto">
                    <MoreActions label={item} />
                  </Sidebar.MenuActions>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Submenu>
          </Sidebar.MenuItem>
        </Sidebar.MenuSection>
      ))}
    </Sidebar.Menu>
  );
}

function CollapsibleGroupsDemo() {
  return (
    <Sidebar.Provider collapsible="offcanvas">
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <span className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-xs font-bold text-white">D</span>
            </span>
            <span className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                Documentation
              </span>
              <span className="text-muted text-xs leading-tight">v1.0.0</span>
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <DocumentationMenu />
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="text-muted min-w-0" href="#">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                <span className="truncate">Build Your Application</span>
              </span>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span className="truncate">Data Fetching</span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Documentation content area. Toggle the sidebar with the trigger
            button.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
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
              HeroUI
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
export const Default: Story = { render: () => <Demo nested title="HeroUI" /> };
export const RightSide: Story = {
  render: () => (
    <Demo
      description="Main content area with the sidebar attached to the right. Resize to mobile to see the Sheet open from the right."
      nested
      side="right"
      title="HeroUI"
    />
  ),
};
export const RightSideOffcanvas: Story = {
  render: () => (
    <Demo
      collapsible="offcanvas"
      description="Right-side offcanvas sidebar. Use the trigger or rail to collapse the sidebar off the right edge. Resize to mobile to verify the Sheet also opens from the right."
      nested
      side="right"
      title="HeroUI"
    />
  ),
};
export const WithGroups: Story = {
  render: () => <WithGroupsDemo />,
};
export const CollapsibleGroups: Story = {
  render: () => <CollapsibleGroupsDemo />,
};
export const Collapsible: Story = {
  render: () => <CollapsibleDemo />,
};
export const ReducedMotion: Story = {
  render: () => <ReducedMotionDemo />,
};
export const FloatingVariant: Story = {
  render: () => <Demo variant="floating" />,
};
export const WithAvatar: Story = {
  render: () => <Demo title="Jordan's workspace" user />,
};
export const InsetVariant: Story = { render: () => <Demo variant="inset" /> };
export const IconOnly: Story = {
  render: () => <IconOnlyDemo />,
};
export const Complex: Story = {
  render: () => <Demo nested title="Teamspaces" user />,
};
export const CompactWithUserMenu: Story = {
  render: () => (
    <div
      style={
        {
          "--sidebar-width": "216px",
          "--spacing": ".22rem",
        } as React.CSSProperties
      }
    >
      <Demo title="Compact" user />
    </div>
  ),
};
export const AgentHub: Story = {
  render: () => <Demo nested title="Agent Hub" user />,
};
export const AgentWorkspace: Story = {
  render: () => <Demo nested title="Agent Workspace" />,
};
export const MeetingNotes: Story = {
  render: () => (
    <Demo collapsible="offcanvas" nested title="Meeting Notes" user />
  ),
};
