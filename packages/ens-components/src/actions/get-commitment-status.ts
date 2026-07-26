import type {
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/contract-reads";
import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync, type Result } from "neverthrow";
import {
  isAddress,
  isHex,
  size,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type Hex,
  type PublicClient,
} from "viem";

import { executeContractReadPlan } from "#/actions/contract-reads";
import { ethRegistrarAbi } from "#/data/abi";

export type CommitmentState = "EXPIRED" | "NOT_FOUND" | "READY" | "WAITING";

export type GetCommitmentStatusError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_COMMITMENT"
  | "INVALID_REGISTRAR_ADDRESS";

export interface GetCommitmentStatusProps {
  /** Commitment hash previously submitted to the registrar. */
  readonly commitment: Hex;
  /** Network associated with the supplied registrar address. */
  readonly network: EnsNetwork;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

export interface CommitmentStatus {
  /** Timestamp of the block used to evaluate the commitment. */
  readonly currentTime: bigint;
  /** Seconds remaining before the commitment can be revealed. */
  readonly remainingSeconds: bigint;
  /** Current on-chain commitment state. */
  readonly state: CommitmentState;
  /** Timestamp at which the commitment was recorded, or zero if absent. */
  readonly submittedAt: bigint;
  /** First timestamp at which registration is allowed. */
  readonly validFrom: bigint;
  /** Timestamp at which the commitment expires. */
  readonly validUntil: bigint;
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

interface CommitmentTiming {
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

export function prepareCommitmentStatusRead(
  props: GetCommitmentStatusProps,
): Result<PreparedCommitmentStatusRead, GetCommitmentStatusError> {
  const { commitment, registrarAddress } = props;
  if (!isHex(commitment) || size(commitment) !== 32) {
    return err("INVALID_COMMITMENT");
  }
  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  return ok({
    kind: "commitment-status",
    reads: [
      {
        kind: "commitment-submitted-at",
        metadata: { commitment },
        request: {
          address: registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "commitmentAt",
          args: [commitment],
        },
      },
      {
        kind: "minimum-commitment-age",
        metadata: {},
        request: {
          address: registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "MIN_COMMITMENT_AGE",
        },
      },
      {
        kind: "maximum-commitment-age",
        metadata: {},
        request: {
          address: registrarAddress,
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

/**
 * Reads and evaluates an ENSv2 commitment against the registrar's configured
 * minimum and maximum commitment ages.
 */
export function getCommitmentStatus(
  publicClient: PublicClient,
  props: GetCommitmentStatusProps,
): ResultAsync<CommitmentStatus, GetCommitmentStatusError> {
  const prepared = prepareCommitmentStatusRead(props);
  if (prepared.isErr()) return errAsync(prepared.error);

  return ResultAsync.fromPromise(
    Promise.all([
      executeContractReadPlan(publicClient, prepared.value),
      publicClient.getBlock(),
    ]),
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(([timing, block]) => {
    if (timing.isErr()) return err(timing.error);

    const submittedAt = timing.value.submittedAt;
    const validFrom = submittedAt + timing.value.minimumAge;
    const validUntil = submittedAt + timing.value.maximumAge;
    const currentTime = block.timestamp;

    if (submittedAt === 0n) {
      return ok({
        currentTime,
        remainingSeconds: 0n,
        state: "NOT_FOUND" as const,
        submittedAt,
        validFrom: 0n,
        validUntil: 0n,
      });
    }

    if (currentTime < validFrom) {
      return ok({
        currentTime,
        remainingSeconds: validFrom - currentTime,
        state: "WAITING" as const,
        submittedAt,
        validFrom,
        validUntil,
      });
    }

    if (currentTime >= validUntil) {
      return ok({
        currentTime,
        remainingSeconds: 0n,
        state: "EXPIRED" as const,
        submittedAt,
        validFrom,
        validUntil,
      });
    }

    return ok({
      currentTime,
      remainingSeconds: 0n,
      state: "READY" as const,
      submittedAt,
      validFrom,
      validUntil,
    });
  });
}
