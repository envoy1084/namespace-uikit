import { err, ok, type Result } from "neverthrow";
import { isHex, size, zeroHash } from "viem";

import type { NameProfilePublicKeyRecord } from "#/components/name-profile-editor/types";

export type NormalizeProfilePublicKeyError =
  | "INVALID_PUBLIC_KEY_X"
  | "INVALID_PUBLIC_KEY_Y"
  | "MISSING_PUBLIC_KEY_X"
  | "MISSING_PUBLIC_KEY_Y";

function isBytes32(value: string): value is `0x${string}` {
  return isHex(value, { strict: true }) && size(value) === 32;
}

export function normalizeProfilePublicKey(
  pubkey: NameProfilePublicKeyRecord,
): Result<NameProfilePublicKeyRecord, NormalizeProfilePublicKeyError> {
  const inputX = pubkey.x.trim();
  const inputY = pubkey.y.trim();

  if (inputX.length === 0 && inputY.length === 0) {
    return ok({ x: "", y: "" });
  }
  if (inputX.length === 0) return err("MISSING_PUBLIC_KEY_X");
  if (!isBytes32(inputX)) return err("INVALID_PUBLIC_KEY_X");
  if (inputY.length === 0) return err("MISSING_PUBLIC_KEY_Y");
  if (!isBytes32(inputY)) return err("INVALID_PUBLIC_KEY_Y");

  const x = inputX.toLowerCase();
  const y = inputY.toLowerCase();
  return ok(x === zeroHash && y === zeroHash ? { x: "", y: "" } : { x, y });
}
