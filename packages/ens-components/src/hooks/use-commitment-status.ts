"use client";

import type { Address, Hex } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { isHex, size } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  prepareCommitmentStatusRead,
  type PrepareCommitmentStatusReadError,
} from "#/actions";
import { useEnsConfig } from "#/providers";

export type CommitmentState = "EXPIRED" | "NOT_FOUND" | "READY" | "WAITING";

export interface CommitmentStatus {
  readonly currentTime: bigint;
  readonly remainingSeconds: bigint;
  readonly state: CommitmentState;
  readonly submittedAt: bigint;
  readonly validFrom: bigint;
  readonly validUntil: bigint;
}

export type CommitmentStatusError =
  | "CONTRACT_READ_FAILED"
  | PrepareCommitmentStatusReadError;

export type CommitmentStatusQueryKey = readonly [
  "ens",
  "commitment-status",
  string,
  Address,
  Hex | null,
];

export interface UseCommitmentStatusParameters<selectData = CommitmentStatus> {
  commitment: Hex | null | undefined;
  query?: Omit<
    UseQueryOptions<
      CommitmentStatus,
      CommitmentStatusError,
      selectData,
      CommitmentStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

function selectCommitmentStatus(
  currentTime: bigint,
  timing: {
    readonly maximumAge: bigint;
    readonly minimumAge: bigint;
    readonly submittedAt: bigint;
  },
): CommitmentStatus {
  const { maximumAge, minimumAge, submittedAt } = timing;
  if (submittedAt === 0n) {
    return {
      currentTime,
      remainingSeconds: 0n,
      state: "NOT_FOUND",
      submittedAt,
      validFrom: 0n,
      validUntil: 0n,
    };
  }

  const validFrom = submittedAt + minimumAge;
  const validUntil = submittedAt + maximumAge;
  if (currentTime < validFrom) {
    return {
      currentTime,
      remainingSeconds: validFrom - currentTime,
      state: "WAITING",
      submittedAt,
      validFrom,
      validUntil,
    };
  }

  return {
    currentTime,
    remainingSeconds: 0n,
    state: currentTime >= validUntil ? "EXPIRED" : "READY",
    submittedAt,
    validFrom,
    validUntil,
  };
}

export function useCommitmentStatus<selectData = CommitmentStatus>(
  parameters: UseCommitmentStatusParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const commitment = parameters.commitment ?? null;
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const isValidCommitment =
    commitment !== null && isHex(commitment) && size(commitment) === 32;

  return useQuery<
    CommitmentStatus,
    CommitmentStatusError,
    selectData,
    CommitmentStatusQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "commitment-status",
      network,
      registrarAddress,
      commitment,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      isValidCommitment,
    queryFn: async () => {
      if (publicClient === undefined || commitment === null) {
        throw "CONTRACT_READ_FAILED" satisfies CommitmentStatusError;
      }

      const prepared = prepareCommitmentStatusRead({
        commitment,
        network,
        registrarAddress,
      });
      if (prepared.isErr()) throw prepared.error;

      const [timing, block] = await Promise.all([
        executeContractReads(publicClient, prepared.value),
        publicClient.getBlock().catch(() => undefined),
      ]);
      if (timing.isErr() || block === undefined) {
        throw "CONTRACT_READ_FAILED" satisfies CommitmentStatusError;
      }

      return selectCommitmentStatus(block.timestamp, timing.value);
    },
  });
}
