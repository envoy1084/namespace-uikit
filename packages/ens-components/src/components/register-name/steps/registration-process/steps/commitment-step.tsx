"use client";

import type { Hex } from "viem";

import { useState } from "react";

import { Accordion, Button, Typography } from "@thenamespace/uikit";
import { bytesToHex, zeroAddress } from "viem";
import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { commitName } from "#/actions";
import { useRegisterName } from "#/components/register-name/context";
import { TransactionProgress } from "#/components/transaction-progress";
import { useCommitments } from "#/hooks";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

type CommitmentStatus = "confirming" | "idle" | "signing" | "switching";

export interface CommitmentStepProps {
  isDisabled?: boolean;
}

export function CommitmentStep({ isDisabled = false }: CommitmentStepProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const { insert } = useCommitments();
  const { duration, input, referrer, setCommitmentId } = useRegisterName();
  const [error, setError] = useState<unknown>();
  const [status, setStatus] = useState<CommitmentStatus>("idle");
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const isPending = status !== "idle";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;

  const handleCommit = async () => {
    setError(undefined);
    setTransactionHash(undefined);

    if (connection.address === undefined) {
      setError("WALLET_NOT_CONNECTED");
      return;
    }

    if (isWrongNetwork) {
      setStatus("switching");

      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        setError("CHAIN_SWITCH_FAILED");
      } finally {
        setStatus("idle");
      }

      return;
    }

    if (walletClient === undefined || publicClient === undefined) {
      setError("WALLET_NOT_CONNECTED");
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
      setError(result.error);
      setStatus("idle");
      return;
    }

    setStatus("confirming");
    setTransactionHash(result.value.transactionHash);

    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: result.value.transactionHash,
      });

      if (receipt.status !== "success") {
        setError("TRANSACTION_REVERTED");
        setStatus("idle");
        setTransactionHash(undefined);
        return;
      }

      const block = await publicClient.getBlock({
        blockNumber: receipt.blockNumber,
      });
      const commitmentId = insert({
        chainId: chain.id,
        commitment: result.value.commitment,
        createdAt: Number(block.timestamp) * 1_000,
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
    } catch {
      setError("TRANSACTION_CONFIRMATION_FAILED");
      setStatus("idle");
      setTransactionHash(undefined);
    }
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
            className="text-foreground text-base font-semibold"
            level={3}
          >
            Start your registration
          </Typography.Heading>
          <Typography.Paragraph className="mt-1" color="muted" size="xs">
            Submit a commitment transaction to begin the secure registration
            process.
          </Typography.Paragraph>
          {status === "confirming" && transactionHash !== undefined ? (
            <TransactionProgress
              blockExplorerUrl={chain.blockExplorers?.default.url}
              className="mt-4"
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
          {error !== undefined ? (
            <Typography.Paragraph
              className="text-danger mt-2"
              size="xs"
              role="alert"
            >
              {formatError(error)}
            </Typography.Paragraph>
          ) : null}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
