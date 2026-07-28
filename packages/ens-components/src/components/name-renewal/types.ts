import type { EnsPaymentToken } from "#/data";

export interface NameRenewalSuccessDetails {
  amount: bigint;
  currentExpiry: bigint;
  decimals: number;
  duration: bigint;
  name: string;
  newExpiry: bigint;
  paymentTokenIcon: EnsPaymentToken["icon"];
  paymentTokenSymbol: string;
}
