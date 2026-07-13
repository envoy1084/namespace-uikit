// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Complex
import {
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Label,
  Segment,
} from "@thenamespace/uikit";
import { Sidebar, useSidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  ArrowDown01Icon,
  AiBrain01Icon,
  Activity01Icon,
  Add01Icon,
  BookOpen01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  File01Icon,
  Globe02Icon,
  HelpCircleIcon,
  Home01Icon,
  HugeiconsIcon,
  LibraryIcon,
  MoreVerticalIcon,
  Notification01Icon,
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

const complexRecents = [
  "User Settings",
  "Onboarding Flow",
  "API Gateway",
  "Theme Builder",
  "Navigation",
];

const complexTeamspaceItems = [
  "Home",
  "My Tasks",
  "Projects",
  "Epics",
  "Roadmap",
  "Sprint Board",
  "Eng Board",
  "Design Board",
  "Sprints",
  "Initiatives",
  "Vault",
  "Archive",
  "Wiki",
  "Brainstorm",
  "Standup",
  "Launch v3",
];

function ComplexSidebarContent() {
  const { collapsible, isMobile, isOpen } = useSidebar();
  const isCollapsed = collapsible === "icon" && !isMobile && !isOpen;

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-700">
              <span className="text-sm font-bold text-white">A</span>
            </span>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label"
            >
              Acme Labs
            </span>
          </div>
          {!isCollapsed ? (
            <div className="flex items-center" data-sidebar="label">
              <button
                className="text-foreground hover:bg-default flex items-center gap-0.5 rounded-md p-1"
                type="button"
              >
                <HugeiconsIcon icon={AiBrain01Icon} size={16} />
                <HugeiconsIcon
                  className="text-muted size-3"
                  icon={ArrowDown01Icon}
                />
              </button>
            </div>
          ) : null}
        </div>
        {!isCollapsed ? (
          <Segment
            className="[&_.segment__indicator]:bg-default bg-transparent p-0 [&_.segment__indicator]:shadow-none"
            defaultSelectedKey="home"
            size="sm"
          >
            {[
              ["home", Home01Icon, "Home"],
              ["meetings", Activity01Icon, "Meetings"],
              ["ai", AiBrain01Icon, "Acme AI"],
              ["inbox", Notification01Icon, "Inbox"],
            ].map(([id, icon, label]) => (
              <Segment.Item
                className="w-auto"
                id={id as string}
                key={id as string}
              >
                {({ isSelected }) => (
                  <>
                    <HugeiconsIcon icon={icon} size={16} />
                    <span
                      className="inline-grid transition-all duration-200 ease-out motion-reduce:transition-none"
                      style={{
                        gridTemplateColumns: isSelected ? "1fr" : "0fr",
                        opacity: isSelected ? 1 : 0,
                      }}
                    >
                      <span className="overflow-hidden">{label as string}</span>
                    </span>
                  </>
                )}
              </Segment.Item>
            ))}
          </Segment>
        ) : null}
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel className="capitalize">
            Recents
          </Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Recents">
            {complexRecents.map((item) => (
              <Sidebar.MenuItem
                href="#"
                id={`complex-${item}`}
                key={item}
                textValue={item}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={File01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Favorites">
            {[
              ["Tutorials", BookOpen01Icon],
              ["My Tasks", Task01Icon],
            ].map(([label, icon]) => (
              <Sidebar.MenuItem
                href="#"
                id={`complex-fav-${label}`}
                key={label as string}
                textValue={label as string}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{label as string}</Sidebar.MenuLabel>
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
            <Sidebar.MenuItem
              href="#"
              id="complex-personal"
              textValue="Personal"
            >
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={UserMultipleIcon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Personal</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem id="complex-add-agent" textValue="Add new">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Add01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel className="text-muted">
                Add new
              </Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>
            <span className="flex flex-1 items-center justify-between">
              Teamspaces
              <Dropdown>
                <Dropdown.Trigger
                  aria-label="Teamspaces section actions"
                  className="text-muted hover:bg-default -mr-1 flex size-6 items-center justify-center rounded-md"
                >
                  <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                </Dropdown.Trigger>
                <Dropdown.Popover
                  className="w-48"
                  offset={6}
                  placement="right top"
                >
                  <Dropdown.Menu aria-label="Teamspaces section actions">
                    <Dropdown.Item id="show">Show</Dropdown.Item>
                    <Dropdown.Item id="move-up">Move up</Dropdown.Item>
                    <Dropdown.Item id="move-down">Move down</Dropdown.Item>
                    <Dropdown.Item id="hide">Hide section</Dropdown.Item>
                    <Dropdown.Item id="new-teamspace">
                      New teamspace
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
            aria-label="Teamspaces"
            defaultExpandedKeys={["complex-acme-hq"]}
          >
            <Sidebar.MenuItem id="complex-acme-hq" textValue="Acme HQ">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Home01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Acme HQ
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {complexTeamspaceItems.map((item) => (
                  <Sidebar.MenuItem
                    href="#"
                    id={`complex-ts-${item}`}
                    isCurrent={item === "Roadmap"}
                    key={item}
                    textValue={item}
                  >
                    <Sidebar.MenuIcon>
                      <HugeiconsIcon
                        icon={item === "Roadmap" ? Analytics01Icon : File01Icon}
                        size={16}
                      />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                    <Sidebar.MenuActions className="ml-auto">
                      <MoreActions label={item} />
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>
            {[
              ["Engineering", Settings01Icon],
              ["Metrics", Analytics01Icon],
              ["Tracker", Task01Icon],
              ["Reports", ReceiptTextIcon],
            ].map(([label, icon]) => (
              <Sidebar.MenuItem
                href="#"
                id={`complex-ts-extra-${label}`}
                key={label as string}
                textValue={label as string}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{label as string}</Sidebar.MenuLabel>
                {label === "Metrics" ? (
                  <Sidebar.MenuChip>
                    <HugeiconsIcon icon={LibraryIcon} size={12} />
                  </Sidebar.MenuChip>
                ) : null}
                <Sidebar.MenuActions className="ml-auto">
                  <MoreActions label={label as string} />
                </Sidebar.MenuActions>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Separator />
        <Sidebar.Group>
          <Sidebar.GroupLabel>Shared</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Shared">
            <Sidebar.MenuItem
              href="#"
              id="complex-shared-sprints"
              textValue="Sprints"
            >
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Activity01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Sprints</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Apps">
            <Sidebar.MenuItem href="#" id="complex-mail" textValue="Acme Mail">
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Notification01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Acme Mail</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id="complex-calendar"
              textValue="Acme Calendar"
            >
              <Sidebar.MenuIcon>
                <HugeiconsIcon icon={Activity01Icon} size={16} />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Acme Calendar</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Separator />
      <Sidebar.Footer>
        {!isMobile ? (
          <Sidebar.Menu aria-label="Utilities">
            {[
              ["Library", LibraryIcon],
              ["My Tasks", Task01Icon],
              ["Marketplace", Globe02Icon],
              ["Help", HelpCircleIcon],
              ["Trash", Delete02Icon],
            ].map(([label, icon]) => (
              <Sidebar.MenuItem
                href="#"
                id={`complex-util-${label}`}
                key={label as string}
                textValue={label as string}
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{label as string}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        ) : null}
        <div className="flex items-center justify-center gap-2 px-2 py-2">
          {!isCollapsed ? (
            <Button
              className={`text-muted flex h-10 flex-1 gap-2 text-sm ${
                isMobile
                  ? "border-default border bg-transparent shadow-none"
                  : "bg-surface shadow-surface"
              }`}
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
      </Sidebar.Footer>
    </>
  );
}

function ComplexDemo() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ "--spacing": "0.2rem" } as React.CSSProperties}>
        <ComplexSidebarContent />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={Analytics01Icon} size={16} />
                <span className="truncate">Roadmap</span>
              </span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Complex sidebar with compact spacing. All density is controlled via{" "}
            <code className="bg-default rounded px-1 py-0.5 text-xs">
              --spacing: 0.2rem
            </code>
            .
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const DemoComplexExample = () => <ComplexDemo />;
