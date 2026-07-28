import { getAddress, isAddress, pad, slice, zeroHash, type Address, type Hex } from "viem";

export function decodeReferrerAddress(referrer: Hex): Address | undefined {
  try {
    return getAddress(slice(referrer, 12));
  } catch {
    return undefined;
  }
}

export function formatReferrerAddressInput(referrer: Hex): string {
  if (referrer === zeroHash) return "";
  return decodeReferrerAddress(referrer) ?? "";
}

export function encodeReferrerAddressInput(input: string): Hex | undefined {
  const address = input.trim();
  if (address === "") return zeroHash;
  if (!isAddress(address)) return undefined;
  return pad(getAddress(address), { size: 32 });
}
