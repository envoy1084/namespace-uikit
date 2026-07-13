// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Icon Only
import { Avatar, Chip, Dropdown, Label } from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  HelpCircleIcon,
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

function IconOnlyDemo() {
  return (
    <Sidebar.Provider collapsible="none">
      <Sidebar className="[--sidebar-width:56px]">
        <Sidebar.Header className="items-center justify-center p-0 py-4">
          <Avatar className="size-8 shrink-0">
            <Avatar.Image
              alt="Kate Moore"
              src="/assets/avatars/blue-light.jpg"
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

export const DemoIconOnlyExample = () => <IconOnlyDemo />;
