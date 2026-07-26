import { bytesToHex, isHex, size, type Hex } from "viem";

export function createRandomBytes32(): Hex {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
}

export function areHexValuesEqual(left: Hex, right: Hex): boolean {
  return left.toLowerCase() === right.toLowerCase();
}

export function isBytes32(value: Hex): boolean {
  return isHex(value) && size(value) === 32;
}
