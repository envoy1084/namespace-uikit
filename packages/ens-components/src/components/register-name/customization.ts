import type { ReactElement, ReactNode } from "react";

export type NameRegistrationPresentation = "dialog" | "inline";

export interface NameRegistrationSlots {
  /** Replaces the graphic shown during the registration process. */
  processGraphic?: ReactNode;
  /** Replaces the graphic shown on the name-search screen. */
  searchGraphic?: ReactNode;
  /** Replaces the graphic shown after a successful registration. */
  successGraphic?: ReactNode;
  /** Replaces the icon animated inside transaction progress indicators. */
  transactionProgressIcon?: ReactNode;
  /** Replaces the button that opens the dialog presentation. */
  trigger?: ReactElement;
}

export interface NameRegistrationMessages {
  doneLabel: string;
  processDescription: string;
  processTitle: string;
  searchDescription: string;
  searchPlaceholder: string;
  searchTitle: string;
  successTitle: string;
  triggerLabel: string;
}

export const DEFAULT_NAME_REGISTRATION_MESSAGES: Readonly<NameRegistrationMessages> =
  {
    doneLabel: "Done",
    processDescription: "Registration consists of 3 steps",
    processTitle: "ENS Registration Process",
    searchDescription: "Register your ENS name and set a profile",
    searchPlaceholder: "Search Label, eg- vitalik",
    searchTitle: "Register your ENS Name",
    successTitle: "Hooray! You've registered",
    triggerLabel: "Register",
  };
