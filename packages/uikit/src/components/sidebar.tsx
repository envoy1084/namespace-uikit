"use client";
import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Button as HeroButton,
  cn,
  ScrollShadow,
  Separator as HeroSeparator,
  Tooltip,
} from "@heroui/react";
import {
  Button,
  Header,
  Tree,
  TreeItem,
  TreeItemContent,
  TreeSection,
} from "react-aria-components";

import { Sheet } from "./sheet";

export type SidebarSide = "left" | "right";
export type SidebarVariant = "floating" | "inset" | "sidebar";
export type SidebarCollapsible = "icon" | "none" | "offcanvas";
export interface SidebarContextValue {
  collapsible: SidebarCollapsible;
  isMobile: boolean;
  isMobileOpen: boolean;
  isOpen: boolean;
  navigate?: ((href: string) => void) | undefined;
  reduceMotion: boolean;
  setMobileOpen: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  side: SidebarSide;
  toggleSidebar: () => void;
  variant: SidebarVariant;
}
const Context = createContext<SidebarContextValue>({
  collapsible: "icon",
  isMobile: false,
  isMobileOpen: false,
  isOpen: true,
  reduceMotion: false,
  setMobileOpen: () => {},
  setOpen: () => {},
  side: "left",
  toggleSidebar: () => {},
  variant: "sidebar",
});
export const useSidebar = (): SidebarContextValue => useContext(Context);
export interface SidebarProviderProps extends ComponentPropsWithRef<"div"> {
  collapsible?: SidebarCollapsible;
  defaultOpen?: boolean;
  navigate?: (href: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  reduceMotion?: boolean;
  side?: SidebarSide;
  toggleShortcut?: false | null | string;
  variant?: SidebarVariant;
}
const matchShortcut = (event: KeyboardEvent, value: string) => {
  const parts = value.toLowerCase().split("+");
  const key = parts.pop();
  if (event.key.toLowerCase() !== key) return false;
  const mod = parts.includes("mod");
  return (
    (!mod || event.metaKey || event.ctrlKey) &&
    (!parts.includes("shift") || event.shiftKey) &&
    (!parts.includes("alt") || event.altKey) &&
    (!parts.includes("ctrl") || event.ctrlKey) &&
    (!parts.includes("meta") || event.metaKey)
  );
};
export function SidebarProvider({
  children,
  className,
  collapsible = "icon",
  defaultOpen = true,
  navigate,
  onOpenChange,
  open,
  reduceMotion = false,
  side = "left",
  toggleShortcut = "mod+b",
  variant = "sidebar",
  ...props
}: SidebarProviderProps): ReactElement {
  const [local, setLocal] = useState(defaultOpen),
    isOpen = open ?? local;
  const setOpen = useCallback(
    (value: boolean) => {
      if (open === undefined) {
        setLocal(value);
        document.cookie = `sidebar_state=${value}; path=/; max-age=604800`;
      }
      onOpenChange?.(value);
    },
    [onOpenChange, open],
  );
  const [isMobile, setMobile] = useState(false),
    [isMobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => {
      setMobile(media.matches);
      if (media.matches) setMobileOpen(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const toggleSidebar = useCallback(() => {
    if (collapsible === "none") return;
    if (isMobile) setMobileOpen((value) => !value);
    else setOpen(!isOpen);
  }, [collapsible, isMobile, isOpen, setOpen]);
  useEffect(() => {
    if (!toggleShortcut) return;
    const handler = (event: KeyboardEvent) => {
      if (matchShortcut(event, toggleShortcut)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleShortcut, toggleSidebar]);
  const value = useMemo(
    () => ({
      collapsible,
      isMobile,
      isMobileOpen,
      isOpen,
      navigate,
      reduceMotion,
      setMobileOpen,
      setOpen,
      side,
      toggleSidebar,
      variant,
    }),
    [
      collapsible,
      isMobile,
      isMobileOpen,
      isOpen,
      navigate,
      reduceMotion,
      setOpen,
      side,
      toggleSidebar,
      variant,
    ],
  );
  return (
    <Context value={value}>
      <div
        {...props}
        className={cn("sidebar__provider", className)}
        data-sidebar="provider"
        data-slot="sidebar-provider"
        data-state={isOpen ? "expanded" : "collapsed"}
      >
        {children}
      </div>
    </Context>
  );
}
export type SidebarRootProps = ComponentPropsWithRef<"aside">;
export function SidebarRoot({
  className,
  ...props
}: SidebarRootProps): ReactElement {
  const { collapsible, isOpen, side, variant } = useSidebar();
  const aside = (
    <aside
      {...props}
      className={cn(
        "sidebar",
        `sidebar--${variant}`,
        `sidebar--${side}`,
        className,
      )}
      data-collapsible={collapsible}
      data-side={side}
      data-slot="sidebar"
      data-state={isOpen ? "expanded" : "collapsed"}
      data-variant={variant}
    />
  );
  return collapsible === "offcanvas" ? (
    <div
      className="sidebar__offcanvas-wrapper"
      data-side={side}
      data-state={isOpen ? "expanded" : "collapsed"}
    >
      {aside}
    </div>
  ) : (
    aside
  );
}
type SidebarDivPart = (props: ComponentPropsWithRef<"div">) => ReactElement;
const divPart =
  (slot: string, base: string): SidebarDivPart =>
  (p: ComponentPropsWithRef<"div">): ReactElement => (
    <div {...p} className={cn(base, p.className)} data-slot={slot} />
  );
export const SidebarHeader: SidebarDivPart = divPart(
  "sidebar-header",
  "sidebar__header",
);
export const SidebarFooter: SidebarDivPart = divPart(
  "sidebar-footer",
  "sidebar__footer",
);
export const SidebarGroup: SidebarDivPart = divPart(
  "sidebar-group",
  "sidebar__group",
);
export const SidebarGroupLabel: SidebarDivPart = divPart(
  "sidebar-group-label",
  "sidebar__group-label",
);
export type SidebarContentProps = ComponentPropsWithRef<typeof ScrollShadow>;
export function SidebarContent({
  className,
  ...props
}: SidebarContentProps): ReactElement {
  return (
    <ScrollShadow
      {...props}
      hideScrollBar
      className={
        cn(
          "sidebar__content",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__content"
      }
      data-slot="sidebar-content"
    />
  );
}
export interface SidebarMenuProps<
  T extends object = object,
> extends ComponentPropsWithRef<typeof Tree<T>> {
  closeMobileOnAction?: boolean;
  reduceMotion?: boolean;
  showGuideLines?: boolean | "hover";
}
export function SidebarMenu<T extends object = object>({
  className,
  closeMobileOnAction,
  reduceMotion,
  showGuideLines = true,
  ...props
}: SidebarMenuProps<T>): ReactElement {
  return (
    <Tree
      {...props}
      className={
        cn(
          "sidebar__menu",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__menu"
      }
      data-close-mobile={closeMobileOnAction}
      data-guide-lines={
        showGuideLines === true
          ? "always"
          : showGuideLines === false
            ? "none"
            : "hover"
      }
      data-reduce-motion={reduceMotion}
      data-slot="sidebar-menu"
    />
  );
}
export type SidebarMenuSectionProps<T extends object = object> =
  ComponentPropsWithRef<typeof TreeSection<T>>;
export function SidebarMenuSection<T extends object = object>({
  className,
  ...props
}: SidebarMenuSectionProps<T>): ReactElement {
  return (
    <TreeSection
      {...props}
      className={
        cn("sidebar__menu-section", className) ?? "sidebar__menu-section"
      }
      data-slot="sidebar-menu-section"
    />
  );
}
export type SidebarMenuHeaderProps = ComponentPropsWithRef<typeof Header>;
export function SidebarMenuHeader({
  className,
  ...props
}: SidebarMenuHeaderProps): ReactElement {
  return (
    <Header
      {...props}
      className={cn("sidebar__menu-header", className)}
      data-slot="sidebar-menu-header"
    />
  );
}
export interface SidebarMenuItemProps extends ComponentPropsWithRef<
  typeof TreeItem
> {
  closeMobileOnAction?: boolean;
  forceReload?: boolean;
  href?: string;
  isCurrent?: boolean;
  tooltip?: ReactNode;
  tooltipProps?: Record<string, unknown>;
}
export function SidebarMenuItem({
  children,
  className,
  closeMobileOnAction = true,
  forceReload = false,
  href,
  isCurrent = false,
  onAction,
  tooltip,
  ...props
}: SidebarMenuItemProps): ReactElement {
  const state = useSidebar();
  const action = () => {
    onAction?.();
    if (href) {
      if (/^https?:\/\//.test(href))
        window.open(href, "_blank", "noopener,noreferrer");
      else if (forceReload) window.location.href = href;
      else state.navigate?.(href);
    }
    if (state.isMobile && closeMobileOnAction) state.setMobileOpen(false);
  };
  const row: ReactNode[] = [];
  const nested: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SidebarSubmenu)
      nested.push(
        (child as ReactElement<{ children: ReactNode }>).props.children,
      );
    else row.push(child);
  });
  const renderedRow =
    tooltip && state.collapsible === "icon" && !state.isOpen ? (
      <Tooltip>
        <Tooltip.Trigger>{row}</Tooltip.Trigger>
        <Tooltip.Content placement={state.side === "left" ? "right" : "left"}>
          {tooltip}
        </Tooltip.Content>
      </Tooltip>
    ) : (
      row
    );
  const item = (
    <TreeItem
      {...props}
      {...(isCurrent ? { "aria-current": "page" as const } : {})}
      className={
        cn(
          "sidebar__menu-item",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__menu-item"
      }
      data-current={isCurrent || undefined}
      data-slot="sidebar-menu-item"
      {...(href === undefined ? {} : { href })}
      onAction={action}
    >
      <TreeItemContent>{renderedRow}</TreeItemContent>
      {nested}
    </TreeItem>
  );
  return item;
}
export const SidebarMenuItemContent = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement => (
  <div
    {...props}
    className={cn("sidebar__menu-item-content", className)}
    data-slot="sidebar-menu-item-content"
  >
    {children}
  </div>
);
export const SidebarMenuIcon = ({
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement => (
  <span
    {...props}
    className={cn("sidebar__menu-icon", className)}
    data-slot="sidebar-menu-icon"
  />
);
export const SidebarMenuLabel = ({
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement => (
  <span
    {...props}
    className={cn("sidebar__menu-label sidebar__menu-label-text", className)}
    data-sidebar="label"
    data-slot="sidebar-menu-label"
  />
);
export const SidebarMenuChip = ({
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement => (
  <span
    {...props}
    className={cn("sidebar__menu-chip", className)}
    data-slot="sidebar-menu-chip"
  />
);
export const SidebarMenuActions: SidebarDivPart = divPart(
  "sidebar-menu-actions",
  "sidebar__menu-actions",
);
export type SidebarMenuActionProps = ComponentPropsWithRef<typeof Button>;
export function SidebarMenuAction({
  className,
  ...props
}: SidebarMenuActionProps): ReactElement {
  return (
    <Button
      {...props}
      className={
        cn(
          "sidebar__menu-action",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__menu-action"
      }
      data-slot="sidebar-menu-action"
    />
  );
}
export type SidebarMenuTriggerProps = ComponentPropsWithRef<typeof Button>;
export function SidebarMenuTrigger({
  className,
  ...props
}: SidebarMenuTriggerProps): ReactElement {
  return (
    <Button
      {...props}
      className={
        cn(
          "sidebar__menu-trigger",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__menu-trigger"
      }
      data-slot="sidebar-menu-trigger"
      slot="chevron"
    />
  );
}
export function SidebarMenuIndicator({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement {
  return (
    <span
      {...props}
      className={cn("sidebar__menu-indicator", className)}
      data-slot="sidebar-menu-indicator"
    >
      {children ?? "›"}
    </span>
  );
}
export const SidebarSubmenu = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => <>{children}</>;
export type SidebarSeparatorProps = ComponentPropsWithRef<typeof HeroSeparator>;
export function SidebarSeparator({
  className,
  ...props
}: SidebarSeparatorProps): ReactElement {
  return (
    <HeroSeparator
      {...props}
      className={
        cn(
          "sidebar__separator",
          typeof className === "string" ? className : undefined,
        ) ?? "sidebar__separator"
      }
      data-slot="sidebar-separator"
    />
  );
}
export type SidebarTriggerProps = ComponentPropsWithRef<typeof HeroButton>;
export function SidebarTrigger({
  children,
  ...props
}: SidebarTriggerProps): ReactElement {
  const { toggleSidebar } = useSidebar();
  return (
    <HeroButton
      {...props}
      isIconOnly
      data-slot="sidebar-trigger"
      size="sm"
      variant="ghost"
      onPress={toggleSidebar}
    >
      {children ?? "☰"}
    </HeroButton>
  );
}
export function SidebarRail(
  props: ComponentPropsWithRef<"button">,
): ReactElement {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      {...props}
      aria-label="Toggle sidebar"
      className={cn("sidebar__rail", props.className)}
      data-slot="sidebar-rail"
      tabIndex={-1}
      type="button"
      onClick={toggleSidebar}
    />
  );
}
export function SidebarMain({
  className,
  ...props
}: ComponentPropsWithRef<"main">): ReactElement {
  return (
    <main
      {...props}
      className={cn("sidebar__main", className)}
      data-slot="sidebar-main"
    />
  );
}
export function SidebarMobile({
  backdrop = "blur",
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div"> & {
  backdrop?: "blur" | "opaque" | "transparent";
}): ReactElement | null {
  const state = useSidebar();
  return state.isMobile ? (
    <Sheet.Root
      isOpen={state.isMobileOpen}
      placement={state.side}
      onOpenChange={state.setMobileOpen}
    >
      <Sheet.Backdrop variant={backdrop}>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Mobile sidebar">
            <div
              {...props}
              className={cn("sidebar__mobile", className)}
              data-slot="sidebar-mobile"
            >
              {children}
            </div>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  ) : null;
}
export function SidebarTooltip({
  children,
  content,
  ...props
}: {
  children: ReactNode;
  closeDelay?: number;
  content: ReactNode;
  delay?: number;
  placement?: "bottom" | "left" | "right" | "top";
}): ReactElement {
  const state = useSidebar();
  return state.isOpen ? (
    <>{children}</>
  ) : (
    <Tooltip>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content {...props}>{content}</Tooltip.Content>
    </Tooltip>
  );
}
type SidebarComponent = typeof SidebarRoot & {
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
  Group: typeof SidebarGroup;
  GroupLabel: typeof SidebarGroupLabel;
  Header: typeof SidebarHeader;
  Main: typeof SidebarMain;
  Menu: typeof SidebarMenu;
  MenuAction: typeof SidebarMenuAction;
  MenuActions: typeof SidebarMenuActions;
  MenuChip: typeof SidebarMenuChip;
  MenuHeader: typeof SidebarMenuHeader;
  MenuIcon: typeof SidebarMenuIcon;
  MenuIndicator: typeof SidebarMenuIndicator;
  MenuItem: typeof SidebarMenuItem;
  MenuItemContent: typeof SidebarMenuItemContent;
  MenuLabel: typeof SidebarMenuLabel;
  MenuSection: typeof SidebarMenuSection;
  MenuTrigger: typeof SidebarMenuTrigger;
  Mobile: typeof SidebarMobile;
  Provider: typeof SidebarProvider;
  Rail: typeof SidebarRail;
  Root: typeof SidebarRoot;
  Separator: typeof SidebarSeparator;
  Submenu: typeof SidebarSubmenu;
  Tooltip: typeof SidebarTooltip;
  Trigger: typeof SidebarTrigger;
};
export const Sidebar: SidebarComponent = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Main: SidebarMain,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuActions: SidebarMenuActions,
  MenuChip: SidebarMenuChip,
  MenuHeader: SidebarMenuHeader,
  MenuIcon: SidebarMenuIcon,
  MenuIndicator: SidebarMenuIndicator,
  MenuItem: SidebarMenuItem,
  MenuItemContent: SidebarMenuItemContent,
  MenuLabel: SidebarMenuLabel,
  MenuSection: SidebarMenuSection,
  MenuTrigger: SidebarMenuTrigger,
  Mobile: SidebarMobile,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Root: SidebarRoot,
  Separator: SidebarSeparator,
  Submenu: SidebarSubmenu,
  Tooltip: SidebarTooltip,
  Trigger: SidebarTrigger,
});
