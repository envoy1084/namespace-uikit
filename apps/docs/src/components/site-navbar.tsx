"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { Navbar, type NavbarPosition } from "@thenamespace/uikit";
import LinkRoot from "fumadocs-core/link";

import {
  LargeSearchToggle,
  SearchToggle,
} from "@/components/fumadocs/ui/search-toggle";
import { ThemeToggle } from "@/components/fumadocs/ui/theme-toggle";
import { GitHubLink } from "@/components/github-link";
import { NamespaceLogo } from "@/components/namespace-logo";
import { cn } from "@/utils/cn";

const navigation = [
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/themes", label: "Themes" },
] as const;

function isCurrentRoute(pathname: string, href: string) {
  if (href === "/docs/getting-started") {
    return pathname.startsWith(href);
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export interface SiteNavbarProps {
  className?: string;
  mobileAction?: ReactNode;
  position?: NavbarPosition;
}

export function SiteNavbar({
  className,
  mobileAction,
  position = "sticky",
}: SiteNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Navbar
      aria-label="Main navigation"
      className={cn("border-separator border-b", className)}
      height="3.5rem"
      maxWidth="full"
      navigate={router.push}
      position={position}
    >
      <Navbar.Header>
        <Navbar.Brand>
          <LinkRoot
            aria-label="Namespace UIKit home"
            className="focus-visible:ring-focus outline-none focus-visible:ring-2"
            href="/"
          >
            <NamespaceLogo />
          </LinkRoot>
        </Navbar.Brand>

        <Navbar.Content className="hidden md:flex">
          {navigation.map((item) => (
            <Navbar.Item
              href={item.href}
              isCurrent={isCurrentRoute(pathname, item.href)}
              key={item.href}
            >
              {item.label}
            </Navbar.Item>
          ))}
        </Navbar.Content>

        <Navbar.Spacer />

        <Navbar.Content>
          <LargeSearchToggle
            hideIfDisabled
            className="hidden w-64 lg:inline-flex"
          />
          <SearchToggle hideIfDisabled className="lg:hidden" />
          <div className="hidden sm:block">
            <GitHubLink />
          </div>
          <ThemeToggle
            className="hidden sm:inline-flex"
            mode="light-dark-system"
          />
          {mobileAction}
          <Navbar.MenuToggle className="md:hidden" />
        </Navbar.Content>
      </Navbar.Header>

      <Navbar.Menu className="md:hidden">
        {navigation.map((item) => (
          <Navbar.MenuItem
            href={item.href}
            isCurrent={isCurrentRoute(pathname, item.href)}
            key={item.href}
          >
            {item.label}
          </Navbar.MenuItem>
        ))}
      </Navbar.Menu>
    </Navbar>
  );
}
