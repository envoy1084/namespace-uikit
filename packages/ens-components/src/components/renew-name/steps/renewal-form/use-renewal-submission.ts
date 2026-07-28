"use client";

import type { Hex } from "viem";

import type {
  ContractWriteProgress,
  NameRenewalPaymentStatus,
} from "#/actions";
import type { NameRenewalErrorPhase } from "#/components/renew-name/events";
import type { NameRenewalSuccessDetails } from "#/components/renew-name/types";

import { useEffect, useRef, useState } from "react";

import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { useNameRenewal } from "#/components/renew-name/context";
import { emitNameRenewalEvent } from "#/components/renew-name/emit-event";
import { submitNameRenewal } from "#/components/renew-name/steps/renewal-form/renewal-submission";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import { useExecuteContractWrites, useNameRenewalPaymentStatus } from "#/hooks";
import { delay, resolvePaymentToken } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type RenewalActionStatus =
  | "batching"
  | "confirming-approval"
  | "confirming-batch"
  | "confirming-renewal"
  | "idle"
  | "refreshing"
  | "signing-approval"
  | "signing-renewal"
  | "switching";

export interface UseRenewalSubmissionProps {
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (details: NameRenewalSuccessDetails) => void;
}

export function useRenewalSubmission({
  onPendingChange,
  onSuccess,
}: UseRenewalSubmissionProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const contractWrites = useExecuteContractWrites();
  const { switchChainAsync } = useSwitchChain();
  const { duration, events, input, messages, paymentTokenAddress, referrer } =
    useNameRenewal();
  const paymentToken = resolvePaymentToken(
    contracts.paymentTokens,
    paymentTokenAddress,
  );
  const payment = useNameRenewalPaymentStatus({
    account: connection.address,
    duration,
    input,
    paymentTokenAddress: paymentToken.address,
    query: {
      enabled: false,
      retry: (failureCount, error) =>
        error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const [actionStatus, setActionStatus] = useState<RenewalActionStatus>("idle");
  const [error, setError] = useState<unknown>();
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const transactionHashRef = useRef<Hex | undefined>(undefined);
  const submittingAccountRef = useRef<`0x${string}` | undefined>(undefined);
  const phaseRef = useRef<NameRenewalErrorPhase>("renewal");
  const paymentDataRef = useRef<NameRenewalPaymentStatus | undefined>(
    undefined,
  );
  const approvalEventEmittedRef = useRef(false);
  const isPending = actionStatus !== "idle";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;
  const isConfirming =
    actionStatus === "confirming-approval" ||
    actionStatus === "confirming-batch" ||
    actionStatus === "confirming-renewal";

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  useEffect(
    () => () => {
      onPendingChange?.(false);
    },
    [onPendingChange],
  );

  const reportError = (
    nextError: unknown,
    phase: NameRenewalErrorPhase,
    hash?: Hex,
  ) => {
    setError(nextError);
    emitNameRenewalEvent(events.onError, {
      chainId: chain.id,
      error: nextError,
      input,
      network,
      phase,
      ...(hash === undefined ? {} : { transactionHash: hash }),
    });
  };

  const emitApproval = (
    receipt: Parameters<NonNullable<typeof events.onApprove>>[0]["receipt"],
    hash: Hex,
  ) => {
    const paymentData = paymentDataRef.current;
    const account = submittingAccountRef.current;
    if (
      account === undefined ||
      paymentData === undefined ||
      approvalEventEmittedRef.current
    ) {
      return;
    }
    approvalEventEmittedRef.current = true;
    emitNameRenewalEvent(events.onApprove, {
      account,
      amount: paymentData.total,
      chainId: chain.id,
      network,
      paymentTokenAddress: paymentToken.address,
      receipt,
      registrarAddress: contracts.ethRegistrar.address,
      transactionHash: hash,
    });
  };

  const handleProgress = (progress: ContractWriteProgress) => {
    if (progress.strategy === "atomic") {
      phaseRef.current = "renewal";
      setActionStatus(
        progress.state === "signing" ? "batching" : "confirming-batch",
      );
      if (progress.state === "confirmed") {
        const renewal = progress.transactions.find(
          ({ prepared }) => prepared.kind === "renew-name",
        );
        setTransactionHash(renewal?.transactionHash);
        transactionHashRef.current = renewal?.transactionHash;
        setIsTransactionConfirmed(true);
      }
      return;
    }

    const isApproval = progress.prepared.kind === "approve-payment-token";
    phaseRef.current = isApproval ? "approval" : "renewal";
    if (progress.state === "signing") {
      setActionStatus(isApproval ? "signing-approval" : "signing-renewal");
      setTransactionHash(undefined);
      transactionHashRef.current = undefined;
      setIsTransactionConfirmed(false);
      return;
    }

    setActionStatus(isApproval ? "confirming-approval" : "confirming-renewal");
    setTransactionHash(progress.transactionHash);
    transactionHashRef.current = progress.transactionHash;
    setIsTransactionConfirmed(progress.state === "confirmed");
    if (isApproval && progress.state === "confirmed") {
      emitApproval(progress.receipt, progress.transactionHash);
    }
  };

  const handleRenew = async () => {
    setError(undefined);
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);
    transactionHashRef.current = undefined;
    paymentDataRef.current = undefined;
    submittingAccountRef.current = undefined;
    approvalEventEmittedRef.current = false;

    if (connection.address === undefined) {
      reportError("WALLET_NOT_CONNECTED", "renewal");
      return;
    }
    const submittingAccount = connection.address;
    submittingAccountRef.current = submittingAccount;
    if (isWrongNetwork) {
      setActionStatus("switching");
      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        reportError("CHAIN_SWITCH_FAILED", "renewal");
      } finally {
        setActionStatus("idle");
      }
      return;
    }
    if (walletClient === undefined || publicClient === undefined) {
      reportError("CONTRACT_READ_FAILED", "renewal");
      return;
    }

    setActionStatus("refreshing");
    const refreshedPayment = await payment.refetch();
    if (refreshedPayment.isError || refreshedPayment.data === undefined) {
      reportError(refreshedPayment.error ?? "CONTRACT_READ_FAILED", "renewal");
      setActionStatus("idle");
      return;
    }
    if (!refreshedPayment.data.hasSufficientBalance) {
      setActionStatus("idle");
      return;
    }
    paymentDataRef.current = refreshedPayment.data;
    phaseRef.current = refreshedPayment.data.hasSufficientAllowance
      ? "renewal"
      : "approval";

    const result = await submitNameRenewal({
      account: submittingAccount,
      executeWrites: contractWrites.mutateAsync,
      input,
      network,
      onProgress: handleProgress,
      payment: refreshedPayment.data,
      paymentToken,
      referrer,
      registrarAddress: contracts.ethRegistrar.address,
    });
    if (result.isErr()) {
      reportError(result.error, phaseRef.current, transactionHashRef.current);
      setActionStatus("idle");
      setIsTransactionConfirmed(false);
      return;
    }

    if (result.value.approval !== undefined) {
      emitApproval(
        result.value.approval.receipt,
        result.value.approval.transactionHash,
      );
    }
    emitNameRenewalEvent(events.onRenew, {
      account: submittingAccount,
      amount: result.value.details.amount,
      chainId: chain.id,
      currentExpiry: result.value.details.currentExpiry,
      decimals: result.value.details.decimals,
      duration: result.value.details.duration,
      name: result.value.details.name,
      network,
      newExpiry: result.value.details.newExpiry,
      paymentTokenAddress: paymentToken.address,
      receipt: result.value.renewal.receipt,
      referrer,
      registrarAddress: contracts.ethRegistrar.address,
      ...(result.value.tokenId === undefined
        ? {}
        : { tokenId: result.value.tokenId }),
      transactionHash: result.value.renewal.transactionHash,
    });
    await delay(TRANSACTION_PROGRESS_COMPLETION_DURATION_MS);
    onSuccess(result.value.details);
  };

  const buttonLabel = !connection.address
    ? "Connect wallet to continue"
    : isWrongNetwork
      ? `Switch to ${chain.name}`
      : actionStatus === "switching"
        ? `Switching to ${chain.name}`
        : actionStatus === "refreshing"
          ? "Refreshing price"
          : actionStatus === "signing-approval"
            ? `Approve ${paymentToken.symbol}`
            : actionStatus === "signing-renewal" || actionStatus === "batching"
              ? "Confirm in wallet"
              : messages.renewLabel;

  return {
    account: connection.address,
    actionStatus,
    buttonLabel,
    error,
    handleRenew,
    isConfirming,
    isPending,
    isTransactionConfirmed,
    isWalletConnected: connection.address !== undefined,
    payment,
    paymentToken,
    transactionHash,
  };
}
