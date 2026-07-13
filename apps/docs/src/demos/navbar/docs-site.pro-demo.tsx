"use client";

// @demo-title Docs Site
import { Kbd, SearchField, Segment } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import {
  ComputerIcon,
  Icon,
  Moon02Icon,
  Sun01Icon,
} from "@thenamespace/uikit/icons";

export const ProDocsSiteExample = () => (
  <Navbar position="static">
    <Navbar.Header>
      <Navbar.MenuToggle className="md:hidden" />
      <Navbar.Brand>
        <span className="font-semibold">Namespace UIKit</span>
      </Navbar.Brand>
      <Navbar.Content className="hidden md:flex">
        {["Docs", "Pro", "Blog"].map((label) => (
          <Navbar.Item href={`#${label.toLowerCase()}`} key={label}>
            {label}
          </Navbar.Item>
        ))}
      </Navbar.Content>
      <Navbar.Spacer />
      <Navbar.Content className="hidden md:flex">
        <SearchField className="w-[200px]" variant="secondary">
          <SearchField.Group className="h-8">
            <SearchField.SearchIcon />
            <SearchField.Input
              aria-label="Search documentation"
              className="w-16"
              placeholder="Search docs…"
            />
            <Kbd className="pointer-events-none mr-1.5 text-xs">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          </SearchField.Group>
        </SearchField>
        <Segment defaultSelectedKey="system" size="sm">
          <Segment.Item aria-label="Light" id="light">
            <Icon icon={Sun01Icon} />
          </Segment.Item>
          <Segment.Item aria-label="Dark" id="dark">
            <Icon icon={Moon02Icon} />
          </Segment.Item>
          <Segment.Item aria-label="System" id="system">
            <Icon icon={ComputerIcon} />
          </Segment.Item>
        </Segment>
      </Navbar.Content>
    </Navbar.Header>
  </Navbar>
);
