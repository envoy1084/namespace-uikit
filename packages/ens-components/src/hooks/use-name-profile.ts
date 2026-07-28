"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import type {
  NameProfileDiscoveryResult,
  NameRecordSelection,
  NameRecordsResult,
  PrepareNameProfileDiscoveryReadError,
  PrepareNameRecordsReadError,
} from "#/actions";
import {
  executeContractReadsIndividually,
  executeGraphQLRead,
  prepareNameProfileDiscoveryRead,
  prepareNameRecordsRead,
} from "#/actions";
import type { ParseNameInputError } from "#/lib";
import { parseNameInput } from "#/lib";
import { useEnsConfig } from "#/providers";

export interface NameProfileResult extends NameRecordsResult {
  readonly discovery: NameProfileDiscoveryResult["records"];
  readonly domain: NameProfileDiscoveryResult["domain"];
  readonly indexer: NameProfileDiscoveryResult["indexer"];
}

export type NameProfileError =
  | "CONTRACT_READ_FAILED"
  | "GRAPHQL_READ_FAILED"
  | ParseNameInputError
  | PrepareNameProfileDiscoveryReadError
  | PrepareNameRecordsReadError;

export type NameProfileQueryKey = readonly [
  "ens",
  "name-profile",
  string,
  number,
  string,
  string,
  Address,
  NameRecordSelection | undefined,
];

export interface UseNameProfileParameters<selectData = NameProfileResult> {
  /**
   * Additional enumerable records to merge with indexer discovery.
   * Scalar booleans default to true and can be explicitly disabled.
   */
  additionalRecords?: NameRecordSelection;
  indexerUrl?: string;
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<NameProfileResult, NameProfileError, selectData, NameProfileQueryKey>,
    "queryFn" | "queryKey"
  >;
  universalResolverAddress?: Address;
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function mergeRecords(
  discovery: NameProfileDiscoveryResult["records"],
  additional: NameRecordSelection | undefined,
): NameRecordSelection {
  return {
    abi: unique([...discovery.abiContentTypes, ...(additional?.abi ?? [])]),
    addresses: unique([...discovery.coinTypes, ...(additional?.addresses ?? [])]),
    contenthash: additional?.contenthash ?? true,
    data: unique(additional?.data ?? []),
    interfaces: unique([
      ...discovery.interfaceIds,
      ...(additional?.interfaces ?? []),
    ]) as `0x${string}`[],
    name: additional?.name ?? true,
    pubkey: additional?.pubkey ?? true,
    text: unique([...discovery.textKeys, ...(additional?.text ?? [])]),
  };
}

export function useNameProfile<selectData = NameProfileResult>(
  parameters: UseNameProfileParameters<selectData>,
) {
  const { chain, contracts, indexerUrl: configuredIndexerUrl, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const parsed = parseNameInput(parameters.input);
  const indexerUrl = parameters.indexerUrl ?? configuredIndexerUrl;
  const universalResolverAddress =
    parameters.universalResolverAddress ?? contracts.universalResolverV2.address;
  const discoveryRead = prepareNameProfileDiscoveryRead({
    indexerUrl,
    input: parameters.input,
    network,
  });

  return useQuery<NameProfileResult, NameProfileError, selectData, NameProfileQueryKey>({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-profile",
      network,
      chain.id,
      parsed.isOk() ? parsed.value.normalizedName : (parameters.input ?? ""),
      indexerUrl,
      universalResolverAddress,
      parameters.additionalRecords,
    ],
    enabled:
      (parameters.query?.enabled ?? true) && publicClient !== undefined && discoveryRead.isOk(),
    queryFn: async ({ signal }) => {
      if (publicClient === undefined) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameProfileError);
      }
      if (discoveryRead.isErr()) throw discoveryRead.error;

      const discovery = await executeGraphQLRead(discoveryRead.value, {
        signal,
      });
      if (discovery.isErr()) throw discovery.error;

      const recordsRead = prepareNameRecordsRead({
        input: parameters.input,
        network,
        records: mergeRecords(discovery.value.records, parameters.additionalRecords),
        universalResolverAddress,
      });
      if (recordsRead.isErr()) throw recordsRead.error;

      const records = await executeContractReadsIndividually(publicClient, recordsRead.value);
      if (records.isErr()) throw records.error;

      return {
        ...records.value,
        discovery: discovery.value.records,
        domain: discovery.value.domain,
        indexer: discovery.value.indexer,
      };
    },
  });
}
