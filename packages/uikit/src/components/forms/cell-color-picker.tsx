"use client";

import type {
  ComponentProps,
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
} from "react";
import { createContext, useContext } from "react";

import { ColorPicker, ColorSwatch, cn } from "@heroui/react";
import { ColorPickerStateContext } from "react-aria-components";

export type CellColorPickerVariant = "default" | "secondary";

export interface CellColorPickerRootProps extends Omit<
  ComponentProps<typeof ColorPicker>,
  "children"
> {
  children: ReactNode;
  className?: string;
  variant?: CellColorPickerVariant;
}

function CellColorPickerRoot({
  children,
  className,
  variant = "default",
  ...props
}: CellColorPickerRootProps): ReactElement {
  return (
    <ColorPicker
      {...props}
      className={cn("cell-color-picker", className) ?? "cell-color-picker"}
    >
      <CellColorPickerVariantContext value={variant}>
        {children}
      </CellColorPickerVariantContext>
    </ColorPicker>
  );
}

const CellColorPickerVariantContext =
  createContext<CellColorPickerVariant>("default");

export type CellColorPickerTriggerProps = ComponentPropsWithRef<
  typeof ColorPicker.Trigger
>;

function CellColorPickerTrigger({
  children,
  className,
  ...props
}: CellColorPickerTriggerProps): ReactElement {
  const variant = useContext(CellColorPickerVariantContext);
  return (
    <ColorPicker.Trigger
      {...props}
      className={(renderProps) =>
        cn(
          "cell-color-picker__trigger",
          `cell-color-picker__trigger--${variant}`,
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "cell-color-picker__trigger"
      }
      data-slot="cell-color-picker-trigger"
    >
      {children}
    </ColorPicker.Trigger>
  );
}

export type CellColorPickerLabelProps = ComponentPropsWithRef<"span">;

function CellColorPickerLabel({
  children,
  className,
  ...props
}: CellColorPickerLabelProps): ReactElement {
  return (
    <span
      {...props}
      className={cn("cell-color-picker__label", className)}
      data-slot="cell-color-picker-label"
    >
      {children}
    </span>
  );
}

export type CellColorPickerValueDisplayProps = ComponentPropsWithRef<"span">;

function CellColorPickerValueDisplay({
  children,
  className,
  ...props
}: CellColorPickerValueDisplayProps): ReactElement {
  const state = useContext(ColorPickerStateContext);
  const value = state?.color?.toString("hex").toUpperCase() ?? "";
  return (
    <span
      {...props}
      className={cn("cell-color-picker__value-display", className)}
      data-slot="cell-color-picker-value-display"
    >
      {children ?? value}
    </span>
  );
}

export type CellColorPickerSwatchProps = ComponentProps<typeof ColorSwatch>;

function CellColorPickerSwatch({
  className,
  ...props
}: CellColorPickerSwatchProps): ReactElement {
  return (
    <ColorSwatch
      {...props}
      className={(renderProps) =>
        cn(
          "cell-color-picker__swatch",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "cell-color-picker__swatch"
      }
      data-slot="cell-color-picker-swatch"
    />
  );
}

export type CellColorPickerPopoverProps = ComponentPropsWithRef<
  typeof ColorPicker.Popover
>;

function CellColorPickerPopover({
  children,
  className,
  placement = "bottom end",
  ...props
}: CellColorPickerPopoverProps): ReactElement {
  return (
    <ColorPicker.Popover
      {...props}
      className={(renderProps) =>
        cn(
          "cell-color-picker__popover",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "cell-color-picker__popover"
      }
      data-slot="cell-color-picker-popover"
      placement={placement}
    >
      {children}
    </ColorPicker.Popover>
  );
}

type CellColorPickerComponent = typeof CellColorPickerRoot & {
  Label: typeof CellColorPickerLabel;
  Popover: typeof CellColorPickerPopover;
  Root: typeof CellColorPickerRoot;
  Swatch: typeof CellColorPickerSwatch;
  Trigger: typeof CellColorPickerTrigger;
  ValueDisplay: typeof CellColorPickerValueDisplay;
};

export const CellColorPicker: CellColorPickerComponent = Object.assign(
  CellColorPickerRoot,
  {
    Label: CellColorPickerLabel,
    Popover: CellColorPickerPopover,
    Root: CellColorPickerRoot,
    Swatch: CellColorPickerSwatch,
    Trigger: CellColorPickerTrigger,
    ValueDisplay: CellColorPickerValueDisplay,
  },
);
