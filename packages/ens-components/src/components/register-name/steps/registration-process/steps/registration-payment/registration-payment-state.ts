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
