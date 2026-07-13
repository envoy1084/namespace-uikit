// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Meeting Notes
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Label,
} from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
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
  Notification01Icon,
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

const meetingChats = [
  ["Call Prep Notes for Upco...", "4m"],
  ["Q2 Marketing Strategy", "12m"],
  ["Design System Migration", "1h"],
  ["Sprint Retro Action Items", "3h"],
] as const;

function MeetingNotesDemo() {
  return (
    <Sidebar.Provider collapsible="offcanvas">
      <Sidebar>
        <Sidebar.Header>
          <Button className="w-full justify-start" variant="tertiary">
            <HugeiconsIcon icon={Search01Icon} size={16} />
            <span>Search</span>
            <Kbd className="ml-auto text-xs">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          </Button>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu
              aria-label="Main navigation"
              defaultExpandedKeys={["meeting-chat"]}
            >
              <Sidebar.MenuItem href="#" id="meeting-home" textValue="Home">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={Home01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Home</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                href="#"
                id="meeting-shared"
                textValue="Shared with me"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={UserMultipleIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Shared with me</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="meeting-chat" textValue="Chat">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={Notification01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>
                  Chat
                  <Sidebar.MenuTrigger>
                    <Sidebar.MenuIndicator />
                  </Sidebar.MenuTrigger>
                </Sidebar.MenuLabel>
                <Sidebar.Submenu>
                  {meetingChats.map(([label, time]) => (
                    <Sidebar.MenuItem
                      href="#"
                      id={`meeting-chat-${label}`}
                      key={label}
                      textValue={label}
                    >
                      <Sidebar.MenuLabel>{label}</Sidebar.MenuLabel>
                      <Sidebar.MenuChip>{time}</Sidebar.MenuChip>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Submenu>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
            <Sidebar.Menu
              aria-label="Spaces"
              defaultExpandedKeys={["meeting-my-notes"]}
            >
              <Sidebar.MenuItem id="meeting-my-notes" textValue="My notes">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={LibraryIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>
                  My notes
                  <Sidebar.MenuTrigger>
                    <Sidebar.MenuIndicator />
                  </Sidebar.MenuTrigger>
                </Sidebar.MenuLabel>
                <Sidebar.Submenu>
                  <Sidebar.MenuItem
                    href="#"
                    id="meeting-personal"
                    textValue="Personal"
                  >
                    <Sidebar.MenuLabel>Personal</Sidebar.MenuLabel>
                  </Sidebar.MenuItem>
                </Sidebar.Submenu>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                href="#"
                id="meeting-design-team"
                textValue="Design team"
              >
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={UserMultipleIcon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Design team</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="meeting-add-folder" textValue="Add folder">
                <Sidebar.MenuIcon>
                  <HugeiconsIcon icon={Add01Icon} size={16} />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel className="text-muted">
                  Add folder
                </Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div className="flex items-center gap-1">
            <Button aria-label="Notes" isIconOnly size="sm" variant="ghost">
              <HugeiconsIcon icon={File01Icon} size={16} />
            </Button>
            <Button aria-label="People" isIconOnly size="sm" variant="ghost">
              <HugeiconsIcon icon={UserMultipleIcon} size={16} />
            </Button>
            <Button aria-label="Teams" isIconOnly size="sm" variant="ghost">
              <HugeiconsIcon icon={Globe02Icon} size={16} />
            </Button>
          </div>
          <Sidebar.Separator />
          <Dropdown>
            <Dropdown.Trigger
              aria-label="Sarah"
              className="w-full justify-start"
            >
              <Avatar className="size-7">
                <Avatar.Fallback>Sarah</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="top start">
              <Dropdown.Menu>
                <Dropdown.Item id="profile">Profile</Dropdown.Item>
                <Dropdown.Item id="logout" variant="danger">
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Sidebar.Footer>
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
            Meeting notes sidebar with search, spaces, and user menu. Uses
            offcanvas collapsible mode.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const ProMeetingNotesExample = () => <MeetingNotesDemo />;
