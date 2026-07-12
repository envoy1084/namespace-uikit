import type { Meta, StoryObj } from "@storybook/react";

import { useRef, useState } from "react";

import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Dropdown,
  InlineSelect,
  Input,
  Segment,
} from "@thenamespace/uikit";

import { Navbar } from "./index";

const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/Navbar",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const links = ["Features", "Customers", "Integrations", "Pricing"];
const Logo = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-2 font-semibold">
    <span className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-lg">
      N
    </span>
    {compact ? null : <span>Namespace</span>}
  </div>
);
const User = () => (
  <Avatar className="size-7">
    <Avatar.Fallback>JG</Avatar.Fallback>
  </Avatar>
);
function BaseHeader({ mobile = false }: { mobile?: boolean }) {
  return (
    <Navbar.Header>
      <Navbar.Brand>
        <Logo />
      </Navbar.Brand>
      <Navbar.Spacer />
      <Navbar.Content className={mobile ? "hidden md:flex" : undefined}>
        {links.map((label) => (
          <Navbar.Item
            href={`#${label.toLowerCase()}`}
            isCurrent={label === "Customers"}
            key={label}
          >
            {label}
          </Navbar.Item>
        ))}
      </Navbar.Content>
      <Navbar.Spacer />
      <Navbar.Content>
        <Navbar.Item aria-label="Search">
          <Icon data-slot="icon" icon="lucide:search" />
        </Navbar.Item>
        <Navbar.Item aria-label="Notifications">
          <Icon data-slot="icon" icon="lucide:bell" />
        </Navbar.Item>
        <Navbar.Separator />
        <Navbar.Item aria-label="Profile">
          <User />
        </Navbar.Item>
      </Navbar.Content>
      {mobile ? <Navbar.MenuToggle className="md:hidden" /> : null}
    </Navbar.Header>
  );
}
export const Default: Story = {
  render: () => (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar position="static">
        <BaseHeader />
      </Navbar>
    </div>
  ),
};
function HideDemo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="border-border relative h-[400px] w-full overflow-y-auto rounded-xl border"
    >
      <Navbar className="border-border border-b" hideOnScroll parentRef={ref}>
        <BaseHeader />
      </Navbar>
      <div className="space-y-6 p-6">
        {Array.from({ length: 20 }, (_, i) => (
          <div className="bg-surface text-muted rounded-lg p-4 text-sm" key={i}>
            Scroll down to hide the navbar, scroll up to reveal it. This is
            paragraph {i + 1}.
          </div>
        ))}
      </div>
    </div>
  );
}
export const HideOnScroll: Story = { render: () => <HideDemo /> };
function WithMenuDemo() {
  const [current, setCurrent] = useState("Dashboard");
  const items = [
    ["Dashboard", "lucide:layout-dashboard"],
    ["Team", "lucide:users"],
    ["Settings", "lucide:settings"],
  ] as const;
  return (
    <div className="bg-background w-full overflow-visible">
      <Navbar defaultMenuOpen position="static" shouldBlockScroll={false}>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Content className="hidden sm:flex">
            {items.map(([label]) => (
              <Navbar.Item
                href={`#${label}`}
                isCurrent={current === label}
                key={label}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrent(label);
                }}
              >
                {label}
              </Navbar.Item>
            ))}
          </Navbar.Content>
          <Navbar.Spacer />
          <Navbar.Content>
            <Navbar.Item>
              <Icon data-slot="icon" icon="lucide:search" />
            </Navbar.Item>
            <Navbar.Item>
              <User />
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.MenuToggle />
        </Navbar.Header>
        <Navbar.Menu>
          {items.map(([label, icon]) => (
            <Navbar.MenuItem
              href={`#${label}`}
              isCurrent={current === label}
              key={label}
              onClick={(e) => {
                e.preventDefault();
                setCurrent(label);
              }}
            >
              <Icon data-slot="icon" icon={icon} />
              {label}
            </Navbar.MenuItem>
          ))}
        </Navbar.Menu>
      </Navbar>
      <main className="min-h-[680px] p-6">
        <section className="border-border bg-surface rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Team workspace</h2>
          <p className="text-muted mt-2 text-sm">
            Responsive mobile navigation overlay.
          </p>
        </section>
      </main>
    </div>
  );
}
export const WithMenu: Story = { render: () => <WithMenuDemo /> };
export const DocsSite: Story = {
  render: () => (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar position="static">
        <Navbar.Header>
          <Navbar.MenuToggle className="md:hidden" />
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Content className="hidden md:flex">
            {["Docs", "Components", "Templates", "Releases"].map((x) => (
              <Navbar.Item key={x} isCurrent={x === "Components"}>
                {x}
              </Navbar.Item>
            ))}
          </Navbar.Content>
          <Navbar.Spacer />
          <Input
            className="hidden max-w-64 md:flex"
            placeholder="Search documentation..."
          />
          <Segment
            className="hidden md:flex"
            defaultSelectedKey="system"
            size="sm"
          >
            <Segment.Item id="light">
              <Icon icon="lucide:sun" />
            </Segment.Item>
            <Segment.Item id="dark">
              <Icon icon="lucide:moon" />
            </Segment.Item>
            <Segment.Item id="system">
              <Icon icon="lucide:monitor" />
            </Segment.Item>
          </Segment>
        </Navbar.Header>
      </Navbar>
    </div>
  ),
};
function UserMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button isIconOnly variant="ghost">
          <User />
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
export const WithDropdowns: Story = {
  render: () => (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar position="static">
        <Navbar.Header>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Content>
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="ghost">
                  Acme Inc. <Icon icon="lucide:chevron-down" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  {["Acme Inc.", "HeroUI", "Namespace"].map((x) => (
                    <Dropdown.Item id={x} key={x}>
                      {x}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </Navbar.Content>
          <Navbar.Spacer />
          <Navbar.Content className="hidden md:flex">
            {["Overview", "Projects", "Team", "Settings"].map((x) => (
              <Navbar.Item key={x}>{x}</Navbar.Item>
            ))}
          </Navbar.Content>
          <Navbar.Spacer />
          <UserMenu />
          <Navbar.MenuToggle className="md:hidden" />
        </Navbar.Header>
      </Navbar>
    </div>
  ),
};
export const Dashboard: Story = {
  render: () => (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar position="static">
        <Navbar.Header>
          <Navbar.Brand>
            <Logo compact />
          </Navbar.Brand>
          <Navbar.Content>
            <InlineSelect defaultSelectedKey="workspace">
              <InlineSelect.Item id="workspace">
                Acme Workspace
              </InlineSelect.Item>
            </InlineSelect>
            <span className="text-muted">/</span>
            <InlineSelect defaultSelectedKey="project">
              <InlineSelect.Item id="project">Dashboard</InlineSelect.Item>
            </InlineSelect>
          </Navbar.Content>
          <Navbar.Spacer />
          <Navbar.Content>
            <span className="text-muted text-sm">$42.18 this month</span>
            <InlineSelect defaultSelectedKey="utc">
              <InlineSelect.Item id="utc">UTC−8</InlineSelect.Item>
            </InlineSelect>
            <UserMenu />
          </Navbar.Content>
        </Navbar.Header>
      </Navbar>
    </div>
  ),
};
export const Compact: Story = {
  render: () => (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar
        height="2.75rem"
        position="static"
        size="sm"
        style={{ "--spacing": "0.22rem" } as React.CSSProperties}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Logo compact />
          </Navbar.Brand>
          <Navbar.Content>
            {["Home", "Projects", "Tasks"].map((x) => (
              <Navbar.Item key={x} isCurrent={x === "Home"}>
                {x}
              </Navbar.Item>
            ))}
          </Navbar.Content>
          <Navbar.Spacer />
          <Button isIconOnly size="sm" variant="ghost">
            <Icon icon="lucide:plus" />
          </Button>
          <UserMenu />
        </Navbar.Header>
      </Navbar>
    </div>
  ),
};
