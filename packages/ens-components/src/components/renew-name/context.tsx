"use client";

import type { Address, Hex } from "viem";

import type {
  NameRenewalMessages,
  NameRenewalPresentation,
  NameRenewalSlots,
} from "#/components/renew-name/customization";
import type { NameRenewalEvents } from "#/components/renew-name/events";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useState } from "react";

import { isAddress, zeroHash } from "viem";

import { DEFAULT_NAME_RENEWAL_MESSAGES } from "#/components/renew-name/customization";
import {
  decodeReferrerAddress,
  DEFAULT_REGISTRATION_DURATION,
  MIN_REGISTRATION_DURATION,
  REGISTRATION_SECONDS_PER_YEAR,
  resolvePaymentToken,
} from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type NameRenewalDurationMode = "date" | "duration";
export const MAX_NAME_RENEWAL_YEARS = 10;
const MAX_NAME_RENEWAL_DURATION =
  BigInt(MAX_NAME_RENEWAL_YEARS) * REGISTRATION_SECONDS_PER_YEAR;

export interface NameRenewalContextValue {
  duration: bigint;
  durationMode: NameRenewalDurationMode;
  events: NameRenewalEvents;
  input: string;
  isReferrerValid: boolean;
  messages: NameRenewalMessages;
  paymentTokenAddress: Address;
  presentation: NameRenewalPresentation;
  referrer: Hex;
  referrerInput: string;
  reset: () => void;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setDurationMode: Dispatch<SetStateAction<NameRenewalDurationMode>>;
  setInput: Dispatch<SetStateAction<string>>;
  setPaymentTokenAddress: Dispatch<SetStateAction<Address>>;
  setReferrer: Dispatch<SetStateAction<Hex>>;
  setReferrerInput: Dispatch<SetStateAction<string>>;
  slots: NameRenewalSlots;
}

export interface NameRenewalProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultDurationMode?: NameRenewalDurationMode;
  defaultLabel?: string;
  defaultPaymentTokenAddress?: Address;
  defaultReferrer?: Hex;
  events?: NameRenewalEvents;
  messages?: Partial<NameRenewalMessages>;
  presentation?: NameRenewalPresentation;
  slots?: NameRenewalSlots;
}

const NameRenewalContext = createContext<NameRenewalContextValue | null>(null);

function getReferrerInput(referrer: Hex): string {
  if (referrer === zeroHash) return "";
  return decodeReferrerAddress(referrer) ?? "";
}

export function NameRenewalProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultDurationMode = "duration",
  defaultLabel = "",
  defaultPaymentTokenAddress,
  defaultReferrer = zeroHash,
  events = {},
  messages,
  presentation = "dialog",
  slots = {},
}: NameRenewalProviderProps) {
  const { contracts } = useEnsConfig();
  const initialPaymentToken = resolvePaymentToken(
    contracts.paymentTokens,
    defaultPaymentTokenAddress,
  );
  const initialDuration =
    defaultDuration < MIN_REGISTRATION_DURATION
      ? MIN_REGISTRATION_DURATION
      : defaultDuration > MAX_NAME_RENEWAL_DURATION
        ? MAX_NAME_RENEWAL_DURATION
        : defaultDuration;
  const [duration, setDuration] = useState(() => initialDuration);
  const [durationMode, setDurationMode] = useState(defaultDurationMode);
  const [input, setInput] = useState(defaultLabel);
  const [paymentTokenAddress, setPaymentTokenAddress] = useState<Address>(
    initialPaymentToken.address,
  );
  const [referrer, setReferrer] = useState(defaultReferrer);
  const [referrerInput, setReferrerInput] = useState(() =>
    getReferrerInput(defaultReferrer),
  );
  const trimmedReferrerInput = referrerInput.trim();
  const isReferrerValid =
    trimmedReferrerInput === "" || isAddress(trimmedReferrerInput);
  const reset = useCallback(() => {
    setDuration(initialDuration);
    setDurationMode(defaultDurationMode);
    setInput(defaultLabel);
    setPaymentTokenAddress(initialPaymentToken.address);
    setReferrer(defaultReferrer);
    setReferrerInput(getReferrerInput(defaultReferrer));
  }, [
    defaultDurationMode,
    defaultLabel,
    defaultReferrer,
    initialDuration,
    initialPaymentToken.address,
  ]);

  return (
    <NameRenewalContext.Provider
      value={{
        duration,
        durationMode,
        events,
        input,
        isReferrerValid,
        messages: {
          ...DEFAULT_NAME_RENEWAL_MESSAGES,
          ...messages,
        },
        paymentTokenAddress,
        presentation,
        referrer,
        referrerInput,
        reset,
        setDuration,
        setDurationMode,
        setInput,
        setPaymentTokenAddress,
        setReferrer,
        setReferrerInput,
        slots,
      }}
    >
      {children}
    </NameRenewalContext.Provider>
  );
}

export function useNameRenewal() {
  const value = useContext(NameRenewalContext);
  if (value === null) {
    throw new Error(
      "useNameRenewal must be used within a NameRenewalProvider.",
    );
  }
  return value;
}
