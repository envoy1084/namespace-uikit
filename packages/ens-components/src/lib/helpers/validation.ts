import { isAddress, isAddressEqual, zeroAddress, type Address } from "viem";

export const MAX_UINT64 = (1n << 64n) - 1n;

export function isNonZeroAddress(value: string): value is Address {
  return isAddress(value) && !isAddressEqual(value, zeroAddress);
}

export function isUint64Duration(value: bigint): boolean {
  return value > 0n && value <= MAX_UINT64;
}
