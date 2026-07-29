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
  addAvatarLabel: string;
  addHeaderLabel: string;
  addedLabel: string;
  backLabel: string;
  changedLabel: string;
  checkingAccessLabel: string;
  confirmInWalletLabel: string;
  connectWalletLabel: string;
  dialogLabel: string;
  doneLabel: string;
  editAvatarLabel: string;
  editHeaderLabel: string;
  explorerLinkLabel: string;
  nextLabel: string;
  noMatchingRecordsLabel: string;
  noPermissionLabel: string;
  preparingUpdateLabel: string;
  profileMediaLabel: string;
  profileSectionsLabel: string;
  removedLabel: string;
  reviewDescription: string;
  reviewTitle: string;
  searchLabel: string;
  searchPlaceholder: string;
  successDescription: string;
  successTitle: string;
  switchNetworkLabel: string;
  switchingNetworkLabel: string;
  transactionProgressLabel: string;
  triggerLabel: string;
  updateLabel: string;
  updatedRecordsLabel: string;
}

export const DEFAULT_NAME_PROFILE_EDITOR_MESSAGES: Readonly<NameProfileEditorMessages> = {
  addAvatarLabel: "Add profile avatar",
  addHeaderLabel: "Add profile header",
  addedLabel: "Added",
  backLabel: "Back to profile editor",
  changedLabel: "Changed",
  checkingAccessLabel: "Checking access",
  confirmInWalletLabel: "Confirm in wallet",
  connectWalletLabel: "Connect wallet",
  dialogLabel: "Edit {name} profile",
  doneLabel: "Done",
  editAvatarLabel: "Edit profile avatar",
  editHeaderLabel: "Edit profile header",
  explorerLinkLabel: "Check on Etherscan",
  nextLabel: "Next",
  noMatchingRecordsLabel: "No matching records",
  noPermissionLabel: "No update permission",
  preparingUpdateLabel: "Preparing update",
  profileMediaLabel: "Profile media",
  profileSectionsLabel: "Profile sections",
  removedLabel: "Removed",
  reviewDescription: "Review the records you are about to update.",
  reviewTitle: "Review changes",
  searchLabel: "Search profile records",
  searchPlaceholder: "Search records",
  successDescription: "Your ENS profile records are now up to date.",
  successTitle: "Profile updated",
  switchNetworkLabel: "Switch network",
  switchingNetworkLabel: "Switching network",
  transactionProgressLabel: "Transaction confirmation in progress",
  triggerLabel: "Edit profile",
  updateLabel: "Update",
  updatedRecordsLabel: "Updated records",
};
