import { err, ok, type Result } from "neverthrow";
import { bytesToHex, keccak256, toBytes, type Hex } from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/lib/parse-name-input";

export type CreateResolverSaltError = "UNSUPPORTED_NAME";

export interface CreateResolverSaltProps {
  /** Label or ENS name used to scope the random resolver salt. */
  readonly input: string | null | undefined;
}

export interface CreateResolverSaltResult {
  readonly normalizedName: string;
  readonly salt: Hex;
}

/**
 * Creates a cryptographically random, name-scoped resolver deployment salt.
 *
 * The returned bytes32 value is JSON-safe and should be persisted before
 * submitting a resolver deployment.
 */
export function createResolverSalt(
  props: CreateResolverSaltProps,
): Result<
  CreateResolverSaltResult,
  CreateResolverSaltError | ParseNameInputError
> {
  const parsedInput = parseNameInput(props.input);

  if (parsedInput.isErr()) {
    return err(parsedInput.error);
  }

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  const random = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
  const normalizedName = parsedInput.value.normalizedName;

  return ok({
    normalizedName,
    salt: keccak256(toBytes(`${normalizedName}:${random}`)),
  });
}
