import type {
  Chain,
  Hex,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";

import type { ContractWriteProgress } from "#/actions";
import type { NameProfileEditorReview } from "#/components/name-profile-editor/types";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";

import { executeContractWrites, prepareProfileRecordsWrite } from "#/actions";

export interface ProfileUpdateSubmissionSuccess {
  readonly receipt: TransactionReceipt;
  readonly resolverAddress: `0x${string}`;
  readonly review: NameProfileEditorReview;
  readonly transactionHash: Hex;
}

export interface SubmitProfileUpdateProps {
  readonly account: `0x${string}`;
  readonly chain: Chain;
  readonly input: string;
  readonly network: EnsNetwork;
  readonly onProgress?: (
    progress: ContractWriteProgress,
  ) => Promise<void> | void;
  readonly publicClient: PublicClient;
  readonly resolverAddress: `0x${string}`;
  readonly review: NameProfileEditorReview;
  readonly walletClient: WalletClient;
}

export async function submitProfileUpdate(
  props: SubmitProfileUpdateProps,
): Promise<Result<ProfileUpdateSubmissionSuccess, unknown>> {
  const prepared = await prepareProfileRecordsWrite(props.publicClient, {
    account: props.account,
    changes: props.review.changes,
    input: props.input,
    network: props.network,
    resolverAddress: props.resolverAddress,
  });
  if (prepared.isErr()) return err(prepared.error);

  const execution = await executeContractWrites(
    props.walletClient,
    props.publicClient,
    {
      calls: [prepared.value],
      chain: props.chain,
      confirmation: "confirmed",
      ...(props.onProgress === undefined
        ? {}
        : { onProgress: props.onProgress }),
      strategy: "single",
      timeout: 120_000,
    },
  );
  if (execution.isErr()) return err(execution.error);

  const transaction = execution.value.transactions[0];
  if (transaction?.receipt === undefined) {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }

  return ok({
    receipt: transaction.receipt,
    resolverAddress: props.resolverAddress,
    review: props.review,
    transactionHash: transaction.transactionHash,
  });
}
