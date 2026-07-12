"use client";
import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button, cn, Tooltip } from "@heroui/react";

import { Resizable } from "./resizable";
import { Sheet } from "./sheet";
import {
  Sidebar,
  useSidebar,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from "./sidebar";

export interface AppLayoutContextValue {
  isAsideOpen: boolean;
  navigate?: ((href: string) => void) | undefined;
  setAsideOpen: (open: boolean) => void;
  toggleAside: () => void;
}
const Context = createContext<AppLayoutContextValue | null>(null);
export const useAppLayout = (): AppLayoutContextValue | null =>
  useContext(Context);
export type AppLayoutResizeBehavior =
  | "preserve-pixel-size"
  | "preserve-relative-size";
export interface AppLayoutProps extends ComponentPropsWithRef<"div"> {
  aside?: ReactNode;
  asideDefaultSize?: number | string;
  asideMaxSize?: number | string;
  asideMinSize?: number | string;
  asideMobile?: "hidden" | "sheet";
  asideOpen?: boolean;
  asideResizable?: boolean;
  asideResizeBehavior?: AppLayoutResizeBehavior;
  asideToggleShortcut?: false | null | string;
  defaultAsideOpen?: boolean;
  defaultSidebarOpen?: boolean;
  footer?: ReactNode;
  navbar?: ReactNode;
  navigate?: (href: string) => void;
  onAsideOpenChange?: (open: boolean) => void;
  onSidebarOpenChange?: (open: boolean) => void;
  reduceMotion?: boolean;
  resizableAutoSaveId?: string;
  scrollMode?: "content" | "page";
  sidebar?: ReactNode;
  sidebarCollapsible?: SidebarCollapsible;
  sidebarDefaultSize?: number | string;
  sidebarMaxSize?: number | string;
  sidebarMinSize?: number | string;
  sidebarOpen?: boolean;
  sidebarResizable?: boolean;
  sidebarResizeBehavior?: AppLayoutResizeBehavior;
  sidebarSide?: SidebarSide;
  sidebarVariant?: SidebarVariant;
  toggleShortcut?: false | null | string;
  toolbar?: ReactNode;
}
const shortcutMatches = (e: KeyboardEvent, value: string) => {
  const p = value.toLowerCase().split("+");
  const key = p.pop();
  return (
    e.key.toLowerCase() === key &&
    (!p.includes("mod") || e.metaKey || e.ctrlKey) &&
    (!p.includes("shift") || e.shiftKey) &&
    (!p.includes("alt") || e.altKey)
  );
};
export function AppLayoutRoot({
  aside,
  asideDefaultSize = 20,
  asideMaxSize = 40,
  asideMinSize = 15,
  asideMobile = "hidden",
  asideOpen,
  asideResizable = false,
  asideToggleShortcut,
  children,
  className,
  defaultAsideOpen = true,
  defaultSidebarOpen = true,
  footer,
  navbar,
  navigate,
  onAsideOpenChange,
  onSidebarOpenChange,
  reduceMotion = false,
  resizableAutoSaveId,
  scrollMode = "page",
  sidebar,
  sidebarCollapsible = "icon",
  sidebarDefaultSize = 18,
  sidebarMaxSize = 30,
  sidebarMinSize = 12,
  sidebarOpen,
  sidebarResizable = false,
  sidebarSide = "left",
  sidebarVariant = "sidebar",
  toggleShortcut = "mod+b",
  toolbar,
  ...props
}: AppLayoutProps): ReactElement {
  const [localAside, setLocalAside] = useState(defaultAsideOpen),
    isAsideOpen = asideOpen ?? localAside;
  const setAsideOpen = useCallback(
    (value: boolean) => {
      if (asideOpen === undefined) {
        setLocalAside(value);
        document.cookie = `aside_state=${value}; path=/; max-age=604800`;
      }
      onAsideOpenChange?.(value);
    },
    [asideOpen, onAsideOpenChange],
  );
  const toggleAside = useCallback(
    () => setAsideOpen(!isAsideOpen),
    [isAsideOpen, setAsideOpen],
  );
  useEffect(() => {
    if (!asideToggleShortcut) return;
    const handler = (e: KeyboardEvent) => {
      if (shortcutMatches(e, asideToggleShortcut)) {
        e.preventDefault();
        toggleAside();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [asideToggleShortcut, toggleAside]);
  let mobileAside: ReactNode = null;
  const content: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === AppLayoutMobileAside)
      mobileAside = (child as ReactElement<{ children: ReactNode }>).props
        .children;
    else content.push(child);
  });
  const context = useMemo(
    () => ({ isAsideOpen, navigate, setAsideOpen, toggleAside }),
    [isAsideOpen, navigate, setAsideOpen, toggleAside],
  );
  const navbarNode = isValidElement(navbar)
    ? cloneElement(navbar, {
        ...(navigate && !(navbar.props as { navigate?: unknown }).navigate
          ? { navigate }
          : {}),
        "data-in-app-layout": "true",
      } as Record<string, unknown>)
    : navbar;
  const body = (
    <div className="app-layout__body" data-slot="app-layout-body">
      <>
        {navbarNode ? (
          <header className="app-layout__header" data-slot="app-layout-header">
            {navbarNode}
          </header>
        ) : null}
        {toolbar ? (
          <div className="app-layout__toolbar" data-slot="app-layout-toolbar">
            {toolbar}
          </div>
        ) : null}
        <main
          aria-label={
            scrollMode === "content" ? "Scrollable main content" : undefined
          }
          className="app-layout__main"
          data-scroll-mode={scrollMode}
          data-slot="app-layout-main"
          tabIndex={scrollMode === "content" ? 0 : undefined}
        >
          {content}
        </main>
        {footer ? (
          <div className="app-layout__footer" data-slot="app-layout-footer">
            {footer}
          </div>
        ) : null}
      </>
    </div>
  );
  const asideNode = aside ? (
    <aside
      className="app-layout__aside"
      data-slot="app-layout-aside"
      data-state={isAsideOpen ? "open" : "closed"}
    >
      {aside}
    </aside>
  ) : null;
  const resizable = sidebarResizable || asideResizable;
  const layout = resizable ? (
    <Resizable
      {...(resizableAutoSaveId === undefined
        ? {}
        : { autoSaveId: resizableAutoSaveId })}
    >
      {sidebar ? (
        <Resizable.Panel
          collapsible={sidebarCollapsible === "offcanvas"}
          defaultSize={sidebarDefaultSize}
          maxSize={sidebarMaxSize}
          minSize={sidebarMinSize}
        >
          {sidebar}
        </Resizable.Panel>
      ) : null}
      {sidebar && <Resizable.Handle />}
      <Resizable.Panel>{body}</Resizable.Panel>
      {aside && <Resizable.Handle />}
      {aside ? (
        <Resizable.Panel
          collapsible
          defaultSize={asideDefaultSize}
          maxSize={asideMaxSize}
          minSize={asideMinSize}
        >
          {asideNode}
        </Resizable.Panel>
      ) : null}
    </Resizable>
  ) : (
    <>
      {sidebar}
      {body}
      {asideNode}
    </>
  );
  return (
    <Context value={context}>
      <Sidebar.Provider
        {...props}
        className={cn("app-layout", className)}
        collapsible={sidebarCollapsible}
        defaultOpen={defaultSidebarOpen}
        {...(navigate === undefined ? {} : { navigate })}
        {...(onSidebarOpenChange === undefined
          ? {}
          : { onOpenChange: onSidebarOpenChange })}
        {...(sidebarOpen === undefined ? {} : { open: sidebarOpen })}
        reduceMotion={reduceMotion}
        side={sidebarSide}
        toggleShortcut={toggleShortcut}
        variant={sidebarVariant}
      >
        {layout}
        {aside && asideMobile === "sheet" ? (
          <AppLayoutMobileAsideDrawer>
            {mobileAside ?? aside}
          </AppLayoutMobileAsideDrawer>
        ) : null}
      </Sidebar.Provider>
    </Context>
  );
}
function AppLayoutMobileAsideDrawer({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  const app = useAppLayout();
  const { isMobile } = useSidebar();
  return app && isMobile ? (
    <Sheet.Root
      isOpen={app.isAsideOpen}
      placement="right"
      onOpenChange={app.setAsideOpen}
    >
      <Sheet.Backdrop variant="blur">
        <Sheet.Content>
          <Sheet.Dialog aria-label="Application aside">
            <div className="app-layout__mobile-aside">{children}</div>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  ) : null;
}
export interface AppLayoutTooltipProps {
  className?: string;
  closeDelay?: number;
  delay?: number;
  isDisabled?: boolean;
  offset?: number;
  placement?: "bottom" | "left" | "right" | "top";
  showArrow?: boolean;
}
const withTooltip = (
  trigger: ReactElement,
  content: ReactNode | undefined,
  props: AppLayoutTooltipProps | undefined,
) =>
  content ? (
    <Tooltip
      {...(props?.closeDelay === undefined
        ? {}
        : { closeDelay: props.closeDelay })}
      {...(props?.delay === undefined ? {} : { delay: props.delay })}
      {...(props?.isDisabled === undefined
        ? {}
        : { isDisabled: props.isDisabled })}
    >
      <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
      <Tooltip.Content
        {...(props?.className === undefined
          ? {}
          : { className: props.className })}
        {...(props?.offset === undefined ? {} : { offset: props.offset })}
        placement={props?.placement ?? "bottom"}
      >
        {props?.showArrow ? <Tooltip.Arrow /> : null}
        {content}
      </Tooltip.Content>
    </Tooltip>
  ) : (
    trigger
  );
export interface AppLayoutMenuToggleProps extends ComponentPropsWithRef<
  typeof Button
> {
  tooltip?: ReactNode;
  tooltipProps?: AppLayoutTooltipProps;
}
export function AppLayoutMenuToggle({
  children,
  className,
  tooltip,
  tooltipProps,
  ...props
}: AppLayoutMenuToggleProps): ReactElement {
  const { setMobileOpen } = useSidebar();
  return withTooltip(
    <Button
      {...props}
      isIconOnly
      aria-label="Open navigation"
      className={
        cn(
          "app-layout__menu-toggle",
          typeof className === "string" ? className : undefined,
        ) ?? "app-layout__menu-toggle"
      }
      data-slot="app-layout-menu-toggle"
      size="sm"
      variant="ghost"
      onPress={() => setMobileOpen(true)}
    >
      {children ?? "☰"}
    </Button>,
    tooltip,
    tooltipProps,
  );
}
export interface AppLayoutAsideTriggerProps extends ComponentPropsWithRef<
  typeof Button
> {
  closedTooltip?: ReactNode;
  openTooltip?: ReactNode;
  tooltipProps?: AppLayoutTooltipProps;
}
export function AppLayoutAsideTrigger({
  children,
  className,
  closedTooltip,
  openTooltip,
  tooltipProps,
  ...props
}: AppLayoutAsideTriggerProps): ReactElement {
  const app = useAppLayout(),
    open = app?.isAsideOpen ?? false;
  return withTooltip(
    <Button
      {...props}
      isIconOnly
      aria-expanded={open}
      aria-label="Toggle aside panel"
      className={
        cn(
          "app-layout__aside-trigger",
          typeof className === "string" ? className : undefined,
        ) ?? "app-layout__aside-trigger"
      }
      data-slot="app-layout-aside-trigger"
      data-state={open ? "open" : "closed"}
      size="sm"
      variant="ghost"
      onPress={() => app?.toggleAside()}
    >
      {children ?? "▥"}
    </Button>,
    open ? openTooltip : closedTooltip,
    tooltipProps,
  );
}
export function AppLayoutMobileAside({
  children,
}: {
  children: ReactNode;
}): null {
  void children;
  return null;
}
type AppLayoutComponent = typeof AppLayoutRoot & {
  AsideTrigger: typeof AppLayoutAsideTrigger;
  MenuToggle: typeof AppLayoutMenuToggle;
  MobileAside: typeof AppLayoutMobileAside;
  Root: typeof AppLayoutRoot;
};
export const AppLayout: AppLayoutComponent = Object.assign(AppLayoutRoot, {
  AsideTrigger: AppLayoutAsideTrigger,
  MenuToggle: AppLayoutMenuToggle,
  MobileAside: AppLayoutMobileAside,
  Root: AppLayoutRoot,
});
