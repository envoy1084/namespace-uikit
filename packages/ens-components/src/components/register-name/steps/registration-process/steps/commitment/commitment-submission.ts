import type {
  ContractCallProgress,
  ExecuteContractCallsResult,
  PreparedCommitName,
  PreparedContractWrite,
  PreparedPermissionedResolverDeployment,
} from "#/actions";
import type { EnsNetwork } from "#/data";
import type {
  RegistrationAttemptSubmission,
  StoredRegistrationAttempt,
} from "#/hooks/use-registration-attempts";

import { err, ok, type Result } from "neverthrow";
import {
  isAddressEqual,
  type Chain,
  type Hex,
  type PublicClient,
  type TransactionReceipt,
  type WalletClient,
} from "viem";

import {
  executeContractCalls,
  getPermissionedResolverStatus,
  prepareCommitName,
  preparePermissionedResolverDeployment,
} from "#/actions";
import { getAttemptCommitNameProps } from "#/components/register-name/steps/registration-process/steps/commitment/registration-attempt";

export type CommitmentTransactionPhase = "commitment" | "resolver";

export interface CommitmentTransactionProgress {
  hash?: Hex;
  phase: CommitmentTransactionPhase;
  state: "confirmed" | "confirming" | "signing";
}

export interface CommitmentSubmissionSuccess {
  callsId?: string;
  commitmentReceipt?: TransactionReceipt;
  confirmedAt: number;
  resolverReceipt?: TransactionReceipt;
  resolverTransactionHash?: Hex;
  transactionHash?: Hex;
}

export interface SubmitRegistrationAttemptProps {
  attempt: StoredRegistrationAttempt;
  chain: Chain;
  network: EnsNetwork;
  publicClient: PublicClient;
  walletClient: WalletClient;
  onProgress: (progress: CommitmentTransactionProgress) => Promise<void> | void;
  onSubmissionChange: (submission: RegistrationAttemptSubmission) => void;
}

function phaseFor(prepared: PreparedContractWrite): CommitmentTransactionPhase {
  return prepared.kind === "deploy-permissioned-resolver"
    ? "resolver"
    : "commitment";
}

function createProgressHandler(
  props: SubmitRegistrationAttemptProps,
): (progress: ContractCallProgress) => Promise<void> {
  let resolverTransactionHash = getResolverHash(props.attempt);

  return async (progress) => {
    if (progress.strategy === "atomic") {
      if (progress.state === "signing") {
        await props.onProgress({ phase: "commitment", state: "signing" });
        return;
      }

      if (progress.state === "submitted") {
        props.onSubmissionChange({
          callsId: progress.callsId,
          type: "atomic-pending",
        });
        await props.onProgress({ phase: "commitment", state: "confirming" });
        return;
      }

      const transactionHash = progress.transactionHashes.at(-1);
      const confirmedAt = Date.now();
      props.onSubmissionChange({
        callsId: progress.callsId,
        confirmedAt,
        ...(transactionHash === undefined ? {} : { transactionHash }),
        type: "confirmed",
      });
      await props.onProgress({
        ...(transactionHash === undefined ? {} : { hash: transactionHash }),
        phase: "commitment",
        state: "confirmed",
      });
      return;
    }

    const phase = phaseFor(progress.prepared);
    if (progress.state === "signing") {
      await props.onProgress({ phase, state: "signing" });
      return;
    }

    if (progress.state === "submitted") {
      if (phase === "resolver") {
        resolverTransactionHash = progress.transactionHash;
        props.onSubmissionChange({
          transactionHash: progress.transactionHash,
          type: "resolver-pending",
        });
      } else {
        props.onSubmissionChange({
          ...(resolverTransactionHash === undefined
            ? {}
            : { resolverTransactionHash }),
          transactionHash: progress.transactionHash,
          type: "commitment-pending",
        });
      }
      await props.onProgress({
        hash: progress.transactionHash,
        phase,
        state: "confirming",
      });
      return;
    }

    if (phase === "resolver") {
      resolverTransactionHash = progress.transactionHash;
      props.onSubmissionChange({
        transactionHash: progress.transactionHash,
        type: "resolver-confirmed",
      });
    } else {
      const confirmedAt = Date.now();
      props.onSubmissionChange({
        confirmedAt,
        ...(resolverTransactionHash === undefined
          ? {}
          : { resolverTransactionHash }),
        transactionHash: progress.transactionHash,
        type: "confirmed",
      });
    }
    await props.onProgress({
      hash: progress.transactionHash,
      phase,
      state: "confirmed",
    });
  };
}

function getResolverHash(attempt: StoredRegistrationAttempt): Hex | undefined {
  const submission = attempt.submission;
  if (
    submission.type === "resolver-pending" ||
    submission.type === "resolver-confirmed"
  ) {
    return submission.transactionHash;
  }
  if (
    submission.type === "commitment-pending" ||
    submission.type === "confirmed"
  ) {
    return submission.resolverTransactionHash;
  }
  return undefined;
}

function buildSuccess(
  result: ExecuteContractCallsResult,
): CommitmentSubmissionSuccess {
  const confirmedAt = Date.now();
  if (result.strategy === "atomic") {
    const resolverTransactionHash = result.transactionHashes.at(0);
    const transactionHash = result.transactionHashes.at(-1);
    return {
      callsId: result.callsId,
      confirmedAt,
      ...(resolverTransactionHash === undefined
        ? {}
        : { resolverTransactionHash }),
      ...(transactionHash === undefined ? {} : { transactionHash }),
    };
  }

  const resolver = result.transactions.find(
    ({ prepared }) => prepared.kind === "deploy-permissioned-resolver",
  );
  const commitment = result.transactions.find(
    ({ prepared }) => prepared.kind === "commit-name",
  );

  return {
    ...(commitment?.receipt === undefined
      ? {}
      : { commitmentReceipt: commitment.receipt }),
    confirmedAt,
    ...(resolver?.receipt === undefined
      ? {}
      : { resolverReceipt: resolver.receipt }),
    ...(resolver === undefined
      ? {}
      : { resolverTransactionHash: resolver.transactionHash }),
    ...(commitment === undefined
      ? {}
      : { transactionHash: commitment.transactionHash }),
  };
}

async function prepareCommitment(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<PreparedCommitName, unknown>> {
  const commitProps = getAttemptCommitNameProps(props.attempt, props.network);
  if (commitProps === undefined) return err("INVALID_DURATION");
  return prepareCommitName(commitProps);
}

async function prepareResolver(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<PreparedPermissionedResolverDeployment, unknown>> {
  const resolver = props.attempt.resolver;
  if (resolver.type !== "dedicated") return err("INVALID_RESOLVER_ADDRESS");

  const prepared = await preparePermissionedResolverDeployment(
    props.publicClient,
    {
      account: props.attempt.account,
      factoryAddress: resolver.factoryAddress,
      implementationAddress: resolver.implementationAddress,
      network: props.network,
      owner: props.attempt.owner,
      salt: resolver.salt,
    },
  );
  if (prepared.isErr()) return err(prepared.error);
  if (
    !isAddressEqual(prepared.value.metadata.resolverAddress, resolver.address)
  ) {
    return err("INVALID_RESOLVER_ADDRESS");
  }
  return ok(prepared.value);
}

export async function submitRegistrationAttempt(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<CommitmentSubmissionSuccess, unknown>> {
  const commitment = await prepareCommitment(props);
  if (commitment.isErr()) return err(commitment.error);

  let calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]] = [
    commitment.value,
  ];

  if (props.attempt.resolver.type === "dedicated") {
    const resolver = props.attempt.resolver;
    const status = await getPermissionedResolverStatus(props.publicClient, {
      factoryAddress: resolver.factoryAddress,
      implementationAddress: resolver.implementationAddress,
      network: props.network,
      resolverAddress: resolver.address,
    });
    if (status.isErr()) return err(status.error);
    if (status.value === "INVALID") return err("RESOLVER_DEPLOYMENT_INVALID");

    if (status.value === "NOT_DEPLOYED") {
      const deployment = await prepareResolver(props);
      if (deployment.isErr()) return err(deployment.error);
      calls = [deployment.value, commitment.value];
    }
  }

  const result = await executeContractCalls(
    props.walletClient,
    props.publicClient,
    {
      calls,
      chain: props.chain,
      confirmation: "confirmed",
      onProgress: createProgressHandler(props),
      strategy: "auto",
      timeout: 120_000,
    },
  );
  if (result.isErr()) {
    if (
      result.error === "ATOMIC_BATCH_FAILED" ||
      result.error === "TRANSACTION_REVERTED"
    ) {
      props.onSubmissionChange({ type: "prepared" });
    }
    return err(result.error);
  }

  return ok(buildSuccess(result.value));
}
