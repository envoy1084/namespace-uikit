"use client";

import type { ReactNode } from "react";

import { Modal } from "@thenamespace/uikit";
import { cn } from "@thenamespace/uikit/utils";

import { useNameRenewal } from "#/components/renew-name/context";

interface NameRenewalLayoutProps {
  children: ReactNode;
  className?: string;
}

export function NameRenewalHeader({
  children,
  className,
}: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return presentation === "dialog" ? (
    <Modal.Header {...(className === undefined ? {} : { className })}>
      {children}
    </Modal.Header>
  ) : (
    <header className={cn("flex flex-col gap-3", className)}>{children}</header>
  );
}

export function NameRenewalHeading({
  children,
  className,
}: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return presentation === "dialog" ? (
    <Modal.Heading {...(className === undefined ? {} : { className })}>
      {children}
    </Modal.Heading>
  ) : (
    <h2 className={cn("text-foreground text-base font-medium", className)}>
      {children}
    </h2>
  );
}

export function NameRenewalBody({
  children,
  className,
}: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return presentation === "dialog" ? (
    <Modal.Body {...(className === undefined ? {} : { className })}>
      {children}
    </Modal.Body>
  ) : (
    <div
      className={cn(
        "text-muted min-h-0 flex-1 text-sm leading-[1.43]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NameRenewalFooter({
  children,
  className,
}: NameRenewalLayoutProps) {
  const { presentation } = useNameRenewal();
  return presentation === "dialog" ? (
    <Modal.Footer {...(className === undefined ? {} : { className })}>
      {children}
    </Modal.Footer>
  ) : (
    <footer
      className={cn("flex flex-row items-center justify-end gap-2", className)}
    >
      {children}
    </footer>
  );
}
