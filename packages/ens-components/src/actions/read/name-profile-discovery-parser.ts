import { err, ok, type Result } from "neverthrow";
import { getAddress, isAddress, isHex, type Address, type Hex } from "viem";

import type {
  NameProfileDiscoveryResult,
  NameProfileSubregistry,
} from "#/actions/read/read-name-profile-discovery";

interface JsonObject {
  readonly _meta?: unknown;
  readonly abis?: unknown;
  readonly address?: unknown;
  readonly block?: unknown;
  readonly canonicalId?: unknown;
  readonly coinTypes?: unknown;
  readonly createdAt?: unknown;
  readonly domain?: unknown;
  readonly eventsCount?: unknown;
  readonly expiryDate?: unknown;
  readonly fuses?: unknown;
  readonly gracePeriodEnd?: unknown;
  readonly hasIndexingErrors?: unknown;
  readonly id?: unknown;
  readonly interfaceId?: unknown;
  readonly interfaces?: unknown;
  readonly isLegacy?: unknown;
  readonly isMigrated?: unknown;
  readonly isNormalized?: unknown;
  readonly isReachable?: unknown;
  readonly isWrapped?: unknown;
  readonly labelhash?: unknown;
  readonly labelName?: unknown;
  readonly name?: unknown;
  readonly namehash?: unknown;
  readonly normalizedName?: unknown;
  readonly number?: unknown;
  readonly owner?: unknown;
  readonly protocol?: unknown;
  readonly registrant?: unknown;
  readonly registrationDate?: unknown;
  readonly resolvedAddress?: unknown;
  readonly resolver?: unknown;
  readonly roleHolderCount?: unknown;
  readonly subdomainCount?: unknown;
  readonly subregistry?: unknown;
  readonly texts?: unknown;
  readonly tokenId?: unknown;
  readonly tokenVersion?: unknown;
  readonly ttl?: unknown;
  readonly unreachableSince?: unknown;
  readonly wrappedOwner?: unknown;
  readonly wrapperExpiry?: unknown;
}

function object(value: unknown): JsonObject | undefined {
  return typeof value === "object" && value !== null ? (value as JsonObject) : undefined;
}

function nullableNumber(value: unknown): number | null | undefined {
  return value === null
    ? null
    : typeof value === "number" && Number.isSafeInteger(value)
      ? value
      : undefined;
}

function nullableString(value: unknown): string | null | undefined {
  return value === null ? null : typeof value === "string" ? value : undefined;
}

function accountAddress(value: unknown): Address | null | undefined {
  if (value === null) return null;
  const id = object(value)?.id;
  return typeof id === "string" && isAddress(id) ? getAddress(id) : undefined;
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string")
    ? value
    : undefined;
}

function parseSubregistry(value: unknown): NameProfileSubregistry | null | undefined {
  if (value === null) return null;
  const data = object(value);
  if (data === undefined) return undefined;
  const ownerAddress = accountAddress(data.owner);
  if (
    typeof data.address !== "string" ||
    !isAddress(data.address) ||
    typeof data.name !== "string" ||
    typeof data.namehash !== "string" ||
    !isHex(data.namehash, { strict: true }) ||
    ownerAddress === undefined
  ) {
    return undefined;
  }
  return {
    address: getAddress(data.address),
    name: data.name,
    namehash: data.namehash,
    ownerAddress,
  };
}

export function parseNameProfileDiscovery(
  input: unknown,
): Result<NameProfileDiscoveryResult, "INVALID_INDEXER_RESPONSE" | "NAME_NOT_FOUND"> {
  const data = object(input);
  if (data === undefined) return err("INVALID_INDEXER_RESPONSE");
  if (data.domain === null) return err("NAME_NOT_FOUND");
  const domain = object(data.domain);
  const meta = object(data["_meta"]);
  const block = object(meta?.block);
  const resolver = domain === undefined ? undefined : object(domain.resolver);
  if (domain === undefined || meta === undefined || block === undefined) {
    return err("INVALID_INDEXER_RESPONSE");
  }

  const ownerAddress = accountAddress(domain.owner);
  const registrantAddress = accountAddress(domain.registrant);
  const wrappedOwnerAddress = accountAddress(domain.wrappedOwner);
  const resolvedAddress = accountAddress(domain.resolvedAddress);
  const subregistry = parseSubregistry(domain.subregistry);
  const labelName = nullableString(domain.labelName);
  const normalizedName = nullableString(domain.normalizedName);
  const resolverAddress =
    resolver === undefined
      ? null
      : typeof resolver.address === "string" && isAddress(resolver.address)
        ? getAddress(resolver.address)
        : undefined;
  const textKeys = resolver === undefined ? [] : stringArray(resolver.texts);
  const coinTypes = resolver === undefined ? [] : stringArray(resolver.coinTypes);
  const abiValues = resolver === undefined ? [] : resolver.abis;
  const abiContentTypes =
    Array.isArray(abiValues) &&
    abiValues.every(
      (entry) => typeof entry === "number" && Number.isSafeInteger(entry) && entry > 0,
    )
      ? abiValues.map(String)
      : undefined;
  const interfaces = resolver === undefined ? [] : resolver.interfaces;
  const interfaceIds =
    Array.isArray(interfaces) &&
    interfaces.every((entry) => {
      const interfaceId = object(entry)?.interfaceId;
      return typeof interfaceId === "string" && isHex(interfaceId, { strict: true });
    })
      ? interfaces.map((entry) => object(entry)?.interfaceId as Hex)
      : undefined;

  const nullableValues = {
    canonicalId: nullableString(domain.canonicalId),
    expiryDate: nullableNumber(domain.expiryDate),
    fuses: nullableNumber(domain.fuses),
    gracePeriodEnd: nullableNumber(domain.gracePeriodEnd),
    registrationDate: nullableNumber(domain.registrationDate),
    tokenId: nullableString(domain.tokenId),
    tokenVersion: nullableNumber(domain.tokenVersion),
    ttl: nullableNumber(domain.ttl),
    unreachableSince: nullableNumber(domain.unreachableSince),
    wrapperExpiry: nullableNumber(domain.wrapperExpiry),
  };
  const requiredNumbers = [
    domain.createdAt,
    domain.eventsCount,
    domain.roleHolderCount,
    domain.subdomainCount,
    block.number,
  ];
  const requiredBooleans = [
    domain.isLegacy,
    domain.isMigrated,
    domain.isNormalized,
    domain.isReachable,
    domain.isWrapped,
    meta.hasIndexingErrors,
  ];

  if (
    ownerAddress === undefined ||
    ownerAddress === null ||
    registrantAddress === undefined ||
    wrappedOwnerAddress === undefined ||
    resolvedAddress === undefined ||
    resolverAddress === undefined ||
    subregistry === undefined ||
    labelName === undefined ||
    normalizedName === undefined ||
    textKeys === undefined ||
    coinTypes === undefined ||
    abiContentTypes === undefined ||
    interfaceIds === undefined ||
    Object.values(nullableValues).some((value) => value === undefined) ||
    requiredNumbers.some((value) => typeof value !== "number" || !Number.isSafeInteger(value)) ||
    requiredBooleans.some((value) => typeof value !== "boolean") ||
    typeof domain.id !== "string" ||
    typeof domain.name !== "string" ||
    typeof domain.labelhash !== "string" ||
    !isHex(domain.labelhash, { strict: true }) ||
    (domain.protocol !== "v1" && domain.protocol !== "v2")
  ) {
    return err("INVALID_INDEXER_RESPONSE");
  }

  return ok({
    domain: {
      canonicalId: nullableValues.canonicalId as string | null,
      createdAt: domain.createdAt as number,
      eventsCount: domain.eventsCount as number,
      expiryDate: nullableValues.expiryDate as number | null,
      fuses: nullableValues.fuses as number | null,
      gracePeriodEnd: nullableValues.gracePeriodEnd as number | null,
      id: domain.id,
      isLegacy: domain.isLegacy as boolean,
      isMigrated: domain.isMigrated as boolean,
      isNormalized: domain.isNormalized as boolean,
      isReachable: domain.isReachable as boolean,
      isWrapped: domain.isWrapped as boolean,
      labelName,
      labelhash: domain.labelhash,
      name: domain.name,
      normalizedName,
      ownerAddress,
      protocol: domain.protocol,
      registrantAddress,
      registrationDate: nullableValues.registrationDate as number | null,
      resolvedAddress,
      resolverAddress,
      roleHolderCount: domain.roleHolderCount as number,
      subdomainCount: domain.subdomainCount as number,
      subregistry,
      tokenId: nullableValues.tokenId as string | null,
      tokenVersion: nullableValues.tokenVersion as number | null,
      ttl: nullableValues.ttl as number | null,
      unreachableSince: nullableValues.unreachableSince as number | null,
      wrappedOwnerAddress,
      wrapperExpiry: nullableValues.wrapperExpiry as number | null,
    },
    indexer: {
      blockNumber: block.number as number,
      hasIndexingErrors: meta.hasIndexingErrors as boolean,
    },
    records: {
      abiContentTypes,
      coinTypes,
      interfaceIds,
      textKeys,
    },
  });
}
