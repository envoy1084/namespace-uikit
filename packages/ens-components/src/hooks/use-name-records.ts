"use client";

import type { Address } from "viem";

import type {
  NameRecordSelection,
  NameRecordsResult,
  PrepareNameRecordsReadError,
} from "#/actions";
import type { ParseNameInputError } from "#/lib";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { usePublicClient } from "wagmi";

import {
  executeContractReadsIndividually,
  prepareNameRecordsRead,
} from "#/actions";
import { parseNameInput } from "#/lib";
import { useEnsConfig } from "#/providers";

export type NameRecordsError =
  | "CONTRACT_READ_FAILED"
  | ParseNameInputError
  | PrepareNameRecordsReadError;

export type NameRecordsQueryKey = readonly [
  "ens",
  "name-records",
  string,
  number,
  string,
  Address,
  NameRecordSelection,
];

export interface UseNameRecordsParameters<selectData = NameRecordsResult> {
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<
      NameRecordsResult,
      NameRecordsError,
      selectData,
      NameRecordsQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  records: NameRecordSelection;
  universalResolverAddress?: Address;
}

export function useNameRecords<selectData = NameRecordsResult>(
  parameters: UseNameRecordsParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const universalResolverAddress =
    parameters.universalResolverAddress ??
    contracts.universalResolverV2.address;
  const parsed = parseNameInput(parameters.input);
  const prepared = prepareNameRecordsRead({
    input: parameters.input,
    network,
    records: parameters.records,
    universalResolverAddress,
  });

  return useQuery<
    NameRecordsResult,
    NameRecordsError,
    selectData,
    NameRecordsQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-records",
      network,
      chain.id,
      parsed.isOk() ? parsed.value.normalizedName : (parameters.input ?? ""),
      universalResolverAddress,
      parameters.records,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      prepared.isOk(),
    queryFn: async () => {
      if (publicClient === undefined) {
        throw "CONTRACT_READ_FAILED" satisfies NameRecordsError;
      }
      if (prepared.isErr()) throw prepared.error;

      const result = await executeContractReadsIndividually(
        publicClient,
        prepared.value,
      );
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
