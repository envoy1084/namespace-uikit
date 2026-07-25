"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const REGISTRATION_SECONDS_PER_DAY = 86_400n;
export const REGISTRATION_SECONDS_PER_YEAR =
  365n * REGISTRATION_SECONDS_PER_DAY;
export const DEFAULT_REGISTRATION_DURATION = REGISTRATION_SECONDS_PER_YEAR;

export interface RegisterNameContextValue {
  duration: bigint;
  input: string;
  setDuration: Dispatch<SetStateAction<bigint>>;
  setInput: Dispatch<SetStateAction<string>>;
}

export interface RegisterNameProviderProps {
  children: ReactNode;
  defaultDuration?: bigint;
  defaultInput?: string;
}

const RegisterNameContext = createContext<RegisterNameContextValue | null>(
  null,
);

export function RegisterNameProvider({
  children,
  defaultDuration = DEFAULT_REGISTRATION_DURATION,
  defaultInput = "",
}: RegisterNameProviderProps) {
  const [duration, setDuration] = useState(defaultDuration);
  const [input, setInput] = useState(defaultInput);

  return (
    <RegisterNameContext.Provider
      value={{ duration, input, setDuration, setInput }}
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
