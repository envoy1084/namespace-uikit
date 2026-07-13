// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Agent Workspace
import {
  Avatar,
  Breadcrumbs,
  Chip,
  Dropdown,
  Kbd,
  Label,
  Tooltip,
} from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  AiBrain01Icon,
  Add01Icon,
  CodeIcon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  Globe02Icon,
  Home01Icon,
  HugeiconsIcon,
  LibraryIcon,
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

const workspaceGroups = [
  {
    items: [
      ["User naming preference refactor", "now"],
      ["Agents sidebar keyboard expe...", "12m"],
      ["Glass sidebar group by none op...", "33m"],
      ["Cloud agent error message re...", "1h"],
      ["UseApplicationProperty migrati...", undefined],
      ["Glass test timing stabilization", undefined],
      ["Flaky tests root cause", "10h"],
    ],
    label: "acme/platform",
  },
  {
    items: [
      ["Marketing pages responsiven...", "2h"],
      ["Git & checkpoints automatic c...", "3h"],
      ["Local server update process", undefined],
      ["Performance audit for redesigne...", "1d"],
      ["Localized page SEO", undefined],
    ],
    label: "acme/landing",
  },
  {
    items: [
      ["New page for natural language f...", "5h"],
      ["Background worker retry handling", undefined],
      ["Admin-only metric strip for inco...", undefined],
    ],
    label: "acme/backoffice",
  },
  {
    items: [["Plugin schema verification", "2d"]],
    label: "tools/plugins",
  },
  {
    items: [
      ["Light mode settings", undefined],
      ["MCP server setup", "4h"],
    ],
    label: "compass",
  },
] as const;

function AgentWorkspaceDemo() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ "--spacing": "0.2rem" } as React.CSSProperties}>
        <Sidebar.Header>
          <Sidebar.Menu aria-label="Top actions" className="px-1 py-2">
            <Sidebar.MenuItem id="aw-new-agent" textValue="New Agent">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={AiBrain01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>New Agent</Sidebar.MenuLabel>
              <Sidebar.MenuChip>
                <Kbd className="text-xs">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>N</Kbd.Content>
                </Kbd>
              </Sidebar.MenuChip>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id="aw-marketplace"
              isCurrent
              textValue="Marketplace"
            >
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Globe02Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Marketplace</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Header>
        <Sidebar.Content>
          {workspaceGroups.map((group) => (
            <Sidebar.Group key={group.label}>
              <Sidebar.GroupLabel>
                <span className="flex flex-1 items-center justify-between">
                  {group.label}
                  <Tooltip delay={250}>
                    <Tooltip.Trigger>
                      <button
                        aria-label={`New task in ${group.label}`}
                        className="text-muted hover:bg-default -mr-1 flex size-5 items-center justify-center rounded-md"
                        type="button"
                      >
                        <HugeiconsIcon icon={Add01Icon} size={14} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>New task</Tooltip.Content>
                  </Tooltip>
                </span>
              </Sidebar.GroupLabel>
              <Sidebar.Menu aria-label={group.label}>
                {group.items.map(([label, timeAgo]) => (
                  <Sidebar.MenuItem
                    href="#"
                    id={`aw-${group.label}-${label}`}
                    key={label}
                    textValue={label}
                    tooltipProps={{
                      className: "text-xs",
                      content: (
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{label}</span>
                          <span className="opacity-60">{group.label}</span>
                        </div>
                      ),
                      delay: 500,
                      placement: "right",
                    }}
                  >
                    <Sidebar.MenuIcon>
                      <span className="flex size-4 items-center justify-center">
                        <span className="bg-muted size-1.5 rounded-full" />
                      </span>
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{label}</Sidebar.MenuLabel>
                    {timeAgo ? (
                      <Sidebar.MenuChip>
                        <span className="text-muted text-[10px] leading-none">
                          {timeAgo}
                        </span>
                      </Sidebar.MenuChip>
                    ) : null}
                    <Sidebar.MenuActions className="ml-auto">
                      <Sidebar.MenuAction aria-label={`Archive ${label}`}>
                        <HugeiconsIcon icon={LibraryIcon} size={14} />
                      </Sidebar.MenuAction>
                      <Sidebar.MenuAction aria-label={`Delete ${label}`}>
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                      </Sidebar.MenuAction>
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group>
          ))}
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Utility">
              <Sidebar.MenuItem id="aw-more" textValue="More">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel className="text-muted">
                  More
                </Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                href="#"
                id="aw-open-workspace"
                textValue="Open Workspace"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={FolderOpenIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Open Workspace</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className="px-2 pt-0 pb-2">
          <Dropdown>
            <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none">
              <Avatar size="sm">
                <Avatar.Image
                  alt="Alex Chen"
                  src="/assets/avatars/blue-light.jpg"
                />
                <Avatar.Fallback delayMs={600}>AC</Avatar.Fallback>
              </Avatar>
              <div className="flex min-w-0 flex-col" data-sidebar="label">
                <span className="text-foreground truncate text-sm leading-tight font-medium">
                  Alex Chen
                </span>
                <span className="text-muted truncate text-xs leading-tight">
                  Hero Labs
                </span>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="top start">
              <Dropdown.Menu>
                <Dropdown.Item id="aw-profile">Profile</Dropdown.Item>
                <Dropdown.Item id="aw-settings">Settings</Dropdown.Item>
                <Dropdown.Item id="aw-team">Create Team</Dropdown.Item>
                <Dropdown.Item id="aw-logout" variant="danger">
                  Log out
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
                <HugeiconsIcon icon={CodeIcon} size={16} />
                <span className="truncate">acme/platform</span>
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Workspace sidebar with agent tasks grouped by repository. Mirrors
            the pattern used by AI coding tools.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoAgentWorkspaceExample = () => <AgentWorkspaceDemo />;
