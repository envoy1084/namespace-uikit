"use client";

import type { Address, Hex } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { usePublicClient } from "wagmi";

import {
  getCommitmentStatus,
  type CommitmentStatus,
  type GetCommitmentStatusError,
} from "#/actions";
import { useEnsConfig } from "#/providers";

type CommitmentStatusQueryKey = readonly [
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
      GetCommitmentStatusError,
      selectData,
      CommitmentStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useCommitmentStatus<selectData = CommitmentStatus>(
  parameters: UseCommitmentStatusParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const commitment = parameters.commitment ?? null;
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return useQuery<
    CommitmentStatus,
    GetCommitmentStatusError,
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
      commitment !== null,
    queryFn: async () => {
      if (publicClient === undefined || commitment === null) {
        throw "CONTRACT_READ_FAILED" satisfies GetCommitmentStatusError;
      }

      const result = await getCommitmentStatus(publicClient, {
        commitment,
        network,
        registrarAddress,
      });

      if (result.isErr()) throw result.error;
      return result.value;
    },
    refetchInterval:
      parameters.query?.refetchInterval ??
      ((query) => (query.state.data?.state === "WAITING" ? 5_000 : false)),
  });
}
