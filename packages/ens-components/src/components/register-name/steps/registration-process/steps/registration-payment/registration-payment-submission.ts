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
} from "#/actions";
import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-success";
import type { EnsNetwork, EnsPaymentToken } from "#/data";
import type { StoredRegistrationAttempt } from "#/hooks/use-registration-attempts";

import { err, ok, type Result } from "neverthrow";

import {
  executeContractWrites,
  prepareRegisterNameWrite,
  prepareRegistrationPaymentApprovalWrite,
} from "#/actions";
import { readCommitmentStatus } from "#/components/register-name/steps/registration-process/steps/commitment/read-commitment-status";
import { getRegistrationDetails } from "#/components/register-name/steps/registration-process/steps/registration-payment/get-registration-details";
import {
  getTransactionTimestamp,
  parseRegistrationDuration,
} from "#/lib/helpers";

export interface ConfirmedRegistrationWrite {
  receipt: TransactionReceipt;
  transactionHash: `0x${string}`;
}

export interface RegistrationPaymentSubmissionSuccess {
  approval?: ConfirmedRegistrationWrite;
  details: RegistrationSuccessDetails;
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

  const duration = parseRegistrationDuration(attempt.duration);
  if (duration === undefined) return err("INVALID_DURATION");

  const registration = prepareRegisterNameWrite({
    account: attempt.account,
    duration,
    input: attempt.label,
    network,
    owner: attempt.owner,
    paymentTokenAddress: paymentToken.address,
    referrer: attempt.referrer,
    registrarAddress: attempt.registrarAddress,
    resolverAddress: attempt.resolver.address,
    secret: attempt.secret,
    subregistryAddress: attempt.subregistry,
  });
  if (registration.isErr()) return err(registration.error);

  let calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]] = [
    registration.value,
  ];
  if (!payment.hasSufficientAllowance) {
    const approval = prepareRegistrationPaymentApprovalWrite({
      account: attempt.account,
      amount: payment.total,
      network,
      paymentTokenAddress: paymentToken.address,
      registrarAddress: attempt.registrarAddress,
    });
    if (approval.isErr()) return err(approval.error);
    calls = [approval.value, registration.value];
  }

  const execution = await executeContractWrites(
    props.walletClient,
    publicClient,
    {
      calls,
      chain: props.chain,
      confirmation: "confirmed",
      ...(props.onProgress === undefined
        ? {}
        : { onProgress: props.onProgress }),
      strategy: "auto",
      timeout: 120_000,
    },
  );
  if (execution.isErr()) return err(execution.error);

  const confirmedRegistration = findConfirmedWrite(
    execution.value.transactions,
    "register-name",
  );
  if (confirmedRegistration.isErr()) return err(confirmedRegistration.error);

  const registeredAt = await getTransactionTimestamp(
    publicClient,
    confirmedRegistration.value.receipt,
  );
  const registrationDetails = getRegistrationDetails({
    decimals: payment.decimals,
    fallbackAmount: payment.total,
    fallbackDuration: duration,
    fallbackLabel: registration.value.metadata.label,
    paymentTokenIcon: paymentToken.icon,
    paymentTokenSymbol: paymentToken.symbol,
    receipt: confirmedRegistration.value.receipt,
    registeredAt,
    registrarAddress: attempt.registrarAddress,
  });
  let confirmedApproval: ConfirmedRegistrationWrite | undefined;
  if (!payment.hasSufficientAllowance) {
    const approval = findConfirmedWrite(
      execution.value.transactions,
      "approve-registration-payment",
    );
    if (approval.isErr()) return err(approval.error);
    confirmedApproval = approval.value;
  }

  return ok({
    ...(confirmedApproval === undefined ? {} : { approval: confirmedApproval }),
    details: registrationDetails.details,
    registration: confirmedRegistration.value,
    registrationAmount: registrationDetails.amount,
    registrationDuration: registrationDetails.duration,
    ...(registrationDetails.tokenId === undefined
      ? {}
      : { tokenId: registrationDetails.tokenId }),
  });
}
