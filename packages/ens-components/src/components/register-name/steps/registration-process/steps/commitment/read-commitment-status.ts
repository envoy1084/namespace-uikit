import type { Address, Hex, PublicClient } from "viem";

import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync } from "neverthrow";

import {
  executeContractReads,
  prepareCommitmentStatusRead,
  type PrepareCommitmentStatusReadError,
} from "#/actions";

export type CommitmentState = "EXPIRED" | "NOT_FOUND" | "READY" | "WAITING";

export interface CommitmentStatus {
  readonly currentTime: bigint;
  readonly remainingSeconds: bigint;
  readonly state: CommitmentState;
  readonly submittedAt: bigint;
  readonly validFrom: bigint;
  readonly validUntil: bigint;
}

export interface ReadCommitmentStatusProps {
  readonly commitment: Hex;
  readonly network: EnsNetwork;
  readonly registrarAddress: Address;
}

export type ReadCommitmentStatusError =
  | "CONTRACT_READ_FAILED"
  | PrepareCommitmentStatusReadError;

export function readCommitmentStatus(
  publicClient: PublicClient,
  props: ReadCommitmentStatusProps,
): ResultAsync<CommitmentStatus, ReadCommitmentStatusError> {
  const prepared = prepareCommitmentStatusRead(props);
  if (prepared.isErr()) return errAsync(prepared.error);

  return ResultAsync.fromPromise(
    Promise.all([
      executeContractReads(publicClient, prepared.value),
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
