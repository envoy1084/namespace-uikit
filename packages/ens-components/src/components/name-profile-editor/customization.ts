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
  addedLabel: string;
  backLabel: string;
  changedLabel: string;
  checkingAccessLabel: string;
  confirmInWalletLabel: string;
  connectWalletLabel: string;
  doneLabel: string;
  nextLabel: string;
  noMatchingRecordsLabel: string;
  noPermissionLabel: string;
  preparingUpdateLabel: string;
  removedLabel: string;
  reviewDescription: string;
  reviewTitle: string;
  searchPlaceholder: string;
  successDescription: string;
  successTitle: string;
  switchNetworkLabel: string;
  switchingNetworkLabel: string;
  triggerLabel: string;
  updateLabel: string;
  updatedRecordsLabel: string;
}

export const DEFAULT_NAME_PROFILE_EDITOR_MESSAGES: Readonly<NameProfileEditorMessages> =
  {
    addedLabel: "Added",
    backLabel: "Back to profile editor",
    changedLabel: "Changed",
    checkingAccessLabel: "Checking access",
    confirmInWalletLabel: "Confirm in wallet",
    connectWalletLabel: "Connect wallet",
    doneLabel: "Done",
    nextLabel: "Next",
    noMatchingRecordsLabel: "No matching records",
    noPermissionLabel: "No update permission",
    preparingUpdateLabel: "Preparing update",
    removedLabel: "Removed",
    reviewDescription: "Review the records you are about to update.",
    reviewTitle: "Review changes",
    searchPlaceholder: "Search records",
    successDescription: "Your ENS profile records are now up to date.",
    successTitle: "Profile updated",
    switchNetworkLabel: "Switch network",
    switchingNetworkLabel: "Switching network",
    triggerLabel: "Edit profile",
    updateLabel: "Update",
    updatedRecordsLabel: "Updated records",
  };
