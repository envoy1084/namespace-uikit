import type { PreparedContractWrite } from "#/actions";

export type PaymentActionStatus =
  | "approving"
  | "batching"
  | "confirming-address-record"
  | "confirming-approval"
  | "confirming-batch"
  | "confirming-primary-name"
  | "confirming-registration"
  | "idle"
  | "refreshing"
  | "registering"
  | "setting-address-record"
  | "setting-primary-name"
  | "switching";

export type PaymentTransactionPhase =
  | "address-record"
  | "approval"
  | "primary-name"
  | "registration";

export function getPaymentTransactionPhase(
  prepared: PreparedContractWrite,
): PaymentTransactionPhase {
  if (prepared.kind === "approve-registration-payment") return "approval";
  if (prepared.kind === "set-address-record") return "address-record";
  if (prepared.kind === "set-primary-name") return "primary-name";
  return "registration";
}

export function getPaymentActionStatus(
  phase: PaymentTransactionPhase,
  state: "confirming" | "signing",
): PaymentActionStatus {
  if (phase === "approval") {
    return state === "signing" ? "approving" : "confirming-approval";
  }
  if (phase === "address-record") {
    return state === "signing"
      ? "setting-address-record"
      : "confirming-address-record";
  }
  if (phase === "primary-name") {
    return state === "signing"
      ? "setting-primary-name"
      : "confirming-primary-name";
  }
  return state === "signing" ? "registering" : "confirming-registration";
}

export interface GetRegistrationPaymentButtonLabelProps {
  actionStatus: PaymentActionStatus;
  chainName: string;
  hasPaymentData: boolean;
  hasSufficientAllowance: boolean;
  hasSufficientBalance: boolean;
  isPaymentError: boolean;
  isWalletConnected: boolean;
  isWrongNetwork: boolean;
  paymentTokenSymbol: string;
  setPrimaryName: boolean;
}

export function getRegistrationPaymentButtonLabel({
  actionStatus,
  chainName,
  hasPaymentData,
  hasSufficientAllowance,
  hasSufficientBalance,
  isPaymentError,
  isWalletConnected,
  isWrongNetwork,
  paymentTokenSymbol,
  setPrimaryName,
}: GetRegistrationPaymentButtonLabelProps): string {
  if (!isWalletConnected) return "Connect wallet to continue";
  if (isWrongNetwork) return `Switch to ${chainName}`;

  const pendingLabels: Partial<Record<PaymentActionStatus, string>> = {
    approving: "Confirm approval in wallet",
    batching: setPrimaryName
      ? hasSufficientAllowance
        ? "Confirm registration and primary name"
        : "Confirm approval, registration, and primary name"
      : "Confirm approval and registration",
    "confirming-address-record": "Confirming address record",
    "confirming-approval": "Confirming approval",
    "confirming-batch": setPrimaryName
      ? "Confirming registration and primary name"
      : "Confirming approval and registration",
    "confirming-primary-name": "Confirming primary name",
    "confirming-registration": "Confirming registration",
    refreshing: "Refreshing registration price",
    registering: "Confirm registration in wallet",
    "setting-address-record": "Confirm address record in wallet",
    "setting-primary-name": "Confirm primary name in wallet",
  };
  const pendingLabel = pendingLabels[actionStatus];
  if (pendingLabel !== undefined) return pendingLabel;

  if (isPaymentError) return "Try again";
  if (hasPaymentData && !hasSufficientBalance) {
    return `Insufficient ${paymentTokenSymbol} balance`;
  }
  if (hasSufficientAllowance) {
    return setPrimaryName ? "Register and set primary name" : "Register name";
  }
  return setPrimaryName
    ? `Approve ${paymentTokenSymbol}, register, and set primary`
    : `Approve ${paymentTokenSymbol} and register`;
}
