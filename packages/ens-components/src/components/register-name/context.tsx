"use client";

import type { Address, Hex } from "viem";

import type {
  NameRegistrationMessages,
  NameRegistrationPresentation,
  NameRegistrationSlots,
} from "#/components/register-name/customization";
import type { NameRegistrationEvents } from "#/components/register-name/events";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { getAddress, isAddress, slice, zeroAddress, zeroHash } from "viem";

import { DEFAULT_NAME_REGISTRATION_MESSAGES } from "#/components/register-name/customization";

export const REGISTRATION_SECONDS_PER_DAY = 86_400n;
export const REGISTRATION_SECONDS_PER_YEAR = 31_557_600n;
export const MIN_REGISTRATION_DURATION = 28n * REGISTRATION_SECONDS_PER_DAY;
export const DEFAULT_REGISTRATION_DURATION = REGISTRATION_SECONDS_PER_YEAR;
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
  presentation: NameRegistrationPresentation;
  referrer: Hex;
  referrerInput: string;
  resolverAddress: Address | null;
  resolverInput: string;
  setRegistrationAttemptId: Dispatch<SetStateAction<string | null>>;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setDurationMode: Dispatch<SetStateAction<RegistrationDurationMode>>;
  setInput: Dispatch<SetStateAction<string>>;
  setReferrer: Dispatch<SetStateAction<Hex>>;
  setReferrerInput: Dispatch<SetStateAction<string>>;
  setResolverAddress: Dispatch<SetStateAction<Address | null>>;
  setResolverInput: Dispatch<SetStateAction<string>>;
  slots: NameRegistrationSlots;
}

export interface NameRegistrationProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultDurationMode?: RegistrationDurationMode;
  defaultInput?: string;
  defaultReferrer?: Hex;
  defaultResolverAddress?: Address;
  events?: NameRegistrationEvents;
  messages?: Partial<NameRegistrationMessages>;
  presentation?: NameRegistrationPresentation;
  slots?: NameRegistrationSlots;
}

const NameRegistrationContext =
  createContext<NameRegistrationContextValue | null>(null);

function getReferrerInput(referrer: Hex) {
  if (referrer === zeroHash) return "";

  try {
    return getAddress(slice(referrer, 12));
  } catch {
    return "";
  }
}

export function NameRegistrationProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultDurationMode = "duration",
  defaultInput = "",
  defaultReferrer = zeroHash,
  defaultResolverAddress,
  events = {},
  messages,
  presentation = "dialog",
  slots = {},
}: NameRegistrationProviderProps) {
  const [registrationAttemptId, setRegistrationAttemptId] = useState<
    string | null
  >(null);
  const [duration, setDuration] = useState(() =>
    defaultDuration < MIN_REGISTRATION_DURATION
      ? MIN_REGISTRATION_DURATION
      : defaultDuration,
  );
  const [durationMode, setDurationMode] = useState(defaultDurationMode);
  const [input, setInput] = useState(defaultInput);
  const [referrer, setReferrer] = useState(defaultReferrer);
  const [referrerInput, setReferrerInput] = useState(() =>
    getReferrerInput(defaultReferrer),
  );
  const [resolverAddress, setResolverAddress] = useState<Address | null>(
    defaultResolverAddress ?? null,
  );
  const [resolverInput, setResolverInput] = useState(
    defaultResolverAddress ?? "",
  );
  const trimmedReferrerInput = referrerInput.trim();
  const isReferrerValid =
    trimmedReferrerInput === "" || isAddress(trimmedReferrerInput);
  const trimmedResolverInput = resolverInput.trim();
  const isResolverValid =
    trimmedResolverInput === "" ||
    (isAddress(trimmedResolverInput) &&
      getAddress(trimmedResolverInput) !== zeroAddress);
  const resolvedMessages = {
    ...DEFAULT_NAME_REGISTRATION_MESSAGES,
    ...messages,
  };

  return (
    <NameRegistrationContext.Provider
      value={{
        registrationAttemptId,
        duration,
        durationMode,
        events,
        input,
        isReferrerValid,
        isResolverValid,
        messages: resolvedMessages,
        presentation,
        referrer,
        referrerInput,
        resolverAddress,
        resolverInput,
        setRegistrationAttemptId,
        setDuration,
        setDurationMode,
        setInput,
        setReferrer,
        setReferrerInput,
        setResolverAddress,
        setResolverInput,
        slots,
      }}
    >
      {children}
    </NameRegistrationContext.Provider>
  );
}

export function useNameRegistration() {
  const value = useContext(NameRegistrationContext);

  if (value === null) {
    throw new Error(
      "useNameRegistration must be used within a NameRegistrationProvider.",
    );
  }

  return value;
}
