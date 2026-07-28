import { err, ok, type Result } from "neverthrow";
import type { Hex, PublicClient, TransactionReceipt } from "viem";

import type { ContractWriteProgress } from "#/actions";
import { prepareNameProfileRecordsWrite } from "#/actions";
import type { NameProfileEditorReview } from "#/components/name-profile-editor/types";
import type { EnsNetwork } from "#/data";
import type { ExecuteContractWritesMutation } from "#/hooks";

export type ProfileUpdateConnectionError = "WALLET_ACCOUNT_CHANGED" | "WALLET_NETWORK_CHANGED";

export interface ProfileUpdateSubmissionSuccess {
  readonly receipt: TransactionReceipt;
  readonly resolverAddress: `0x${string}`;
  readonly review: NameProfileEditorReview;
  readonly transactionHash: Hex;
}

export interface SubmitProfileUpdateParameters {
  readonly account: `0x${string}`;
  readonly executeWrites: ExecuteContractWritesMutation;
  readonly input: string;
  readonly network: EnsNetwork;
  readonly onProgress?: (progress: ContractWriteProgress) => Promise<void> | void;
  readonly publicClient: PublicClient;
  readonly resolverAddress: `0x${string}`;
  readonly review: NameProfileEditorReview;
  readonly validateConnection?: () => Result<void, ProfileUpdateConnectionError>;
}

export async function submitProfileUpdate(
  props: SubmitProfileUpdateParameters,
): Promise<Result<ProfileUpdateSubmissionSuccess, unknown>> {
  const initialConnection = props.validateConnection?.();
  if (initialConnection?.isErr()) return err(initialConnection.error);

  const prepared = await prepareNameProfileRecordsWrite(props.publicClient, {
    account: props.account,
    changes: props.review.changes,
    input: props.input,
    network: props.network,
    resolverAddress: props.resolverAddress,
  });
  if (prepared.isErr()) return err(prepared.error);

  const preparedConnection = props.validateConnection?.();
  if (preparedConnection?.isErr()) return err(preparedConnection.error);

  const submittingConnection = props.validateConnection?.();
  if (submittingConnection?.isErr()) return err(submittingConnection.error);

  let execution;
  try {
    execution = await props.executeWrites({
      calls: [prepared.value],
      confirmation: "confirmed",
      ...(props.onProgress === undefined ? {} : { onProgress: props.onProgress }),
      strategy: "single",
      timeout: 120_000,
    });
  } catch (error) {
    return err(error);
  }

  const transaction = execution.transactions[0];
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
