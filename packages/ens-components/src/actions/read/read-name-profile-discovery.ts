import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import type { Address, Hex } from "viem";

import {
  executeGraphQLRead,
  type ExecuteGraphQLReadOptions,
  type PreparedGraphQLRead,
} from "#/actions/read/graphql-read";
import { parseNameProfileDiscovery } from "#/actions/read/name-profile-discovery-parser";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

const NAME_PROFILE_DISCOVERY_QUERY = /* GraphQL */ `
  query NameProfileDiscovery($name: String!) {
    domain(id: $name) {
      id
      name
      labelName
      labelhash
      normalizedName
      isNormalized
      protocol
      owner {
        id
      }
      registrant {
        id
      }
      wrappedOwner {
        id
      }
      resolvedAddress {
        id
      }
      resolver {
        address
        texts
        coinTypes
        abis
        interfaces {
          interfaceId
        }
      }
      subregistry {
        address
        name
        namehash
        owner {
          id
        }
      }
      ttl
      isLegacy
      isMigrated
      isWrapped
      fuses
      wrapperExpiry
      gracePeriodEnd
      isReachable
      unreachableSince
      createdAt
      registrationDate
      expiryDate
      tokenId
      canonicalId
      tokenVersion
      subdomainCount
      eventsCount
      roleHolderCount
    }
    _meta {
      block {
        number
      }
      hasIndexingErrors
    }
  }
`;

export interface NameProfileRecordDiscovery {
  readonly abiContentTypes: readonly string[];
  readonly coinTypes: readonly string[];
  readonly interfaceIds: readonly Hex[];
  readonly textKeys: readonly string[];
}

export interface NameProfileSubregistry {
  readonly address: Address;
  readonly name: string;
  readonly namehash: Hex;
  readonly ownerAddress: Address | null;
}

export interface NameProfileDomain {
  readonly canonicalId: string | null;
  readonly createdAt: number;
  readonly eventsCount: number;
  readonly expiryDate: number | null;
  readonly fuses: number | null;
  readonly gracePeriodEnd: number | null;
  readonly id: string;
  readonly isLegacy: boolean;
  readonly isMigrated: boolean;
  readonly isNormalized: boolean;
  readonly isReachable: boolean;
  readonly isWrapped: boolean;
  readonly labelName: string | null;
  readonly labelhash: Hex;
  readonly name: string;
  readonly normalizedName: string | null;
  readonly ownerAddress: Address;
  readonly protocol: "v1" | "v2";
  readonly registrantAddress: Address | null;
  readonly registrationDate: number | null;
  readonly resolvedAddress: Address | null;
  readonly resolverAddress: Address | null;
  readonly roleHolderCount: number;
  readonly subdomainCount: number;
  readonly subregistry: NameProfileSubregistry | null;
  readonly tokenId: string | null;
  readonly tokenVersion: number | null;
  readonly ttl: number | null;
  readonly unreachableSince: number | null;
  readonly wrappedOwnerAddress: Address | null;
  readonly wrapperExpiry: number | null;
}

export interface NameProfileIndexerState {
  readonly blockNumber: number;
  readonly hasIndexingErrors: boolean;
}

export interface NameProfileDiscoveryResult {
  readonly domain: NameProfileDomain;
  readonly indexer: NameProfileIndexerState;
  readonly records: NameProfileRecordDiscovery;
}

export type PrepareNameProfileDiscoveryReadError =
  | "INVALID_INDEXER_RESPONSE"
  | "INVALID_INDEXER_URL"
  | "NAME_NOT_FOUND"
  | ParseNameInputError;

export interface PrepareNameProfileDiscoveryReadParameters {
  readonly indexerUrl: string;
  readonly input: string | null | undefined;
}

export type PreparedNameProfileDiscoveryRead = PreparedGraphQLRead<
  NameProfileDiscoveryResult,
  "INVALID_INDEXER_RESPONSE" | "NAME_NOT_FOUND",
  "name-profile-discovery"
>;

export interface ReadNameProfileDiscoveryParameters
  extends PrepareNameProfileDiscoveryReadParameters, ExecuteGraphQLReadOptions {}

export type ReadNameProfileDiscoveryReturnType = NameProfileDiscoveryResult;
export type ReadNameProfileDiscoveryErrorType =
  | PrepareNameProfileDiscoveryReadError
  | "GRAPHQL_READ_FAILED";

/** Prepares indexed ENS domain metadata and record-key discovery. */
export function prepareNameProfileDiscoveryRead(
  parameters: PrepareNameProfileDiscoveryReadParameters,
): Result<PreparedNameProfileDiscoveryRead, PrepareNameProfileDiscoveryReadError> {
  let url: URL;
  try {
    url = new URL(parameters.indexerUrl);
  } catch {
    return err("INVALID_INDEXER_URL");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return err("INVALID_INDEXER_URL");
  }

  const parsed = parseNameInput(parameters.input);
  if (parsed.isErr()) return err(parsed.error);

  return ok({
    kind: "name-profile-discovery",
    request: {
      query: NAME_PROFILE_DISCOVERY_QUERY,
      url: url.href,
      variables: { name: parsed.value.normalizedName },
    },
    select: parseNameProfileDiscovery,
  });
}

/** Reads indexed ENS domain metadata and discovers its configured record keys. */
export function readNameProfileDiscovery(
  parameters: ReadNameProfileDiscoveryParameters,
): ResultAsync<ReadNameProfileDiscoveryReturnType, ReadNameProfileDiscoveryErrorType> {
  const prepared = prepareNameProfileDiscoveryRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  const options = parameters.signal === undefined ? {} : { signal: parameters.signal };
  return executeGraphQLRead(prepared.value, options);
}
