"use client";

import type { ToggleButtonProps } from "react-aria-components";

import type { HTMLAttributes, ReactElement } from "react";
import { createContext, useContext } from "react";

import { cn } from "@heroui/react";
import { ToggleButton } from "react-aria-components";

type EmojiReactionButtonSize = "lg" | "md" | "sm";

const Context = createContext({
  countClassName: "emoji-reaction-button__count",
  emojiClassName: "emoji-reaction-button__emoji",
});

export interface EmojiReactionButtonRootProps extends ToggleButtonProps {
  isReadOnly?: boolean;
  size?: EmojiReactionButtonSize;
}

function EmojiReactionButtonRoot({
  children,
  className,
  defaultSelected,
  excludeFromTabOrder,
  isReadOnly,
  isSelected,
  onChange,
  onClick,
  onPress,
  onPressChange,
  onPressEnd,
  onPressStart,
  onPressUp,
  size = "md",
  ...props
}: EmojiReactionButtonRootProps): ReactElement {
  return (
    <Context
      value={{
        countClassName: "emoji-reaction-button__count",
        emojiClassName: "emoji-reaction-button__emoji",
      }}
    >
      <ToggleButton
        {...props}
        className={
          cn(
            "emoji-reaction-button",
            `emoji-reaction-button--${size}`,
            className,
          ) ?? ""
        }
        data-readonly={isReadOnly || undefined}
        data-slot="emoji-reaction-button"
        {...(isReadOnly
          ? { excludeFromTabOrder: true }
          : excludeFromTabOrder !== undefined
            ? { excludeFromTabOrder }
            : {})}
        {...(defaultSelected !== undefined ? { defaultSelected } : {})}
        {...(isSelected !== undefined ? { isSelected } : {})}
        {...(!isReadOnly && onChange ? { onChange } : {})}
        {...(!isReadOnly && onClick ? { onClick } : {})}
        {...(!isReadOnly && onPress ? { onPress } : {})}
        {...(!isReadOnly && onPressChange ? { onPressChange } : {})}
        {...(!isReadOnly && onPressEnd ? { onPressEnd } : {})}
        {...(!isReadOnly && onPressStart ? { onPressStart } : {})}
        {...(!isReadOnly && onPressUp ? { onPressUp } : {})}
      >
        {children}
      </ToggleButton>
    </Context>
  );
}

function Emoji({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>): ReactElement {
  const context = useContext(Context);
  return (
    <span
      className={cn(context.emojiClassName, className)}
      data-slot="emoji-reaction-button-emoji"
      {...props}
    >
      {children}
    </span>
  );
}
function Count({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>): ReactElement {
  const context = useContext(Context);
  return (
    <span
      className={cn(context.countClassName, className)}
      data-slot="emoji-reaction-button-count"
      {...props}
    >
      {children}
    </span>
  );
}

type EmojiReactionButtonComponent = typeof EmojiReactionButtonRoot & {
  Count: typeof Count;
  Emoji: typeof Emoji;
  Root: typeof EmojiReactionButtonRoot;
};

export const EmojiReactionButton: EmojiReactionButtonComponent = Object.assign(
  EmojiReactionButtonRoot,
  { Count, Emoji, Root: EmojiReactionButtonRoot },
);
