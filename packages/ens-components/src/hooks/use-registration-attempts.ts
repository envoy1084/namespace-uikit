"use client";

import type { Address, Hex } from "viem";

import { useCallback } from "react";

import { useLocalStorage } from "usehooks-ts";

import { parseNameInput } from "#/actions";

export const REGISTRATION_ATTEMPTS_STORAGE_KEY =
  "@thenamespace/ens-components:registration-attempts:v2";

export type StoredRegistrationResolver =
  | {
      address: Address;
      type: "custom";
    }
  | {
      address: Address;
      deployer: Address;
      deploymentData: Hex;
      factoryAddress: Address;
      implementationAddress: Address;
      initData: Hex;
      salt: Hex;
      type: "dedicated";
    };

export type RegistrationAttemptSubmission =
  | {
      type: "prepared";
    }
  | {
      callsId: string;
      type: "atomic-pending";
    }
  | {
      transactionHash: Hex;
      type: "resolver-pending";
    }
  | {
      transactionHash: Hex;
      type: "resolver-confirmed";
    }
  | {
      resolverTransactionHash?: Hex;
      transactionHash: Hex;
      type: "commitment-pending";
    }
  | {
      callsId?: string;
      confirmedAt: number;
      resolverTransactionHash?: Hex;
      transactionHash?: Hex;
      type: "confirmed";
    };

export interface StoredRegistrationAttempt {
  account: Address;
  chainId: number;
  commitment: Hex;
  createdAt: number;
  duration: string;
  id: string;
  label: string;
  normalizedName: string;
  owner: Address;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
  resolver: StoredRegistrationResolver;
  secret: Hex;
  submission: RegistrationAttemptSubmission;
  subregistry: Address;
  updatedAt: number;
}

export type RegistrationAttemptInput = Omit<
  StoredRegistrationAttempt,
  "createdAt" | "id" | "updatedAt"
> & {
  createdAt?: number;
  id?: string;
  updatedAt?: number;
};

export type RegistrationAttemptUpdate = Partial<
  Omit<StoredRegistrationAttempt, "id">
>;

export type StoredRegistrationAttempts = Record<
  string,
  StoredRegistrationAttempt
>;

export interface FindRegistrationAttemptInput {
  account: Address;
  chainId: number;
  duration: bigint;
  input: string | null | undefined;
  owner: Address;
  referrer: Hex;
  registrarAddress: Address;
  resolverAddress?: Address | null;
  subregistry: Address;
}

function addressesEqual(left: Address, right: Address): boolean {
  return left.toLowerCase() === right.toLowerCase();
}

function resolverMatches(
  resolver: StoredRegistrationResolver,
  resolverAddress: Address | null | undefined,
): boolean {
  if (resolverAddress === null || resolverAddress === undefined) {
    return resolver.type === "dedicated";
  }

  return (
    resolver.type === "custom" &&
    addressesEqual(resolver.address, resolverAddress)
  );
}

export function useRegistrationAttempts() {
  const [attempts, setAttempts] = useLocalStorage<StoredRegistrationAttempts>(
    REGISTRATION_ATTEMPTS_STORAGE_KEY,
    {},
  );

  const get = useCallback((id: string) => attempts[id], [attempts]);

  const find = useCallback(
    (input: FindRegistrationAttemptInput) => {
      const parsedInput = parseNameInput(input.input);
      if (parsedInput.isErr()) return undefined;

      const attempt = Object.values(attempts).reduce<
        StoredRegistrationAttempt | undefined
      >((latest, candidate) => {
        const matches =
          candidate.chainId === input.chainId &&
          addressesEqual(candidate.account, input.account) &&
          addressesEqual(candidate.owner, input.owner) &&
          addressesEqual(candidate.registrarAddress, input.registrarAddress) &&
          candidate.normalizedName === parsedInput.value.normalizedName &&
          candidate.duration === input.duration.toString() &&
          candidate.referrer.toLowerCase() === input.referrer.toLowerCase() &&
          addressesEqual(candidate.subregistry, input.subregistry) &&
          resolverMatches(candidate.resolver, input.resolverAddress);

        if (
          !matches ||
          (latest !== undefined && latest.updatedAt > candidate.updatedAt)
        ) {
          return latest;
        }

        return candidate;
      }, undefined);

      return attempt === undefined
        ? undefined
        : {
            attempt,
            id: attempt.id,
          };
    },
    [attempts],
  );

  const insert = useCallback(
    (input: RegistrationAttemptInput) => {
      const now = Date.now();
      const id = input.id ?? crypto.randomUUID();
      const attempt: StoredRegistrationAttempt = {
        ...input,
        createdAt: input.createdAt ?? now,
        id,
        updatedAt: input.updatedAt ?? now,
      };

      setAttempts((current) => ({
        ...current,
        [id]: attempt,
      }));

      return { attempt, id };
    },
    [setAttempts],
  );

  const update = useCallback(
    (id: string, updates: RegistrationAttemptUpdate) => {
      setAttempts((current) => {
        const existing = current[id];
        if (existing === undefined) return current;

        return {
          ...current,
          [id]: {
            ...existing,
            ...updates,
            id,
            updatedAt: Date.now(),
          },
        };
      });
    },
    [setAttempts],
  );

  const deleteAttempt = useCallback(
    (id: string) => {
      setAttempts((current) => {
        if (current[id] === undefined) return current;

        const next = { ...current };
        delete next[id];
        return next;
      });
    },
    [setAttempts],
  );

  return {
    attempts,
    delete: deleteAttempt,
    find,
    get,
    insert,
    update,
  };
}
