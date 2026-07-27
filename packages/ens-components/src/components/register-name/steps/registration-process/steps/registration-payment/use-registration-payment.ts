"use client";

import type {
  ContractWriteProgress,
  RegistrationPaymentStatus,
} from "#/actions";
import type { StoredRegistrationAttempt } from "#/components/register-name/hooks/use-registration-attempts";
import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-success";

import { useEffect, useRef, useState } from "react";

import { isAddressEqual, type Hex } from "viem";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import {
  COMMITMENT_VALID_DURATION_MS,
  useNameRegistration,
} from "#/components/register-name/context";
import { emitNameRegistrationEvent } from "#/components/register-name/emit-event";
import { useRegistrationAttempts } from "#/components/register-name/hooks/use-registration-attempts";
import {
  getPaymentActionStatus,
  getPaymentTransactionPhase,
  getRegistrationPaymentButtonLabel,
  type PaymentActionStatus,
  type PaymentTransactionPhase,
} from "#/components/register-name/steps/registration-process/steps/registration-payment/registration-payment-state";
import {
  submitRegistrationPayment,
  type RegistrationPaymentSubmissionSuccess,
} from "#/components/register-name/steps/registration-process/steps/registration-payment/registration-payment-submission";
import { useRegistrationPaymentToken } from "#/components/register-name/steps/registration-process/steps/registration-payment/use-registration-payment-token";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import { useRegistrationPaymentStatus } from "#/hooks";
import { delay, parseRegistrationDuration } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export interface UseRegistrationPaymentProps {
  onCommitmentInvalid: (error: unknown) => void;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (registration: RegistrationSuccessDetails) => void;
}

function isCommitmentInvalid(error: unknown) {
  return error === "COMMITMENT_EXPIRED" || error === "COMMITMENT_NOT_FOUND";
}

export function useRegistrationPayment({
  onCommitmentInvalid,
  onPendingChange,
  onSuccess,
}: UseRegistrationPaymentProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const { events, registrationAttemptId, setRegistrationAttemptId } =
    useNameRegistration();
  const { delete: deleteAttempt, get, update } = useRegistrationAttempts();
  const storedAttempt =
    registrationAttemptId === null ? undefined : get(registrationAttemptId);
  const duration = parseRegistrationDuration(storedAttempt?.duration) ?? 0n;
  const paymentToken = useRegistrationPaymentToken({
    attempt: storedAttempt,
    paymentTokens: contracts.paymentTokens,
    updateAttempt: update,
  });
  const payment = useRegistrationPaymentStatus({
    account: connection.address,
    duration,
    input: storedAttempt?.label,
    paymentTokenAddress: paymentToken.address,
    ...(storedAttempt === undefined
      ? {}
      : { registrarAddress: storedAttempt.registrarAddress }),
    query: {
      enabled: storedAttempt !== undefined && duration > 0n,
      retry: (failureCount, error) =>
        error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const [actionStatus, setActionStatus] = useState<PaymentActionStatus>("idle");
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const transactionHashRef = useRef<Hex | undefined>(undefined);
  const transactionPhaseRef = useRef<PaymentTransactionPhase>("registration");
  const [error, setError] = useState<unknown>();
  const [now, setNow] = useState(Date.now());
  const isPending = actionStatus !== "idle";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;
  const expiresAt =
    storedAttempt?.submission.type !== "confirmed"
      ? 0
      : storedAttempt.submission.confirmedAt + COMMITMENT_VALID_DURATION_MS;
  const timeRemaining = Math.max(0, expiresAt - now);

  const reportError = (
    nextError: unknown,
    phase: PaymentTransactionPhase,
    hash?: Hex,
  ) => {
    setError(nextError);
    emitNameRegistrationEvent(events.onError, {
      chainId: chain.id,
      error: nextError,
      input: storedAttempt?.label ?? "",
      network,
      phase,
      ...(hash === undefined ? {} : { transactionHash: hash }),
    });
  };

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  useEffect(
    () => () => {
      onPendingChange?.(false);
    },
    [onPendingChange],
  );

  useEffect(() => {
    if (storedAttempt === undefined || isPending) return;

    const updateExpiry = () => {
      const currentTime = Date.now();
      setNow(currentTime);

      if (currentTime >= expiresAt && registrationAttemptId !== null) {
        onCommitmentInvalid("COMMITMENT_EXPIRED");
      }
    };

    updateExpiry();
    const interval = window.setInterval(updateExpiry, 30_000);
    return () => window.clearInterval(interval);
  }, [
    expiresAt,
    isPending,
    onCommitmentInvalid,
    registrationAttemptId,
    storedAttempt,
  ]);

  const handleProgress = (progress: ContractWriteProgress) => {
    if (progress.strategy === "atomic") {
      transactionPhaseRef.current = "registration";
      setActionStatus(
        progress.state === "signing" ? "batching" : "confirming-batch",
      );
      if (progress.state === "confirmed") {
        const registration = progress.transactions.find(
          ({ prepared }) => prepared.kind === "register-name",
        );
        setTransactionHash(registration?.transactionHash);
        transactionHashRef.current = registration?.transactionHash;
        setIsTransactionConfirmed(true);
      }
      return;
    }

    const phase = getPaymentTransactionPhase(progress.prepared);
    transactionPhaseRef.current = phase;
    if (progress.state === "signing") {
      setActionStatus(getPaymentActionStatus(phase, "signing"));
      setTransactionHash(undefined);
      transactionHashRef.current = undefined;
      setIsTransactionConfirmed(false);
      return;
    }

    setTransactionHash(progress.transactionHash);
    transactionHashRef.current = progress.transactionHash;
    setActionStatus(getPaymentActionStatus(phase, "confirming"));
    setIsTransactionConfirmed(progress.state === "confirmed");
  };

  const handleSuccess = async (
    attempt: StoredRegistrationAttempt,
    attemptId: string,
    paymentData: RegistrationPaymentStatus,
    result: RegistrationPaymentSubmissionSuccess,
  ) => {
    if (result.approval !== undefined) {
      emitNameRegistrationEvent(events.onApprove, {
        account: attempt.account,
        amount: paymentData.total,
        chainId: chain.id,
        network,
        paymentTokenAddress: paymentToken.address,
        receipt: result.approval.receipt,
        registrarAddress: attempt.registrarAddress,
        transactionHash: result.approval.transactionHash,
      });
    }

    await delay(TRANSACTION_PROGRESS_COMPLETION_DURATION_MS);
    deleteAttempt(attemptId);
    setRegistrationAttemptId(null);
    emitNameRegistrationEvent(events.onRegister, {
      account: attempt.account,
      amount: result.registrationAmount,
      chainId: chain.id,
      decimals: paymentData.decimals,
      duration: result.registrationDuration,
      expiresAt: result.details.expiresAt,
      name: result.details.name,
      network,
      owner: attempt.owner,
      paymentTokenAddress: paymentToken.address,
      receipt: result.registration.receipt,
      referrer: attempt.referrer,
      registrarAddress: attempt.registrarAddress,
      ...(result.tokenId === undefined ? {} : { tokenId: result.tokenId }),
      transactionHash: result.registration.transactionHash,
    });
    if (
      result.addressRecord !== undefined &&
      result.l1PrimaryName !== undefined &&
      result.l2PrimaryName !== undefined
    ) {
      emitNameRegistrationEvent(events.onSetPrimaryName, {
        account: attempt.account,
        addressRecordReceipt: result.addressRecord.receipt,
        addressRecordTransactionHash: result.addressRecord.transactionHash,
        chainId: chain.id,
        l1ReverseRegistrarAddress: contracts.l1ReverseRegistrar.address,
        l2ReverseReceipt: result.l2PrimaryName.receipt,
        l2ReverseRegistrarAddress: contracts.l2ReverseRegistrar.address,
        l2ReverseTransactionHash: result.l2PrimaryName.transactionHash,
        name: result.details.name,
        network,
        owner: attempt.owner,
        receipt: result.l1PrimaryName.receipt,
        resolverAddress: attempt.resolver.address,
        transactionHash: result.l1PrimaryName.transactionHash,
      });
    }
    if (
      result.primaryNameError !== undefined &&
      result.primaryNameErrorPhase !== undefined
    ) {
      reportError(
        result.primaryNameError,
        result.primaryNameErrorPhase,
        transactionHashRef.current,
      );
    }
    onSuccess(result.details);
  };

  const handlePayment = async () => {
    setError(undefined);
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);
    transactionHashRef.current = undefined;

    if (connection.address === undefined) {
      reportError("WALLET_NOT_CONNECTED", "registration");
      return;
    }

    if (isWrongNetwork) {
      setActionStatus("switching");
      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        reportError("CHAIN_SWITCH_FAILED", "registration");
      } finally {
        setActionStatus("idle");
      }
      return;
    }

    if (
      walletClient === undefined ||
      publicClient === undefined ||
      storedAttempt === undefined ||
      registrationAttemptId === null
    ) {
      reportError("CONTRACT_READ_FAILED", "registration");
      return;
    }
    if (!isAddressEqual(connection.address, storedAttempt.account)) {
      reportError("WALLET_ACCOUNT_CHANGED", "registration");
      return;
    }

    setActionStatus("refreshing");
    const refreshedPayment = await payment.refetch();
    if (refreshedPayment.isError || refreshedPayment.data === undefined) {
      reportError(
        refreshedPayment.error ?? "CONTRACT_READ_FAILED",
        "registration",
      );
      setActionStatus("idle");
      return;
    }
    if (!refreshedPayment.data.hasSufficientBalance) {
      setActionStatus("idle");
      return;
    }
    transactionPhaseRef.current = refreshedPayment.data.hasSufficientAllowance
      ? "registration"
      : "approval";

    const result = await submitRegistrationPayment({
      attempt: storedAttempt,
      chain,
      network,
      payment: refreshedPayment.data,
      paymentToken,
      publicClient,
      l1ReverseRegistrarAddress: contracts.l1ReverseRegistrar.address,
      l2ReverseRegistrarAddress: contracts.l2ReverseRegistrar.address,
      walletClient,
      onProgress: handleProgress,
    });
    if (result.isErr()) {
      reportError(
        result.error,
        transactionPhaseRef.current,
        transactionHashRef.current,
      );
      setActionStatus("idle");
      setIsTransactionConfirmed(false);
      setTransactionHash(undefined);
      transactionHashRef.current = undefined;
      if (isCommitmentInvalid(result.error)) {
        onCommitmentInvalid(result.error);
      }
      return;
    }

    await handleSuccess(
      storedAttempt,
      registrationAttemptId,
      refreshedPayment.data,
      result.value,
    );
  };

  const buttonLabel = getRegistrationPaymentButtonLabel({
    actionStatus,
    chainName: chain.name,
    hasPaymentData: payment.data !== undefined,
    hasSufficientAllowance: payment.data?.hasSufficientAllowance ?? false,
    hasSufficientBalance: payment.data?.hasSufficientBalance ?? false,
    isPaymentError: payment.isError,
    isWalletConnected: connection.address !== undefined,
    isWrongNetwork,
    paymentTokenSymbol: paymentToken.symbol,
    setPrimaryName: storedAttempt?.setPrimaryName ?? false,
  });

  return {
    actionStatus,
    buttonLabel,
    error,
    handlePayment,
    isPending,
    isTransactionConfirmed,
    isWalletConnected: connection.address !== undefined,
    payment,
    paymentToken,
    storedAttempt,
    timeRemaining,
    transactionHash,
  };
}
