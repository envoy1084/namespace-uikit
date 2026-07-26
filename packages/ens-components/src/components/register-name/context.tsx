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

import { zeroHash } from "viem";

export const REGISTRATION_SECONDS_PER_DAY = 86_400n;
export const REGISTRATION_SECONDS_PER_YEAR =
  365n * REGISTRATION_SECONDS_PER_DAY;
export const DEFAULT_REGISTRATION_DURATION = REGISTRATION_SECONDS_PER_YEAR;
export const COMMITMENT_WAIT_DURATION_MS = 60_000;
export const COMMITMENT_VALID_DURATION_MS = 24 * 60 * 60 * 1_000;

export interface RegisterNameContextValue {
  commitmentId: string | null;
  duration: bigint;
  input: string;
  referrer: Hex;
  setCommitmentId: Dispatch<SetStateAction<string | null>>;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setInput: Dispatch<SetStateAction<string>>;
  setReferrer: Dispatch<SetStateAction<Hex>>;
}

export interface RegisterNameProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultInput?: string;
  defaultReferrer?: Hex;
}

const RegisterNameContext = createContext<RegisterNameContextValue | null>(
  null,
);

export function RegisterNameProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultInput = "",
  defaultReferrer = zeroHash,
}: RegisterNameProviderProps) {
  const [commitmentId, setCommitmentId] = useState<string | null>(null);
  const [duration, setDuration] = useState(defaultDuration);
  const [input, setInput] = useState(defaultInput);
  const [referrer, setReferrer] = useState(defaultReferrer);

  return (
    <RegisterNameContext.Provider
      value={{
        commitmentId,
        duration,
        input,
        referrer,
        setCommitmentId,
        setDuration,
        setInput,
        setReferrer,
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
