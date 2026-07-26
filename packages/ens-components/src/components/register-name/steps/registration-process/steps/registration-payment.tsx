"use client";

import { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  NumberValue,
  Skeleton,
  Typography,
} from "@thenamespace/uikit";
import { formatUnits, type Hex } from "viem";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { approveRegistrationPayment, registerName } from "#/actions";
import {
  COMMITMENT_VALID_DURATION_MS,
  useRegisterName,
} from "#/components/register-name/context";
import { TransactionProgress } from "#/components/transaction-progress";
import { useCommitments, useRegistrationPaymentStatus } from "#/hooks";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

type PaymentActionStatus =
  | "approving"
  | "confirming-approval"
  | "confirming-registration"
  | "idle"
  | "registering"
  | "switching";

export interface RegistrationPaymentProps {
  onSuccess: (name: string, transactionHash: Hex) => void;
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

export function RegistrationPayment({ onSuccess }: RegistrationPaymentProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const { commitmentId, setCommitmentId } = useRegisterName();
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
  };

  const handlePayment = async () => {
    setError(undefined);
    setTransactionHash(undefined);

    if (connection.address === undefined) {
      setError("WALLET_NOT_CONNECTED");
      return;
    }

    if (isWrongNetwork) {
      setActionStatus("switching");

      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        setError("CHAIN_SWITCH_FAILED");
      } finally {
        setActionStatus("idle");
      }

      return;
    }

    if (payment.isError) {
      await payment.refetch();
      return;
    }

    if (
      walletClient === undefined ||
      publicClient === undefined ||
      storedCommitment === undefined ||
      commitmentId === null ||
      payment.data === undefined
    ) {
      setError("CONTRACT_READ_FAILED");
      return;
    }

    if (!payment.data.hasSufficientBalance) return;

    if (!payment.data.hasSufficientAllowance) {
      setActionStatus("approving");
      const approval = await approveRegistrationPayment(walletClient, {
        account: connection.address,
        amount: payment.data.total,
        network,
        paymentTokenAddress: paymentToken.address,
        registrarAddress: storedCommitment.registrarAddress,
      });

      if (approval.isErr()) {
        setError(approval.error);
        setActionStatus("idle");
        return;
      }

      setActionStatus("confirming-approval");
      setTransactionHash(approval.value);

      try {
        await waitForSuccess(approval.value);
        await payment.refetch();
      } catch (approvalError) {
        setError(approvalError);
      } finally {
        setActionStatus("idle");
        setTransactionHash(undefined);
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
      setError(registration.error);
      setActionStatus("idle");
      return;
    }

    setActionStatus("confirming-registration");
    setTransactionHash(registration.value.transactionHash);

    try {
      await waitForSuccess(registration.value.transactionHash);
      deleteCommitment(commitmentId);
      setCommitmentId(null);
      onSuccess(
        `${registration.value.label}.eth`,
        registration.value.transactionHash,
      );
    } catch (registrationError) {
      setError(registrationError);
      setActionStatus("idle");
      setTransactionHash(undefined);
    }
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
      <div className="flex items-center justify-between gap-4">
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
            <NumberValue
              className="text-foreground text-sm font-semibold"
              maximumFractionDigits={2}
              minimumFractionDigits={2}
              value={Number(
                formatUnits(payment.data.total, payment.data.decimals),
              )}
            />
          ) : (
            <span className="text-muted text-sm">—</span>
          )}
        </div>
      </div>
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
          className="mt-4"
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
