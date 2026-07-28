import type {
  ContractReadResults,
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  getAddress,
  isAddress,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";
import { namehash } from "viem/ens";

import {
  decodeNameRecord,
  descriptorsForNameRecords,
  emptyNameProfileRecords,
  encodeNameRecordCall,
  normalizeNameRecordSelection,
  type NameRecordDescriptor,
  type NameRecordSelection,
  type NormalizedNameRecordSelection,
} from "#/actions/read/prepare-read-name-records-codecs";
import { universalResolverV2Abi } from "#/data/abi";
import { encodeDnsName, isNonZeroAddress } from "#/lib/helpers";
import { parseNameInput } from "#/lib/parse-name-input";

export type {
  NameRecordSelection,
  NormalizedNameRecordSelection,
} from "#/actions/read/prepare-read-name-records-codecs";

export interface NameRecordsResult {
  readonly name: string;
  readonly node: Hex;
  readonly records: NameProfileFormValues;
  readonly requestedRecords: NormalizedNameRecordSelection;
  readonly resolverAddress: Address;
}

export type PrepareNameRecordsReadError =
  | "EMPTY_RECORD_SELECTION"
  | "INVALID_ABI_CONTENT_TYPE"
  | "INVALID_COIN_TYPE"
  | "INVALID_DATA_KEY"
  | "INVALID_INTERFACE_ID"
  | "INVALID_TEXT_KEY"
  | "INVALID_UNIVERSAL_RESOLVER_ADDRESS"
  | "NAME_RECORD_DECODE_FAILED"
  | "NAME_RECORD_READ_FAILED"
  | "RESOLVER_NOT_FOUND"
  | "UNSUPPORTED_COIN_TYPE"
  | ParseNameInputError;

export interface PrepareNameRecordsReadProps {
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly records: NameRecordSelection;
  readonly universalResolverAddress: Address;
}

type UniversalResolverRequest = ContractFunctionParameters<
  typeof universalResolverV2Abi,
  "view",
  "resolve",
  readonly [Hex, Hex]
>;

type PreparedNameRecordRead = PreparedContractRead<
  UniversalResolverRequest,
  readonly [Hex, Address],
  "name-record",
  {
    readonly descriptor: NameRecordDescriptor;
  }
>;

type NameRecordReadTuple = readonly [
  PreparedNameRecordRead,
  ...PreparedNameRecordRead[],
];

export type PreparedNameRecordsRead = PreparedContractReadPlan<
  NameRecordReadTuple,
  NameRecordsResult,
  | "NAME_RECORD_DECODE_FAILED"
  | "NAME_RECORD_READ_FAILED"
  | "RESOLVER_NOT_FOUND",
  "name-records"
>;

/** Prepares canonical Universal Resolver reads for selected profile records. */
export function prepareNameRecordsRead(
  props: PrepareNameRecordsReadProps,
): Result<PreparedNameRecordsRead, PrepareNameRecordsReadError> {
  if (!isNonZeroAddress(props.universalResolverAddress)) {
    return err("INVALID_UNIVERSAL_RESOLVER_ADDRESS");
  }
  const parsed = parseNameInput(props.input);
  if (parsed.isErr()) return err(parsed.error);
  const selection = normalizeNameRecordSelection(props.records);
  if (selection.isErr()) return err(selection.error);

  const name = parsed.value.normalizedName;
  const node = namehash(name);
  const dnsName = encodeDnsName(name);
  const reads = descriptorsForNameRecords(selection.value).map(
    (descriptor): PreparedNameRecordRead => ({
      kind: "name-record",
      metadata: { descriptor },
      request: {
        address: props.universalResolverAddress,
        abi: universalResolverV2Abi,
        functionName: "resolve",
        args: [dnsName, encodeNameRecordCall(node, descriptor)],
      },
    }),
  ) as unknown as NameRecordReadTuple;

  return ok({
    kind: "name-records",
    reads,
    select: (results: ContractReadResults<NameRecordReadTuple>) => {
      const records = emptyNameProfileRecords();
      let resolverAddress: Address | undefined;

      try {
        for (const [index, read] of reads.entries()) {
          const result = results[index];
          if (result?.status !== "success") {
            return err("NAME_RECORD_READ_FAILED");
          }
          const [value, currentResolver] = result.result;
          if (!isAddress(currentResolver) || currentResolver === zeroAddress) {
            return err("RESOLVER_NOT_FOUND");
          }
          if (
            resolverAddress !== undefined &&
            currentResolver.toLowerCase() !== resolverAddress.toLowerCase()
          ) {
            return err("NAME_RECORD_READ_FAILED");
          }
          resolverAddress = getAddress(currentResolver);
          decodeNameRecord(read.metadata.descriptor, value, records);
        }
      } catch {
        return err("NAME_RECORD_DECODE_FAILED");
      }

      if (resolverAddress === undefined) return err("RESOLVER_NOT_FOUND");
      return ok({
        name,
        node,
        records,
        requestedRecords: selection.value,
        resolverAddress,
      });
    },
  });
}
