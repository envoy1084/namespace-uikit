"use client";

import type {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
} from "react";
import { createContext, forwardRef, useContext, useMemo } from "react";

import { CloseButton, cn } from "@heroui/react";
import { Dialog, Heading } from "react-aria-components";
import { Drawer as Vaul } from "vaul";

export type SheetPlacement = "bottom" | "left" | "right" | "top";
export type SheetSnapPoint = number | string;

interface SheetContextValue {
  isDetached: boolean;
  placement: SheetPlacement;
  snapPoints: SheetSnapPoint[] | undefined;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const value = useContext(SheetContext);

  if (!value) throw new Error("Sheet parts must be used inside Sheet.Root");

  return value;
}

export interface SheetRootProps {
  activeSnapPoint?: SheetSnapPoint | null;
  children?: ReactNode;
  closeThreshold?: number;
  container?: HTMLElement | null;
  defaultOpen?: boolean;
  disablePreventScroll?: boolean;
  fadeFromIndex?: number;
  isDetached?: boolean;
  isDismissable?: boolean;
  isFixed?: boolean;
  isHandleOnly?: boolean;
  isModal?: boolean;
  isNested?: boolean;
  isOpen?: boolean;
  noBodyStyles?: boolean;
  onActiveSnapPointChange?: (point: SheetSnapPoint | null) => void;
  onAnimationEnd?: (open: boolean) => void;
  onClose?: () => void;
  onDrag?: (
    event: React.PointerEvent<HTMLDivElement>,
    percentage: number,
  ) => void;
  onOpenChange?: (open: boolean) => void;
  onRelease?: (
    event: React.PointerEvent<HTMLDivElement>,
    open: boolean,
  ) => void;
  placement?: SheetPlacement;
  preventScrollRestoration?: boolean;
  repositionInputs?: boolean;
  scrollLockTimeout?: number;
  setBackgroundColorOnScale?: boolean;
  shouldAutoFocus?: boolean;
  shouldScaleBackground?: boolean;
  snapPoints?: SheetSnapPoint[];
  snapToSequentialPoint?: boolean;
}

function SheetRootBase({
  activeSnapPoint,
  children,
  closeThreshold,
  container,
  defaultOpen,
  disablePreventScroll,
  fadeFromIndex,
  isDetached = false,
  isDismissable = true,
  isFixed,
  isHandleOnly,
  isModal,
  isNested = false,
  isOpen,
  noBodyStyles,
  onActiveSnapPointChange,
  onAnimationEnd,
  onClose,
  onDrag,
  onOpenChange,
  onRelease,
  placement = "bottom",
  preventScrollRestoration,
  repositionInputs,
  scrollLockTimeout,
  setBackgroundColorOnScale,
  shouldAutoFocus,
  shouldScaleBackground,
  snapPoints,
  snapToSequentialPoint,
}: SheetRootProps): ReactElement {
  const Root = isNested ? Vaul.NestedRoot : Vaul.Root;
  const context = useMemo(
    () => ({ isDetached, placement, snapPoints }),
    [isDetached, placement, snapPoints],
  );
  const rootProps = {
    activeSnapPoint,
    autoFocus: shouldAutoFocus,
    closeThreshold,
    container,
    defaultOpen,
    direction: placement,
    disablePreventScroll,
    dismissible: isDismissable,
    fadeFromIndex,
    fixed: isFixed,
    handleOnly: isHandleOnly,
    modal: isModal,
    noBodyStyles,
    onAnimationEnd,
    onClose,
    onDrag,
    onOpenChange,
    onRelease,
    open: isOpen,
    preventScrollRestoration,
    repositionInputs,
    scrollLockTimeout,
    setActiveSnapPoint: onActiveSnapPointChange,
    setBackgroundColorOnScale,
    shouldScaleBackground,
    snapPoints,
    snapToSequentialPoint,
  } as ComponentProps<typeof Vaul.Root>;

  return (
    <SheetContext value={context}>
      <Root {...rootProps}>{children}</Root>
    </SheetContext>
  );
}

export function SheetRoot(props: SheetRootProps): ReactElement {
  return <SheetRootBase {...props} />;
}

export function SheetNestedRoot(props: SheetRootProps): ReactElement {
  return <SheetRootBase {...props} isNested />;
}

export type SheetTriggerProps = ComponentPropsWithRef<typeof Vaul.Trigger>;
export const SheetTrigger: ForwardRefExoticComponent<SheetTriggerProps> =
  forwardRef<HTMLButtonElement, SheetTriggerProps>(function SheetTrigger(
    { children, ...props },
    ref,
  ) {
    return (
      <Vaul.Trigger {...props} asChild ref={ref}>
        {children}
      </Vaul.Trigger>
    );
  });

export type SheetCloseProps = ComponentPropsWithRef<typeof Vaul.Close>;
export const SheetClose: ForwardRefExoticComponent<SheetCloseProps> =
  forwardRef<HTMLButtonElement, SheetCloseProps>(function SheetClose(
    { children, ...props },
    ref,
  ) {
    return (
      <Vaul.Close {...props} asChild ref={ref}>
        {children}
      </Vaul.Close>
    );
  });

export interface SheetBackdropProps extends ComponentPropsWithRef<
  typeof Vaul.Overlay
> {
  variant?: "blur" | "opaque" | "transparent";
}

export const SheetBackdrop: ForwardRefExoticComponent<SheetBackdropProps> =
  forwardRef<HTMLDivElement, SheetBackdropProps>(function SheetBackdrop(
    { children, className, variant = "opaque", ...props },
    ref,
  ) {
    return (
      <Vaul.Portal>
        <Vaul.Overlay
          {...props}
          className={cn(
            "sheet__backdrop",
            `sheet__backdrop--${variant}`,
            className,
          )}
          data-sheet-overlay=""
          data-slot="sheet-backdrop"
          data-variant={variant}
          ref={ref}
        >
          <Vaul.Close aria-label="Dismiss" className="sr-only">
            Dismiss
          </Vaul.Close>
          {children}
        </Vaul.Overlay>
      </Vaul.Portal>
    );
  });

export type SheetContentProps = ComponentPropsWithRef<typeof Vaul.Content>;
export const SheetContent: ForwardRefExoticComponent<SheetContentProps> =
  forwardRef<HTMLDivElement, SheetContentProps>(function SheetContent(
    { className, style, ...props },
    ref,
  ) {
    const { isDetached, placement, snapPoints } = useSheetContext();

    return (
      <Vaul.Content
        {...props}
        className={cn(
          "sheet__content",
          `sheet__content--${placement}`,
          className,
        )}
        data-sheet-detached={isDetached || undefined}
        data-sheet-drawer=""
        data-sheet-drawer-direction={placement}
        data-sheet-snap-points={snapPoints?.length ? "true" : "false"}
        data-slot="sheet-content"
        ref={ref}
        role="presentation"
        style={style as CSSProperties}
      />
    );
  });

export type SheetDialogProps = ComponentPropsWithRef<typeof Dialog>;
export const SheetDialog: ForwardRefExoticComponent<SheetDialogProps> =
  forwardRef<HTMLElement, SheetDialogProps>(function SheetDialog(
    { className, ...props },
    ref,
  ) {
    const { placement } = useSheetContext();

    return (
      <Dialog
        {...props}
        className={
          cn("sheet__dialog", `sheet__dialog--${placement}`, className) ??
          "sheet__dialog"
        }
        data-placement={placement}
        data-slot="sheet-dialog"
        ref={ref}
      />
    );
  });

type SheetDivPart = ForwardRefExoticComponent<ComponentPropsWithRef<"div">>;

function createDivPart(slot: string, base: string): SheetDivPart {
  return forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
    function SheetPart({ className, ...props }, ref) {
      return (
        <div
          {...props}
          className={cn(base, className)}
          data-slot={slot}
          ref={ref}
        />
      );
    },
  );
}

export const SheetHeader: SheetDivPart = createDivPart(
  "sheet-header",
  "sheet__header",
);
export const SheetBody: SheetDivPart = createDivPart(
  "sheet-body",
  "sheet__body",
);
export const SheetFooter: SheetDivPart = createDivPart(
  "sheet-footer",
  "sheet__footer",
);

export type SheetHeadingProps = ComponentPropsWithRef<typeof Heading>;
export const SheetHeading: ForwardRefExoticComponent<SheetHeadingProps> =
  forwardRef<HTMLHeadingElement, SheetHeadingProps>(function SheetHeading(
    { className, ...props },
    ref,
  ) {
    return (
      <Heading
        {...props}
        className={cn("sheet__heading", className) ?? "sheet__heading"}
        data-slot="sheet-heading"
        level={2}
        ref={ref}
        slot="title"
      />
    );
  });

export type SheetHandleProps = ComponentPropsWithRef<typeof Vaul.Handle>;
export const SheetHandle: ForwardRefExoticComponent<SheetHandleProps> =
  forwardRef<HTMLDivElement, SheetHandleProps>(function SheetHandle(
    { children, className, ...props },
    ref,
  ) {
    return (
      <Vaul.Handle
        {...props}
        className={cn("sheet__handle", className)}
        data-sheet-handle=""
        data-slot="sheet-handle"
        ref={ref}
      >
        <span data-slot="sheet-handle-hitarea">
          {children ?? (
            <span className="sheet__handle-bar" data-slot="sheet-handle-bar" />
          )}
        </span>
      </Vaul.Handle>
    );
  });

export type SheetCloseTriggerProps = ComponentPropsWithRef<typeof CloseButton>;
export const SheetCloseTrigger: ForwardRefExoticComponent<SheetCloseTriggerProps> =
  forwardRef<HTMLButtonElement, SheetCloseTriggerProps>(
    function SheetCloseTrigger({ className, ...props }, ref) {
      return (
        <Vaul.Close asChild>
          <CloseButton
            {...props}
            className={
              cn("sheet__close-trigger", className) ?? "sheet__close-trigger"
            }
            data-slot="sheet-close-trigger"
            ref={ref}
          />
        </Vaul.Close>
      );
    },
  );

type SheetComponent = typeof SheetRoot & {
  Backdrop: typeof SheetBackdrop;
  Body: typeof SheetBody;
  Close: typeof SheetClose;
  CloseTrigger: typeof SheetCloseTrigger;
  Content: typeof SheetContent;
  Dialog: typeof SheetDialog;
  Footer: typeof SheetFooter;
  Handle: typeof SheetHandle;
  Header: typeof SheetHeader;
  Heading: typeof SheetHeading;
  NestedRoot: typeof SheetNestedRoot;
  Root: typeof SheetRoot;
  Trigger: typeof SheetTrigger;
};

export const Sheet: SheetComponent = Object.assign(SheetRoot, {
  Backdrop: SheetBackdrop,
  Body: SheetBody,
  Close: SheetClose,
  CloseTrigger: SheetCloseTrigger,
  Content: SheetContent,
  Dialog: SheetDialog,
  Footer: SheetFooter,
  Handle: SheetHandle,
  Header: SheetHeader,
  Heading: SheetHeading,
  NestedRoot: SheetNestedRoot,
  Root: SheetRoot,
  Trigger: SheetTrigger,
});
