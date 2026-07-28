"use client";

import type { ReactNode } from "react";

import { Modal } from "@thenamespace/uikit";
import { cn } from "@thenamespace/uikit/utils";

export type FlowPresentation = "dialog" | "inline";

export interface FlowLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  inlineClassName?: string;
  presentation: FlowPresentation;
}

export function FlowHeader({
  children,
  className,
  inlineClassName,
  presentation,
}: FlowLayoutProps) {
  return presentation === "dialog" ? (
    <Modal.Header {...(className === undefined ? {} : { className })}>{children}</Modal.Header>
  ) : (
    <header className={cn("flex flex-col gap-3", inlineClassName, className)}>{children}</header>
  );
}

export function FlowHeading({
  children,
  className,
  id,
  inlineClassName,
  presentation,
}: FlowLayoutProps) {
  return presentation === "dialog" ? (
    <Modal.Heading
      {...(className === undefined ? {} : { className })}
      {...(id === undefined ? {} : { id })}
    >
      {children}
    </Modal.Heading>
  ) : (
    <h2
      className={cn("text-foreground text-base font-medium", inlineClassName, className)}
      {...(id === undefined ? {} : { id })}
    >
      {children}
    </h2>
  );
}

export function FlowBody({ children, className, inlineClassName, presentation }: FlowLayoutProps) {
  return presentation === "dialog" ? (
    <Modal.Body {...(className === undefined ? {} : { className })}>{children}</Modal.Body>
  ) : (
    <div
      className={cn("text-muted min-h-0 flex-1 text-sm leading-[1.43]", inlineClassName, className)}
    >
      {children}
    </div>
  );
}

export function FlowFooter({
  children,
  className,
  inlineClassName,
  presentation,
}: FlowLayoutProps) {
  return presentation === "dialog" ? (
    <Modal.Footer {...(className === undefined ? {} : { className })}>{children}</Modal.Footer>
  ) : (
    <footer
      className={cn("flex flex-row items-center justify-end gap-2", inlineClassName, className)}
    >
      {children}
    </footer>
  );
}
