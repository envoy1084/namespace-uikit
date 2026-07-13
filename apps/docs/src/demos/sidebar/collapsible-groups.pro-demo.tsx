// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Collapsible Groups
import { Breadcrumbs, Chip, Dropdown, Label } from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  BookOpen01Icon,
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

export const ProCollapsibleGroupsExample = () => <CollapsibleGroupsDemo />;
