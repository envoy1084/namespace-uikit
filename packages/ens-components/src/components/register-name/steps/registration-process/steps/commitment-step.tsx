"use client";

import type { Hex } from "viem";

import { useEffect, useState } from "react";

import { Accordion, Button, Typography } from "@thenamespace/uikit";
import { bytesToHex, zeroAddress } from "viem";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { commitName } from "#/actions";
import { useNameRegistration } from "#/components/register-name/context";
import { emitNameRegistrationEvent } from "#/components/register-name/emit-event";
import {
  TRANSACTION_PROGRESS_COMPLETION_DURATION_MS,
  TransactionProgress,
} from "#/components/transaction-progress";
import { useCommitments } from "#/hooks";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

type CommitmentStatus = "confirming" | "idle" | "signing" | "switching";

export interface CommitmentStepProps {
  error?: unknown;
  isDisabled?: boolean;
  onErrorClear?: () => void;
  onPendingChange?: (isPending: boolean) => void;
}

export function CommitmentStep({
  error: externalError,
  isDisabled = false,
  onErrorClear,
  onPendingChange,
}: CommitmentStepProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const { insert } = useCommitments();
  const { duration, events, input, referrer, setCommitmentId } =
    useNameRegistration();
  const [error, setError] = useState<unknown>();
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [status, setStatus] = useState<CommitmentStatus>("idle");
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const isPending = status !== "idle";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;

  const reportError = (nextError: unknown, hash?: Hex) => {
    setError(nextError);
    emitNameRegistrationEvent(events.onError, {
      chainId: chain.id,
      error: nextError,
      input,
      network,
      phase: "commitment",
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

  const handleCommit = async () => {
    setError(undefined);
    onErrorClear?.();
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);

    if (connection.address === undefined) {
      reportError("WALLET_NOT_CONNECTED");
      return;
    }

    if (isWrongNetwork) {
      setStatus("switching");

      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        reportError("CHAIN_SWITCH_FAILED");
      } finally {
        setStatus("idle");
      }

      return;
    }

    if (walletClient === undefined || publicClient === undefined) {
      reportError("WALLET_NOT_CONNECTED");
      return;
    }

    const secret = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));

    setStatus("signing");

    const result = await commitName(walletClient, {
      account: connection.address,
      duration,
      input,
      network,
      owner: connection.address,
      referrer,
      registrarAddress: contracts.ethRegistrar.address,
      resolverAddress: zeroAddress,
      secret,
      subregistryAddress: zeroAddress,
    });

    if (result.isErr()) {
      reportError(result.error);
      setStatus("idle");
      return;
    }

    setStatus("confirming");
    setTransactionHash(result.value.transactionHash);

    let receipt: Awaited<
      ReturnType<typeof publicClient.waitForTransactionReceipt>
    >;

    try {
      receipt = await publicClient.waitForTransactionReceipt({
        hash: result.value.transactionHash,
      });

      if (receipt.status !== "success") {
        reportError("TRANSACTION_REVERTED", result.value.transactionHash);
        setStatus("idle");
        setTransactionHash(undefined);
        return;
      }
    } catch {
      reportError(
        "TRANSACTION_CONFIRMATION_FAILED",
        result.value.transactionHash,
      );
      setStatus("idle");
      setTransactionHash(undefined);
      return;
    }

    setIsTransactionConfirmed(true);

    let createdAt = Date.now();

    try {
      const block = await publicClient.getBlock({
        blockNumber: receipt.blockNumber,
      });
      createdAt = Number(block.timestamp) * 1_000;
    } catch {
      // The successful receipt is authoritative. Local time is sufficient for
      // the countdown when the secondary timestamp read is unavailable.
    }

    await new Promise((resolve) =>
      window.setTimeout(resolve, TRANSACTION_PROGRESS_COMPLETION_DURATION_MS),
    );
    const commitmentId = insert({
      chainId: chain.id,
      commitment: result.value.commitment,
      createdAt,
      duration: duration.toString(),
      label: result.value.label,
      owner: connection.address,
      referrer,
      registrarAddress: contracts.ethRegistrar.address,
      resolver: zeroAddress,
      secret,
      subregistry: zeroAddress,
      transactionHash: result.value.transactionHash,
    });

    setCommitmentId(commitmentId);
    emitNameRegistrationEvent(events.onCommit, {
      chainId: chain.id,
      commitment: result.value.commitment,
      commitmentId,
      duration,
      name: `${result.value.label}.eth`,
      network,
      owner: connection.address,
      receipt,
      referrer,
      registrarAddress: contracts.ethRegistrar.address,
      transactionHash: result.value.transactionHash,
    });
  };

  const buttonLabel =
    connection.address === undefined
      ? "Connect wallet to continue"
      : isWrongNetwork
        ? `Switch to ${chain.name}`
        : status === "confirming"
          ? "Confirming commitment"
          : status === "signing"
            ? "Confirm in wallet"
            : "Commit name";

  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="commitment"
      isDisabled={isDisabled}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            1
          </span>
          <span className="text-foreground">Commitment</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="px-4 pt-2 pb-4 text-center">
          <Typography.Heading
            className="text-foreground text-center text-base font-semibold"
            level={3}
          >
            Start your registration
          </Typography.Heading>
          <Typography.Paragraph
            className="mx-auto mt-1 text-center leading-[1.2]"
            color="muted"
            size="xs"
          >
            Submit a commitment transaction to begin the secure registration
            process.
          </Typography.Paragraph>
          {status === "confirming" && transactionHash !== undefined ? (
            <TransactionProgress
              blockExplorerUrl={chain.blockExplorers?.default.url}
              chainId={chain.id}
              className="mt-4"
              isConfirmed={isTransactionConfirmed}
              transactionHash={transactionHash}
            />
          ) : (
            <Button
              className="mt-4 w-full"
              isDisabled={connection.address === undefined}
              isPending={isPending}
              onPress={handleCommit}
            >
              {buttonLabel}
            </Button>
          )}
          {error !== undefined || externalError !== undefined ? (
            <Typography.Paragraph
              className="text-danger mt-2"
              size="xs"
              role="alert"
            >
              {formatError(error ?? externalError)}
            </Typography.Paragraph>
          ) : null}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
