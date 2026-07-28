"use client";

import { useEffect, useRef, useState } from "react";

import { err, ok } from "neverthrow";
import type { Hex } from "viem";
import { isAddressEqual } from "viem";
import { useConnection, usePublicClient, useSwitchChain, useWalletClient } from "wagmi";

import type { ContractWriteProgress } from "#/actions";
import { emitComponentEvent } from "#/components/emit-event";
import type { NameProfileEditorMessages } from "#/components/name-profile-editor/customization";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import {
  submitProfileUpdate,
  type ProfileUpdateSubmissionSuccess,
} from "#/components/name-profile-editor/submission/profile-update-submission";
import type { NameProfileEditorReview } from "#/components/name-profile-editor/types";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import { useExecuteContractWrites, useNameResolver } from "#/hooks";
import { delay } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type ProfileUpdateActionStatus =
  | "confirming"
  | "idle"
  | "preparing"
  | "signing"
  | "switching";

export interface UseProfileUpdateSubmissionParameters {
  events: NameProfileEditorEvents;
  messages: NameProfileEditorMessages;
  name: string;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (result: ProfileUpdateSubmissionSuccess) => void;
}

export function useProfileUpdateSubmission({
  events,
  messages,
  name,
  onPendingChange,
  onSuccess,
}: UseProfileUpdateSubmissionParameters) {
  const connection = useConnection();
  const { chain, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const contractWrites = useExecuteContractWrites();
  const currentResolver = useNameResolver({
    input: name,
    query: {
      enabled: false,
      retry: (failureCount, error) => error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const { switchChainAsync } = useSwitchChain();
  const [actionStatus, setActionStatus] = useState<ProfileUpdateActionStatus>("idle");
  const [error, setError] = useState<unknown>();
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const transactionHashRef = useRef<Hex | undefined>(undefined);
  const resolverAddressRef = useRef<`0x${string}` | undefined>(undefined);
  const connectionRef = useRef({
    address: connection.address,
    chainId: connection.chainId,
  });
  connectionRef.current = {
    address: connection.address,
    chainId: connection.chainId,
  };
  const isPending = actionStatus !== "idle";
  const isConfirming = actionStatus === "confirming";
  const isWrongNetwork = connection.chainId !== undefined && connection.chainId !== chain.id;

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
    emitComponentEvent(events.onError, {
      ...(connection.address === undefined ? {} : { account: connection.address }),
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

  const handleUpdate = async (review: NameProfileEditorReview, resolverAddress: `0x${string}`) => {
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

    const submissionAccount = connection.address;
    const validateConnection = () => {
      const current = connectionRef.current;
      if (current.address === undefined || !isAddressEqual(current.address, submissionAccount)) {
        return err("WALLET_ACCOUNT_CHANGED" as const);
      }
      if (current.chainId !== chain.id) {
        return err("WALLET_NETWORK_CHANGED" as const);
      }
      return ok(undefined);
    };

    setActionStatus("preparing");
    const resolverResult = await currentResolver.refetch();
    if (resolverResult.isError || resolverResult.data === undefined) {
      reportError(resolverResult.error ?? "CONTRACT_READ_FAILED");
      setActionStatus("idle");
      return;
    }
    if (!isAddressEqual(resolverResult.data.resolverAddress, resolverAddress)) {
      reportError("RESOLVER_CHANGED");
      setActionStatus("idle");
      return;
    }

    const result = await submitProfileUpdate({
      account: submissionAccount,
      executeWrites: contractWrites.mutateAsync,
      input: name,
      network,
      onProgress: handleProgress,
      publicClient,
      resolverAddress,
      review,
      validateConnection,
    });
    if (result.isErr()) {
      reportError(result.error);
      setActionStatus("idle");
      setIsTransactionConfirmed(false);
      return;
    }

    emitComponentEvent(events.onUpdate, {
      account: submissionAccount,
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
    setActionStatus("idle");
    onSuccess(result.value);
  };

  const buttonLabel =
    connection.address === undefined
      ? messages.connectWalletLabel
      : isWrongNetwork
        ? messages.switchNetworkLabel
        : actionStatus === "switching"
          ? messages.switchingNetworkLabel
          : actionStatus === "preparing"
            ? messages.preparingUpdateLabel
            : actionStatus === "signing"
              ? messages.confirmInWalletLabel
              : messages.updateLabel;

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
