import type {
  Chain,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";

import type {
  ContractWriteProgress,
  PreparedContractWrite,
  RegistrationPaymentStatus,
  SubmittedContractTransaction,
} from "#/actions";
import type { StoredRegistrationAttempt } from "#/components/register-name/hooks/use-registration-attempts";
import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-success";
import type { EnsNetwork, EnsPaymentToken } from "#/data";

import { err, ok, type Result } from "neverthrow";

import { executeContractWrites } from "#/actions";
import { readCommitmentStatus } from "#/components/register-name/steps/registration-process/steps/commitment/read-commitment-status";
import {
  prepareRegistrationPaymentWrites,
  type PreparedRegistrationPaymentWrites,
} from "#/components/register-name/steps/registration-process/steps/registration-payment/registration-payment-writes";
import {
  getTransactionTimestamp,
  parseRegistrationReceipt,
} from "#/lib/helpers";

export interface ConfirmedRegistrationWrite {
  receipt: TransactionReceipt;
  transactionHash: `0x${string}`;
}

export interface RegistrationPaymentSubmissionSuccess {
  addressRecord?: ConfirmedRegistrationWrite;
  approval?: ConfirmedRegistrationWrite;
  details: RegistrationSuccessDetails;
  primaryName?: ConfirmedRegistrationWrite;
  primaryNameError?: unknown;
  primaryNameErrorPhase?: "address-record" | "primary-name";
  registration: ConfirmedRegistrationWrite;
  registrationAmount: bigint;
  registrationDuration: bigint;
  tokenId?: bigint;
}

export interface SubmitRegistrationPaymentProps {
  attempt: StoredRegistrationAttempt;
  chain: Chain;
  network: EnsNetwork;
  payment: RegistrationPaymentStatus;
  paymentToken: EnsPaymentToken;
  publicClient: PublicClient;
  reverseRegistrarAddress: `0x${string}`;
  walletClient: WalletClient;
  onProgress?: (progress: ContractWriteProgress) => Promise<void> | void;
}

function getCommitmentStateError(state: string) {
  return state === "WAITING"
    ? "COMMITMENT_NOT_READY"
    : state === "EXPIRED"
      ? "COMMITMENT_EXPIRED"
      : "COMMITMENT_NOT_FOUND";
}

function findConfirmedWrite(
  transactions: readonly {
    prepared: PreparedContractWrite;
    receipt?: TransactionReceipt;
    transactionHash: `0x${string}`;
  }[],
  kind: string,
): Result<ConfirmedRegistrationWrite, "TRANSACTION_CONFIRMATION_FAILED"> {
  const transaction = transactions.find(
    ({ prepared }) => prepared.kind === kind,
  );
  if (transaction?.receipt === undefined) {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }

  return ok({
    receipt: transaction.receipt,
    transactionHash: transaction.transactionHash,
  });
}

function getConfirmedWrite(
  transactions: readonly SubmittedContractTransaction[],
  kind: string,
): ConfirmedRegistrationWrite | undefined {
  const transaction = transactions.find(
    ({ prepared }) => prepared.kind === kind,
  );
  if (transaction?.receipt === undefined) return undefined;

  return {
    receipt: transaction.receipt,
    transactionHash: transaction.transactionHash,
  };
}

interface BuildRegistrationSuccessProps {
  payment: RegistrationPaymentStatus;
  paymentToken: EnsPaymentToken;
  primaryNameError?: unknown;
  transactions: readonly SubmittedContractTransaction[];
  writes: PreparedRegistrationPaymentWrites;
}

async function buildRegistrationSuccess(
  publicClient: PublicClient,
  props: BuildRegistrationSuccessProps,
): Promise<Result<RegistrationPaymentSubmissionSuccess, unknown>> {
  const { payment, paymentToken, primaryNameError, transactions, writes } =
    props;
  const confirmedRegistration = findConfirmedWrite(
    transactions,
    "register-name",
  );
  if (confirmedRegistration.isErr()) return err(confirmedRegistration.error);

  const registeredAt = await getTransactionTimestamp(
    publicClient,
    confirmedRegistration.value.receipt,
  );
  const registrationDetails = parseRegistrationReceipt({
    fallbackAmount: payment.total,
    fallbackDuration: writes.registration.request.args[5],
    fallbackLabel: writes.registration.metadata.label,
    receipt: confirmedRegistration.value.receipt,
    registrarAddress: writes.registration.request.address,
  });
  const approval = getConfirmedWrite(
    transactions,
    "approve-registration-payment",
  );
  const addressRecord = getConfirmedWrite(transactions, "set-address-record");
  const primaryName = getConfirmedWrite(transactions, "set-primary-name");
  const primaryNameErrorPhase =
    primaryNameError === undefined
      ? undefined
      : addressRecord === undefined
        ? ("address-record" as const)
        : ("primary-name" as const);

  return ok({
    ...(addressRecord === undefined ? {} : { addressRecord }),
    ...(approval === undefined ? {} : { approval }),
    details: {
      amount: registrationDetails.amount,
      decimals: payment.decimals,
      duration: registrationDetails.duration,
      expiresAt: registeredAt + Number(registrationDetails.duration) * 1_000,
      name: `${registrationDetails.label}.eth`,
      paymentTokenIcon: paymentToken.icon,
      paymentTokenSymbol: paymentToken.symbol,
      primaryNameStatus:
        writes.primaryName === undefined
          ? "not-requested"
          : primaryName === undefined
            ? "failed"
            : "set",
    },
    ...(primaryName === undefined ? {} : { primaryName }),
    ...(primaryNameError === undefined ? {} : { primaryNameError }),
    ...(primaryNameErrorPhase === undefined ? {} : { primaryNameErrorPhase }),
    registration: confirmedRegistration.value,
    registrationAmount: registrationDetails.amount,
    registrationDuration: registrationDetails.duration,
    ...(registrationDetails.tokenId === undefined
      ? {}
      : { tokenId: registrationDetails.tokenId }),
  });
}

export async function submitRegistrationPayment(
  props: SubmitRegistrationPaymentProps,
): Promise<Result<RegistrationPaymentSubmissionSuccess, unknown>> {
  const { attempt, network, payment, paymentToken, publicClient } = props;
  const commitment = await readCommitmentStatus(publicClient, {
    commitment: attempt.commitment,
    network,
    registrarAddress: attempt.registrarAddress,
  });
  if (commitment.isErr()) return err(commitment.error);
  if (commitment.value.state !== "READY") {
    return err(getCommitmentStateError(commitment.value.state));
  }

  const writes = prepareRegistrationPaymentWrites({
    attempt,
    network,
    payment,
    paymentToken,
    reverseRegistrarAddress: props.reverseRegistrarAddress,
  });
  if (writes.isErr()) return err(writes.error);

  const confirmedTransactions: SubmittedContractTransaction[] = [];
  const execution = await executeContractWrites(
    props.walletClient,
    publicClient,
    {
      calls: writes.value.calls,
      chain: props.chain,
      confirmation: "confirmed",
      onProgress: async (progress) => {
        if (progress.strategy !== "atomic" && progress.state === "confirmed") {
          confirmedTransactions.push({
            prepared: progress.prepared,
            receipt: progress.receipt,
            transactionHash: progress.transactionHash,
          });
        }
        await props.onProgress?.(progress);
      },
      strategy: "auto",
      timeout: 120_000,
    },
  );
  if (execution.isErr()) {
    if (
      attempt.setPrimaryName &&
      getConfirmedWrite(confirmedTransactions, "register-name") !== undefined
    ) {
      return buildRegistrationSuccess(publicClient, {
        payment,
        paymentToken,
        primaryNameError: execution.error,
        transactions: confirmedTransactions,
        writes: writes.value,
      });
    }

    return err(execution.error);
  }

  return buildRegistrationSuccess(publicClient, {
    payment,
    paymentToken,
    transactions: execution.value.transactions,
    writes: writes.value,
  });
}
