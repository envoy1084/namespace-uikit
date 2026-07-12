"use client";
import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
} from "react";

import { cn, Disclosure } from "@heroui/react";

import { HoverCard } from "../hover-card";
export type ChatSourceType = "document" | "url";
interface SourceContext {
  description?: string | undefined;
  domain?: string | undefined;
  enablePreview: boolean;
  faviconUrl?: string | undefined;
  href?: string | undefined;
  sourceType: ChatSourceType;
  title?: string | undefined;
}
const Context = createContext<SourceContext>({
  enablePreview: false,
  sourceType: "url",
});
const cls = (base: string, className: unknown): string =>
  cn(base, typeof className === "string" ? className : undefined) ?? base;
const domainOf = (href: string): string => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href.split("/").pop() || href;
  }
};
export interface ChatSourceRootProps extends ComponentPropsWithRef<"div"> {
  description?: string;
  enablePreview?: boolean;
  faviconUrl?: string;
  href?: string;
  sourceType?: ChatSourceType;
  title?: string;
}
export function ChatSourceRoot({
  children,
  className,
  description,
  enablePreview,
  faviconUrl,
  href,
  sourceType = href ? "url" : "document",
  title,
  ...props
}: ChatSourceRootProps): ReactElement {
  const domain = href ? domainOf(href) : undefined;
  const preview =
    sourceType === "url" &&
    !!href &&
    (enablePreview ?? !!(description || title));
  const value = useMemo(
    () => ({
      description,
      domain,
      enablePreview: preview,
      faviconUrl,
      href,
      sourceType,
      title,
    }),
    [description, domain, faviconUrl, href, preview, sourceType, title],
  );
  const content = children ?? (
    <>
      <ChatSourceTrigger />
      {preview ? (
        <ChatSourcePreview description={description} title={title} />
      ) : null}
    </>
  );
  const root = (
    <div
      className={cls("chat-source", className)}
      data-slot="chat-source"
      data-source-type={sourceType}
      {...props}
    >
      {content}
    </div>
  );
  return (
    <Context value={value}>
      {preview ? (
        <HoverCard closeDelay={0} openDelay={150}>
          {root}
        </HoverCard>
      ) : (
        root
      )}
    </Context>
  );
}
export interface ChatSourceTriggerProps extends Omit<
  ComponentPropsWithRef<"a">,
  "children"
> {
  children?: ReactNode;
  label?: ReactNode;
}
export function ChatSourceTrigger({
  children,
  className,
  label,
  ...props
}: ChatSourceTriggerProps): ReactElement {
  const state = useContext(Context);
  const link = state.sourceType === "url" && state.href;
  const content =
    children ??
    label ??
    (link ? (
      <>
        <ChatSourceIcon />
        <ChatSourceTitle />
      </>
    ) : (
      <>
        <ChatSourceDocumentIcon />
        <ChatSourceTitle />
      </>
    ));
  const triggerClass = cls("chat-source__trigger", className);
  if (link) {
    const anchor = (
      <a
        className="chat-source__trigger-link"
        href={state.href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {content}
      </a>
    );
    return (
      <span className={triggerClass} data-slot="chat-source-trigger">
        {state.enablePreview ? (
          <HoverCard.Trigger>{anchor}</HoverCard.Trigger>
        ) : (
          anchor
        )}
      </span>
    );
  }
  return (
    <span className={triggerClass} data-slot="chat-source-trigger">
      <span className="chat-source__trigger-link" {...props}>
        {content}
      </span>
    </span>
  );
}
export interface ChatSourceIconProps {
  children?: ReactNode;
  className?: string;
  faviconUrl?: string;
}
export function ChatSourceIcon({
  children,
  className,
  faviconUrl,
}: ChatSourceIconProps): ReactElement {
  const state = useContext(Context);
  const image = faviconUrl ?? state.faviconUrl;
  const label = state.title ?? state.domain ?? state.href ?? "Source";
  if (children && isValidElement(children))
    return cloneElement(
      children as ReactElement<{ className?: string; "data-slot"?: string }>,
      {
        className: cls(
          "chat-source__icon",
          cn(className, (children.props as { className?: string }).className),
        ),
        "data-slot": "chat-source-icon",
      },
    );
  return image ? (
    <img
      alt=""
      className={cls("chat-source__icon", className)}
      data-slot="chat-source-icon"
      height={14}
      src={image}
      width={14}
    />
  ) : (
    <span
      aria-hidden
      className={cls("chat-source__icon-fallback", className)}
      data-slot="chat-source-icon-fallback"
    >
      {label.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
export function ChatSourceDocumentIcon({
  className,
}: {
  className?: string;
}): ReactElement {
  return (
    <span
      aria-hidden
      className={cls("chat-source__document-icon", className)}
      data-slot="chat-source-document-icon"
    >
      ▤
    </span>
  );
}
export function ChatSourceTitle({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement {
  const state = useContext(Context);
  return (
    <span
      className={cls("chat-source__title", className)}
      data-slot="chat-source-title"
      {...props}
    >
      {children ?? state.title ?? state.domain}
    </span>
  );
}
export interface ChatSourcePreviewProps extends ComponentPropsWithRef<
  typeof HoverCard.Content
> {
  description?: ReactNode;
  title?: ReactNode;
}
export function ChatSourcePreview({
  children,
  className,
  description,
  title,
  ...props
}: ChatSourcePreviewProps): ReactElement | null {
  const state = useContext(Context);
  if (!state.href || !state.enablePreview) return null;
  return (
    <HoverCard.Content
      className={cls("chat-source__preview", className)}
      data-slot="chat-source-preview"
      offset={8}
      placement="top"
      {...props}
    >
      {children ?? (
        <a
          className="chat-source__preview-link"
          href={state.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="chat-source__preview-header">
            <ChatSourceIcon />
            <span className="text-foreground truncate text-sm">
              {state.domain}
            </span>
          </div>
          {(title ?? state.title) ? (
            <div className="chat-source__preview-title">
              {title ?? state.title}
            </div>
          ) : null}
          {(description ?? state.description) ? (
            <div className="chat-source__preview-description">
              {description ?? state.description}
            </div>
          ) : null}
        </a>
      )}
    </HoverCard.Content>
  );
}
export function ChatSourcesRoot({
  children,
  className,
  ...props
}: ComponentPropsWithRef<typeof Disclosure>): ReactElement {
  return (
    <Disclosure
      className={cls("chat-sources", className)}
      data-slot="chat-sources"
      {...props}
    >
      {children}
    </Disclosure>
  );
}
export function ChatSourcesTrigger({
  children,
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof Disclosure.Trigger>, "children"> & {
  children: ReactNode;
}): ReactElement {
  return (
    <Disclosure.Heading>
      <Disclosure.Trigger
        className={cls("chat-sources__trigger", className)}
        data-slot="chat-sources-trigger"
        {...props}
      >
        <span className="chat-sources__trigger-label">{children}</span>
        <Disclosure.Indicator className="text-muted size-3.5 shrink-0" />
      </Disclosure.Trigger>
    </Disclosure.Heading>
  );
}
export function ChatSourcesContent({
  children,
  className,
  ...props
}: ComponentPropsWithRef<typeof Disclosure.Content>): ReactElement {
  return (
    <Disclosure.Content
      className={cls("chat-sources__content", className)}
      data-slot="chat-sources-content"
      {...props}
    >
      <Disclosure.Body>
        <div className="chat-sources__content-body">{children}</div>
      </Disclosure.Body>
    </Disclosure.Content>
  );
}
export function ChatSourcesList({
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <div
      className={cls("chat-sources__list", className)}
      data-slot="chat-sources-list"
      {...props}
    />
  );
}
type SourceComponent = typeof ChatSourceRoot & {
  DocumentIcon: typeof ChatSourceDocumentIcon;
  Icon: typeof ChatSourceIcon;
  Preview: typeof ChatSourcePreview;
  Root: typeof ChatSourceRoot;
  Title: typeof ChatSourceTitle;
  Trigger: typeof ChatSourceTrigger;
};
export const ChatSource: SourceComponent = Object.assign(ChatSourceRoot, {
  DocumentIcon: ChatSourceDocumentIcon,
  Icon: ChatSourceIcon,
  Preview: ChatSourcePreview,
  Root: ChatSourceRoot,
  Title: ChatSourceTitle,
  Trigger: ChatSourceTrigger,
});
type SourcesComponent = typeof ChatSourcesRoot & {
  Content: typeof ChatSourcesContent;
  List: typeof ChatSourcesList;
  Root: typeof ChatSourcesRoot;
  Trigger: typeof ChatSourcesTrigger;
};
export const ChatSources: SourcesComponent = Object.assign(ChatSourcesRoot, {
  Content: ChatSourcesContent,
  List: ChatSourcesList,
  Root: ChatSourcesRoot,
  Trigger: ChatSourcesTrigger,
});
