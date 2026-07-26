"use client";

import type { Hex } from "viem";

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
export const DEFAULT_REGISTRATION_DURATION = REGISTRATION_SECONDS_PER_YEAR;
export const COMMITMENT_WAIT_DURATION_MS = 60_000;
export const COMMITMENT_VALID_DURATION_MS = 24 * 60 * 60 * 1_000;

export type RegistrationDurationMode = "date" | "duration";

export interface RegisterNameContextValue {
  commitmentId: string | null;
  duration: bigint;
  durationMode: RegistrationDurationMode;
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

export interface RegisterNameProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultDurationMode?: RegistrationDurationMode;
  defaultInput?: string;
  defaultReferrer?: Hex;
}

const RegisterNameContext = createContext<RegisterNameContextValue | null>(
  null,
);

function getReferrerInput(referrer: Hex) {
  if (referrer === zeroHash) return "";

  try {
    return getAddress(slice(referrer, 12));
  } catch {
    return "";
  }
}

export function RegisterNameProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultDurationMode = "duration",
  defaultInput = "",
  defaultReferrer = zeroHash,
}: RegisterNameProviderProps) {
  const [commitmentId, setCommitmentId] = useState<string | null>(null);
  const [duration, setDuration] = useState(defaultDuration);
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
    <RegisterNameContext.Provider
      value={{
        commitmentId,
        duration,
        durationMode,
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
    </RegisterNameContext.Provider>
  );
}

export function useRegisterName() {
  const value = useContext(RegisterNameContext);

  if (value === null) {
    throw new Error(
      "useRegisterName must be used within a RegisterNameProvider.",
    );
  }

  return value;
}
