import { err, ok, type Result } from "neverthrow";
import type { Hex, TransactionReceipt } from "viem";

import type {
  ContractWriteProgress,
  NameRenewalPaymentStatus,
  PreparedContractWrite,
} from "#/actions";
import { preparePaymentTokenApprovalWrite, prepareRenewNameWrite } from "#/actions";
import type { NameRenewalSuccessDetails } from "#/components/name-renewal/types";
import type { EnsPaymentToken } from "#/data";
import type { ExecuteContractWritesMutation } from "#/hooks";
import { parseRenewalReceipt } from "#/lib/helpers";
import { parseNameInput } from "#/lib/parse-name-input";

export interface ConfirmedRenewalWrite {
  receipt: TransactionReceipt;
  transactionHash: Hex;
}

export interface NameRenewalSubmissionSuccess {
  approval?: ConfirmedRenewalWrite;
  details: NameRenewalSuccessDetails;
  renewal: ConfirmedRenewalWrite;
  tokenId?: bigint;
}

export interface SubmitNameRenewalParameters {
  account: `0x${string}`;
  executeWrites: ExecuteContractWritesMutation;
  input: string;
  onProgress?: (progress: ContractWriteProgress) => Promise<void> | void;
  payment: NameRenewalPaymentStatus;
  paymentToken: EnsPaymentToken;
  referrer: Hex;
  registrarAddress: `0x${string}`;
}

function getConfirmedWrite(
  transactions: readonly {
    prepared: PreparedContractWrite;
    receipt?: TransactionReceipt;
    transactionHash: Hex;
  }[],
  kind: string,
): ConfirmedRenewalWrite | undefined {
  const transaction = transactions.find(({ prepared }) => prepared.kind === kind);
  if (transaction?.receipt === undefined) return undefined;
  return {
    receipt: transaction.receipt,
    transactionHash: transaction.transactionHash,
  };
}

export async function submitNameRenewal(
  props: SubmitNameRenewalParameters,
): Promise<Result<NameRenewalSubmissionSuccess, unknown>> {
  const parsedInput = parseNameInput(props.input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const renewal = prepareRenewNameWrite({
    account: props.account,
    duration: props.payment.duration,
    input: props.input,
    paymentTokenAddress: props.paymentToken.address,
    referrer: props.referrer,
    registrarAddress: props.registrarAddress,
  });
  if (renewal.isErr()) return err(renewal.error);

  const calls: PreparedContractWrite[] = [];
  if (!props.payment.hasSufficientAllowance) {
    const approval = preparePaymentTokenApprovalWrite({
      account: props.account,
      amount: props.payment.total,
      paymentTokenAddress: props.paymentToken.address,
      spenderAddress: props.registrarAddress,
    });
    if (approval.isErr()) return err(approval.error);
    calls.push(approval.value);
  }
  calls.push(renewal.value);

  let execution;
  try {
    execution = await props.executeWrites({
      calls: calls as [PreparedContractWrite, ...PreparedContractWrite[]],
      confirmation: "confirmed",
      ...(props.onProgress === undefined ? {} : { onProgress: props.onProgress }),
      strategy: "auto",
      timeout: 120_000,
    });
  } catch (error) {
    return err(error);
  }

  const confirmedRenewal = getConfirmedWrite(execution.transactions, "renew-name");
  if (confirmedRenewal === undefined) {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }

  const parsed = parseRenewalReceipt({
    fallbackAmount: props.payment.total,
    fallbackCurrentExpiry: props.payment.currentExpiry,
    fallbackDuration: props.payment.duration,
    fallbackLabel: parsedInput.value.label,
    receipt: confirmedRenewal.receipt,
    registrarAddress: props.registrarAddress,
  });
  const approval = getConfirmedWrite(execution.transactions, "approve-payment-token");

  return ok({
    ...(approval === undefined ? {} : { approval }),
    details: {
      amount: parsed.amount,
      currentExpiry: props.payment.currentExpiry,
      decimals: props.payment.decimals,
      duration: parsed.duration,
      name: `${parsed.label}.eth`,
      newExpiry: parsed.newExpiry,
      paymentTokenIcon: props.paymentToken.icon,
      paymentTokenSymbol: props.paymentToken.symbol,
    },
    renewal: confirmedRenewal,
    ...(parsed.tokenId === undefined ? {} : { tokenId: parsed.tokenId }),
  });
}
