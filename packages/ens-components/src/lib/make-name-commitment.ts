import { err, ok, type Result } from "neverthrow";
import { encodeAbiParameters, isAddress, keccak256, type Address, type Hex } from "viem";

import { isBytes32, isNonZeroAddress, isUint64Duration } from "#/lib/helpers";
import { parseNameInput, type ParseNameInputError } from "#/lib/parse-name-input";

export type MakeNameCommitmentError =
  | "INVALID_DURATION"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_REFERRER"
  | "INVALID_RESOLVER_ADDRESS"
  | "INVALID_SECRET"
  | "INVALID_SUBREGISTRY_ADDRESS"
  | "LABEL_TOO_SHORT"
  | "UNSUPPORTED_NAME";

export interface MakeNameCommitmentParameters {
  readonly duration: bigint;
  readonly input: string | null | undefined;
  readonly owner: Address;
  readonly referrer: Hex;
  readonly resolverAddress: Address;
  readonly secret: Hex;
  readonly subregistryAddress: Address;
}

export interface MakeNameCommitmentResult {
  readonly commitment: Hex;
  readonly label: string;
}

/** Builds the commitment hash used by the ENSv2 ETHRegistrar. */
export function makeNameCommitment(
  parameters: MakeNameCommitmentParameters,
): Result<MakeNameCommitmentResult, MakeNameCommitmentError | ParseNameInputError> {
  const parsedInput = parseNameInput(parameters.input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }
  if ([...parsedInput.value.label].length < 3) {
    return err("LABEL_TOO_SHORT");
  }
  if (!isNonZeroAddress(parameters.owner)) {
    return err("INVALID_OWNER_ADDRESS");
  }
  if (!isAddress(parameters.resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }
  if (!isAddress(parameters.subregistryAddress)) {
    return err("INVALID_SUBREGISTRY_ADDRESS");
  }
  if (!isUint64Duration(parameters.duration)) {
    return err("INVALID_DURATION");
  }
  if (!isBytes32(parameters.secret)) return err("INVALID_SECRET");
  if (!isBytes32(parameters.referrer)) return err("INVALID_REFERRER");

  return ok({
    commitment: keccak256(
      encodeAbiParameters(
        [
          { type: "string" },
          { type: "address" },
          { type: "bytes32" },
          { type: "address" },
          { type: "address" },
          { type: "uint64" },
          { type: "bytes32" },
        ],
        [
          parsedInput.value.label,
          parameters.owner,
          parameters.secret,
          parameters.subregistryAddress,
          parameters.resolverAddress,
          parameters.duration,
          parameters.referrer,
        ],
      ),
    ),
    label: parsedInput.value.label,
  });
}
