import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@iconify/react";
import { Button, KPI, KPIGroup } from "@thenamespace/uikit";

import { AppLayout, Navbar, Sidebar } from "./index";

const meta = {
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  title: "Components/AppLayout",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const items = [
  ["Overview", "lucide:layout-dashboard"],
  ["Projects", "lucide:folder"],
  ["Tasks", "lucide:list-checks"],
  ["Team", "lucide:users"],
  ["Settings", "lucide:settings"],
] as const;
function AppSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex h-10 items-center gap-2 px-2">
            <span className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-lg">
              N
            </span>
            <strong>Namespace</strong>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Workspace">
              {items.map(([label, icon], i) => (
                <Sidebar.MenuItem
                  id={label}
                  isCurrent={i === 0}
                  key={label}
                  textValue={label}
                  tooltip={label}
                >
                  <Sidebar.MenuItemContent>
                    <Sidebar.MenuIcon>
                      <Icon icon={icon} />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{label}</Sidebar.MenuLabel>
                  </Sidebar.MenuItemContent>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Separator />
          <Sidebar.Menu>
            <Sidebar.MenuItem id="help" textValue="Help">
              <Sidebar.MenuItemContent>
                <Sidebar.MenuIcon>
                  <Icon icon="lucide:circle-help" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Help</Sidebar.MenuLabel>
              </Sidebar.MenuItemContent>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <AppSidebarMobile />
      </Sidebar.Mobile>
    </>
  );
}
function AppSidebarMobile() {
  return (
    <div className="flex h-full flex-col p-3">
      <strong className="mb-4">Namespace</strong>
      {items.map(([label]) => (
        <Button className="justify-start" key={label} variant="ghost">
          {label}
        </Button>
      ))}
    </div>
  );
}
function AppNavbar({
  aside = false,
  breadcrumbs = false,
}: {
  aside?: boolean;
  breadcrumbs?: boolean;
}) {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Navbar.Brand>
          <strong>
            {breadcrumbs ? "Acme / Projects / Dashboard" : "Workspace"}
          </strong>
        </Navbar.Brand>
        <Navbar.Spacer />
        <Navbar.Content>
          <Navbar.Item aria-label="Search">
            <Icon data-slot="icon" icon="lucide:search" />
          </Navbar.Item>
          <Navbar.Item aria-label="Notifications">
            <Icon data-slot="icon" icon="lucide:bell" />
          </Navbar.Item>
          {aside ? (
            <AppLayout.AsideTrigger
              closedTooltip="Open details"
              openTooltip="Close details"
            />
          ) : null}
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  );
}
function Content({ long = false }: { long?: boolean }) {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted text-sm">Welcome back to your workspace.</p>
      </div>
      <KPIGroup>
        {[
          ["Revenue", 48_294],
          ["Users", 12_847],
          ["Conversion", 8.4],
        ].map(([label, value]) => (
          <KPI key={label}>
            <KPI.Header>
              <KPI.Title>{label}</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value value={value} />
            </KPI.Content>
          </KPI>
        ))}
      </KPIGroup>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: long ? 14 : 4 }, (_, i) => (
          <section
            className="border-border bg-surface min-h-40 rounded-xl border p-4"
            key={i}
          >
            <h2 className="font-semibold">Panel {i + 1}</h2>
            <p className="text-muted mt-2 text-sm">
              Application layout content region.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
function Aside() {
  return (
    <div className="h-full p-5">
      <h2 className="font-semibold">Details</h2>
      <p className="text-muted mt-2 text-sm">
        Contextual project information and activity.
      </p>
    </div>
  );
}
function Demo({
  aside = false,
  asideResizable = false,
  breadcrumbs = false,
  scrollMode = "page",
  sidebarCollapsible = "icon",
  sidebarResizable = false,
  sidebarVariant = "sidebar",
  toolbar = false,
}: {
  aside?: boolean;
  asideResizable?: boolean;
  breadcrumbs?: boolean;
  scrollMode?: "content" | "page";
  sidebarCollapsible?: "icon" | "none" | "offcanvas";
  sidebarResizable?: boolean;
  sidebarVariant?: "floating" | "inset" | "sidebar";
  toolbar?: boolean;
}) {
  return (
    <AppLayout
      aside={aside ? <Aside /> : undefined}
      asideResizable={asideResizable}
      navbar={<AppNavbar aside={aside} breadcrumbs={breadcrumbs} />}
      resizableAutoSaveId={
        sidebarResizable || asideResizable ? "app-layout-story" : undefined
      }
      scrollMode={scrollMode}
      sidebar={<AppSidebar />}
      sidebarCollapsible={sidebarCollapsible}
      sidebarResizable={sidebarResizable}
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
      <Content long={scrollMode === "content"} />
    </AppLayout>
  );
}
export const Default: Story = { render: () => <Demo /> };
export const Collapsible: Story = { render: () => <Demo /> };
export const WithInsetSidebar: Story = {
  render: () => <Demo sidebarVariant="inset" />,
};
export const FloatingSidebar: Story = {
  render: () => <Demo sidebarVariant="floating" />,
};
export const DocsSite: Story = {
  render: () => <Demo sidebarCollapsible="none" />,
};
export const InsetDashboard: Story = {
  render: () => <Demo sidebarCollapsible="offcanvas" sidebarVariant="inset" />,
};
export const WithAside: Story = { render: () => <Demo aside /> };
export const WithBreadcrumbs: Story = { render: () => <Demo breadcrumbs /> };
export const Offcanvas: Story = {
  render: () => <Demo sidebarCollapsible="offcanvas" />,
};
export const Complex: Story = {
  render: () => <Demo aside breadcrumbs toolbar />,
};
export const ResizableSidebar: Story = {
  render: () => <Demo sidebarCollapsible="offcanvas" sidebarResizable />,
};
export const ResizableAside: Story = {
  render: () => <Demo aside asideResizable />,
};
export const ContentScrollMode: Story = {
  render: () => <Demo scrollMode="content" />,
};
export const WithToolbar: Story = { render: () => <Demo toolbar /> };
