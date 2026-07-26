import { getAddress, slice, type Address, type Hex } from "viem";

export function decodeReferrerAddress(referrer: Hex): Address | undefined {
  try {
    return getAddress(slice(referrer, 12));
  } catch {
    return undefined;
  }
}
