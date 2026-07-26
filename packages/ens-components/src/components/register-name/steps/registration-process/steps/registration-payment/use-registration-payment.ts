"use client";

import type { Hex } from "viem";

import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-process/registration-success";

import { useEffect, useState } from "react";

import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import {
  executeContractWrites,
  prepareRegisterNameWrite,
  prepareRegistrationPaymentApprovalWrite,
} from "#/actions";
import {
  COMMITMENT_VALID_DURATION_MS,
  useNameRegistration,
} from "#/components/register-name/context";
import { emitNameRegistrationEvent } from "#/components/register-name/emit-event";
import { readCommitmentStatus } from "#/components/register-name/steps/registration-process/steps/commitment/read-commitment-status";
import {
  getRegistrationDetails,
  parseStoredDuration,
  type PaymentActionStatus,
} from "#/components/register-name/steps/registration-process/steps/registration-payment/get-registration-details";
import { useRegistrationPaymentToken } from "#/components/register-name/steps/registration-process/steps/registration-payment/use-registration-payment-token";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import { useRegistrationPaymentStatus } from "#/hooks";
import { useRegistrationAttempts } from "#/hooks/use-registration-attempts";
import { useEnsConfig } from "#/providers";

export interface UseRegistrationPaymentProps {
  onCommitmentInvalid: (error: unknown) => void;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (registration: RegistrationSuccessDetails) => void;
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
  const duration = parseStoredDuration(storedAttempt?.duration);
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
    phase: "approval" | "registration",
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

  const handlePayment = async () => {
    setError(undefined);
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);

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

    const paymentData = refreshedPayment.data;
    if (!paymentData.hasSufficientBalance) {
      setActionStatus("idle");
      return;
    }

    if (!paymentData.hasSufficientAllowance) {
      let approvalHash: Hex | undefined;
      setActionStatus("approving");
      const approval = prepareRegistrationPaymentApprovalWrite({
        account: connection.address,
        amount: paymentData.total,
        network,
        paymentTokenAddress: paymentToken.address,
        registrarAddress: storedAttempt.registrarAddress,
      });

      if (approval.isErr()) {
        reportError(approval.error, "approval");
        setActionStatus("idle");
        return;
      }

      const execution = await executeContractWrites(
        walletClient,
        publicClient,
        {
          calls: [approval.value],
          chain,
          confirmation: "confirmed",
          onProgress: (progress) => {
            if (progress.strategy === "atomic") return;
            if (progress.state === "submitted") {
              approvalHash = progress.transactionHash;
              setActionStatus("confirming-approval");
              setTransactionHash(progress.transactionHash);
            }
            if (progress.state === "confirmed") {
              setIsTransactionConfirmed(true);
            }
          },
          strategy: "single",
        },
      );
      if (execution.isErr()) {
        reportError(execution.error, "approval", approvalHash);
        setActionStatus("idle");
        setIsTransactionConfirmed(false);
        setTransactionHash(undefined);
        return;
      }

      if (execution.value.strategy === "atomic") {
        reportError("TRANSACTION_CONFIRMATION_FAILED", "approval");
        setActionStatus("idle");
        return;
      }
      const approvedTransaction = execution.value.transactions[0];
      if (approvedTransaction?.receipt === undefined) {
        reportError("TRANSACTION_CONFIRMATION_FAILED", "approval");
        setActionStatus("idle");
        return;
      }

      emitNameRegistrationEvent(events.onApprove, {
        account: connection.address,
        amount: paymentData.total,
        chainId: chain.id,
        network,
        paymentTokenAddress: paymentToken.address,
        receipt: approvedTransaction.receipt,
        registrarAddress: storedAttempt.registrarAddress,
        transactionHash: approvedTransaction.transactionHash,
      });
      await new Promise((resolve) =>
        window.setTimeout(resolve, TRANSACTION_PROGRESS_COMPLETION_DURATION_MS),
      );
      await payment.refetch();
      setActionStatus("idle");
      setIsTransactionConfirmed(false);
      setTransactionHash(undefined);
      return;
    }

    const commitmentStatus = await readCommitmentStatus(publicClient, {
      commitment: storedAttempt.commitment,
      network,
      registrarAddress: storedAttempt.registrarAddress,
    });
    if (commitmentStatus.isErr()) {
      reportError(commitmentStatus.error, "registration");
      setActionStatus("idle");
      return;
    }

    if (commitmentStatus.value.state !== "READY") {
      const statusError =
        commitmentStatus.value.state === "WAITING"
          ? "COMMITMENT_NOT_READY"
          : commitmentStatus.value.state === "EXPIRED"
            ? "COMMITMENT_EXPIRED"
            : "COMMITMENT_NOT_FOUND";
      reportError(statusError, "registration");
      setActionStatus("idle");

      if (commitmentStatus.value.state !== "WAITING") {
        onCommitmentInvalid(statusError);
      }
      return;
    }

    setActionStatus("registering");
    let registrationHash: Hex | undefined;
    const registration = prepareRegisterNameWrite({
      account: connection.address,
      duration,
      input: storedAttempt.label,
      network,
      owner: storedAttempt.owner,
      paymentTokenAddress: paymentToken.address,
      referrer: storedAttempt.referrer,
      registrarAddress: storedAttempt.registrarAddress,
      resolverAddress: storedAttempt.resolver.address,
      secret: storedAttempt.secret,
      subregistryAddress: storedAttempt.subregistry,
    });
    if (registration.isErr()) {
      reportError(registration.error, "registration");
      setActionStatus("idle");
      return;
    }

    const execution = await executeContractWrites(walletClient, publicClient, {
      calls: [registration.value],
      chain,
      confirmation: "confirmed",
      onProgress: (progress) => {
        if (progress.strategy === "atomic") return;
        if (progress.state === "submitted") {
          registrationHash = progress.transactionHash;
          setActionStatus("confirming-registration");
          setTransactionHash(progress.transactionHash);
        }
        if (progress.state === "confirmed") {
          setIsTransactionConfirmed(true);
        }
      },
      strategy: "single",
    });
    if (execution.isErr()) {
      reportError(execution.error, "registration", registrationHash);
      setActionStatus("idle");
      setTransactionHash(undefined);
      return;
    }

    if (execution.value.strategy === "atomic") {
      reportError("TRANSACTION_CONFIRMATION_FAILED", "registration");
      setActionStatus("idle");
      return;
    }
    const registeredTransaction = execution.value.transactions[0];
    if (registeredTransaction?.receipt === undefined) {
      reportError("TRANSACTION_CONFIRMATION_FAILED", "registration");
      setActionStatus("idle");
      return;
    }
    const receipt = registeredTransaction.receipt;
    let registeredAt = Date.now();

    try {
      const block = await publicClient.getBlock({
        blockNumber: receipt.blockNumber,
      });
      registeredAt = Number(block.timestamp) * 1_000;
    } catch {
      // Receipt success remains authoritative if the timestamp read fails.
    }

    const confirmedRegistration = getRegistrationDetails({
      decimals: paymentData.decimals,
      fallbackAmount: paymentData.total,
      fallbackDuration: duration,
      fallbackLabel: registration.value.metadata.label,
      paymentTokenIcon: paymentToken.icon,
      paymentTokenSymbol: paymentToken.symbol,
      receipt,
      registeredAt,
      registrarAddress: storedAttempt.registrarAddress,
    });

    await new Promise((resolve) =>
      window.setTimeout(resolve, TRANSACTION_PROGRESS_COMPLETION_DURATION_MS),
    );
    deleteAttempt(registrationAttemptId);
    setRegistrationAttemptId(null);
    onSuccess(confirmedRegistration.details);
    emitNameRegistrationEvent(events.onRegister, {
      account: connection.address,
      amount: confirmedRegistration.amount,
      chainId: chain.id,
      decimals: paymentData.decimals,
      duration: confirmedRegistration.duration,
      expiresAt: confirmedRegistration.details.expiresAt,
      name: confirmedRegistration.details.name,
      network,
      owner: storedAttempt.owner,
      paymentTokenAddress: paymentToken.address,
      receipt,
      referrer: storedAttempt.referrer,
      registrarAddress: storedAttempt.registrarAddress,
      ...(confirmedRegistration.tokenId === undefined
        ? {}
        : { tokenId: confirmedRegistration.tokenId }),
      transactionHash: registeredTransaction.transactionHash,
    });
  };

  const buttonLabel =
    connection.address === undefined
      ? "Connect wallet to continue"
      : isWrongNetwork
        ? `Switch to ${chain.name}`
        : actionStatus === "approving"
          ? "Confirm approval in wallet"
          : actionStatus === "confirming-approval"
            ? "Confirming approval"
            : actionStatus === "registering"
              ? "Confirm registration in wallet"
              : actionStatus === "confirming-registration"
                ? "Confirming registration"
                : actionStatus === "refreshing"
                  ? "Refreshing registration price"
                  : payment.isError
                    ? "Try again"
                    : payment.data !== undefined &&
                        !payment.data.hasSufficientBalance
                      ? `Insufficient ${paymentToken.symbol} balance`
                      : payment.data?.hasSufficientAllowance
                        ? "Register name"
                        : `Approve ${paymentToken.symbol}`;

  return {
    actionStatus,
    buttonLabel,
    error,
    handlePayment,
    isPending,
    isTransactionConfirmed,
    payment,
    paymentToken,
    storedAttempt,
    timeRemaining,
    transactionHash,
  };
}
