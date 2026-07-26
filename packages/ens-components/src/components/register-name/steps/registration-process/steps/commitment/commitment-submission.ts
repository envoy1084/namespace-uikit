import type { EnsNetwork } from "#/data";
import type {
  RegistrationAttemptSubmission,
  StoredRegistrationAttempt,
} from "#/hooks/use-registration-attempts";

import { err, ok, type Result } from "neverthrow";
import {
  type Chain,
  type Hex,
  type PublicClient,
  type TransactionReceipt,
  type WalletClient,
} from "viem";

import {
  commitName,
  deployPermissionedResolver,
  deployResolverAndCommitName,
  getPermissionedResolverStatus,
  supportsAtomicBatchCalls,
  waitForAtomicBatch,
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

async function waitForSuccessfulReceipt(
  publicClient: PublicClient,
  transactionHash: Hex,
): Promise<Result<TransactionReceipt, string>> {
  try {
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });

    return receipt.status === "success"
      ? ok(receipt)
      : err("TRANSACTION_REVERTED");
  } catch {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }
}

async function submitCommitmentOnly(
  props: SubmitRegistrationAttemptProps,
  resolverTransactionHash?: Hex,
): Promise<Result<CommitmentSubmissionSuccess, unknown>> {
  const commitProps = getAttemptCommitNameProps(props.attempt, props.network);
  if (commitProps === undefined) return err("INVALID_DURATION");

  await props.onProgress({ phase: "commitment", state: "signing" });
  const commitment = await commitName(props.walletClient, commitProps);
  if (commitment.isErr()) return err(commitment.error);

  props.onSubmissionChange({
    ...(resolverTransactionHash === undefined
      ? {}
      : { resolverTransactionHash }),
    transactionHash: commitment.value.transactionHash,
    type: "commitment-pending",
  });
  await props.onProgress({
    hash: commitment.value.transactionHash,
    phase: "commitment",
    state: "confirming",
  });

  const receipt = await waitForSuccessfulReceipt(
    props.publicClient,
    commitment.value.transactionHash,
  );
  if (receipt.isErr()) {
    if (receipt.error === "TRANSACTION_REVERTED") {
      props.onSubmissionChange(
        resolverTransactionHash === undefined
          ? { type: "prepared" }
          : {
              transactionHash: resolverTransactionHash,
              type: "resolver-confirmed",
            },
      );
    }
    return err(receipt.error);
  }

  const confirmedAt = Date.now();

  props.onSubmissionChange({
    confirmedAt,
    ...(resolverTransactionHash === undefined
      ? {}
      : { resolverTransactionHash }),
    transactionHash: commitment.value.transactionHash,
    type: "confirmed",
  });
  await props.onProgress({
    hash: commitment.value.transactionHash,
    phase: "commitment",
    state: "confirmed",
  });

  return ok({
    commitmentReceipt: receipt.value,
    confirmedAt,
    ...(resolverTransactionHash === undefined
      ? {}
      : { resolverTransactionHash }),
    transactionHash: commitment.value.transactionHash,
  });
}

async function submitSequentially(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<CommitmentSubmissionSuccess, unknown>> {
  const resolver = props.attempt.resolver;
  if (resolver.type !== "dedicated") return err("INVALID_RESOLVER_ADDRESS");

  await props.onProgress({ phase: "resolver", state: "signing" });
  const deployment = await deployPermissionedResolver(props.walletClient, {
    account: props.attempt.account,
    factoryAddress: resolver.factoryAddress,
    implementationAddress: resolver.implementationAddress,
    initData: resolver.initData,
    network: props.network,
    salt: resolver.salt,
  });
  if (deployment.isErr()) return err(deployment.error);

  props.onSubmissionChange({
    transactionHash: deployment.value,
    type: "resolver-pending",
  });
  await props.onProgress({
    hash: deployment.value,
    phase: "resolver",
    state: "confirming",
  });

  const receipt = await waitForSuccessfulReceipt(
    props.publicClient,
    deployment.value,
  );
  if (receipt.isErr()) {
    if (receipt.error === "TRANSACTION_REVERTED") {
      props.onSubmissionChange({ type: "prepared" });
    }
    return err(receipt.error);
  }

  const resolverStatus = await getPermissionedResolverStatus(
    props.publicClient,
    {
      factoryAddress: resolver.factoryAddress,
      implementationAddress: resolver.implementationAddress,
      network: props.network,
      resolverAddress: resolver.address,
    },
  );
  if (resolverStatus.isErr()) return err(resolverStatus.error);
  if (resolverStatus.value !== "VERIFIED") {
    return err("RESOLVER_DEPLOYMENT_INVALID");
  }

  props.onSubmissionChange({
    transactionHash: deployment.value,
    type: "resolver-confirmed",
  });
  await props.onProgress({
    hash: deployment.value,
    phase: "resolver",
    state: "confirmed",
  });

  const commitment = await submitCommitmentOnly(props, deployment.value);
  if (commitment.isErr()) return commitment;

  return ok({
    ...commitment.value,
    resolverReceipt: receipt.value,
    resolverTransactionHash: deployment.value,
  });
}

async function submitAtomically(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<CommitmentSubmissionSuccess, unknown>> {
  const resolver = props.attempt.resolver;
  const commitProps = getAttemptCommitNameProps(props.attempt, props.network);
  if (resolver.type !== "dedicated") return err("INVALID_RESOLVER_ADDRESS");
  if (commitProps === undefined) return err("INVALID_DURATION");

  await props.onProgress({ phase: "commitment", state: "signing" });
  const submission = await deployResolverAndCommitName(props.walletClient, {
    ...commitProps,
    chain: props.chain,
    deploymentCall: {
      data: resolver.deploymentData,
      to: resolver.factoryAddress,
      value: 0n,
    },
  });
  if (submission.isErr()) return err(submission.error);

  props.onSubmissionChange({
    callsId: submission.value.callsId,
    type: "atomic-pending",
  });
  await props.onProgress({ phase: "commitment", state: "confirming" });

  const batch = await waitForAtomicBatch(props.walletClient, {
    callsId: submission.value.callsId,
    timeout: 120_000,
  });
  if (batch.isErr()) return err(batch.error);
  if (batch.value.state !== "SUCCESS") {
    props.onSubmissionChange({ type: "prepared" });
    return err("ATOMIC_BATCH_FAILED");
  }

  const transactionHash = batch.value.transactionHashes.at(-1);
  const receipt =
    transactionHash === undefined
      ? undefined
      : await waitForSuccessfulReceipt(props.publicClient, transactionHash);
  if (receipt?.isErr()) return err(receipt.error);

  const confirmedAt = Date.now();

  props.onSubmissionChange({
    callsId: submission.value.callsId,
    confirmedAt,
    ...(transactionHash === undefined ? {} : { transactionHash }),
    type: "confirmed",
  });
  await props.onProgress({
    ...(transactionHash === undefined ? {} : { hash: transactionHash }),
    phase: "commitment",
    state: "confirmed",
  });

  return ok({
    callsId: submission.value.callsId,
    ...(receipt?.isOk() ? { commitmentReceipt: receipt.value } : {}),
    confirmedAt,
    ...(receipt?.isOk() ? { resolverReceipt: receipt.value } : {}),
    ...(transactionHash === undefined
      ? {}
      : { resolverTransactionHash: transactionHash }),
    ...(transactionHash === undefined ? {} : { transactionHash }),
  });
}

export async function submitRegistrationAttempt(
  props: SubmitRegistrationAttemptProps,
): Promise<Result<CommitmentSubmissionSuccess, unknown>> {
  if (props.attempt.resolver.type === "custom") {
    return submitCommitmentOnly(props);
  }

  const resolver = props.attempt.resolver;
  const status = await getPermissionedResolverStatus(props.publicClient, {
    factoryAddress: resolver.factoryAddress,
    implementationAddress: resolver.implementationAddress,
    network: props.network,
    resolverAddress: resolver.address,
  });

  if (status.isErr()) return err(status.error);
  if (status.value === "INVALID") return err("RESOLVER_DEPLOYMENT_INVALID");
  if (status.value === "VERIFIED") {
    const resolverHash =
      props.attempt.submission.type === "resolver-confirmed"
        ? props.attempt.submission.transactionHash
        : undefined;
    return submitCommitmentOnly(props, resolverHash);
  }

  const capability = await supportsAtomicBatchCalls(props.walletClient, {
    account: props.attempt.account,
    chainId: props.chain.id,
  });

  return capability.isOk() && capability.value
    ? submitAtomically(props)
    : submitSequentially(props);
}
