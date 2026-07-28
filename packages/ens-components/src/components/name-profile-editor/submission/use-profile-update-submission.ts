"use client";

import type { Hex } from "viem";

import type { ContractWriteProgress } from "#/actions";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import type { NameProfileEditorReview } from "#/components/name-profile-editor/types";

import { useEffect, useRef, useState } from "react";

import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { emitNameProfileEditorEvent } from "#/components/name-profile-editor/emit-event";
import {
  submitProfileUpdate,
  type ProfileUpdateSubmissionSuccess,
} from "#/components/name-profile-editor/submission/profile-update-submission";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import { delay } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type ProfileUpdateActionStatus =
  | "confirming"
  | "idle"
  | "signing"
  | "switching";

export interface UseProfileUpdateSubmissionProps {
  events: NameProfileEditorEvents;
  name: string;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (result: ProfileUpdateSubmissionSuccess) => void;
  updateLabel: string;
}

export function useProfileUpdateSubmission({
  events,
  name,
  onPendingChange,
  onSuccess,
  updateLabel,
}: UseProfileUpdateSubmissionProps) {
  const connection = useConnection();
  const { chain, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const [actionStatus, setActionStatus] =
    useState<ProfileUpdateActionStatus>("idle");
  const [error, setError] = useState<unknown>();
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const transactionHashRef = useRef<Hex | undefined>(undefined);
  const resolverAddressRef = useRef<`0x${string}` | undefined>(undefined);
  const isPending = actionStatus !== "idle";
  const isConfirming = actionStatus === "confirming";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  useEffect(
    () => () => {
      onPendingChange?.(false);
    },
    [onPendingChange],
  );

  const reportError = (nextError: unknown) => {
    setError(nextError);
    emitNameProfileEditorEvent(events.onError, {
      ...(connection.address === undefined
        ? {}
        : { account: connection.address }),
      chainId: chain.id,
      error: nextError,
      name,
      network,
      phase: "update",
      ...(resolverAddressRef.current === undefined
        ? {}
        : { resolverAddress: resolverAddressRef.current }),
      ...(transactionHashRef.current === undefined
        ? {}
        : { transactionHash: transactionHashRef.current }),
    });
  };

  const handleProgress = (progress: ContractWriteProgress) => {
    if (progress.strategy === "atomic") return;

    if (progress.state === "signing") {
      setActionStatus("signing");
      setTransactionHash(undefined);
      transactionHashRef.current = undefined;
      setIsTransactionConfirmed(false);
      return;
    }

    setActionStatus("confirming");
    setTransactionHash(progress.transactionHash);
    transactionHashRef.current = progress.transactionHash;
    setIsTransactionConfirmed(progress.state === "confirmed");
  };

  const handleUpdate = async (
    review: NameProfileEditorReview,
    resolverAddress: `0x${string}`,
  ) => {
    setError(undefined);
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);
    transactionHashRef.current = undefined;
    resolverAddressRef.current = resolverAddress;

    if (connection.address === undefined) {
      reportError("WALLET_NOT_CONNECTED");
      return;
    }
    if (isWrongNetwork) {
      setActionStatus("switching");
      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        reportError("CHAIN_SWITCH_FAILED");
      } finally {
        setActionStatus("idle");
      }
      return;
    }
    if (walletClient === undefined || publicClient === undefined) {
      reportError("CONTRACT_READ_FAILED");
      return;
    }

    const result = await submitProfileUpdate({
      account: connection.address,
      chain,
      input: name,
      network,
      onProgress: handleProgress,
      publicClient,
      resolverAddress,
      review,
      walletClient,
    });
    if (result.isErr()) {
      reportError(result.error);
      setActionStatus("idle");
      setIsTransactionConfirmed(false);
      return;
    }

    emitNameProfileEditorEvent(events.onUpdate, {
      account: connection.address,
      chainId: chain.id,
      changes: review.changes,
      name,
      network,
      receipt: result.value.receipt,
      resolverAddress,
      transactionHash: result.value.transactionHash,
      values: review.values,
    });
    await delay(TRANSACTION_PROGRESS_COMPLETION_DURATION_MS);
    onSuccess(result.value);
  };

  const buttonLabel =
    connection.address === undefined
      ? "Connect wallet to continue"
      : isWrongNetwork
        ? `Switch to ${chain.name}`
        : actionStatus === "switching"
          ? `Switching to ${chain.name}`
          : actionStatus === "signing"
            ? "Confirm in wallet"
            : updateLabel;

  return {
    account: connection.address,
    actionStatus,
    buttonLabel,
    error,
    handleUpdate,
    isConfirming,
    isPending,
    isTransactionConfirmed,
    isWalletConnected: connection.address !== undefined,
    transactionHash,
  };
}
