"use client";
import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@heroui/react";

import { ChatMessage } from "../chat-message";
const cls = (base: string, className: unknown): string =>
  cn(base, typeof className === "string" ? className : undefined) ?? base;
export function ChatMessageActionsRoot({
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <ChatMessage.Actions
      className={cls("chat-message-actions", className)}
      data-slot="chat-message-actions"
      {...props}
    />
  );
}
type IconProps = ComponentPropsWithRef<"span">;
const icon = (symbol: string, slot: string) =>
  function Icon({ children, className, ...props }: IconProps): ReactElement {
    if (children && isValidElement(children))
      return cloneElement(
        children as ReactElement<{ className?: string; "data-slot"?: string }>,
        {
          ...props,
          className: cls(
            "size-4",
            cn(className, (children.props as { className?: string }).className),
          ),
          "data-slot": slot,
        },
      );
    return (
      <span
        aria-hidden
        className={cls("size-4", className)}
        data-slot={slot}
        {...props}
      >
        {symbol}
      </span>
    );
  };
export const ChatMessageActionsCopyIcon: (props: IconProps) => ReactElement =
  icon("⧉", "chat-message-actions-copy-icon");
export const ChatMessageActionsCopiedIcon: (props: IconProps) => ReactElement =
  icon("✓", "chat-message-actions-copied-icon");
export const ChatMessageActionsRegenerateIcon: (
  props: IconProps,
) => ReactElement = icon("↻", "chat-message-actions-regenerate-icon");
export const ChatMessageActionsMenuIcon: (props: IconProps) => ReactElement =
  icon("•••", "chat-message-actions-menu-icon");
export const ChatMessageActionsThumbsUpIcon: (
  props: IconProps,
) => ReactElement = icon("↑", "chat-message-actions-thumbs-up-icon");
export const ChatMessageActionsThumbsDownIcon: (
  props: IconProps,
) => ReactElement = icon("↓", "chat-message-actions-thumbs-down-icon");
export interface ChatMessageActionsCopyProps extends ComponentPropsWithRef<
  typeof ChatMessage.Action
> {
  copiedIcon?: ReactNode;
  isCopied?: boolean;
}
export function ChatMessageActionsCopy({
  children,
  className,
  copiedIcon,
  isCopied,
  onPress,
  ...props
}: ChatMessageActionsCopyProps): ReactElement {
  const [localCopied, setLocalCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlled = isCopied !== undefined;
  const copied = isCopied ?? localCopied;
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <ChatMessage.Action
      {...props}
      className={cls("chat-message-actions__action", className)}
      onPress={(event) => {
        onPress?.(event);
        if (!controlled) {
          setLocalCopied(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            setLocalCopied(false);
            timer.current = null;
          }, 2000);
        }
      }}
    >
      <span
        className="flex size-4 items-center justify-center"
        data-slot="chat-message-actions-copy-icon-motion"
      >
        {copied ? (
          copiedIcon && isValidElement(copiedIcon) ? (
            copiedIcon
          ) : (
            <ChatMessageActionsCopiedIcon />
          )
        ) : children && isValidElement(children) ? (
          children
        ) : (
          <ChatMessageActionsCopyIcon />
        )}
      </span>
    </ChatMessage.Action>
  );
}
type ActionProps = ComponentPropsWithRef<typeof ChatMessage.Action>;
const action = (Icon: (props: IconProps) => ReactElement) =>
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory captures Icon.
  function Action({
    children,
    className,
    ...props
  }: ActionProps): ReactElement {
    return (
      <ChatMessage.Action
        className={cls("chat-message-actions__action", className)}
        {...props}
      >
        {children && isValidElement(children) ? children : <Icon />}
      </ChatMessage.Action>
    );
  };
export const ChatMessageActionsRegenerate: (
  props: ActionProps,
) => ReactElement = action(ChatMessageActionsRegenerateIcon);
export const ChatMessageActionsMenu: (props: ActionProps) => ReactElement =
  action(ChatMessageActionsMenuIcon);
export const ChatMessageActionsThumbsUp: (props: ActionProps) => ReactElement =
  action(ChatMessageActionsThumbsUpIcon);
export const ChatMessageActionsThumbsDown: (
  props: ActionProps,
) => ReactElement = action(ChatMessageActionsThumbsDownIcon);
interface Component extends Function {
  Root: typeof ChatMessageActionsRoot;
  Copy: typeof ChatMessageActionsCopy;
  CopyIcon: typeof ChatMessageActionsCopyIcon;
  CopiedIcon: typeof ChatMessageActionsCopiedIcon;
  Regenerate: typeof ChatMessageActionsRegenerate;
  RegenerateIcon: typeof ChatMessageActionsRegenerateIcon;
  Menu: typeof ChatMessageActionsMenu;
  MenuIcon: typeof ChatMessageActionsMenuIcon;
  ThumbsUp: typeof ChatMessageActionsThumbsUp;
  ThumbsUpIcon: typeof ChatMessageActionsThumbsUpIcon;
  ThumbsDown: typeof ChatMessageActionsThumbsDown;
  ThumbsDownIcon: typeof ChatMessageActionsThumbsDownIcon;
}
export const ChatMessageActions = Object.assign(ChatMessageActionsRoot, {
  CopiedIcon: ChatMessageActionsCopiedIcon,
  Copy: ChatMessageActionsCopy,
  CopyIcon: ChatMessageActionsCopyIcon,
  Menu: ChatMessageActionsMenu,
  MenuIcon: ChatMessageActionsMenuIcon,
  Regenerate: ChatMessageActionsRegenerate,
  RegenerateIcon: ChatMessageActionsRegenerateIcon,
  Root: ChatMessageActionsRoot,
  ThumbsDown: ChatMessageActionsThumbsDown,
  ThumbsDownIcon: ChatMessageActionsThumbsDownIcon,
  ThumbsUp: ChatMessageActionsThumbsUp,
  ThumbsUpIcon: ChatMessageActionsThumbsUpIcon,
}) as typeof ChatMessageActionsRoot & Component;
