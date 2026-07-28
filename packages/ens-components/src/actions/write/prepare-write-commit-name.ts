import { err, ok, type Result } from "neverthrow";
import { encodeFunctionData, type Address, type ContractFunctionParameters, type Hex } from "viem";

import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import type {
  MakeNameCommitmentError,
  MakeNameCommitmentParameters,
} from "#/lib/make-name-commitment";
import { makeNameCommitment } from "#/lib/make-name-commitment";
import type { ParseNameInputError } from "#/lib/parse-name-input";

export type PrepareCommitNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export interface PrepareCommitNameWriteParameters extends MakeNameCommitmentParameters {
  readonly account: Address;
  readonly registrarAddress: Address;
}

type CommitNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "commit",
  readonly [Hex]
>;

export interface CommitNameWriteMetadata {
  readonly commitment: Hex;
  readonly label: string;
}

export type PreparedCommitNameWrite = PreparedContractWrite<
  CommitNameRequest,
  "commit-name",
  CommitNameWriteMetadata
>;

/** Validates and prepares an ENS v2 `.eth` commitment write. */
export function prepareCommitNameWrite(
  parameters: PrepareCommitNameWriteParameters,
): Result<PreparedCommitNameWrite, PrepareCommitNameWriteError | ParseNameInputError> {
  if (!isNonZeroAddress(parameters.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }
  if (!isNonZeroAddress(parameters.registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  const commitment = makeNameCommitment(parameters);
  if (commitment.isErr()) return err(commitment.error);

  const request = {
    address: parameters.registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "commit",
    args: [commitment.value.commitment],
  } as const satisfies CommitNameRequest;

  return ok({
    account: parameters.account,
    call: {
      data: encodeFunctionData(request),
      to: parameters.registrarAddress,
      value: 0n,
    },
    kind: "commit-name",
    metadata: commitment.value,
    request,
  });
}
