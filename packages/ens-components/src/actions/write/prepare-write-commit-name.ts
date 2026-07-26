import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import type {
  MakeNameCommitmentError,
  MakeNameCommitmentProps,
} from "#/lib/make-name-commitment";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";

import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import { makeNameCommitment } from "#/lib/make-name-commitment";

export type PrepareCommitNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export interface PrepareCommitNameWriteProps extends MakeNameCommitmentProps {
  readonly account: Address;
  readonly network: EnsNetwork;
  readonly registrarAddress: Address;
}

type CommitNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "commit",
  readonly [Hex]
>;

export interface PrepareCommitNameWriteMetadata {
  readonly commitment: Hex;
  readonly label: string;
}

export type PreparedCommitNameWrite = PreparedContractWrite<
  CommitNameRequest,
  "commit-name",
  PrepareCommitNameWriteMetadata
>;

/** Validates and prepares an ENS v2 `.eth` commitment write. */
export function prepareCommitNameWrite(
  props: PrepareCommitNameWriteProps,
): Result<
  PreparedCommitNameWrite,
  PrepareCommitNameWriteError | ParseNameInputError
> {
  if (!isNonZeroAddress(props.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }
  if (!isNonZeroAddress(props.registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  const commitment = makeNameCommitment(props);
  if (commitment.isErr()) return err(commitment.error);

  const request = {
    address: props.registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "commit",
    args: [commitment.value.commitment],
  } as const satisfies CommitNameRequest;

  return ok({
    account: props.account,
    call: {
      data: encodeFunctionData(request),
      to: props.registrarAddress,
      value: 0n,
    },
    kind: "commit-name",
    metadata: commitment.value,
    request,
  });
}
