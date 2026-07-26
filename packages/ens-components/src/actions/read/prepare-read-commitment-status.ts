import type {
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";
import {
  isHex,
  size,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";

import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";

export type PrepareCommitmentStatusReadError =
  | "INVALID_COMMITMENT"
  | "INVALID_REGISTRAR_ADDRESS";

export interface PrepareCommitmentStatusReadProps {
  readonly commitment: Hex;
  readonly network: EnsNetwork;
  readonly registrarAddress: Address;
}

type CommitmentAtRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "commitmentAt",
  readonly [Hex]
>;

type CommitmentAgeRequest<
  TFunctionName extends "MAX_COMMITMENT_AGE" | "MIN_COMMITMENT_AGE",
> = ContractFunctionParameters<typeof ethRegistrarAbi, "view", TFunctionName>;

type PreparedCommitmentAtRead = PreparedContractRead<
  CommitmentAtRequest,
  bigint,
  "commitment-submitted-at",
  { readonly commitment: Hex }
>;

type PreparedMinimumCommitmentAgeRead = PreparedContractRead<
  CommitmentAgeRequest<"MIN_COMMITMENT_AGE">,
  bigint,
  "minimum-commitment-age",
  Record<string, never>
>;

type PreparedMaximumCommitmentAgeRead = PreparedContractRead<
  CommitmentAgeRequest<"MAX_COMMITMENT_AGE">,
  bigint,
  "maximum-commitment-age",
  Record<string, never>
>;

export interface CommitmentTiming {
  readonly maximumAge: bigint;
  readonly minimumAge: bigint;
  readonly submittedAt: bigint;
}

export type PreparedCommitmentStatusRead = PreparedContractReadPlan<
  readonly [
    PreparedCommitmentAtRead,
    PreparedMinimumCommitmentAgeRead,
    PreparedMaximumCommitmentAgeRead,
  ],
  CommitmentTiming,
  "CONTRACT_READ_FAILED",
  "commitment-status"
>;

/** Validates and prepares the reads required to evaluate a commitment window. */
export function prepareCommitmentStatusRead(
  props: PrepareCommitmentStatusReadProps,
): Result<PreparedCommitmentStatusRead, PrepareCommitmentStatusReadError> {
  if (!isHex(props.commitment) || size(props.commitment) !== 32) {
    return err("INVALID_COMMITMENT");
  }
  if (!isNonZeroAddress(props.registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  return ok({
    kind: "commitment-status",
    reads: [
      {
        kind: "commitment-submitted-at",
        metadata: { commitment: props.commitment },
        request: {
          address: props.registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "commitmentAt",
          args: [props.commitment],
        },
      },
      {
        kind: "minimum-commitment-age",
        metadata: {},
        request: {
          address: props.registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "MIN_COMMITMENT_AGE",
        },
      },
      {
        kind: "maximum-commitment-age",
        metadata: {},
        request: {
          address: props.registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "MAX_COMMITMENT_AGE",
        },
      },
    ],
    select: ([submittedAt, minimumAge, maximumAge]) => {
      if (
        submittedAt.status === "failure" ||
        minimumAge.status === "failure" ||
        maximumAge.status === "failure"
      ) {
        return err("CONTRACT_READ_FAILED");
      }
      return ok({
        maximumAge: maximumAge.result,
        minimumAge: minimumAge.result,
        submittedAt: submittedAt.result,
      });
    },
  });
}
