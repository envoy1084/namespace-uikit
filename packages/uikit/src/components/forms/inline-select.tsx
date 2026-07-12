"use client";

import type { ComponentProps, ReactElement } from "react";

import { cn, Select } from "@heroui/react";

function ChevronsExpandVerticalIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3.58 4.109a.75.75 0 0 0 1.061 1.06L8 1.811l3.354 3.353a.75.75 0 0 0 1.06-1.06L8.53.22a.75.75 0 0 0-1.06 0zm8.84 7.782a.75.75 0 1 0-1.061-1.06l-3.36 3.358-3.353-3.353a.75.75 0 1 0-1.06 1.06L7.47 15.78a.75.75 0 0 0 1.06 0z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export type InlineSelectRootProps = ComponentProps<typeof Select>;

function InlineSelectRoot({
  children,
  className,
  ...props
}: InlineSelectRootProps): ReactElement {
  return (
    <Select
      {...props}
      className={(renderProps) =>
        cn(
          "inline-select",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "inline-select"
      }
      data-slot="inline-select"
    >
      {children}
    </Select>
  );
}

export type InlineSelectTriggerProps = ComponentProps<typeof Select.Trigger>;

function InlineSelectTrigger({
  children,
  className,
  ...props
}: InlineSelectTriggerProps): ReactElement {
  return (
    <Select.Trigger
      {...props}
      className={(renderProps) =>
        cn(
          "inline-select__trigger",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "inline-select__trigger"
      }
      data-slot="inline-select-trigger"
    >
      {children}
    </Select.Trigger>
  );
}

export type InlineSelectValueProps = ComponentProps<typeof Select.Value>;

function InlineSelectValue({
  children,
  className,
  ...props
}: InlineSelectValueProps): ReactElement {
  return (
    <Select.Value
      {...props}
      className={(renderProps) =>
        cn(
          "inline-select__value",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "inline-select__value"
      }
      data-slot="inline-select-value"
    >
      {children}
    </Select.Value>
  );
}

export type InlineSelectIndicatorProps = ComponentProps<
  typeof Select.Indicator
>;

function InlineSelectIndicator({
  children,
  className,
  ...props
}: InlineSelectIndicatorProps): ReactElement {
  return (
    <Select.Indicator
      {...props}
      className={
        cn("inline-select__indicator", className) ?? "inline-select__indicator"
      }
      data-slot="inline-select-indicator"
    >
      {children === undefined ? <ChevronsExpandVerticalIcon /> : children}
    </Select.Indicator>
  );
}

export type InlineSelectPopoverProps = ComponentProps<typeof Select.Popover>;

function InlineSelectPopover({
  children,
  className,
  placement = "bottom end",
  ...props
}: InlineSelectPopoverProps): ReactElement {
  return (
    <Select.Popover
      {...props}
      className={(renderProps) =>
        cn(
          "inline-select__popover",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "inline-select__popover"
      }
      data-slot="inline-select-popover"
      placement={placement}
    >
      {children}
    </Select.Popover>
  );
}

type InlineSelectComponent = typeof InlineSelectRoot & {
  Indicator: typeof InlineSelectIndicator;
  Popover: typeof InlineSelectPopover;
  Root: typeof InlineSelectRoot;
  Trigger: typeof InlineSelectTrigger;
  Value: typeof InlineSelectValue;
};

export const InlineSelect: InlineSelectComponent = Object.assign(
  InlineSelectRoot,
  {
    Indicator: InlineSelectIndicator,
    Popover: InlineSelectPopover,
    Root: InlineSelectRoot,
    Trigger: InlineSelectTrigger,
    Value: InlineSelectValue,
  },
);
