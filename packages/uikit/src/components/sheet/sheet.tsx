"use client";
import type {
  ComponentType,
  ComponentPropsWithRef,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactElement,
  ReactNode,
} from "react";
import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { CloseButton, cn, Drawer } from "@heroui/react";

export type SheetPlacement = "bottom" | "left" | "right" | "top";
export type SheetSnapPoint = number | string;
interface ContextValue {
  activeSnapPoint: SheetSnapPoint | null;
  close: () => void;
  isDetached: boolean;
  isDismissable: boolean;
  isHandleOnly: boolean;
  isOpen: boolean;
  onDrag?:
    | ((event: ReactPointerEvent<HTMLDivElement>, percentage: number) => void)
    | undefined;
  onRelease?:
    | ((event: ReactPointerEvent<HTMLDivElement>, open: boolean) => void)
    | undefined;
  open: () => void;
  placement: SheetPlacement;
  setActiveSnapPoint: (point: SheetSnapPoint | null) => void;
  snapPoints?: SheetSnapPoint[] | undefined;
}
const Context = createContext<ContextValue | null>(null);
const useSheet = () => {
  const value = useContext(Context);
  if (!value) throw new Error("Sheet parts must be used inside Sheet");
  return value;
};
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
  noBodyStyles?: boolean;
  onActiveSnapPointChange?: (point: SheetSnapPoint | null) => void;
  onAnimationEnd?: (open: boolean) => void;
  onClose?: () => void;
  onDrag?: (
    event: ReactPointerEvent<HTMLDivElement>,
    percentage: number,
  ) => void;
  onOpenChange?: (open: boolean) => void;
  onRelease?: (event: ReactPointerEvent<HTMLDivElement>, open: boolean) => void;
  placement?: SheetPlacement;
  preventScrollRestoration?: boolean;
  repositionInputs?: boolean;
  scrollLockTimeout?: number;
  setBackgroundColorOnScale?: boolean;
  shouldAutoFocus?: boolean;
  shouldScaleBackground?: boolean;
  snapPoints?: SheetSnapPoint[];
  snapToSequentialPoint?: boolean;
  isOpen?: boolean;
}
export function SheetRoot({
  activeSnapPoint,
  children,
  defaultOpen = false,
  isDetached = false,
  isDismissable = true,
  isHandleOnly = false,
  isOpen,
  onActiveSnapPointChange,
  onAnimationEnd,
  onClose,
  onDrag,
  onOpenChange,
  onRelease,
  placement = "bottom",
  snapPoints,
}: SheetRootProps): ReactElement {
  const [localOpen, setLocalOpen] = useState(defaultOpen),
    openState = isOpen ?? localOpen;
  const initial = activeSnapPoint ?? snapPoints?.[0] ?? null;
  const [localSnap, setLocalSnap] = useState<SheetSnapPoint | null>(initial),
    snap = activeSnapPoint === undefined ? localSnap : activeSnapPoint;
  const setOpen = useCallback(
    (value: boolean) => {
      if (isOpen === undefined) setLocalOpen(value);
      onOpenChange?.(value);
      if (!value) onClose?.();
      setTimeout(() => onAnimationEnd?.(value), 200);
    },
    [isOpen, onAnimationEnd, onClose, onOpenChange],
  );
  const setSnap = useCallback(
    (point: SheetSnapPoint | null) => {
      if (activeSnapPoint === undefined) setLocalSnap(point);
      onActiveSnapPointChange?.(point);
    },
    [activeSnapPoint, onActiveSnapPointChange],
  );
  const value = useMemo(
    () => ({
      activeSnapPoint: snap,
      close: () => setOpen(false),
      isDetached,
      isDismissable,
      isHandleOnly,
      isOpen: openState,
      onDrag,
      onRelease,
      open: () => setOpen(true),
      placement,
      setActiveSnapPoint: setSnap,
      snapPoints,
    }),
    [
      snap,
      isDetached,
      isDismissable,
      isHandleOnly,
      onDrag,
      onRelease,
      openState,
      placement,
      setOpen,
      setSnap,
      snapPoints,
    ],
  );
  return (
    <Context value={value}>
      <Drawer isOpen={openState} onOpenChange={setOpen}>
        {children}
      </Drawer>
    </Context>
  );
}
export function SheetNestedRoot(props: SheetRootProps): ReactElement {
  return <SheetRoot {...props} isNested />;
}
type PressableChild = ReactElement<{ onPress?: () => void }>;
export function SheetTrigger({
  children,
}: {
  children: PressableChild;
}): ReactElement {
  const { open } = useSheet();
  return cloneElement(children, { onPress: open });
}
export function SheetClose({
  children,
}: {
  children: PressableChild;
}): ReactElement {
  const { close } = useSheet();
  return cloneElement(children, { onPress: close });
}
export interface SheetBackdropProps extends Omit<
  ComponentPropsWithRef<typeof Drawer.Backdrop>,
  "isOpen" | "onOpenChange"
> {
  variant?: "blur" | "opaque" | "transparent";
}
export function SheetBackdrop({
  className,
  variant = "opaque",
  ...props
}: SheetBackdropProps): ReactElement {
  const { isDismissable } = useSheet();
  return (
    <Drawer.Backdrop
      {...props}
      className={
        cn(
          "sheet__backdrop",
          typeof className === "string" ? className : undefined,
        ) ?? "sheet__backdrop"
      }
      data-slot="sheet-backdrop"
      data-variant={variant}
      isDismissable={isDismissable}
      variant={variant}
    />
  );
}
const snapSize = (
  point: SheetSnapPoint | null,
  placement: SheetPlacement,
): string | undefined =>
  point == null
    ? undefined
    : typeof point === "string"
      ? point
      : point <= 1
        ? `calc(${placement === "bottom" || placement === "top" ? "100dvh" : "100dvw"} * ${point})`
        : `${point}px`;
export type SheetContentProps = ComponentPropsWithRef<"div"> &
  Omit<ComponentPropsWithRef<typeof Drawer.Content>, "className" | "children">;
const DrawerContent = Drawer.Content as ComponentType<SheetContentProps>;
export function SheetContent({
  className,
  style,
  ...props
}: SheetContentProps): ReactElement {
  const state = useSheet();
  const start = useRef<{ x: number; y: number } | null>(null);
  const size = snapSize(state.activeSnapPoint, state.placement);
  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const delta =
      state.placement === "bottom"
        ? event.clientY - start.current.y
        : state.placement === "top"
          ? start.current.y - event.clientY
          : state.placement === "right"
            ? event.clientX - start.current.x
            : start.current.x - event.clientX;
    const dimension =
      state.placement === "bottom" || state.placement === "top"
        ? window.innerHeight
        : window.innerWidth;
    state.onDrag?.(event, Math.max(0, delta / dimension));
  };
  return (
    <DrawerContent
      {...props}
      className={
        cn(
          "sheet__content",
          `sheet__content--${state.placement}`,
          typeof className === "string" ? className : undefined,
        ) ?? "sheet__content"
      }
      data-sheet-detached={state.isDetached || undefined}
      data-sheet-drawer=""
      data-sheet-drawer-direction={state.placement}
      data-sheet-snap-points={state.snapPoints?.length ? "true" : undefined}
      data-slot="sheet-content"
      placement={state.placement}
      style={
        {
          ...style,
          ...(size
            ? {
                [state.placement === "bottom" || state.placement === "top"
                  ? "height"
                  : "width"]: size,
              }
            : {}),
          "--snap-point-height": size,
        } as CSSProperties
      }
      onPointerDown={(event) => {
        if (!state.isHandleOnly)
          start.current = { x: event.clientX, y: event.clientY };
        props.onPointerDown?.(event);
      }}
      onPointerMove={(event) => {
        drag(event);
        props.onPointerMove?.(event);
      }}
      onPointerUp={(event) => {
        start.current = null;
        state.onRelease?.(event, state.isOpen);
        props.onPointerUp?.(event);
      }}
    />
  );
}
export interface SheetDialogProps extends ComponentPropsWithRef<
  typeof Drawer.Dialog
> {
  children: ReactNode;
}
export function SheetDialog({
  className,
  ...props
}: SheetDialogProps): ReactElement {
  const { placement } = useSheet();
  return (
    <Drawer.Dialog
      {...props}
      className={
        cn(
          "sheet__dialog",
          `sheet__dialog--${placement}`,
          typeof className === "string" ? className : undefined,
        ) ?? "sheet__dialog"
      }
      data-placement={placement}
      data-slot="sheet-dialog"
    />
  );
}
const divPart =
  (slot: string, base: string) =>
  (p: ComponentPropsWithRef<"div">): ReactElement => (
    <div {...p} className={cn(base, p.className)} data-slot={slot} />
  );
type DivPart = (p: ComponentPropsWithRef<"div">) => ReactElement;
export const SheetHeader: DivPart = divPart("sheet-header", "sheet__header");
export const SheetBody: DivPart = divPart("sheet-body", "sheet__body");
export const SheetFooter: DivPart = divPart("sheet-footer", "sheet__footer");
export type SheetHeadingProps = ComponentPropsWithRef<typeof Drawer.Heading>;
export function SheetHeading({
  className,
  ...props
}: SheetHeadingProps): ReactElement {
  return (
    <Drawer.Heading
      {...props}
      className={
        cn(
          "sheet__heading",
          typeof className === "string" ? className : undefined,
        ) ?? "sheet__heading"
      }
      data-slot="sheet-heading"
    />
  );
}
export interface SheetHandleProps extends ComponentPropsWithRef<"div"> {
  preventCycle?: boolean;
}
export function SheetHandle({
  children,
  className,
  preventCycle = false,
  ...props
}: SheetHandleProps): ReactElement {
  const state = useSheet();
  const start = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn("sheet__handle", className)}
      data-sheet-handle=""
      data-slot="sheet-handle"
      onClick={() => {
        if (preventCycle) return;
        const points = state.snapPoints;
        if (!points?.length) {
          if (state.isDismissable) state.close();
          return;
        }
        const index = points.findIndex(
          (point) => point === state.activeSnapPoint,
        );
        if (index === points.length - 1) {
          if (state.isDismissable) state.close();
        } else state.setActiveSnapPoint(points[index + 1] ?? points[0] ?? null);
      }}
      onPointerDown={(event) => {
        start.current = { x: event.clientX, y: event.clientY };
        props.onPointerDown?.(event);
      }}
      onPointerMove={(event) => {
        if (start.current) {
          const delta = Math.abs(
            state.placement === "bottom" || state.placement === "top"
              ? event.clientY - start.current.y
              : event.clientX - start.current.x,
          );
          state.onDrag?.(
            event,
            delta /
              (state.placement === "bottom" || state.placement === "top"
                ? window.innerHeight
                : window.innerWidth),
          );
        }
        props.onPointerMove?.(event);
      }}
      onPointerUp={(event) => {
        start.current = null;
        state.onRelease?.(event, state.isOpen);
        props.onPointerUp?.(event);
      }}
    >
      <span data-slot="sheet-handle-hitarea">
        {children ?? (
          <span className="sheet__handle-bar" data-slot="sheet-handle-bar" />
        )}
      </span>
    </div>
  );
}
export type SheetCloseTriggerProps = ComponentPropsWithRef<typeof CloseButton>;
export function SheetCloseTrigger({
  className,
  ...props
}: SheetCloseTriggerProps): ReactElement {
  const { close } = useSheet();
  return (
    <CloseButton
      {...props}
      className={
        cn(
          "sheet__close-trigger",
          typeof className === "string" ? className : undefined,
        ) ?? "sheet__close-trigger"
      }
      data-slot="sheet-close-trigger"
      onPress={close}
    />
  );
}
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
