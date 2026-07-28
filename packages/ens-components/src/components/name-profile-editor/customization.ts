import type { ReactElement, ReactNode } from "react";

export type NameProfileEditorPresentation = "dialog" | "inline";

export interface NameProfileEditorSlots {
  /** Replaces the placeholder shown when the profile has no avatar record. */
  avatarPlaceholder?: ReactNode;
  /** Replaces the placeholder shown when the profile has no header record. */
  headerPlaceholder?: ReactNode;
  /** Replaces the graphic shown on the review screen. */
  reviewGraphic?: ReactNode;
  /** Replaces the graphic shown after a successful update. */
  successGraphic?: ReactNode;
  /** Replaces the icon animated inside the transaction progress indicator. */
  transactionProgressIcon?: ReactNode;
  /** Replaces the button that opens the dialog presentation. */
  trigger?: ReactElement;
}

export interface NameProfileEditorMessages {
  checkingAccessLabel: string;
  connectWalletLabel: string;
  doneLabel: string;
  nextLabel: string;
  noPermissionLabel: string;
  reviewDescription: string;
  reviewTitle: string;
  searchPlaceholder: string;
  successDescription: string;
  successTitle: string;
  triggerLabel: string;
  updateLabel: string;
}

export const DEFAULT_NAME_PROFILE_EDITOR_MESSAGES: Readonly<NameProfileEditorMessages> =
  {
    checkingAccessLabel: "Checking access",
    connectWalletLabel: "Connect wallet",
    doneLabel: "Done",
    nextLabel: "Next",
    noPermissionLabel: "No update permission",
    reviewDescription: "Review the records you are about to update.",
    reviewTitle: "Review changes",
    searchPlaceholder: "Search records",
    successDescription: "Your ENS profile records are now up to date.",
    successTitle: "Profile updated",
    triggerLabel: "Edit profile",
    updateLabel: "Update",
  };
