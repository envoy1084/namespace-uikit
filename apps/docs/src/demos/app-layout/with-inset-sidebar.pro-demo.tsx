// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Inset Sidebar
import {
  AnalyticsUpIcon,
  DashboardSquare01Icon,
  HelpCircleIcon,
  Logout01Icon,
  Notification02Icon,
  Search01Icon,
  Settings01Icon,
  Task01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Avatar,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Chip,
  Dropdown,
} from "@thenamespace/uikit";
import { AppLayout, Navbar, Sidebar } from "@thenamespace/uikit";

const navigation = [
  { icon: DashboardSquare01Icon, label: "Dashboard" },
  {
    icon: AnalyticsUpIcon,
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

function StoryIcon({ icon }: { icon: typeof DashboardSquare01Icon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

function Brand({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
        <span className="text-sm font-bold text-white">H</span>
      </div>
      <span
        className="text-foreground text-sm font-semibold"
        data-sidebar={mobile ? undefined : "label"}
      >
        Namespace UIKit
      </span>
    </div>
  );
}

function NavigationMenu({
  expanded = true,
  floating = false,
  mobile = false,
}: {
  expanded?: boolean;
  floating?: boolean;
  mobile?: boolean;
}) {
  const items = floating
    ? navigation.map((item) =>
        item.label === "Analytics"
          ? { ...item, items: ["Overview", "Reports"] as const }
          : item,
      )
    : navigation;

  return (
    <Sidebar.Menu
      aria-label="Navigation"
      defaultExpandedKeys={!mobile && expanded ? ["Analytics"] : undefined}
    >
      {items.map((item) => (
        <Sidebar.MenuItem
          href={item.items && !mobile ? undefined : "#"}
          id={`${mobile ? "mobile-" : ""}${item.label}`}
          isCurrent={!mobile && item.label === "Dashboard"}
          key={item.label}
          textValue={item.label}
        >
          <Sidebar.MenuIcon>
            <StoryIcon icon={item.icon} />
          </Sidebar.MenuIcon>
          <Sidebar.MenuLabel>
            {item.label}
            {item.items && !mobile ? (
              <Sidebar.MenuTrigger>
                <Sidebar.MenuIndicator />
              </Sidebar.MenuTrigger>
            ) : null}
          </Sidebar.MenuLabel>
          {item.badge && !mobile ? (
            <Sidebar.MenuChip>
              <Chip color="success" size="sm" variant="soft">
                {item.badge}
              </Chip>
            </Sidebar.MenuChip>
          ) : null}
          {item.items && !mobile ? (
            <Sidebar.Submenu>
              {item.items.map((child) => (
                <Sidebar.MenuItem
                  href="#"
                  id={`${item.label}-${child}`}
                  key={child}
                  textValue={child}
                >
                  <Sidebar.MenuLabel>{child}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Submenu>
          ) : null}
        </Sidebar.MenuItem>
      ))}
    </Sidebar.Menu>
  );
}

function FooterMenu({
  helpLabel = "Help & Information",
  mobile = false,
  showLogout = true,
}: {
  helpLabel?: string;
  mobile?: boolean;
  showLogout?: boolean;
}) {
  return (
    <Sidebar.Menu aria-label="Footer actions">
      <Sidebar.MenuItem
        href="#"
        id={`${mobile ? "mobile-" : ""}help`}
        textValue={helpLabel}
      >
        <Sidebar.MenuIcon>
          <StoryIcon icon={HelpCircleIcon} />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>{helpLabel}</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      {showLogout ? (
        <Sidebar.MenuItem
          href="#"
          id={`${mobile ? "mobile-" : ""}logout`}
          textValue="Log out"
        >
          <Sidebar.MenuIcon>
            <StoryIcon icon={Logout01Icon} />
          </Sidebar.MenuIcon>
          <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
        </Sidebar.MenuItem>
      ) : null}
    </Sidebar.Menu>
  );
}

function AppSidebar({
  expanded = true,
  floating = false,
  helpLabel,
  rail = true,
}: {
  expanded?: boolean;
  floating?: boolean;
  helpLabel?: string;
  rail?: boolean;
} = {}) {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <Brand />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <NavigationMenu expanded={expanded} floating={floating} />
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <FooterMenu
            helpLabel={helpLabel ?? (floating ? "Help" : "Help & Information")}
            showLogout={!floating}
          />
        </Sidebar.Footer>
        {rail ? <Sidebar.Rail /> : null}
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <Brand mobile />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <NavigationMenu mobile />
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <FooterMenu mobile />
        </Sidebar.Footer>
      </Sidebar.Mobile>
    </>
  );
}

function AccountMenu({ image = false }: { image?: boolean }) {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Account menu" variant="ghost">
        <Avatar className="size-6" color="success" variant="soft">
          {image ? (
            <Avatar.Image alt="User avatar" src="/assets/avatars/purple.jpg" />
          ) : null}
          <Avatar.Fallback className="text-xs font-semibold">
            JG
          </Avatar.Fallback>
        </Avatar>
      </Button>
      <Dropdown.Popover className="min-w-[200px]" placement="bottom end">
        <Dropdown.Menu>
          <Dropdown.Item id="account" textValue="Account">
            <StoryIcon icon={UserIcon} />
            Account
          </Dropdown.Item>
          <Dropdown.Item id="sign-out" textValue="Log out">
            <StoryIcon icon={Logout01Icon} />
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function AppNavbar({
  aside = false,
  avatarImage = false,
  simpleAccount = false,
}: {
  aside?: boolean;
  avatarImage?: boolean;
  simpleAccount?: boolean;
}) {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Breadcrumbs className="min-w-0">
          <BreadcrumbsItem className="min-w-0 font-semibold" isDisabled>
            <span className="flex min-w-0 items-center gap-2 overflow-hidden">
              <StoryIcon icon={DashboardSquare01Icon} />
              <span className="truncate">Dashboard</span>
            </span>
          </BreadcrumbsItem>
        </Breadcrumbs>
        <Navbar.Spacer />
        <Navbar.Content>
          <Navbar.Item aria-label="Search">
            <StoryIcon icon={Search01Icon} />
          </Navbar.Item>
          <Navbar.Item aria-label="Notifications">
            <StoryIcon icon={Notification02Icon} />
          </Navbar.Item>
          {simpleAccount ? null : <Navbar.Separator />}
          {simpleAccount ? (
            <Button isIconOnly aria-label="Account" variant="ghost">
              <Avatar className="size-6" color="success" variant="soft">
                <Avatar.Fallback className="text-xs font-semibold">
                  JG
                </Avatar.Fallback>
              </Avatar>
            </Button>
          ) : (
            <AccountMenu image={avatarImage} />
          )}
          {aside ? (
            <AppLayout.AsideTrigger
              closedTooltip="Show details"
              openTooltip="Hide details"
            />
          ) : null}
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  );
}

function MainContent({
  description,
  long = false,
  title = "Dashboard",
}: {
  description: string;
  long?: boolean;
  title?: string;
}) {
  return (
    <div className="p-6">
      <h1 className="text-foreground text-xl font-semibold">{title}</h1>
      <p className="text-muted mt-2 text-sm">{description}</p>
      {long
        ? Array.from({ length: 18 }, (_, index) => (
            <p className="text-muted mt-6 text-sm" key={index}>
              Scrollable application content row {index + 1}.
            </p>
          ))
        : null}
    </div>
  );
}

interface DemoProps {
  aside?: boolean;
  asideResizable?: boolean;
  avatarImage?: boolean;
  description: string;
  scrollMode?: "content" | "page";
  sidebarCollapsible?: "icon" | "none" | "offcanvas";
  sidebarResizable?: boolean;
  sidebarStory?: "compact" | "default";
  sidebarVariant?: "floating" | "inset" | "sidebar";
  title?: string;
  toolbar?: boolean;
}

function Demo({
  aside = false,
  asideResizable = false,
  avatarImage = false,
  description,
  scrollMode = "page",
  sidebarCollapsible = "icon",
  sidebarResizable = false,
  sidebarStory = "default",
  sidebarVariant = "sidebar",
  title,
  toolbar = false,
}: DemoProps) {
  return (
    <AppLayout
      aside={
        aside ? (
          <div className="h-full p-5">
            <h2 className="font-semibold">Details</h2>
            <p className="text-muted mt-2 text-sm">
              Contextual project information and activity.
            </p>
          </div>
        ) : undefined
      }
      asideResizable={asideResizable}
      navbar={<AppNavbar aside={aside} avatarImage={avatarImage} />}
      resizableAutoSaveId={
        sidebarResizable || asideResizable
          ? "app-layout-demo:resizable-sidebar"
          : undefined
      }
      scrollMode={scrollMode}
      sidebar={<AppSidebar floating={sidebarStory === "compact"} />}
      sidebarCollapsible={sidebarCollapsible}
      sidebarDefaultSize={sidebarResizable ? "280px" : 18}
      sidebarMaxSize={sidebarResizable ? "420px" : 30}
      sidebarMinSize={sidebarResizable ? "220px" : 12}
      sidebarResizable={sidebarResizable}
      sidebarResizeBehavior={
        sidebarResizable ? "preserve-pixel-size" : undefined
      }
      sidebarVariant={sidebarVariant}
      toolbar={
        toolbar ? (
          <div className="flex h-10 items-center gap-2 px-4 text-sm">
            <Button size="sm" variant="ghost">
              Overview
            </Button>
            <Button size="sm" variant="ghost">
              Analytics
            </Button>
          </div>
        ) : undefined
      }
    >
      <MainContent
        description={description}
        long={scrollMode === "content"}
        title={title}
      />
    </AppLayout>
  );
}

export const ProWithInsetSidebarExample = () => (
  <Demo
    avatarImage
    description="This variant uses the inset sidebar style, where the sidebar panel sits inside a bordered card. The sidebar still fills the full viewport height."
    sidebarStory="compact"
    sidebarVariant="inset"
  />
);
