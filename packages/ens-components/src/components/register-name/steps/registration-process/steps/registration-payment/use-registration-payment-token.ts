"use client";

import type { EnsPaymentTokens } from "#/data";
import type {
  RegistrationAttemptUpdate,
  StoredRegistrationAttempt,
} from "#/hooks/use-registration-attempts";

import { useEffect } from "react";

export interface UseRegistrationPaymentTokenProps {
  attempt: StoredRegistrationAttempt | undefined;
  paymentTokens: EnsPaymentTokens;
  updateAttempt: (id: string, updates: RegistrationAttemptUpdate) => void;
}

export function useRegistrationPaymentToken({
  attempt,
  paymentTokens,
  updateAttempt,
}: UseRegistrationPaymentTokenProps) {
  const paymentToken =
    paymentTokens.find(
      (token) =>
        token.address.toLowerCase() ===
        attempt?.paymentTokenAddress.toLowerCase(),
    ) ?? paymentTokens[0];

  useEffect(() => {
    if (
      attempt !== undefined &&
      attempt.paymentTokenAddress.toLowerCase() !==
        paymentToken.address.toLowerCase()
    ) {
      updateAttempt(attempt.id, {
        paymentTokenAddress: paymentToken.address,
      });
    }
  }, [attempt, paymentToken.address, updateAttempt]);

  return paymentToken;
}
