"use client";

import { useEffect } from "react";

import { isAddressEqual } from "viem";

import type {
  RegistrationAttemptUpdate,
  StoredRegistrationAttempt,
} from "#/components/name-registration/hooks/use-registration-attempts";
import type { EnsPaymentTokens } from "#/data";
import { resolvePaymentToken } from "#/lib/helpers";

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
  const paymentToken = resolvePaymentToken(paymentTokens, attempt?.paymentTokenAddress);

  useEffect(() => {
    if (
      attempt !== undefined &&
      !isAddressEqual(attempt.paymentTokenAddress, paymentToken.address)
    ) {
      updateAttempt(attempt.id, {
        paymentTokenAddress: paymentToken.address,
      });
    }
  }, [attempt, paymentToken.address, updateAttempt]);

  return paymentToken;
}
