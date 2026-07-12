import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@iconify/react";
import { Avatar, Button, Dropdown } from "@thenamespace/uikit";

import { Sidebar } from "./index";

const meta = {
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  title: "Components/Sidebar",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const nav = [
  ["Home", "lucide:house"],
  ["Inbox", "lucide:inbox"],
  ["Calendar", "lucide:calendar"],
  ["Search", "lucide:search"],
  ["Settings", "lucide:settings"],
] as const;
function Menu({ nested = false }: { nested?: boolean }) {
  return (
    <Sidebar.Menu aria-label="Main navigation">
      {nav.map(([label, icon], index) => (
        <Sidebar.MenuItem
          id={label}
          isCurrent={index === 0}
          key={label}
          textValue={label}
          tooltip={label}
        >
          <Sidebar.MenuItemContent>
            <Sidebar.MenuIcon>
              <Icon icon={icon} />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>{label}</Sidebar.MenuLabel>
            {label === "Inbox" ? <Sidebar.MenuChip>12</Sidebar.MenuChip> : null}
            {nested && label === "Home" ? (
              <Sidebar.MenuTrigger>
                <Sidebar.MenuIndicator />
              </Sidebar.MenuTrigger>
            ) : null}
          </Sidebar.MenuItemContent>
          {nested && label === "Home" ? (
            <Sidebar.Submenu>
              {["Overview", "Analytics", "Reports"].map((x) => (
                <Sidebar.MenuItem id={x} key={x} textValue={x}>
                  <Sidebar.MenuItemContent>
                    <Sidebar.MenuLabel>{x}</Sidebar.MenuLabel>
                  </Sidebar.MenuItemContent>
                </Sidebar.MenuItem>
              ))}
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
  nested = false,
  side = "left",
  variant = "sidebar",
  title = "Workspace",
  user = false,
}: {
  collapsible?: "icon" | "none" | "offcanvas";
  defaultOpen?: boolean;
  nested?: boolean;
  side?: "left" | "right";
  title?: string;
  user?: boolean;
  variant?: "floating" | "inset" | "sidebar";
}) {
  return (
    <Sidebar.Provider
      collapsible={collapsible}
      defaultOpen={defaultOpen}
      side={side}
      variant={variant}
    >
      <Sidebar>
        <Sidebar.Header>
          <div className="flex h-9 items-center gap-2 px-2">
            <span className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-lg">
              N
            </span>
            <strong className="truncate">{title}</strong>
            <Sidebar.Trigger className="ms-auto" />
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            {Menu({ nested })}
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Sidebar.Separator />
              <Sidebar.Menu>
                <Sidebar.MenuItem id="help" textValue="Help" tooltip="Help">
                  <Sidebar.MenuItemContent>
                    <Sidebar.MenuIcon>
                      <Icon icon="lucide:circle-help" />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>Help & support</Sidebar.MenuLabel>
                  </Sidebar.MenuItemContent>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </>
          )}
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Main>
        <div className="border-border flex h-14 items-center border-b px-4">
          <Sidebar.Trigger />
          <span className="ms-3 font-medium">{title}</span>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-3">
          {["Overview", "Activity", "Performance"].map((x) => (
            <section
              className="border-border bg-surface min-h-36 rounded-xl border p-4"
              key={x}
            >
              <h2 className="font-semibold">{x}</h2>
              <p className="text-muted mt-2 text-sm">
                Sidebar composition preview content.
              </p>
            </section>
          ))}
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}
export const Default: Story = { render: () => <Demo /> };
export const RightSide: Story = { render: () => <Demo side="right" /> };
export const RightSideOffcanvas: Story = {
  render: () => <Demo collapsible="offcanvas" side="right" />,
};
export const WithGroups: Story = {
  render: () => <Demo title="Grouped navigation" />,
};
export const CollapsibleGroups: Story = {
  render: () => <Demo nested title="Documentation" />,
};
export const Collapsible: Story = {
  render: () => <Demo defaultOpen={false} />,
};
export const ReducedMotion: Story = {
  render: () => (
    <Sidebar.Provider reduceMotion>
      <Sidebar>
        <Sidebar.Header>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>{Menu({ nested: true })}</Sidebar.Content>
      </Sidebar>
      <Sidebar.Main>
        <div className="p-6">Nested menus with reduced motion.</div>
      </Sidebar.Main>
    </Sidebar.Provider>
  ),
};
export const FloatingVariant: Story = {
  render: () => <Demo variant="floating" />,
};
export const WithAvatar: Story = {
  render: () => <Demo title="Jordan's workspace" user />,
};
export const InsetVariant: Story = { render: () => <Demo variant="inset" /> };
export const IconOnly: Story = {
  render: () => (
    <Demo collapsible="icon" defaultOpen={false} title="Icon navigation" />
  ),
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
