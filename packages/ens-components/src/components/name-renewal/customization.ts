import type { ReactElement, ReactNode } from "react";

export type NameRenewalPresentation = "dialog" | "inline";

export interface NameRenewalSlots {
  /** Replaces the graphic shown on the renewal form. */
  formGraphic?: ReactNode;
  /** Replaces the graphic shown after a successful renewal. */
  successGraphic?: ReactNode;
  /** Replaces the icon animated inside transaction progress indicators. */
  transactionProgressIcon?: ReactNode;
  /** Replaces the button that opens the dialog presentation. */
  trigger?: ReactElement;
}

export interface NameRenewalMessages {
  doneLabel: string;
  formDescription: string;
  formTitle: string;
  renewLabel: string;
  searchPlaceholder: string;
  successTitle: string;
  triggerLabel: string;
}

export const DEFAULT_NAME_RENEWAL_MESSAGES: Readonly<NameRenewalMessages> = {
  doneLabel: "Done",
  formDescription: "Extend a registered .eth name before it expires.",
  formTitle: "Renew your ENS name",
  renewLabel: "Renew",
  searchPlaceholder: "Search a name, e.g. vitalik",
  successTitle: "Your name has been renewed",
  triggerLabel: "Renew a name",
};
