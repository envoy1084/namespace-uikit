import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import { type Address, type ContractFunctionParameters, type PublicClient } from "viem";

import { executeContractRead, type PreparedContractRead } from "#/actions/read/contract-reads";
import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import { parseNameInput, type ParseNameInputError } from "#/lib/parse-name-input";

export type PrepareNameAvailabilityReadError =
  | "LABEL_TOO_SHORT"
  | "UNSUPPORTED_NAME"
  | "INVALID_REGISTRAR_ADDRESS";

export interface PrepareNameAvailabilityReadParameters {
  /** Label or ENS name to normalize and check. */
  readonly input: string | null | undefined;
  /** ENS v2 ETHRegistrar address. */
  readonly registrarAddress: Address;
}

type NameAvailabilityRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "isAvailable",
  readonly [string]
>;

export interface NameAvailabilityReadMetadata {
  readonly label: string;
  readonly normalizedName: string;
}

export type PreparedNameAvailabilityRead = PreparedContractRead<
  NameAvailabilityRequest,
  boolean,
  "name-availability",
  NameAvailabilityReadMetadata
>;

export type ReadNameAvailabilityParameters = PrepareNameAvailabilityReadParameters;
export type ReadNameAvailabilityReturnType = boolean;
export type ReadNameAvailabilityErrorType =
  | PrepareNameAvailabilityReadError
  | ParseNameInputError
  | "CONTRACT_READ_FAILED";

/**
 * Validates a label or ENS name and prepares its availability read.
 */
export function prepareNameAvailabilityRead(
  parameters: PrepareNameAvailabilityReadParameters,
): Result<PreparedNameAvailabilityRead, PrepareNameAvailabilityReadError | ParseNameInputError> {
  const { input, registrarAddress } = parameters;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) return err(parsedInput.error);

  const parsedName = parsedInput.value;
  if (parsedName.nameLevel !== 2 || parsedName.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  if ([...parsedName.label].length < 3) {
    return err("LABEL_TOO_SHORT");
  }

  if (!isNonZeroAddress(registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  return ok({
    kind: "name-availability",
    metadata: {
      label: parsedName.label,
      normalizedName: parsedName.normalizedName,
    },
    request: {
      address: registrarAddress,
      abi: ethRegistrarAbi,
      functionName: "isAvailable",
      args: [parsedName.label],
    },
  });
}

/** Reads whether a normalized second-level `.eth` name can be registered. */
export function readNameAvailability(
  publicClient: PublicClient,
  parameters: ReadNameAvailabilityParameters,
): ResultAsync<ReadNameAvailabilityReturnType, ReadNameAvailabilityErrorType> {
  const prepared = prepareNameAvailabilityRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractRead(publicClient, prepared.value);
}
