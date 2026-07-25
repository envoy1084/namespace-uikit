"use client";

import type { Address, Hex } from "viem";

import { useCallback } from "react";

import { useLocalStorage } from "usehooks-ts";

export const COMMITMENTS_STORAGE_KEY =
  "@thenamespace/ens-components:commitments:v1";

export interface StoredNameCommitment {
  chainId: number;
  commitment: Hex;
  createdAt: number;
  duration: string;
  label: string;
  owner: Address;
  referrer: Hex;
  registrarAddress: Address;
  resolver: Address;
  secret: Hex;
  subregistry: Address;
  transactionHash: Hex;
}

export type NameCommitmentInput = Omit<StoredNameCommitment, "createdAt"> & {
  createdAt?: number;
};

export type NameCommitmentUpdate = Partial<StoredNameCommitment>;
export type StoredNameCommitments = Record<string, StoredNameCommitment>;

export function getCommitmentStorageId({
  chainId,
  commitment,
  registrarAddress,
}: Pick<
  StoredNameCommitment,
  "chainId" | "commitment" | "registrarAddress"
>): string {
  return [
    chainId,
    registrarAddress.toLowerCase(),
    commitment.toLowerCase(),
  ].join(":");
}

export function useCommitments() {
  const [commitments, setCommitments] = useLocalStorage<StoredNameCommitments>(
    COMMITMENTS_STORAGE_KEY,
    {},
  );

  const get = useCallback((id: string) => commitments[id], [commitments]);

  const insert = useCallback(
    (input: NameCommitmentInput) => {
      const commitment: StoredNameCommitment = {
        ...input,
        createdAt: input.createdAt ?? Date.now(),
      };
      const id = getCommitmentStorageId(commitment);

      setCommitments((current) => ({
        ...current,
        [id]: commitment,
      }));

      return id;
    },
    [setCommitments],
  );

  const update = useCallback(
    (id: string, updates: NameCommitmentUpdate) => {
      setCommitments((current) => {
        const existing = current[id];
        if (existing === undefined) return current;

        const commitment = { ...existing, ...updates };
        const nextId = getCommitmentStorageId(commitment);

        if (nextId === id) {
          return { ...current, [id]: commitment };
        }

        const next = { ...current };
        delete next[id];
        next[nextId] = commitment;
        return next;
      });
    },
    [setCommitments],
  );

  const deleteCommitment = useCallback(
    (id: string) => {
      setCommitments((current) => {
        if (current[id] === undefined) return current;

        const next = { ...current };
        delete next[id];
        return next;
      });
    },
    [setCommitments],
  );

  return {
    commitments,
    delete: deleteCommitment,
    get,
    insert,
    update,
  };
}
