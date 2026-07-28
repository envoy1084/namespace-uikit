"use client";

import type { NameProfileEditorPresentation } from "#/components/name-profile-editor/customization";

import type { ReactNode } from "react";

import { Modal, cn } from "@thenamespace/uikit";

interface NameProfileEditorLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  presentation: NameProfileEditorPresentation;
}

export function NameProfileEditorHeader({
  children,
  className,
  presentation,
}: NameProfileEditorLayoutProps) {
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

export function NameProfileEditorHeading({
  children,
  className,
  id,
  presentation,
}: NameProfileEditorLayoutProps) {
  if (presentation === "dialog") {
    return (
      <Modal.Heading
        {...(className === undefined ? {} : { className })}
        {...(id === undefined ? {} : { id })}
      >
        {children}
      </Modal.Heading>
    );
  }

  return (
    <h2
      className={cn("text-foreground text-base font-medium", className)}
      {...(id === undefined ? {} : { id })}
    >
      {children}
    </h2>
  );
}

export function NameProfileEditorBody({
  children,
  className,
  presentation,
}: NameProfileEditorLayoutProps) {
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

export function NameProfileEditorFooter({
  children,
  className,
  presentation,
}: NameProfileEditorLayoutProps) {
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
