import type {
  Chain,
  Hex,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";

import type {
  ContractWriteProgress,
  NameRenewalPaymentStatus,
  PreparedContractWrite,
} from "#/actions";
import type { NameRenewalSuccessDetails } from "#/components/renew-name/types";
import type { EnsNetwork, EnsPaymentToken } from "#/data";

import { err, ok, type Result } from "neverthrow";

import {
  executeContractWrites,
  preparePaymentTokenApprovalWrite,
  prepareRenewNameWrite,
} from "#/actions";
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

export interface SubmitNameRenewalProps {
  account: `0x${string}`;
  chain: Chain;
  input: string;
  network: EnsNetwork;
  onProgress?: (progress: ContractWriteProgress) => Promise<void> | void;
  payment: NameRenewalPaymentStatus;
  paymentToken: EnsPaymentToken;
  publicClient: PublicClient;
  referrer: Hex;
  registrarAddress: `0x${string}`;
  walletClient: WalletClient;
}

function getConfirmedWrite(
  transactions: readonly {
    prepared: PreparedContractWrite;
    receipt?: TransactionReceipt;
    transactionHash: Hex;
  }[],
  kind: string,
): ConfirmedRenewalWrite | undefined {
  const transaction = transactions.find(
    ({ prepared }) => prepared.kind === kind,
  );
  if (transaction?.receipt === undefined) return undefined;
  return {
    receipt: transaction.receipt,
    transactionHash: transaction.transactionHash,
  };
}

export async function submitNameRenewal(
  props: SubmitNameRenewalProps,
): Promise<Result<NameRenewalSubmissionSuccess, unknown>> {
  const parsedInput = parseNameInput(props.input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const renewal = prepareRenewNameWrite({
    account: props.account,
    duration: props.payment.duration,
    input: props.input,
    network: props.network,
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
      network: props.network,
      paymentTokenAddress: props.paymentToken.address,
      spenderAddress: props.registrarAddress,
    });
    if (approval.isErr()) return err(approval.error);
    calls.push(approval.value);
  }
  calls.push(renewal.value);

  const execution = await executeContractWrites(
    props.walletClient,
    props.publicClient,
    {
      calls: calls as [PreparedContractWrite, ...PreparedContractWrite[]],
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

  const confirmedRenewal = getConfirmedWrite(
    execution.value.transactions,
    "renew-name",
  );
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
  const approval = getConfirmedWrite(
    execution.value.transactions,
    "approve-payment-token",
  );

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
