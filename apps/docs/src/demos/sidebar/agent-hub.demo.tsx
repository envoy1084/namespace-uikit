// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Agent Hub
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Label,
} from "@thenamespace/uikit";
import { Sidebar, useSidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  ArrowDown01Icon,
  AiBrain01Icon,
  Activity01Icon,
  Add01Icon,
  BookOpen01Icon,
  CodeIcon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  File01Icon,
  Globe02Icon,
  Home01Icon,
  HugeiconsIcon,
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

const agentHubNavigation = [
  ["New Agent", AiBrain01Icon, true],
  ["Search", Search01Icon, true],
  ["Home", Home01Icon, false],
  ["Activity", Activity01Icon, false],
  ["Marketplace", Globe02Icon, false],
] as const;

const agentHubChats = [
  "Refactor auth module",
  "Debug payment flow",
  "Write API docs",
  "Review PR #482",
  "Plan v3 migration",
];

function AgentHubContent() {
  const { collapsible, isMobile, isOpen } = useSidebar();
  const isCollapsed = collapsible === "icon" && !isMobile && !isOpen;

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-violet-600">
              <HugeiconsIcon
                className="size-3.5 text-white"
                icon={AiBrain01Icon}
              />
            </span>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label"
            >
              AgentHub
            </span>
          </div>
          {!isCollapsed ? (
            <div className="flex items-center" data-sidebar="label">
              <button
                className="text-foreground hover:bg-default flex items-center gap-0.5 rounded-md p-1"
                type="button"
              >
                <HugeiconsIcon icon={Add01Icon} size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu aria-label="Main navigation">
            {agentHubNavigation.map(([label, icon, isButton]) => (
              <Sidebar.MenuItem
                href={isButton ? undefined : "#"}
                id={`agent-hub-nav-${label}`}
                isCurrent={label === "Home"}
                key={label}
                textValue={label}
                tooltipProps={{
                  className: "bg-foreground text-background",
                  content: label,
                  delay: 250,
                  placement: "right",
                }}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{label}</Sidebar.MenuLabel>
                {label === "Search" ? (
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
          <Sidebar.GroupLabel>Recent chats</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Recent chats">
            {agentHubChats.map((item) => (
              <Sidebar.MenuItem
                href="#"
                id={`agent-hub-chat-${item}`}
                key={item}
                textValue={item}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={AiBrain01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                <Sidebar.MenuActions className="ml-auto">
                  <MoreActions label={item} />
                </Sidebar.MenuActions>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>
            <span className="flex items-center gap-2">
              Agents
              <Chip size="sm" variant="soft">
                Beta
              </Chip>
            </span>
          </Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Agents">
            {[
              ["Coder", CodeIcon],
              ["Reviewer", Task01Icon],
              ["Writer", File01Icon],
              ["Add agent", Add01Icon],
            ].map(([label, icon]) => (
              <Sidebar.MenuItem
                href={label === "Add agent" ? undefined : "#"}
                id={`agent-hub-agent-${label}`}
                key={label as string}
                textValue={label as string}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel
                  className={label === "Add agent" ? "text-muted" : undefined}
                >
                  {label as string}
                </Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>
            <span className="flex flex-1 items-center justify-between">
              Workspaces
              <Dropdown>
                <Dropdown.Trigger
                  aria-label="Workspaces section actions"
                  className="text-muted hover:bg-default -mr-1 flex size-6 items-center justify-center rounded-md"
                >
                  <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                </Dropdown.Trigger>
                <Dropdown.Popover
                  className="w-48"
                  offset={6}
                  placement="right top"
                >
                  <Dropdown.Menu aria-label="Workspaces section actions">
                    <Dropdown.Item id="show">Show</Dropdown.Item>
                    <Dropdown.Item id="new-workspace">
                      New workspace
                    </Dropdown.Item>
                    <Dropdown.Item id="open-library">
                      Open in Library
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </span>
          </Sidebar.GroupLabel>
          <Sidebar.Menu
            aria-label="Workspaces"
            defaultExpandedKeys={["agent-hub-ws-personal"]}
          >
            <Sidebar.MenuItem id="agent-hub-ws-personal" textValue="Personal">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={UserMultipleIcon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Personal
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {["Backend API", "Mobile app", "Tracker"].map((item) => (
                  <Sidebar.MenuItem
                    href="#"
                    id={`agent-hub-ws-p-${item}`}
                    isCurrent={item === "Backend API"}
                    key={item}
                    textValue={item}
                  >
                    <Sidebar.MenuIcon>
                      <HugeiconsIcon icon={CodeIcon} size={16} />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                    <Sidebar.MenuActions className="ml-auto">
                      <MoreActions label={item} />
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem id="agent-hub-ws-team" textValue="Team">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={UserMultipleIcon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Separator />
        <Sidebar.Group>
          <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Apps">
            <Sidebar.MenuItem href="#" id="agent-hub-app-docs" textValue="Docs">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={BookOpen01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Docs</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id="agent-hub-app-calendar"
              textValue="Calendar"
            >
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Activity01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Calendar</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Separator />
      <Sidebar.Footer className="gap-0">
        {!isMobile ? (
          <div className="flex items-center justify-center gap-2 px-2 py-2">
            {!isCollapsed ? (
              <Button
                className="text-muted bg-surface shadow-surface flex h-9 flex-1 gap-2 text-sm"
                size="sm"
                variant="tertiary"
              >
                <HugeiconsIcon icon={AiBrain01Icon} size={16} />
                <span>New chat</span>
                <Kbd className="text-xs">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>N</Kbd.Content>
                </Kbd>
              </Button>
            ) : null}
            <Button isIconOnly size="sm" variant="tertiary">
              <HugeiconsIcon className="text-muted size-4" icon={Add01Icon} />
            </Button>
          </div>
        ) : null}
        <div className="px-2 pb-2">
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
              <Dropdown.Menu>
                <Dropdown.Item id="agent-profile">Profile</Dropdown.Item>
                <Dropdown.Item id="agent-settings">Settings</Dropdown.Item>
                <Dropdown.Item id="agent-logout" variant="danger">
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </Sidebar.Footer>
    </>
  );
}

function AgentHubDemo() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ "--spacing": "0.2rem" } as React.CSSProperties}>
        <AgentHubContent />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={CodeIcon} size={16} />
                <span className="truncate">Backend API</span>
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Agent-focused sidebar for AI startups. Combines compact spacing,
            workspaces, recent chats, and a user dropdown menu.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoAgentHubExample = () => <AgentHubDemo />;
