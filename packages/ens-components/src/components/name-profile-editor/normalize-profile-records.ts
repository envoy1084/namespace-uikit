import { getCoderByCoinType } from "@ensdomains/address-encoder";
import {
  decode as decodeContentHash,
  encode as encodeContentHash,
  getCodec,
  type Codec,
} from "@ensdomains/content-hash";
import { err, ok, type Result } from "neverthrow";
import { getAddress, isAddress, isHex, size, zeroAddress } from "viem";
import { normalize as normalizeName } from "viem/ens";

import type { NormalizeProfilePublicKeyError } from "#/components/name-profile-editor/normalize-profile-public-key";
import { normalizeProfilePublicKey } from "#/components/name-profile-editor/normalize-profile-public-key";
import type {
  NameProfileAbiRecord,
  NameProfileAddressRecord,
  NameProfileDataRecord,
  NameProfileFormValues,
  NameProfileInterfaceRecord,
  NameProfileTextRecord,
} from "#/components/name-profile-editor/types";
import type { ProfileTextRecordValidationError } from "#/components/name-profile-editor/validate-profile-text-record";
import { normalizeProfileTextValue } from "#/components/name-profile-editor/validate-profile-text-record";

const MAX_UINT256 = (1n << 256n) - 1n;
const UNSIGNED_INTEGER_PATTERN = /^\d+$/;
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
  | "INVALID_EMAIL"
  | "INVALID_IMAGE_URL"
  | "INVALID_INTERFACE_ID"
  | "INVALID_INTERFACE_IMPLEMENTER"
  | "INVALID_NAME_RECORD"
  | "INVALID_PROFILE_RECORDS"
  | "INVALID_PUBLIC_KEY"
  | "INVALID_PUBLIC_KEY_X"
  | "INVALID_PUBLIC_KEY_Y"
  | "INVALID_TEXT_KEY"
  | "INVALID_TIMEZONE"
  | "INVALID_URL"
  | "MISSING_PUBLIC_KEY_X"
  | "MISSING_PUBLIC_KEY_Y"
  | "UNSUPPORTED_COIN_TYPE";

export type NormalizeProfileRecordsResult = Result<
  NameProfileFormValues,
  NormalizeProfileRecordsError
>;

function isByteHex(value: unknown): value is `0x${string}` {
  return isHex(value, { strict: true }) && (value.length - "0x".length) % 2 === 0;
}

function compareStrings(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function compareUnsignedIntegerStrings(left: string, right: string): number {
  const leftValue = BigInt(left);
  const rightValue = BigInt(right);
  if (leftValue < rightValue) return -1;
  if (leftValue > rightValue) return 1;
  return 0;
}

function sortValues<T>(values: readonly T[], compare: (left: T, right: T) => number): T[] {
  return values.reduce<T[]>((sorted, value) => {
    const index = sorted.findIndex((existing) => compare(value, existing) < 0);
    if (index === -1) return sorted.concat(value);
    return sorted.slice(0, index).concat(value, sorted.slice(index));
  }, []);
}

function normalizeAbiRecords(
  records: NameProfileFormValues["abi"],
): Result<NameProfileAbiRecord[], NormalizeProfileRecordsError> {
  const normalized: NameProfileAbiRecord[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    const input = record.contentType.trim();
    if (!UNSIGNED_INTEGER_PATTERN.test(input)) {
      return err("INVALID_ABI_CONTENT_TYPE");
    }

    const contentTypeValue = BigInt(input);
    if (
      contentTypeValue <= 0n ||
      contentTypeValue > MAX_UINT256 ||
      (contentTypeValue & (contentTypeValue - 1n)) !== 0n
    ) {
      return err("INVALID_ABI_CONTENT_TYPE");
    }

    const contentType = contentTypeValue.toString();
    if (seen.has(contentType)) return err("DUPLICATE_ABI_CONTENT_TYPE");
    seen.add(contentType);

    const value = record.value.trim();
    if (!isByteHex(value)) return err("INVALID_ABI_VALUE");
    if (value !== "0x") {
      normalized.push({ contentType, value: value.toLowerCase() });
    }
  }

  return ok(
    sortValues(normalized, (left, right) =>
      compareUnsignedIntegerStrings(left.contentType, right.contentType),
    ),
  );
}

function normalizeAddressRecords(
  records: NameProfileFormValues["addresses"],
): Result<NameProfileAddressRecord[], NormalizeProfileRecordsError> {
  const normalized: NameProfileAddressRecord[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    const input = record.coinType.trim();
    if (!UNSIGNED_INTEGER_PATTERN.test(input)) {
      return err("INVALID_COIN_TYPE");
    }

    const coinTypeValue = BigInt(input);
    if (coinTypeValue > BigInt(Number.MAX_SAFE_INTEGER)) {
      return err("INVALID_COIN_TYPE");
    }

    const coinType = coinTypeValue.toString();
    if (seen.has(coinType)) return err("DUPLICATE_ADDRESS_COIN_TYPE");
    seen.add(coinType);

    const value = record.value.trim();
    if (value.length === 0) continue;

    let coder: ReturnType<typeof getCoderByCoinType>;
    try {
      coder = getCoderByCoinType(Number(coinTypeValue));
    } catch {
      return err("UNSUPPORTED_COIN_TYPE");
    }

    try {
      normalized.push({
        coinType,
        value: coder.encode(coder.decode(value)),
      });
    } catch {
      return err("INVALID_ADDRESS");
    }
  }

  return ok(
    sortValues(normalized, (left, right) =>
      compareUnsignedIntegerStrings(left.coinType, right.coinType),
    ),
  );
}

function normalizeContenthash(contenthash: string): Result<string, NormalizeProfileRecordsError> {
  const value = contenthash.trim();
  if (value.length === 0 || value === "0x") return ok("");

  try {
    const prefixedHex = value.startsWith("0x") ? value : `0x${value}`;

    if (isByteHex(prefixedHex) && size(prefixedHex) > 0) {
      const codec = getCodec(prefixedHex);
      if (codec === undefined) return err("INVALID_CONTENTHASH");

      const decoded = decodeContentHash(prefixedHex);
      const normalized = decodeContentHash(encodeContentHash(codec, decoded));
      return ok(`${codec}://${normalized}`);
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
  records: NameProfileFormValues["data"],
): Result<NameProfileDataRecord[], NormalizeProfileRecordsError> {
  const normalized: NameProfileDataRecord[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    const key = record.key.trim();
    if (key.length === 0) return err("INVALID_DATA_KEY");
    if (seen.has(key)) return err("DUPLICATE_DATA_KEY");
    seen.add(key);

    const value = record.value.trim();
    if (!isByteHex(value)) return err("INVALID_DATA_VALUE");
    if (value !== "0x") normalized.push({ key, value: value.toLowerCase() });
  }

  return ok(sortValues(normalized, (left, right) => compareStrings(left.key, right.key)));
}

function normalizeInterfaceRecords(
  records: NameProfileFormValues["interfaces"],
): Result<NameProfileInterfaceRecord[], NormalizeProfileRecordsError> {
  const normalized: NameProfileInterfaceRecord[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    const input = record.interfaceId.trim();
    if (!isByteHex(input) || size(input) !== 4) {
      return err("INVALID_INTERFACE_ID");
    }

    const interfaceId = input.toLowerCase();
    if (seen.has(interfaceId)) return err("DUPLICATE_INTERFACE_ID");
    seen.add(interfaceId);

    const inputImplementer = record.implementer.trim();
    if (!isAddress(inputImplementer)) {
      return err("INVALID_INTERFACE_IMPLEMENTER");
    }

    const implementer = getAddress(inputImplementer);
    if (implementer !== zeroAddress) {
      normalized.push({ implementer, interfaceId });
    }
  }

  return ok(
    sortValues(normalized, (left, right) => compareStrings(left.interfaceId, right.interfaceId)),
  );
}

function normalizeNameRecord(name: string): Result<string, NormalizeProfileRecordsError> {
  const value = name.trim();
  if (value.length === 0) return ok("");

  try {
    return ok(normalizeName(value));
  } catch {
    return err("INVALID_NAME_RECORD");
  }
}

function normalizeTextRecords(
  records: NameProfileFormValues["text"],
): Result<NameProfileTextRecord[], NormalizeProfileRecordsError> {
  const normalized: NameProfileTextRecord[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    const key = record.key.trim();
    if (key.length === 0) return err("INVALID_TEXT_KEY");
    if (seen.has(key)) return err("DUPLICATE_TEXT_KEY");
    seen.add(key);

    const value = normalizeProfileTextValue(key, record.value);
    if (value.isErr()) {
      return err(value.error as ProfileTextRecordValidationError);
    }

    if (value.value.length > 0) {
      normalized.push({ key, value: value.value });
    }
  }

  return ok(sortValues(normalized, (left, right) => compareStrings(left.key, right.key)));
}

function normalizeProfileRecordsInternal(
  records: NameProfileFormValues,
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

  const pubkey = normalizeProfilePublicKey(records.pubkey);
  if (pubkey.isErr()) {
    return err(pubkey.error as NormalizeProfilePublicKeyError);
  }

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
 * Validates and canonicalizes a complete resolver profile for form and editor
 * state. Empty onchain-equivalent values are omitted or changed to empty
 * strings.
 */
export function normalizeProfileRecords(
  records: NameProfileFormValues,
): NormalizeProfileRecordsResult {
  try {
    return normalizeProfileRecordsInternal(records);
  } catch {
    return err("INVALID_PROFILE_RECORDS");
  }
}
