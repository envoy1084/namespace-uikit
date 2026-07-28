"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { Address, Hex } from "viem";
import { isAddress, zeroHash } from "viem";

import type {
  NameRegistrationMessages,
  NameRegistrationPresentation,
  NameRegistrationSlots,
} from "#/components/name-registration/customization";
import { DEFAULT_NAME_REGISTRATION_MESSAGES } from "#/components/name-registration/customization";
import type { NameRegistrationEvents } from "#/components/name-registration/events";
import {
  decodeReferrerAddress,
  DEFAULT_REGISTRATION_DURATION,
  isNonZeroAddress,
  MIN_REGISTRATION_DURATION,
  resolvePaymentToken,
} from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export const COMMITMENT_WAIT_DURATION_MS = 60_000;
export const COMMITMENT_VALID_DURATION_MS = 24 * 60 * 60 * 1_000;

export type RegistrationDurationMode = "date" | "duration";

export interface NameRegistrationContextValue {
  registrationAttemptId: string | null;
  duration: bigint;
  durationMode: RegistrationDurationMode;
  events: NameRegistrationEvents;
  input: string;
  isReferrerValid: boolean;
  isResolverValid: boolean;
  messages: NameRegistrationMessages;
  paymentTokenAddress: Address;
  presentation: NameRegistrationPresentation;
  referrer: Hex;
  referrerInput: string;
  resolverAddress: Address | null;
  resolverInput: string;
  shouldSetPrimaryName: boolean;
  setRegistrationAttemptId: Dispatch<SetStateAction<string | null>>;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setDurationMode: Dispatch<SetStateAction<RegistrationDurationMode>>;
  setInput: Dispatch<SetStateAction<string>>;
  setPaymentTokenAddress: Dispatch<SetStateAction<Address>>;
  setReferrer: Dispatch<SetStateAction<Hex>>;
  setReferrerInput: Dispatch<SetStateAction<string>>;
  setResolverAddress: Dispatch<SetStateAction<Address | null>>;
  setResolverInput: Dispatch<SetStateAction<string>>;
  setShouldSetPrimaryName: Dispatch<SetStateAction<boolean>>;
  slots: NameRegistrationSlots;
}

export interface NameRegistrationProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultDurationMode?: RegistrationDurationMode;
  defaultInput?: string;
  defaultPaymentTokenAddress?: Address;
  defaultReferrer?: Hex;
  defaultResolverAddress?: Address;
  events?: NameRegistrationEvents;
  messages?: Partial<NameRegistrationMessages>;
  presentation?: NameRegistrationPresentation;
  slots?: NameRegistrationSlots;
}

const NameRegistrationContext = createContext<NameRegistrationContextValue | null>(null);
const EMPTY_NAME_REGISTRATION_EVENTS: NameRegistrationEvents = Object.freeze({});
const EMPTY_NAME_REGISTRATION_SLOTS: NameRegistrationSlots = Object.freeze({});

function getReferrerInput(referrer: Hex): string {
  if (referrer === zeroHash) return "";
  return decodeReferrerAddress(referrer) ?? "";
}

export function NameRegistrationProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultDurationMode = "duration",
  defaultInput = "",
  defaultPaymentTokenAddress,
  defaultReferrer = zeroHash,
  defaultResolverAddress,
  events = EMPTY_NAME_REGISTRATION_EVENTS,
  messages,
  presentation = "dialog",
  slots = EMPTY_NAME_REGISTRATION_SLOTS,
}: NameRegistrationProviderProps) {
  const { contracts } = useEnsConfig();
  const initialPaymentToken = resolvePaymentToken(
    contracts.paymentTokens,
    defaultPaymentTokenAddress,
  );
  const [registrationAttemptId, setRegistrationAttemptId] = useState<string | null>(null);
  const [duration, setDuration] = useState(() =>
    defaultDuration < MIN_REGISTRATION_DURATION ? MIN_REGISTRATION_DURATION : defaultDuration,
  );
  const [durationMode, setDurationMode] = useState(defaultDurationMode);
  const [input, setInput] = useState(defaultInput);
  const [paymentTokenAddress, setPaymentTokenAddress] = useState<Address>(
    initialPaymentToken.address,
  );
  const [referrer, setReferrer] = useState(defaultReferrer);
  const [referrerInput, setReferrerInput] = useState(() => getReferrerInput(defaultReferrer));
  const [resolverAddress, setResolverAddress] = useState<Address | null>(
    defaultResolverAddress ?? null,
  );
  const [resolverInput, setResolverInput] = useState(defaultResolverAddress ?? "");
  const [shouldSetPrimaryName, setShouldSetPrimaryName] = useState(false);
  const trimmedReferrerInput = referrerInput.trim();
  const isReferrerValid = trimmedReferrerInput === "" || isAddress(trimmedReferrerInput);
  const trimmedResolverInput = resolverInput.trim();
  const isResolverValid = trimmedResolverInput === "" || isNonZeroAddress(trimmedResolverInput);
  const resolvedMessages = useMemo(
    () => ({
      ...DEFAULT_NAME_REGISTRATION_MESSAGES,
      ...messages,
    }),
    [messages],
  );
  const contextValue = useMemo<NameRegistrationContextValue>(
    () => ({
      registrationAttemptId,
      duration,
      durationMode,
      events,
      input,
      isReferrerValid,
      isResolverValid,
      messages: resolvedMessages,
      paymentTokenAddress,
      presentation,
      referrer,
      referrerInput,
      resolverAddress,
      resolverInput,
      shouldSetPrimaryName,
      setRegistrationAttemptId,
      setDuration,
      setDurationMode,
      setInput,
      setPaymentTokenAddress,
      setReferrer,
      setReferrerInput,
      setResolverAddress,
      setResolverInput,
      setShouldSetPrimaryName,
      slots,
    }),
    [
      duration,
      durationMode,
      events,
      input,
      isReferrerValid,
      isResolverValid,
      paymentTokenAddress,
      presentation,
      referrer,
      referrerInput,
      registrationAttemptId,
      resolvedMessages,
      resolverAddress,
      resolverInput,
      shouldSetPrimaryName,
      slots,
    ],
  );

  return (
    <NameRegistrationContext.Provider value={contextValue}>
      {children}
    </NameRegistrationContext.Provider>
  );
}

export function useNameRegistration() {
  const value = useContext(NameRegistrationContext);

  if (value === null) {
    throw new Error("useNameRegistration must be used within a NameRegistrationProvider.");
  }

  return value;
}
