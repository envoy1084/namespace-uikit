import { isAddress, isAddressEqual } from "viem";

import type { EnsPaymentToken, EnsPaymentTokens } from "#/data";

export function findPaymentToken(
  paymentTokens: EnsPaymentTokens,
  address: string | null | undefined,
): EnsPaymentToken | undefined {
  if (address === null || address === undefined || !isAddress(address)) {
    return undefined;
  }

  return paymentTokens.find((token) => isAddressEqual(token.address, address));
}

export function resolvePaymentToken(
  paymentTokens: EnsPaymentTokens,
  address: string | null | undefined,
): EnsPaymentToken {
  return findPaymentToken(paymentTokens, address) ?? paymentTokens[0];
}
