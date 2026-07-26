"use client";

import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-process/registration-success";

import { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Skeleton,
  Surface,
  Typography,
} from "@thenamespace/uikit";
import { parseEventLogs, type Hex } from "viem";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import {
  approveRegistrationPayment,
  getCommitmentStatus,
  registerName,
} from "#/actions";
import {
  COMMITMENT_VALID_DURATION_MS,
  useNameRegistration,
} from "#/components/register-name/context";
import { emitNameRegistrationEvent } from "#/components/register-name/emit-event";
import {
  TRANSACTION_PROGRESS_COMPLETION_DURATION_MS,
  TransactionProgress,
} from "#/components/transaction-progress";
import { ethRegistrarNameRegisteredEventSnippet } from "#/data/abi";
import { useCommitments, useRegistrationPaymentStatus } from "#/hooks";
import { formatError, formatTokenAmount } from "#/lib";
import { useEnsConfig } from "#/providers";

type PaymentActionStatus =
  | "approving"
  | "confirming-approval"
  | "confirming-registration"
  | "idle"
  | "refreshing"
  | "registering"
  | "switching";

export interface RegistrationPaymentProps {
  onCommitmentInvalid: (error: unknown) => void;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (registration: RegistrationSuccessDetails) => void;
}

function formatTimeRemaining(milliseconds: number) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

function parseDuration(value: string | undefined) {
  if (value === undefined) return 0n;

  try {
    return BigInt(value);
  } catch {
    return 0n;
  }
}

export function RegistrationPayment({
  onCommitmentInvalid,
  onPendingChange,
  onSuccess,
}: RegistrationPaymentProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const { commitmentId, events, setCommitmentId, slots } =
    useNameRegistration();
  const { delete: deleteCommitment, get } = useCommitments();
  const storedCommitment =
    commitmentId === null ? undefined : get(commitmentId);
  const duration = parseDuration(storedCommitment?.duration);
  const paymentToken = contracts.mockUsdc;
  const payment = useRegistrationPaymentStatus({
    account: connection.address,
    duration,
    input: storedCommitment?.label,
    paymentTokenAddress: paymentToken.address,
    ...(storedCommitment === undefined
      ? {}
      : { registrarAddress: storedCommitment.registrarAddress }),
    query: {
      enabled: storedCommitment !== undefined && duration > 0n,
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
    storedCommitment === undefined
      ? 0
      : storedCommitment.createdAt + COMMITMENT_VALID_DURATION_MS;
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
      input: storedCommitment?.label ?? "",
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
    if (storedCommitment === undefined || isPending) return;

    const updateExpiry = () => {
      const currentTime = Date.now();
      setNow(currentTime);

      if (currentTime >= expiresAt && commitmentId !== null) {
        deleteCommitment(commitmentId);
        setCommitmentId(null);
      }
    };

    updateExpiry();
    const interval = window.setInterval(updateExpiry, 30_000);
    return () => window.clearInterval(interval);
  }, [
    commitmentId,
    deleteCommitment,
    expiresAt,
    isPending,
    setCommitmentId,
    storedCommitment,
  ]);

  const waitForSuccess = async (hash: Hex) => {
    if (publicClient === undefined) {
      throw new Error("Public client unavailable.");
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    if (receipt.status !== "success") {
      throw "TRANSACTION_REVERTED";
    }

    return receipt;
  };

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
      storedCommitment === undefined ||
      commitmentId === null
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
      setActionStatus("approving");
      const approval = await approveRegistrationPayment(walletClient, {
        account: connection.address,
        amount: paymentData.total,
        network,
        paymentTokenAddress: paymentToken.address,
        registrarAddress: storedCommitment.registrarAddress,
      });

      if (approval.isErr()) {
        reportError(approval.error, "approval");
        setActionStatus("idle");
        return;
      }

      setActionStatus("confirming-approval");
      setTransactionHash(approval.value);

      try {
        const approvalReceipt = await waitForSuccess(approval.value);
        setIsTransactionConfirmed(true);
        emitNameRegistrationEvent(events.onApprove, {
          account: connection.address,
          amount: paymentData.total,
          chainId: chain.id,
          network,
          paymentTokenAddress: paymentToken.address,
          receipt: approvalReceipt,
          registrarAddress: storedCommitment.registrarAddress,
          transactionHash: approval.value,
        });
        await new Promise((resolve) =>
          window.setTimeout(
            resolve,
            TRANSACTION_PROGRESS_COMPLETION_DURATION_MS,
          ),
        );
        await payment.refetch();
      } catch (approvalError) {
        reportError(approvalError, "approval", approval.value);
      } finally {
        setActionStatus("idle");
        setIsTransactionConfirmed(false);
        setTransactionHash(undefined);
      }

      return;
    }

    const commitmentStatus = await getCommitmentStatus(publicClient, {
      commitment: storedCommitment.commitment,
      network,
      registrarAddress: storedCommitment.registrarAddress,
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
        deleteCommitment(commitmentId);
        setCommitmentId(null);
        onCommitmentInvalid(statusError);
      }

      return;
    }

    setActionStatus("registering");
    const registration = await registerName(walletClient, {
      account: connection.address,
      duration,
      input: storedCommitment.label,
      network,
      owner: storedCommitment.owner,
      paymentTokenAddress: paymentToken.address,
      referrer: storedCommitment.referrer,
      registrarAddress: storedCommitment.registrarAddress,
      resolverAddress: storedCommitment.resolver,
      secret: storedCommitment.secret,
      subregistryAddress: storedCommitment.subregistry,
    });

    if (registration.isErr()) {
      reportError(registration.error, "registration");
      setActionStatus("idle");
      return;
    }

    setActionStatus("confirming-registration");
    setTransactionHash(registration.value.transactionHash);

    let receipt: Awaited<ReturnType<typeof waitForSuccess>>;

    try {
      receipt = await waitForSuccess(registration.value.transactionHash);
    } catch (registrationError) {
      reportError(
        registrationError,
        "registration",
        registration.value.transactionHash,
      );
      setActionStatus("idle");
      setTransactionHash(undefined);
      return;
    }

    setIsTransactionConfirmed(true);

    let registeredAt = Date.now();

    try {
      const block = await publicClient.getBlock({
        blockNumber: receipt.blockNumber,
      });
      registeredAt = Number(block.timestamp) * 1_000;
    } catch {
      // The successful receipt is authoritative. A secondary timestamp read
      // must not turn a completed registration into a failed UI state.
    }

    const registrationEvent = (() => {
      try {
        return parseEventLogs({
          abi: ethRegistrarNameRegisteredEventSnippet,
          eventName: "NameRegistered",
          logs: receipt.logs.filter(
            (log) =>
              log.address.toLowerCase() ===
              storedCommitment.registrarAddress.toLowerCase(),
          ),
          strict: true,
        })[0];
      } catch {
        return undefined;
      }
    })();
    const registeredDuration = registrationEvent?.args.duration ?? duration;
    const registrationAmount =
      registrationEvent === undefined
        ? paymentData.total
        : registrationEvent.args.base + registrationEvent.args.premium;
    const registeredLabel =
      registrationEvent?.args.label ?? registration.value.label;
    const registrationDetails: RegistrationSuccessDetails = {
      amount: registrationAmount,
      decimals: paymentData.decimals,
      duration: registeredDuration,
      expiresAt: registeredAt + Number(registeredDuration) * 1_000,
      name: `${registeredLabel}.eth`,
      paymentTokenIcon: paymentToken.icon,
      paymentTokenSymbol: paymentToken.symbol,
    };

    await new Promise((resolve) =>
      window.setTimeout(resolve, TRANSACTION_PROGRESS_COMPLETION_DURATION_MS),
    );
    deleteCommitment(commitmentId);
    setCommitmentId(null);
    onSuccess(registrationDetails);
    emitNameRegistrationEvent(events.onRegister, {
      account: connection.address,
      amount: registrationAmount,
      chainId: chain.id,
      decimals: paymentData.decimals,
      duration: registeredDuration,
      expiresAt: registrationDetails.expiresAt,
      name: registrationDetails.name,
      network,
      owner: storedCommitment.owner,
      paymentTokenAddress: paymentToken.address,
      receipt,
      referrer: storedCommitment.referrer,
      registrarAddress: storedCommitment.registrarAddress,
      ...(registrationEvent === undefined
        ? {}
        : { tokenId: registrationEvent.args.tokenId }),
      transactionHash: registration.value.transactionHash,
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

  return (
    <div className="mt-4">
      <Surface
        className="flex items-center justify-between gap-4 rounded-xl px-3 py-2"
        variant="secondary"
      >
        <Typography.Paragraph color="muted" size="xs">
          Registration price
        </Typography.Paragraph>
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <Avatar.Image
              alt={`${paymentToken.symbol} logo`}
              src={paymentToken.icon}
            />
            <Avatar.Fallback>{paymentToken.symbol.slice(0, 1)}</Avatar.Fallback>
          </Avatar>
          {payment.isPending || payment.isFetching ? (
            <Skeleton className="h-5 w-14 rounded-md" />
          ) : payment.data ? (
            <span className="text-foreground text-sm font-semibold">
              {formatTokenAmount(payment.data.total, payment.data.decimals, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          ) : (
            <span className="text-muted text-sm">—</span>
          )}
        </div>
      </Surface>
      <Typography.Paragraph
        className="mt-2 text-center"
        color="muted"
        size="xs"
      >
        Complete registration within {formatTimeRemaining(timeRemaining)}.
      </Typography.Paragraph>
      {(actionStatus === "confirming-approval" ||
        actionStatus === "confirming-registration") &&
      transactionHash !== undefined ? (
        <TransactionProgress
          blockExplorerUrl={chain.blockExplorers?.default.url}
          chainId={chain.id}
          className="mt-4"
          icon={slots.transactionProgressIcon}
          isConfirmed={isTransactionConfirmed}
          transactionHash={transactionHash}
        />
      ) : (
        <Button
          className="mt-4 w-full"
          isDisabled={
            connection.address === undefined ||
            payment.isPending ||
            (payment.data !== undefined && !payment.data.hasSufficientBalance)
          }
          isPending={isPending}
          onPress={handlePayment}
        >
          {buttonLabel}
        </Button>
      )}
      {payment.isError || error !== undefined ? (
        <Typography.Paragraph
          className="text-danger mt-2 text-center"
          size="xs"
          role="alert"
        >
          {formatError(error ?? payment.error, {
            name: storedCommitment?.label,
          })}
        </Typography.Paragraph>
      ) : null}
    </div>
  );
}
