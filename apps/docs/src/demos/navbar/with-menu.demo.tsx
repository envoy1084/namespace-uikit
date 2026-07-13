"use client";

// @demo-title With Menu
import { useState } from "react";

import { Avatar } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import {
  DashboardSquare01Icon,
  Icon,
  Search01Icon,
  Settings01Icon,
  UserGroupIcon,
} from "@thenamespace/uikit/icons";

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
    <Avatar.Image alt="User avatar" src="/assets/avatars/purple.jpg" />
  </Avatar>
);

function WithMenuDemo() {
  const [current, setCurrent] = useState("Dashboard");
  const items = [
    ["Dashboard", DashboardSquare01Icon],
    ["Team", UserGroupIcon],
    ["Settings", Settings01Icon],
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
              <Icon data-slot="icon" icon={Search01Icon} />
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

export const DemoWithMenuExample = () => <WithMenuDemo />;
