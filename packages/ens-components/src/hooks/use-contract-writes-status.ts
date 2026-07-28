"use client";

import type { Hex, TransactionReceipt } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { TransactionReceiptNotFoundError } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import {
  getContractCallsStatus,
  type ContractCallsStatusError,
} from "#/actions";
import { useEnsConfig } from "#/providers";

export type ContractWritesState = "FAILURE" | "PENDING" | "SUCCESS" | "UNKNOWN";

export type ContractWritesSubmission =
  | {
      readonly callsId: string;
      readonly strategy: "atomic";
    }
  | {
      readonly strategy: "sequential" | "single";
      readonly transactionHashes: readonly [Hex, ...Hex[]];
    };

export interface ContractWritesStatus {
  readonly receipts: readonly TransactionReceipt[];
  readonly state: ContractWritesState;
  readonly strategy: ContractWritesSubmission["strategy"];
  readonly transactionHashes: readonly Hex[];
}

export type ContractWritesStatusError =
  | "CONTRACT_RECEIPT_READ_FAILED"
  | "INVALID_SUBMISSION"
  | ContractCallsStatusError;

export type ContractWritesStatusQueryKey = readonly [
  "ens",
  "contract-writes-status",
  string,
  number,
  string,
];

export interface UseContractWritesStatusParameters<
  selectData = ContractWritesStatus,
> {
  query?: Omit<
    UseQueryOptions<
      ContractWritesStatus,
      ContractWritesStatusError,
      selectData,
      ContractWritesStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  submission: ContractWritesSubmission | null | undefined;
}

function submissionKey(submission: ContractWritesSubmission | null): string {
  if (submission === null) return "";
  return submission.strategy === "atomic"
    ? submission.callsId
    : submission.transactionHashes.join(",");
}

export function useContractWritesStatus<selectData = ContractWritesStatus>(
  parameters: UseContractWritesStatusParameters<selectData>,
) {
  const { chain, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const submission = parameters.submission ?? null;

  return useQuery<
    ContractWritesStatus,
    ContractWritesStatusError,
    selectData,
    ContractWritesStatusQueryKey
  >({
    refetchInterval: (query) =>
      query.state.data?.state === "PENDING" ? 1_000 : false,
    ...parameters.query,
    queryKey: [
      "ens",
      "contract-writes-status",
      network,
      chain.id,
      submissionKey(submission),
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      submission !== null &&
      publicClient !== undefined &&
      (submission.strategy !== "atomic" || walletClient !== undefined),
    queryFn: async () => {
      if (submission === null) throw "INVALID_SUBMISSION";

      if (submission.strategy === "atomic") {
        if (walletClient === undefined) throw "INVALID_SUBMISSION";
        const status = await getContractCallsStatus(walletClient, {
          callsId: submission.callsId,
        });
        if (status.isErr()) throw status.error;
        return {
          receipts: [],
          state: status.value.state,
          strategy: "atomic",
          transactionHashes: status.value.transactionHashes,
        };
      }

      if (publicClient === undefined) throw "INVALID_SUBMISSION";
      const receiptResults = await Promise.all(
        submission.transactionHashes.map(async (transactionHash) => {
          try {
            return await publicClient.getTransactionReceipt({
              hash: transactionHash,
            });
          } catch (error) {
            if (error instanceof TransactionReceiptNotFoundError) {
              return null;
            }
            throw "CONTRACT_RECEIPT_READ_FAILED";
          }
        }),
      );
      const receipts = receiptResults.filter(
        (receipt): receipt is TransactionReceipt => receipt !== null,
      );
      if (receipts.length !== submission.transactionHashes.length) {
        return {
          receipts,
          state: "PENDING",
          strategy: submission.strategy,
          transactionHashes: submission.transactionHashes,
        };
      }

      return {
        receipts,
        state: receipts.some(({ status }) => status === "reverted")
          ? "FAILURE"
          : "SUCCESS",
        strategy: submission.strategy,
        transactionHashes: submission.transactionHashes,
      };
    },
  });
}
