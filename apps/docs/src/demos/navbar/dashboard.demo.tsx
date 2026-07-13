// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Dashboard
import { useState } from "react";

import { Avatar, Button, InlineSelect, ListBox } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import { Icon, Notification02Icon } from "@thenamespace/uikit/icons";

const dashboardWorkspaces = ["samlee", "acme-corp", "moonshot"];

const dashboardProjects = [
  "content-hub",
  "marketing-site",
  "api-gateway",
  "design-tokens",
];

const dashboardTimezones = [
  ["utc", "UTC", "UTC+00:00"],
  ["pst", "PST", "UTC−08:00"],
  ["est", "EST", "UTC−05:00"],
  ["cet", "CET", "UTC+01:00"],
  ["jst", "JST", "UTC+09:00"],
] as const;

function DashboardNavbar() {
  const [workspace, setWorkspace] = useState("samlee");
  const [project, setProject] = useState("content-hub");
  const [timezone, setTimezone] = useState("utc");
  const timezoneLabel =
    dashboardTimezones.find(([id]) => id === timezone)?.[1] ?? "UTC";

  return (
    <Navbar position="static">
      <Navbar.Header className="gap-2">
        <Navbar.Brand className="mr-1">
          <span className="font-semibold">Namespace UIKit</span>
        </Navbar.Brand>
        <InlineSelect
          aria-label="Workspace"
          value={workspace}
          onChange={setWorkspace}
        >
          <InlineSelect.Trigger className="gap-2">
            <Avatar className="size-5">
              <Avatar.Image alt={workspace} src="/assets/avatars/purple.jpg" />
            </Avatar>
            <span className="text-foreground text-sm font-medium">
              {workspace}
            </span>
            <InlineSelect.Indicator />
          </InlineSelect.Trigger>
          <InlineSelect.Popover className="w-44">
            <ListBox>
              {dashboardWorkspaces.map((item) => (
                <ListBox.Item id={item} key={item} textValue={item}>
                  {item}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </InlineSelect.Popover>
        </InlineSelect>
        <InlineSelect
          aria-label="Project"
          value={project}
          onChange={setProject}
        >
          <InlineSelect.Trigger>
            <span className="text-foreground text-sm font-medium">
              {project}
            </span>
            <InlineSelect.Indicator />
          </InlineSelect.Trigger>
          <InlineSelect.Popover className="w-44">
            <ListBox>
              {dashboardProjects.map((item) => (
                <ListBox.Item id={item} key={item} textValue={item}>
                  {item}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </InlineSelect.Popover>
        </InlineSelect>
        <Navbar.Spacer />
        <div
          aria-label="Estimated monthly costs"
          className="hidden items-center gap-1.5 md:flex"
        >
          <span className="text-muted text-[11px] font-medium tracking-wider uppercase">
            Est. costs
          </span>
          <span className="text-foreground text-sm font-semibold tabular-nums">
            $71.96
          </span>
        </div>
        <Navbar.Separator className="hidden h-4 md:block" />
        <InlineSelect
          aria-label="Timezone"
          value={timezone}
          onChange={setTimezone}
        >
          <InlineSelect.Trigger>
            <span className="text-foreground text-sm font-medium">
              {timezoneLabel}
            </span>
            <InlineSelect.Indicator />
          </InlineSelect.Trigger>
          <InlineSelect.Popover className="w-44">
            <ListBox>
              {dashboardTimezones.map(([id, label, offset]) => (
                <ListBox.Item id={id} key={id} textValue={`${label} ${offset}`}>
                  <span>{label}</span>
                  <span className="text-muted ml-auto text-xs">{offset}</span>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </InlineSelect.Popover>
        </InlineSelect>
        <Navbar.Content>
          <Navbar.Item aria-label="Notifications">
            <Icon data-slot="icon" icon={Notification02Icon} />
          </Navbar.Item>
          <Button aria-label="Account menu" isIconOnly variant="ghost">
            <Avatar className="size-7" color="success" variant="soft">
              <Avatar.Fallback className="text-xs font-semibold">
                SM
              </Avatar.Fallback>
            </Avatar>
          </Button>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  );
}

export const DemoDashboardExample = () => <DashboardNavbar />;
