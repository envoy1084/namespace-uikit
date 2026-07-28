import { BaseError, UserRejectedRequestError } from "viem";

function isRejectedError(error: unknown): boolean {
  if (error instanceof UserRejectedRequestError) return true;
  if (typeof error !== "object" || error === null) return false;

  const value = error as {
    code?: unknown;
    name?: unknown;
  };

  return (
    value.code === 4001 ||
    value.code === "ACTION_REJECTED" ||
    value.name === "UserRejectedRequestError"
  );
}

/** Detects EIP-1193 and viem user-rejection errors through wrapped causes. */
export function isWalletUserRejectedError(error: unknown): boolean {
  if (error instanceof BaseError && error.walk(isRejectedError) !== null) {
    return true;
  }

  let current: unknown = error;
  const visited = new Set<unknown>();

  while (current !== undefined && current !== null && !visited.has(current)) {
    if (isRejectedError(current)) return true;
    visited.add(current);

    current =
      typeof current === "object" && "cause" in current
        ? (current as { cause?: unknown }).cause
        : undefined;
  }

  return false;
}
