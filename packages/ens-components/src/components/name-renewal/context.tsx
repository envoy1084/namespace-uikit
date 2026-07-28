"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { Address, Hex } from "viem";
import { isAddress, zeroHash } from "viem";

import type {
  NameRenewalMessages,
  NameRenewalPresentation,
  NameRenewalSlots,
} from "#/components/name-renewal/customization";
import { DEFAULT_NAME_RENEWAL_MESSAGES } from "#/components/name-renewal/customization";
import type { NameRenewalEvents } from "#/components/name-renewal/events";
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
const MAX_NAME_RENEWAL_DURATION = BigInt(MAX_NAME_RENEWAL_YEARS) * REGISTRATION_SECONDS_PER_YEAR;

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
const EMPTY_NAME_RENEWAL_EVENTS: NameRenewalEvents = Object.freeze({});
const EMPTY_NAME_RENEWAL_SLOTS: NameRenewalSlots = Object.freeze({});

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
  events = EMPTY_NAME_RENEWAL_EVENTS,
  messages,
  presentation = "dialog",
  slots = EMPTY_NAME_RENEWAL_SLOTS,
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
  const [referrerInput, setReferrerInput] = useState(() => getReferrerInput(defaultReferrer));
  const trimmedReferrerInput = referrerInput.trim();
  const isReferrerValid = trimmedReferrerInput === "" || isAddress(trimmedReferrerInput);
  const resolvedMessages = useMemo(
    () => ({
      ...DEFAULT_NAME_RENEWAL_MESSAGES,
      ...messages,
    }),
    [messages],
  );
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
  const contextValue = useMemo<NameRenewalContextValue>(
    () => ({
      duration,
      durationMode,
      events,
      input,
      isReferrerValid,
      messages: resolvedMessages,
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
    }),
    [
      duration,
      durationMode,
      events,
      input,
      isReferrerValid,
      paymentTokenAddress,
      presentation,
      referrer,
      referrerInput,
      reset,
      resolvedMessages,
      slots,
    ],
  );

  return <NameRenewalContext.Provider value={contextValue}>{children}</NameRenewalContext.Provider>;
}

export function useNameRenewal() {
  const value = useContext(NameRenewalContext);
  if (value === null) {
    throw new Error("useNameRenewal must be used within a NameRenewalProvider.");
  }
  return value;
}
