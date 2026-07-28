"use client";

import type { ReactNode } from "react";

import { Modal, cn } from "@thenamespace/uikit";

interface ProfileDiffLayoutProps {
  children: ReactNode;
  className?: string;
  presentation: "dialog" | "inline";
}

export function ProfileDiffHeader({
  children,
  className,
  presentation,
}: ProfileDiffLayoutProps) {
  if (presentation === "dialog") {
    return (
      <Modal.Header {...(className === undefined ? {} : { className })}>
        {children}
      </Modal.Header>
    );
  }

  return (
    <header className={cn("flex flex-col gap-3 px-6 pt-6", className)}>
      {children}
    </header>
  );
}

export function ProfileDiffHeading({
  children,
  className,
  presentation,
}: ProfileDiffLayoutProps) {
  if (presentation === "dialog") {
    return (
      <Modal.Heading {...(className === undefined ? {} : { className })}>
        {children}
      </Modal.Heading>
    );
  }

  return (
    <h2 className={cn("text-foreground text-base font-medium", className)}>
      {children}
    </h2>
  );
}

export function ProfileDiffBody({
  children,
  className,
  presentation,
}: ProfileDiffLayoutProps) {
  if (presentation === "dialog") {
    return (
      <Modal.Body {...(className === undefined ? {} : { className })}>
        {children}
      </Modal.Body>
    );
  }

  return (
    <div
      className={cn(
        "text-muted min-h-0 flex-1 px-6 text-sm leading-[1.43]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProfileDiffFooter({
  children,
  className,
  presentation,
}: ProfileDiffLayoutProps) {
  if (presentation === "dialog") {
    return (
      <Modal.Footer {...(className === undefined ? {} : { className })}>
        {children}
      </Modal.Footer>
    );
  }

  return (
    <footer
      className={cn(
        "flex flex-row items-center justify-end gap-2 px-6 pb-6",
        className,
      )}
    >
      {children}
    </footer>
  );
}
