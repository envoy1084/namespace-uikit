import type {
  NameProfileFormValues,
  NameProfilePublicKeyRecord,
} from "#/components/name-profile-editor/types";

import { getCoderByCoinType } from "@ensdomains/address-encoder";
import {
  decode as decodeContentHash,
  getCodec,
} from "@ensdomains/content-hash";
import { err, ok, type Result } from "neverthrow";
import {
  decodeAbiParameters,
  encodeFunctionData,
  getAddress,
  hexToBytes,
  isHex,
  size,
  zeroAddress,
  zeroHash,
  type Hex,
} from "viem";

import { permissionedResolverAbi } from "#/data/abi";

const MAX_UINT256 = (1n << 256n) - 1n;
const UNSIGNED_INTEGER_PATTERN = /^\d+$/;

export interface NameRecordSelection {
  readonly abi?: readonly string[];
  readonly addresses?: readonly string[];
  readonly contenthash?: boolean;
  readonly data?: readonly string[];
  readonly interfaces?: readonly Hex[];
  readonly name?: boolean;
  readonly pubkey?: boolean;
  readonly text?: readonly string[];
}

export interface NormalizedNameRecordSelection {
  readonly abi: readonly string[];
  readonly addresses: readonly string[];
  readonly contenthash: boolean;
  readonly data: readonly string[];
  readonly interfaces: readonly Hex[];
  readonly name: boolean;
  readonly pubkey: boolean;
  readonly text: readonly string[];
}

export type NormalizeNameRecordSelectionError =
  | "EMPTY_RECORD_SELECTION"
  | "INVALID_ABI_CONTENT_TYPE"
  | "INVALID_COIN_TYPE"
  | "INVALID_DATA_KEY"
  | "INVALID_INTERFACE_ID"
  | "INVALID_TEXT_KEY"
  | "UNSUPPORTED_COIN_TYPE";

export type NameRecordDescriptor =
  | { readonly contentType: string; readonly type: "abi" }
  | { readonly coinType: string; readonly type: "address" }
  | { readonly type: "contenthash" }
  | { readonly key: string; readonly type: "data" }
  | { readonly interfaceId: Hex; readonly type: "interface" }
  | { readonly type: "name" }
  | { readonly type: "pubkey" }
  | { readonly key: string; readonly type: "text" };

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].reduce<string[]>((sorted, value) => {
    const index = sorted.findIndex(
      (existing) => value.localeCompare(existing) < 0,
    );
    if (index === -1) return sorted.concat(value);
    return sorted.slice(0, index).concat(value, sorted.slice(index));
  }, []);
}

export function normalizeNameRecordSelection(
  selection: NameRecordSelection,
): Result<NormalizedNameRecordSelection, NormalizeNameRecordSelectionError> {
  const abi: string[] = [];
  for (const input of uniqueSorted(selection.abi ?? [])) {
    const value = input.trim();
    if (!UNSIGNED_INTEGER_PATTERN.test(value)) {
      return err("INVALID_ABI_CONTENT_TYPE");
    }
    const numericValue = BigInt(value);
    if (
      numericValue <= 0n ||
      numericValue > MAX_UINT256 ||
      (numericValue & (numericValue - 1n)) !== 0n
    ) {
      return err("INVALID_ABI_CONTENT_TYPE");
    }
    abi.push(numericValue.toString());
  }

  const addresses: string[] = [];
  for (const input of uniqueSorted(selection.addresses ?? [])) {
    const value = input.trim();
    if (!UNSIGNED_INTEGER_PATTERN.test(value)) {
      return err("INVALID_COIN_TYPE");
    }
    const numericValue = BigInt(value);
    if (numericValue > BigInt(Number.MAX_SAFE_INTEGER)) {
      return err("INVALID_COIN_TYPE");
    }
    try {
      getCoderByCoinType(Number(numericValue));
    } catch {
      return err("UNSUPPORTED_COIN_TYPE");
    }
    addresses.push(numericValue.toString());
  }

  const normalizeKeys = (
    values: readonly string[],
    error: "INVALID_DATA_KEY" | "INVALID_TEXT_KEY",
  ): Result<string[], NormalizeNameRecordSelectionError> => {
    const keys = uniqueSorted(values.map((value) => value.trim()));
    return keys.some((key) => key.length === 0) ? err(error) : ok(keys);
  };
  const data = normalizeKeys(selection.data ?? [], "INVALID_DATA_KEY");
  if (data.isErr()) return err(data.error);
  const text = normalizeKeys(selection.text ?? [], "INVALID_TEXT_KEY");
  if (text.isErr()) return err(text.error);

  const interfaces: Hex[] = [];
  for (const input of uniqueSorted(selection.interfaces ?? [])) {
    if (!isHex(input, { strict: true }) || size(input) !== 4) {
      return err("INVALID_INTERFACE_ID");
    }
    interfaces.push(input.toLowerCase() as Hex);
  }

  const normalized = {
    abi,
    addresses,
    contenthash: selection.contenthash === true,
    data: data.value,
    interfaces,
    name: selection.name === true,
    pubkey: selection.pubkey === true,
    text: text.value,
  };
  const count =
    abi.length +
    addresses.length +
    data.value.length +
    interfaces.length +
    text.value.length +
    Number(normalized.contenthash) +
    Number(normalized.name) +
    Number(normalized.pubkey);

  return count === 0 ? err("EMPTY_RECORD_SELECTION") : ok(normalized);
}

export function descriptorsForNameRecords(
  selection: NormalizedNameRecordSelection,
): NameRecordDescriptor[] {
  return [
    ...selection.abi.map(
      (contentType) => ({ contentType, type: "abi" }) as const,
    ),
    ...selection.addresses.map(
      (coinType) => ({ coinType, type: "address" }) as const,
    ),
    ...(selection.contenthash ? ([{ type: "contenthash" }] as const) : []),
    ...selection.data.map((key) => ({ key, type: "data" }) as const),
    ...selection.interfaces.map(
      (interfaceId) => ({ interfaceId, type: "interface" }) as const,
    ),
    ...(selection.name ? ([{ type: "name" }] as const) : []),
    ...(selection.pubkey ? ([{ type: "pubkey" }] as const) : []),
    ...selection.text.map((key) => ({ key, type: "text" }) as const),
  ];
}

export function encodeNameRecordCall(
  node: Hex,
  descriptor: NameRecordDescriptor,
): Hex {
  if (descriptor.type === "abi") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "ABI",
      args: [node, BigInt(descriptor.contentType)],
    });
  }
  if (descriptor.type === "address") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "addr",
      args: [node, BigInt(descriptor.coinType)],
    });
  }
  if (descriptor.type === "contenthash") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "contenthash",
      args: [node],
    });
  }
  if (descriptor.type === "data") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "data",
      args: [node, descriptor.key],
    });
  }
  if (descriptor.type === "interface") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "interfaceImplementer",
      args: [node, descriptor.interfaceId],
    });
  }
  if (descriptor.type === "name") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "name",
      args: [node],
    });
  }
  if (descriptor.type === "pubkey") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "pubkey",
      args: [node],
    });
  }
  return encodeFunctionData({
    abi: permissionedResolverAbi,
    functionName: "text",
    args: [node, descriptor.key],
  });
}

export function emptyNameProfileRecords(): NameProfileFormValues {
  return {
    abi: [],
    addresses: [],
    contenthash: "",
    data: [],
    interfaces: [],
    name: "",
    pubkey: { x: "", y: "" },
    text: [],
  };
}

function decodeContenthash(value: Hex): string {
  if (value === "0x") return "";
  const codec = getCodec(value);
  if (codec === undefined) throw new Error("Unknown contenthash codec");
  return `${codec}://${decodeContentHash(value)}`;
}

export function decodeNameRecord(
  descriptor: NameRecordDescriptor,
  value: Hex,
  records: NameProfileFormValues,
): void {
  if (descriptor.type === "abi") {
    const [contentType, abiValue] = decodeAbiParameters(
      [{ type: "uint256" }, { type: "bytes" }],
      value,
    );
    if (contentType > 0n && abiValue !== "0x") {
      records.abi.push({
        contentType: contentType.toString(),
        value: abiValue,
      });
    }
    return;
  }
  if (descriptor.type === "address") {
    const [addressBytes] = decodeAbiParameters([{ type: "bytes" }], value);
    if (addressBytes !== "0x") {
      const coder = getCoderByCoinType(Number(BigInt(descriptor.coinType)));
      records.addresses.push({
        coinType: descriptor.coinType,
        value: coder.encode(hexToBytes(addressBytes)),
      });
    }
    return;
  }
  if (descriptor.type === "contenthash") {
    const [contenthash] = decodeAbiParameters([{ type: "bytes" }], value);
    records.contenthash = decodeContenthash(contenthash);
    return;
  }
  if (descriptor.type === "data") {
    const [data] = decodeAbiParameters([{ type: "bytes" }], value);
    if (data !== "0x") records.data.push({ key: descriptor.key, value: data });
    return;
  }
  if (descriptor.type === "interface") {
    const [implementer] = decodeAbiParameters([{ type: "address" }], value);
    if (implementer !== zeroAddress) {
      records.interfaces.push({
        implementer: getAddress(implementer),
        interfaceId: descriptor.interfaceId,
      });
    }
    return;
  }
  if (descriptor.type === "name") {
    const [name] = decodeAbiParameters([{ type: "string" }], value);
    records.name = name;
    return;
  }
  if (descriptor.type === "pubkey") {
    const [x, y] = decodeAbiParameters(
      [{ type: "bytes32" }, { type: "bytes32" }],
      value,
    );
    records.pubkey =
      x === zeroHash && y === zeroHash
        ? { x: "", y: "" }
        : ({ x, y } satisfies NameProfilePublicKeyRecord);
    return;
  }
  const [text] = decodeAbiParameters([{ type: "string" }], value);
  if (text.length > 0) records.text.push({ key: descriptor.key, value: text });
}
