import { err, ok, type Result } from "neverthrow";
import { type PublicClient, type WalletClient } from "viem";

import { waitForContractCalls } from "#/actions";
import type {
  RegistrationAttemptSubmission,
  RegistrationAttemptUpdate,
  StoredRegistrationAttempt,
} from "#/components/name-registration/hooks/use-registration-attempts";
import {
  readCommitmentStatus,
  type CommitmentStatus,
} from "#/components/name-registration/steps/registration-process/steps/commitment/read-commitment-status";
import { readPermissionedResolverStatus } from "#/components/name-registration/steps/registration-process/steps/commitment/read-resolver-status";
import { renewRegistrationAttempt } from "#/components/name-registration/steps/registration-process/steps/commitment/registration-attempt";
import type { EnsNetwork } from "#/data";
import { waitForSuccessfulTransactionReceipt } from "#/lib/helpers";

export type RegistrationAttemptReconciliation =
  | {
      confirmedAt: number;
      state: "CONFIRMED";
    }
  | {
      state: "PENDING";
    }
  | {
      state: "READY";
      updates?: RegistrationAttemptUpdate;
    };

export interface ReconcileRegistrationAttemptParameters {
  attempt: StoredRegistrationAttempt;
  network: EnsNetwork;
  publicClient: PublicClient;
  walletClient?: WalletClient;
  onUpdate: (updates: RegistrationAttemptUpdate) => void;
}

function getConfirmedSubmission(
  submission: RegistrationAttemptSubmission,
  confirmedAt: number,
): RegistrationAttemptSubmission {
  if (submission.type === "atomic-pending") {
    return {
      callsId: submission.callsId,
      confirmedAt,
      type: "confirmed",
    };
  }

  if (submission.type === "commitment-pending") {
    return {
      confirmedAt,
      ...(submission.resolverTransactionHash === undefined
        ? {}
        : { resolverTransactionHash: submission.resolverTransactionHash }),
      transactionHash: submission.transactionHash,
      type: "confirmed",
    };
  }

  if (submission.type === "confirmed") {
    return { ...submission, confirmedAt };
  }

  return {
    confirmedAt,
    type: "confirmed",
  };
}

async function readCommitment(
  props: ReconcileRegistrationAttemptParameters,
): Promise<Result<CommitmentStatus, unknown>> {
  const status = await readCommitmentStatus(props.publicClient, {
    commitment: props.attempt.commitment,
    network: props.network,
    registrarAddress: props.attempt.registrarAddress,
  });

  return status.isErr() ? err(status.error) : ok(status.value);
}

async function reconcileResolver(
  props: ReconcileRegistrationAttemptParameters,
): Promise<Result<RegistrationAttemptReconciliation, unknown>> {
  const { attempt } = props;
  if (attempt.resolver.type !== "dedicated" || attempt.submission.type !== "resolver-pending") {
    return ok({ state: "READY" });
  }

  const receipt = await waitForSuccessfulTransactionReceipt(props.publicClient, {
    transactionHash: attempt.submission.transactionHash,
  });
  if (receipt.isErr()) {
    if (receipt.error === "TRANSACTION_REVERTED") {
      props.onUpdate({ submission: { type: "prepared" } });
    }
    return err(receipt.error);
  }

  const status = await readPermissionedResolverStatus(props.publicClient, {
    factoryAddress: attempt.resolver.factoryAddress,
    implementationAddress: attempt.resolver.implementationAddress,
    network: props.network,
    resolverAddress: attempt.resolver.address,
  });
  if (status.isErr()) return err(status.error);
  if (status.value !== "VERIFIED") return err("RESOLVER_DEPLOYMENT_INVALID");

  const updates = {
    submission: {
      transactionHash: attempt.submission.transactionHash,
      type: "resolver-confirmed",
    },
  } as const satisfies RegistrationAttemptUpdate;
  props.onUpdate(updates);
  return ok({ state: "READY", updates });
}

async function reconcileAtomicBatch(
  props: ReconcileRegistrationAttemptParameters,
): Promise<Result<RegistrationAttemptReconciliation, unknown>> {
  if (props.attempt.submission.type !== "atomic-pending" || props.walletClient === undefined) {
    return ok({ state: "PENDING" });
  }

  const batch = await waitForContractCalls(props.walletClient, {
    callsId: props.attempt.submission.callsId,
    timeout: 120_000,
  });
  if (batch.isErr()) return err(batch.error);
  if (batch.value.state === "PENDING") return ok({ state: "PENDING" });

  if (batch.value.state !== "SUCCESS") {
    props.onUpdate({ submission: { type: "prepared" } });
    return err("ATOMIC_BATCH_FAILED");
  }

  const commitment = await readCommitment(props);
  if (commitment.isErr()) return err(commitment.error);
  if (commitment.value.state === "NOT_FOUND" || commitment.value.state === "EXPIRED") {
    return err("COMMITMENT_NOT_FOUND");
  }

  const confirmedAt = Number(commitment.value.submittedAt) * 1_000;
  const transactionHash = batch.value.transactionHashes.at(-1);
  props.onUpdate({
    submission: {
      callsId: props.attempt.submission.callsId,
      confirmedAt,
      ...(transactionHash === undefined ? {} : { transactionHash }),
      type: "confirmed",
    },
  });
  return ok({ confirmedAt, state: "CONFIRMED" });
}

export async function reconcileRegistrationAttempt(
  props: ReconcileRegistrationAttemptParameters,
): Promise<Result<RegistrationAttemptReconciliation, unknown>> {
  const commitment = await readCommitment(props);
  if (commitment.isErr()) return err(commitment.error);

  if (commitment.value.state === "WAITING" || commitment.value.state === "READY") {
    const confirmedAt = Number(commitment.value.submittedAt) * 1_000;
    props.onUpdate({
      submission: getConfirmedSubmission(props.attempt.submission, confirmedAt),
    });
    return ok({ confirmedAt, state: "CONFIRMED" });
  }

  if (commitment.value.state === "EXPIRED" || props.attempt.submission.type === "confirmed") {
    const renewal = renewRegistrationAttempt(props.attempt);
    if (renewal.isErr()) return err(renewal.error);

    props.onUpdate(renewal.value);
    return ok({ state: "READY", updates: renewal.value });
  }

  if (props.attempt.submission.type === "atomic-pending") {
    return reconcileAtomicBatch(props);
  }

  if (props.attempt.submission.type === "commitment-pending") {
    const receipt = await waitForSuccessfulTransactionReceipt(props.publicClient, {
      transactionHash: props.attempt.submission.transactionHash,
    });
    if (receipt.isErr()) {
      if (receipt.error === "TRANSACTION_REVERTED") {
        const resolverTransactionHash = props.attempt.submission.resolverTransactionHash;
        props.onUpdate({
          submission:
            resolverTransactionHash === undefined
              ? { type: "prepared" }
              : {
                  transactionHash: resolverTransactionHash,
                  type: "resolver-confirmed",
                },
        });
      }
      return err(receipt.error);
    }

    const refreshedCommitment = await readCommitment(props);
    if (refreshedCommitment.isErr()) return err(refreshedCommitment.error);
    if (
      refreshedCommitment.value.state === "NOT_FOUND" ||
      refreshedCommitment.value.state === "EXPIRED"
    ) {
      return err("COMMITMENT_NOT_FOUND");
    }

    const confirmedAt = Number(refreshedCommitment.value.submittedAt) * 1_000;
    props.onUpdate({
      submission: getConfirmedSubmission(props.attempt.submission, confirmedAt),
    });
    return ok({ confirmedAt, state: "CONFIRMED" });
  }

  return reconcileResolver(props);
}
