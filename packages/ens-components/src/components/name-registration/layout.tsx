"use client";

import type { ReactNode } from "react";

import { Modal } from "@thenamespace/uikit";
import { cn } from "@thenamespace/uikit/utils";

import { useNameRegistration } from "#/components/name-registration/context";

interface NameRegistrationLayoutProps {
  children: ReactNode;
  className?: string;
}

export function NameRegistrationHeader({ children, className }: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();

  if (presentation === "dialog") {
    return (
      <Modal.Header {...(className === undefined ? {} : { className })}>{children}</Modal.Header>
    );
  }

  return <header className={cn("flex flex-col gap-3", className)}>{children}</header>;
}

export function NameRegistrationHeading({ children, className }: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();

  if (presentation === "dialog") {
    return (
      <Modal.Heading {...(className === undefined ? {} : { className })}>{children}</Modal.Heading>
    );
  }

  return <h2 className={cn("text-foreground text-base font-medium", className)}>{children}</h2>;
}

export function NameRegistrationBody({ children, className }: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();

  if (presentation === "dialog") {
    return <Modal.Body {...(className === undefined ? {} : { className })}>{children}</Modal.Body>;
  }

  return (
    <div className={cn("text-muted min-h-0 flex-1 text-sm leading-[1.43]", className)}>
      {children}
    </div>
  );
}

export function NameRegistrationFooter({ children, className }: NameRegistrationLayoutProps) {
  const { presentation } = useNameRegistration();

  if (presentation === "dialog") {
    return (
      <Modal.Footer {...(className === undefined ? {} : { className })}>{children}</Modal.Footer>
    );
  }

  return (
    <footer className={cn("flex flex-row items-center justify-end gap-2", className)}>
      {children}
    </footer>
  );
}
