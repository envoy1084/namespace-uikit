"use client";

import type { ButtonProps } from "react-aria-components";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@heroui/react";
import { Button as AriaButton } from "react-aria-components";

type Sweep = "down" | "left" | "right" | "up";

function hasDisabledParent(element: HTMLElement | null): boolean {
  const parent = element?.parentElement;
  return Boolean(
    (parent as HTMLButtonElement | null)?.disabled ||
    parent?.getAttribute("aria-disabled") === "true",
  );
}

function isNestedInteractive(
  parent: HTMLElement | null,
  target: EventTarget | null,
): boolean {
  if (!parent || !(target instanceof Element) || target === parent)
    return false;
  const interactive = target.closest(
    "a,button,input,select,textarea,[role='button']",
  );
  return Boolean(
    interactive && interactive !== parent && parent.contains(interactive),
  );
}

export interface HoldConfirmProps {
  children?: ReactNode;
  className?: string;
  duration?: number;
  isDisabled?: boolean;
  onComplete?: () => void;
  releaseDuration?: number;
  resetOnComplete?: boolean;
  style?: CSSProperties;
  sweep?: Sweep;
}

function HoldConfirm({
  children,
  className = "",
  duration = 2000,
  isDisabled = false,
  onComplete,
  releaseDuration = 200,
  resetOnComplete = true,
  style,
  sweep = "right",
}: HoldConfirmProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isHolding, setHolding] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => void (onCompleteRef.current = onComplete), [onComplete]);

  const start = useCallback(() => {
    setHolding(true);
    setComplete(false);
    timeout.current = setTimeout(() => {
      setComplete(true);
      onCompleteRef.current?.();
      if (resetOnComplete) {
        setComplete(false);
        setHolding(false);
      }
    }, duration);
  }, [duration, resetOnComplete]);
  const cancel = useCallback(() => {
    clearTimeout(timeout.current);
    setHolding(false);
  }, []);
  const onStart = useCallback(
    (event: Event) => {
      if (isDisabled || hasDisabledParent(ref.current)) return;
      if (event instanceof PointerEvent) {
        if (
          !event.isPrimary ||
          isNestedInteractive(ref.current?.parentElement ?? null, event.target)
        )
          return;
      } else if (event instanceof KeyboardEvent) {
        if ((event.key !== " " && event.key !== "Enter") || event.repeat)
          return;
      } else return;
      start();
    },
    [isDisabled, start],
  );
  const onKeyUp = useCallback(
    (event: Event) => {
      if (
        event instanceof KeyboardEvent &&
        event.key !== " " &&
        event.key !== "Enter"
      )
        return;
      cancel();
    },
    [cancel],
  );

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    parent.addEventListener("pointerdown", onStart, true);
    parent.addEventListener("pointerup", cancel, true);
    parent.addEventListener("pointerleave", cancel, true);
    parent.addEventListener("pointercancel", cancel, true);
    parent.addEventListener("keydown", onStart, true);
    parent.addEventListener("keyup", onKeyUp, true);
    parent.addEventListener("blur", cancel, true);
    return () => {
      parent.removeEventListener("pointerdown", onStart, true);
      parent.removeEventListener("pointerup", cancel, true);
      parent.removeEventListener("pointerleave", cancel, true);
      parent.removeEventListener("pointercancel", cancel, true);
      parent.removeEventListener("keydown", onStart, true);
      parent.removeEventListener("keyup", onKeyUp, true);
      parent.removeEventListener("blur", cancel, true);
    };
  }, [cancel, onKeyUp, onStart]);
  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pressable-feedback__hold-confirm", className)}
      data-complete={isComplete || undefined}
      data-holding={isHolding || undefined}
      data-slot="pressable-feedback-hold-confirm"
      data-sweep={sweep}
      style={
        {
          "--pressable-feedback-hold-confirm-duration": `${duration}ms`,
          "--pressable-feedback-hold-confirm-release-duration": `${releaseDuration}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export interface ProgressFeedbackProps {
  autoReset?: boolean;
  children?: ReactNode;
  className?: string;
  duration?: number;
  isDisabled?: boolean;
  onComplete?: () => void;
  onReset?: () => void;
  releaseDuration?: number;
  resetDelay?: number;
  style?: CSSProperties;
  sweep?: Sweep;
}

function ProgressFeedback({
  autoReset = true,
  children,
  className = "",
  duration = 2000,
  isDisabled = false,
  onComplete,
  onReset,
  releaseDuration = 300,
  resetDelay = 1500,
  style,
  sweep = "right",
}: ProgressFeedbackProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isProgressing, setProgressing] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const completeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const state = useRef<"complete" | "idle" | "progressing">("idle");
  const onCompleteRef = useRef(onComplete);
  const onResetRef = useRef(onReset);
  useEffect(() => void (onCompleteRef.current = onComplete), [onComplete]);
  useEffect(() => void (onResetRef.current = onReset), [onReset]);

  const start = useCallback(
    (event: Event) => {
      if (
        isDisabled ||
        hasDisabledParent(ref.current) ||
        isNestedInteractive(ref.current?.parentElement ?? null, event.target) ||
        state.current !== "idle"
      )
        return false;
      state.current = "progressing";
      setProgressing(true);
      setComplete(false);
      completeTimer.current = setTimeout(() => {
        state.current = "complete";
        setProgressing(false);
        setComplete(true);
        onCompleteRef.current?.();
        if (autoReset) {
          resetTimer.current = setTimeout(() => {
            state.current = "idle";
            setComplete(false);
            onResetRef.current?.();
          }, resetDelay);
        }
      }, duration);
      return true;
    },
    [autoReset, duration, isDisabled, resetDelay],
  );
  const onClick = useCallback((event: Event) => void start(event), [start]);
  const onKeyDown = useCallback(
    (event: Event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if ((event.key !== " " && event.key !== "Enter") || event.repeat) return;
      if (start(event)) event.preventDefault();
    },
    [start],
  );
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    parent.addEventListener("click", onClick, true);
    parent.addEventListener("keydown", onKeyDown, true);
    return () => {
      parent.removeEventListener("click", onClick, true);
      parent.removeEventListener("keydown", onKeyDown, true);
    };
  }, [onClick, onKeyDown]);
  useEffect(
    () => () => {
      clearTimeout(completeTimer.current);
      clearTimeout(resetTimer.current);
    },
    [],
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pressable-feedback__progress-feedback", className)}
      data-complete={isComplete || undefined}
      data-progressing={isProgressing || undefined}
      data-slot="pressable-feedback-progress-feedback"
      data-sweep={sweep}
      style={
        {
          "--pressable-feedback-progress-feedback-duration": `${duration}ms`,
          "--pressable-feedback-progress-feedback-release-duration": `${releaseDuration}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export interface RippleProps {
  className?: string;
  duration?: number;
  easing?: "cubic-bezier(0.2, 0, 0, 1)";
  hoverOpacity?: number;
  isDisabled?: boolean;
  minimumPressDuration?: number;
  pressedOpacity?: number;
  style?: CSSProperties;
  touchDelay?: number;
}

function Ripple({
  className = "",
  duration = 150,
  easing,
  hoverOpacity,
  isDisabled = false,
  minimumPressDuration = 225,
  pressedOpacity,
  style,
}: RippleProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const animation = useRef<Animation>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    if (hoverOpacity != null)
      surface.style.setProperty(
        "--pressable-feedback-ripple-hover-opacity",
        String(hoverOpacity),
      );
    if (pressedOpacity != null)
      surface.style.setProperty(
        "--pressable-feedback-ripple-pressed-opacity",
        String(pressedOpacity),
      );
    if (duration !== 150)
      surface.style.setProperty(
        "--pressable-feedback-ripple-duration",
        `${duration}ms`,
      );
  }, [duration, hoverOpacity, pressedOpacity]);

  const start = useCallback(
    (event?: PointerEvent) => {
      const root = rootRef.current;
      const surface = surfaceRef.current;
      if (!root || !surface) return;
      const rect = root.getBoundingClientRect();
      const size = Math.max(rect.height, rect.width);
      const initial = Math.floor(size * 0.2);
      const final = Math.sqrt(rect.width ** 2 + rect.height ** 2) + 12;
      const startX = event
        ? event.pageX - window.scrollX - rect.left
        : rect.width / 2;
      const startY = event
        ? event.pageY - window.scrollY - rect.top
        : rect.height / 2;
      const endX = (rect.width - initial) / 2;
      const endY = (rect.height - initial) / 2;
      setPressed(true);
      startedAt.current = performance.now();
      animation.current?.cancel();
      animation.current = surface.animate(
        {
          height: [`${initial}px`, `${initial}px`],
          transform: [
            `translate(${startX}px,${startY}px) scale(1)`,
            `translate(${endX}px,${endY}px) scale(${(final + Math.max(0.35 * size, 75)) / initial})`,
          ],
          width: [`${initial}px`, `${initial}px`],
        },
        {
          duration,
          ...(easing ? { easing } : {}),
          fill: "forwards",
          pseudoElement: "::after",
        },
      );
    },
    [duration, easing],
  );
  const end = useCallback(() => {
    const elapsed = performance.now() - startedAt.current;
    if (elapsed >= minimumPressDuration) setPressed(false);
    else setTimeout(() => setPressed(false), minimumPressDuration - elapsed);
  }, [minimumPressDuration]);

  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const valid = (event: PointerEvent) =>
      !isDisabled &&
      event.isPrimary &&
      !hasDisabledParent(rootRef.current) &&
      !isNestedInteractive(parent, event.target);
    const pointerEnter = (event: PointerEvent) =>
      valid(event) && event.pointerType !== "touch" && setHovered(true);
    const pointerLeave = (event: PointerEvent) => {
      if (valid(event)) {
        setHovered(false);
        end();
      }
    };
    const pointerDown = (event: PointerEvent) => {
      if (valid(event)) start(event);
    };
    const pointerEnd = (event: PointerEvent) => {
      if (valid(event)) end();
    };
    const click = (event: MouseEvent) => {
      if (
        !isDisabled &&
        !isNestedInteractive(parent, event.target) &&
        !pressed
      ) {
        start();
        end();
      }
    };
    parent.addEventListener("pointerenter", pointerEnter, true);
    parent.addEventListener("pointerleave", pointerLeave, true);
    parent.addEventListener("pointerdown", pointerDown, true);
    parent.addEventListener("pointerup", pointerEnd, true);
    parent.addEventListener("pointercancel", pointerEnd, true);
    parent.addEventListener("click", click, true);
    return () => {
      parent.removeEventListener("pointerenter", pointerEnter, true);
      parent.removeEventListener("pointerleave", pointerLeave, true);
      parent.removeEventListener("pointerdown", pointerDown, true);
      parent.removeEventListener("pointerup", pointerEnd, true);
      parent.removeEventListener("pointercancel", pointerEnd, true);
      parent.removeEventListener("click", click, true);
    };
  }, [end, isDisabled, pressed, start]);

  return (
    <div
      ref={rootRef}
      aria-disabled={isDisabled || undefined}
      aria-hidden="true"
      className={cn("pressable-feedback__ripple", className)}
      data-slot="pressable-feedback-ripple"
      style={style}
    >
      <div
        ref={surfaceRef}
        className={cn(
          "pressable-feedback__ripple-surface",
          hovered && "--hover",
          pressed && "--press",
        )}
      />
    </div>
  );
}

const PressableFeedbackContext = createContext({
  highlightClassName: "pressable-feedback__highlight",
});

export interface PressableFeedbackRootProps extends Omit<
  ButtonProps,
  "children"
> {
  children: ReactNode;
}

function PressableFeedbackRoot({
  children,
  className,
  isDisabled,
  ...props
}: PressableFeedbackRootProps): ReactElement {
  const context = useMemo(
    () => ({ highlightClassName: "pressable-feedback__highlight" }),
    [],
  );
  return (
    <PressableFeedbackContext value={context}>
      <AriaButton
        className={cn("pressable-feedback", className) ?? ""}
        data-slot="pressable-feedback"
        {...(isDisabled ? { "aria-disabled": true } : {})}
        {...(isDisabled !== undefined ? { isDisabled } : {})}
        {...props}
      >
        {children}
      </AriaButton>
    </PressableFeedbackContext>
  );
}

function Highlight({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): ReactElement {
  const context = useContext(PressableFeedbackContext);
  return (
    <div
      aria-hidden="true"
      className={cn(context.highlightClassName, className)}
      data-slot="pressable-feedback-highlight"
      {...props}
    />
  );
}

type PressableFeedbackComponent = typeof PressableFeedbackRoot & {
  Highlight: typeof Highlight;
  HoldConfirm: typeof HoldConfirm;
  ProgressFeedback: typeof ProgressFeedback;
  Ripple: typeof Ripple;
  Root: typeof PressableFeedbackRoot;
};

export const PressableFeedback: PressableFeedbackComponent = Object.assign(
  PressableFeedbackRoot,
  {
    Highlight,
    HoldConfirm,
    ProgressFeedback,
    Ripple,
    Root: PressableFeedbackRoot,
  },
);
