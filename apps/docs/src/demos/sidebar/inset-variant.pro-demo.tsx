// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Inset Variant
import { Fragment } from "react";

import { Breadcrumbs, Chip, Dropdown, Label } from "@thenamespace/uikit";
import { Sidebar } from "@thenamespace/uikit";
import {
  Analytics01Icon,
  AiBrain01Icon,
  Airplane01Icon,
  BookOpen01Icon,
  CodeIcon,
  Copy01Icon,
  Delete02Icon,
  FolderOpenIcon,
  Globe02Icon,
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

const insetSections = [
  {
    label: "Platform",
    items: [
      { icon: CodeIcon, label: "Playground" },
      { icon: AiBrain01Icon, label: "Models" },
      { icon: BookOpen01Icon, label: "Documentation" },
      { icon: Settings01Icon, label: "Settings" },
    ],
  },
  {
    label: "Projects",
    items: [
      { icon: Task01Icon, label: "Design Engineering" },
      { icon: Globe02Icon, label: "Sales & Marketing" },
      { icon: Airplane01Icon, label: "Travel" },
    ],
  },
] as const;

function InsetVariantDemo() {
  return (
    <Sidebar.Provider collapsible="offcanvas" variant="inset">
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <span className="bg-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
              <HugeiconsIcon
                className="text-background size-4"
                icon={AiBrain01Icon}
              />
            </span>
            <span className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                Namespace UIKit Inc.
              </span>
              <span className="text-muted text-xs leading-tight">
                Enterprise
              </span>
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          {insetSections.map((section, index) => (
            <Fragment key={section.label}>
              {index > 0 ? <Sidebar.Separator /> : null}
              <Sidebar.Group>
                <Sidebar.GroupLabel>{section.label}</Sidebar.GroupLabel>
                <Sidebar.Menu aria-label={section.label}>
                  {section.items.map((item) => (
                    <Sidebar.MenuItem
                      id={item.label.toLowerCase().replaceAll(" ", "-")}
                      key={item.label}
                      textValue={item.label}
                    >
                      <Sidebar.MenuIcon>
                        <HugeiconsIcon icon={item.icon} size={16} />
                      </Sidebar.MenuIcon>
                      <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Menu>
              </Sidebar.Group>
            </Fragment>
          ))}
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <Breadcrumbs className="min-w-0">
            <Breadcrumbs.Item className="text-muted min-w-0" href="#">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                <HugeiconsIcon icon={AiBrain01Icon} size={16} />
                <span className="truncate">Build Your Application</span>
              </span>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item className="min-w-0 font-semibold">
              <span>Data Fetching</span>
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="grid gap-4 p-4 pt-0">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface rounded-xl border p-6" />
            <div className="bg-surface rounded-xl border p-6" />
            <div className="bg-surface rounded-xl border p-6" />
          </div>
          <div className="bg-surface min-h-[50vh] rounded-xl border p-6" />
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  );
}

export const ProInsetVariantExample = () => <InsetVariantDemo />;
