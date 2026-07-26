"use client";

import type { Hex } from "viem";

import type { NameRegistrationEvents } from "#/components/register-name/events";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { getAddress, isAddress, slice, zeroHash } from "viem";

export const REGISTRATION_SECONDS_PER_DAY = 86_400n;
export const REGISTRATION_SECONDS_PER_YEAR =
  365n * REGISTRATION_SECONDS_PER_DAY;
export const MIN_REGISTRATION_DURATION = 28n * REGISTRATION_SECONDS_PER_DAY;
export const DEFAULT_REGISTRATION_DURATION = REGISTRATION_SECONDS_PER_YEAR;
export const COMMITMENT_WAIT_DURATION_MS = 60_000;
export const COMMITMENT_VALID_DURATION_MS = 24 * 60 * 60 * 1_000;

export type RegistrationDurationMode = "date" | "duration";

export interface NameRegistrationContextValue {
  commitmentId: string | null;
  duration: bigint;
  durationMode: RegistrationDurationMode;
  events: NameRegistrationEvents;
  input: string;
  isReferrerValid: boolean;
  referrer: Hex;
  referrerInput: string;
  setCommitmentId: Dispatch<SetStateAction<string | null>>;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setDurationMode: Dispatch<SetStateAction<RegistrationDurationMode>>;
  setInput: Dispatch<SetStateAction<string>>;
  setReferrer: Dispatch<SetStateAction<Hex>>;
  setReferrerInput: Dispatch<SetStateAction<string>>;
}

export interface NameRegistrationProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultDurationMode?: RegistrationDurationMode;
  defaultInput?: string;
  defaultReferrer?: Hex;
  events?: NameRegistrationEvents;
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
  events = {},
}: NameRegistrationProviderProps) {
  const [commitmentId, setCommitmentId] = useState<string | null>(null);
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
  const trimmedReferrerInput = referrerInput.trim();
  const isReferrerValid =
    trimmedReferrerInput === "" || isAddress(trimmedReferrerInput);

  return (
    <NameRegistrationContext.Provider
      value={{
        commitmentId,
        duration,
        durationMode,
        events,
        input,
        isReferrerValid,
        referrer,
        referrerInput,
        setCommitmentId,
        setDuration,
        setDurationMode,
        setInput,
        setReferrer,
        setReferrerInput,
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
