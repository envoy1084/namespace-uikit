import type {
  NameProfileRecords,
  NormalizedNameProfileRecords,
} from "#/components/name-profile-editor/types";

import { getCoderByCoinType } from "@ensdomains/address-encoder";
import {
  decode as decodeContentHash,
  encode as encodeContentHash,
  getCodec,
  type Codec,
} from "@ensdomains/content-hash";
import { err, ok, type Result } from "neverthrow";
import {
  getAddress,
  isAddress,
  isHex,
  size,
  zeroAddress,
  zeroHash,
  type Address,
  type Hex,
} from "viem";
import { normalize as normalizeName } from "viem/ens";

const MAX_UINT256 = (1n << 256n) - 1n;
const CONTENT_HASH_URI_PATTERN = /^([a-z0-9]+):\/\/(.+)$/i;
const CONTENT_HASH_CODECS = new Set<Codec>([
  "adnl",
  "arweave",
  "ipfs",
  "ipns",
  "onion",
  "onion3",
  "skynet",
  "swarm",
]);

export type NormalizeProfileRecordsError =
  | "DUPLICATE_ABI_CONTENT_TYPE"
  | "DUPLICATE_ADDRESS_COIN_TYPE"
  | "DUPLICATE_DATA_KEY"
  | "DUPLICATE_INTERFACE_ID"
  | "DUPLICATE_TEXT_KEY"
  | "INVALID_ABI_CONTENT_TYPE"
  | "INVALID_ABI_VALUE"
  | "INVALID_ADDRESS"
  | "INVALID_COIN_TYPE"
  | "INVALID_CONTENTHASH"
  | "INVALID_DATA_KEY"
  | "INVALID_DATA_VALUE"
  | "INVALID_INTERFACE_ID"
  | "INVALID_INTERFACE_IMPLEMENTER"
  | "INVALID_NAME_RECORD"
  | "INVALID_PROFILE_RECORDS"
  | "INVALID_PUBLIC_KEY"
  | "INVALID_TEXT_KEY"
  | "UNSUPPORTED_COIN_TYPE";

export type NormalizeProfileRecordsResult = Result<
  NormalizedNameProfileRecords,
  NormalizeProfileRecordsError
>;

function isByteHex(value: unknown): value is Hex {
  return (
    isHex(value, { strict: true }) && (value.length - "0x".length) % 2 === 0
  );
}

function normalizeAbiRecords(
  records: NameProfileRecords["abi"],
): Result<ReadonlyMap<bigint, Hex>, NormalizeProfileRecordsError> {
  const normalized = new Map<bigint, Hex>();
  const seen = new Set<bigint>();

  for (const record of records) {
    const { contentType, value } = record;

    if (
      typeof contentType !== "bigint" ||
      contentType <= 0n ||
      contentType > MAX_UINT256 ||
      (contentType & (contentType - 1n)) !== 0n
    ) {
      return err("INVALID_ABI_CONTENT_TYPE");
    }

    if (seen.has(contentType)) return err("DUPLICATE_ABI_CONTENT_TYPE");
    seen.add(contentType);

    if (!isByteHex(value)) return err("INVALID_ABI_VALUE");
    if (value !== "0x") normalized.set(contentType, value.toLowerCase() as Hex);
  }

  return ok(normalized);
}

function normalizeAddressRecords(
  records: NameProfileRecords["addresses"],
): Result<ReadonlyMap<bigint, string>, NormalizeProfileRecordsError> {
  const normalized = new Map<bigint, string>();
  const seen = new Set<bigint>();

  for (const record of records) {
    const { coinType } = record;

    if (
      typeof coinType !== "bigint" ||
      coinType < 0n ||
      coinType > BigInt(Number.MAX_SAFE_INTEGER)
    ) {
      return err("INVALID_COIN_TYPE");
    }

    if (seen.has(coinType)) return err("DUPLICATE_ADDRESS_COIN_TYPE");
    seen.add(coinType);

    const value = record.value.trim();
    if (value.length === 0) continue;

    let coder: ReturnType<typeof getCoderByCoinType>;
    try {
      coder = getCoderByCoinType(Number(coinType));
    } catch {
      return err("UNSUPPORTED_COIN_TYPE");
    }

    try {
      normalized.set(coinType, coder.encode(coder.decode(value)));
    } catch {
      return err("INVALID_ADDRESS");
    }
  }

  return ok(normalized);
}

function normalizeContenthash(
  contenthash: string | null,
): Result<string | null, NormalizeProfileRecordsError> {
  const value = contenthash?.trim() ?? "";
  if (value.length === 0 || value === "0x") return ok(null);

  try {
    const prefixedHex = value.startsWith("0x") ? value : `0x${value}`;

    if (isByteHex(prefixedHex) && size(prefixedHex) > 0) {
      const codec = getCodec(prefixedHex);
      if (codec === undefined) return err("INVALID_CONTENTHASH");

      const decoded = decodeContentHash(prefixedHex);
      return ok(
        `${codec}://${decodeContentHash(encodeContentHash(codec, decoded))}`,
      );
    }

    const match = CONTENT_HASH_URI_PATTERN.exec(value);
    if (match === null) return err("INVALID_CONTENTHASH");

    const codecName = match[1];
    const content = match[2];
    if (codecName === undefined || content === undefined) {
      return err("INVALID_CONTENTHASH");
    }

    const codec = codecName.toLowerCase() as Codec;
    if (!CONTENT_HASH_CODECS.has(codec) || content.length === 0) {
      return err("INVALID_CONTENTHASH");
    }

    const normalized = decodeContentHash(encodeContentHash(codec, content));
    return ok(`${codec}://${normalized}`);
  } catch {
    return err("INVALID_CONTENTHASH");
  }
}

function normalizeDataRecords(
  records: NameProfileRecords["data"],
): Result<ReadonlyMap<string, Hex>, NormalizeProfileRecordsError> {
  const normalized = new Map<string, Hex>();
  const seen = new Set<string>();

  for (const record of records) {
    const key = record.key.trim();
    if (key.length === 0) return err("INVALID_DATA_KEY");
    if (seen.has(key)) return err("DUPLICATE_DATA_KEY");
    seen.add(key);

    if (!isByteHex(record.value)) {
      return err("INVALID_DATA_VALUE");
    }

    if (record.value !== "0x") {
      normalized.set(key, record.value.toLowerCase() as Hex);
    }
  }

  return ok(normalized);
}

function normalizeInterfaceRecords(
  records: NameProfileRecords["interfaces"],
): Result<ReadonlyMap<Hex, Address>, NormalizeProfileRecordsError> {
  const normalized = new Map<Hex, Address>();
  const seen = new Set<Hex>();

  for (const record of records) {
    if (!isByteHex(record.interfaceId) || size(record.interfaceId) !== 4) {
      return err("INVALID_INTERFACE_ID");
    }

    const interfaceId = record.interfaceId.toLowerCase() as Hex;
    if (seen.has(interfaceId)) return err("DUPLICATE_INTERFACE_ID");
    seen.add(interfaceId);

    if (!isAddress(record.implementer)) {
      return err("INVALID_INTERFACE_IMPLEMENTER");
    }

    const implementer = getAddress(record.implementer);
    if (implementer !== zeroAddress) normalized.set(interfaceId, implementer);
  }

  return ok(normalized);
}

function normalizeNameRecord(
  name: string | null,
): Result<string | null, NormalizeProfileRecordsError> {
  const value = name?.trim() ?? "";
  if (value.length === 0) return ok(null);

  try {
    return ok(normalizeName(value));
  } catch {
    return err("INVALID_NAME_RECORD");
  }
}

function normalizePublicKey(
  pubkey: NameProfileRecords["pubkey"],
): Result<NameProfileRecords["pubkey"], NormalizeProfileRecordsError> {
  if (pubkey === null) return ok(null);

  if (
    !isByteHex(pubkey.x) ||
    !isByteHex(pubkey.y) ||
    size(pubkey.x) !== 32 ||
    size(pubkey.y) !== 32
  ) {
    return err("INVALID_PUBLIC_KEY");
  }

  const x = pubkey.x.toLowerCase() as Hex;
  const y = pubkey.y.toLowerCase() as Hex;
  return ok(x === zeroHash && y === zeroHash ? null : { x, y });
}

function normalizeTextRecords(
  records: NameProfileRecords["text"],
): Result<ReadonlyMap<string, string>, NormalizeProfileRecordsError> {
  const normalized = new Map<string, string>();
  const seen = new Set<string>();

  for (const record of records) {
    const key = record.key.trim();
    if (key.length === 0) return err("INVALID_TEXT_KEY");
    if (seen.has(key)) return err("DUPLICATE_TEXT_KEY");
    seen.add(key);

    if (record.value.length > 0) normalized.set(key, record.value);
  }

  return ok(normalized);
}

function normalizeProfileRecordsInternal(
  records: NameProfileRecords,
): NormalizeProfileRecordsResult {
  const abi = normalizeAbiRecords(records.abi);
  if (abi.isErr()) return err(abi.error);

  const addresses = normalizeAddressRecords(records.addresses);
  if (addresses.isErr()) return err(addresses.error);

  const contenthash = normalizeContenthash(records.contenthash);
  if (contenthash.isErr()) return err(contenthash.error);

  const data = normalizeDataRecords(records.data);
  if (data.isErr()) return err(data.error);

  const interfaces = normalizeInterfaceRecords(records.interfaces);
  if (interfaces.isErr()) return err(interfaces.error);

  const name = normalizeNameRecord(records.name);
  if (name.isErr()) return err(name.error);

  const pubkey = normalizePublicKey(records.pubkey);
  if (pubkey.isErr()) return err(pubkey.error);

  const text = normalizeTextRecords(records.text);
  if (text.isErr()) return err(text.error);

  return ok({
    abi: abi.value,
    addresses: addresses.value,
    contenthash: contenthash.value,
    data: data.value,
    interfaces: interfaces.value,
    name: name.value,
    pubkey: pubkey.value,
    text: text.value,
  });
}

/**
 * Validates and canonicalizes a complete resolver profile for editor state.
 *
 * Empty onchain-equivalent values are omitted from maps or normalized to
 * `null`. All validation failures are returned as stable error codes.
 */
export function normalizeProfileRecords(
  records: NameProfileRecords,
): NormalizeProfileRecordsResult {
  try {
    return normalizeProfileRecordsInternal(records);
  } catch {
    return err("INVALID_PROFILE_RECORDS");
  }
}
