import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync } from "neverthrow";
import {
  isAddress,
  isHex,
  size,
  zeroAddress,
  type Address,
  type Hex,
  type PublicClient,
} from "viem";

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

/**
 * Reads and evaluates an ENSv2 commitment against the registrar's configured
 * minimum and maximum commitment ages.
 */
export function getCommitmentStatus(
  publicClient: PublicClient,
  props: GetCommitmentStatusProps,
): ResultAsync<CommitmentStatus, GetCommitmentStatusError> {
  const { commitment, registrarAddress } = props;

  if (!isHex(commitment) || size(commitment) !== 32) {
    return errAsync("INVALID_COMMITMENT");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  return ResultAsync.fromPromise(
    Promise.all([
      publicClient.multicall({
        allowFailure: true,
        contracts: [
          {
            address: registrarAddress,
            abi: ethRegistrarAbi,
            functionName: "commitmentAt",
            args: [commitment],
          },
          {
            address: registrarAddress,
            abi: ethRegistrarAbi,
            functionName: "MIN_COMMITMENT_AGE",
          },
          {
            address: registrarAddress,
            abi: ethRegistrarAbi,
            functionName: "MAX_COMMITMENT_AGE",
          },
        ],
      }),
      publicClient.getBlock(),
    ]),
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(([reads, block]) => {
    const [submittedAtResult, minimumAgeResult, maximumAgeResult] = reads;

    if (
      submittedAtResult.status === "failure" ||
      minimumAgeResult.status === "failure" ||
      maximumAgeResult.status === "failure"
    ) {
      return err("CONTRACT_READ_FAILED" as const);
    }

    const submittedAt = submittedAtResult.result;
    const validFrom = submittedAt + minimumAgeResult.result;
    const validUntil = submittedAt + maximumAgeResult.result;
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
