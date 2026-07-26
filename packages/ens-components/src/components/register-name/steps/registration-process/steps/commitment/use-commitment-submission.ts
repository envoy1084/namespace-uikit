"use client";

import type { Hex } from "viem";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  useConnection,
  usePublicClient,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import { useNameRegistration } from "#/components/register-name/context";
import { emitNameRegistrationEvent } from "#/components/register-name/emit-event";
import {
  type CommitmentSubmissionSuccess,
  type CommitmentTransactionPhase,
  type CommitmentTransactionProgress,
  submitRegistrationAttempt,
} from "#/components/register-name/steps/registration-process/steps/commitment/commitment-submission";
import { reconcileRegistrationAttempt } from "#/components/register-name/steps/registration-process/steps/commitment/reconcile-registration-attempt";
import { prepareRegistrationAttempt } from "#/components/register-name/steps/registration-process/steps/commitment/registration-attempt";
import { TRANSACTION_PROGRESS_COMPLETION_DURATION_MS } from "#/components/transaction-progress";
import {
  useRegistrationAttempts,
  type StoredRegistrationAttempt,
} from "#/hooks/use-registration-attempts";
import { delay, parseRegistrationDuration } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type CommitmentSubmissionStatus =
  | "confirming"
  | "idle"
  | "preparing"
  | "reconciling"
  | "signing"
  | "switching";

export interface UseCommitmentSubmissionProps {
  error?: unknown;
  onConfirmed: () => void;
  onErrorClear?: () => void;
  onPendingChange?: (isPending: boolean) => void;
}

export function useCommitmentSubmission({
  error: externalError,
  onConfirmed,
  onErrorClear,
  onPendingChange,
}: UseCommitmentSubmissionProps) {
  const connection = useConnection();
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });
  const { switchChainAsync } = useSwitchChain();
  const {
    duration,
    events,
    input,
    paymentTokenAddress,
    referrer,
    registrationAttemptId,
    resolverAddress,
    setRegistrationAttemptId,
  } = useNameRegistration();
  const { get, insert, update } = useRegistrationAttempts();
  const storedAttempt =
    registrationAttemptId === null ? undefined : get(registrationAttemptId);
  const [localError, setLocalError] = useState<unknown>();
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [phase, setPhase] = useState<CommitmentTransactionPhase>("commitment");
  const [status, setStatus] = useState<CommitmentSubmissionStatus>("idle");
  const [transactionHash, setTransactionHash] = useState<Hex>();
  const activeSubmission = useRef(false);
  const phaseRef = useRef<CommitmentTransactionPhase>("commitment");
  const reconciledSubmission = useRef<string | undefined>(undefined);
  const transactionHashRef = useRef<Hex | undefined>(undefined);
  const isPending = status !== "idle";
  const isWrongNetwork =
    connection.chainId !== undefined && connection.chainId !== chain.id;

  const reportError = useCallback(
    (
      nextError: unknown,
      errorPhase: CommitmentTransactionPhase,
      hash?: Hex,
    ) => {
      setLocalError(nextError);
      emitNameRegistrationEvent(events.onError, {
        chainId: chain.id,
        error: nextError,
        input,
        network,
        phase: errorPhase,
        ...(hash === undefined ? {} : { transactionHash: hash }),
      });
    },
    [chain.id, events.onError, input, network],
  );

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  useEffect(
    () => () => {
      onPendingChange?.(false);
    },
    [onPendingChange],
  );

  const handleProgress = useCallback(
    async (progress: CommitmentTransactionProgress) => {
      setPhase(progress.phase);
      phaseRef.current = progress.phase;
      setTransactionHash(progress.hash);
      transactionHashRef.current = progress.hash;
      setIsTransactionConfirmed(progress.state === "confirmed");
      setStatus(progress.state === "signing" ? "signing" : "confirming");

      if (progress.state === "confirmed") {
        await delay(TRANSACTION_PROGRESS_COMPLETION_DURATION_MS);
      }
    },
    [],
  );

  const reconcile = useCallback(
    async (attempt: StoredRegistrationAttempt) => {
      if (publicClient === undefined) return undefined;

      setStatus("reconciling");
      const result = await reconcileRegistrationAttempt({
        attempt,
        network,
        publicClient,
        ...(walletClient === undefined ? {} : { walletClient }),
        onUpdate: (updates) => update(attempt.id, updates),
      });

      if (result.isErr()) {
        reportError(result.error, "commitment");
        setStatus("idle");
        return result;
      }

      if (result.value.state === "CONFIRMED") {
        setStatus("idle");
        onConfirmed();
        return result;
      }

      setStatus("idle");
      return result;
    },
    [network, onConfirmed, publicClient, reportError, update, walletClient],
  );

  useEffect(() => {
    if (
      storedAttempt === undefined ||
      activeSubmission.current ||
      storedAttempt.submission.type === "prepared" ||
      storedAttempt.submission.type === "resolver-confirmed" ||
      storedAttempt.submission.type === "confirmed"
    ) {
      return;
    }

    const key = `${storedAttempt.id}:${storedAttempt.submission.type}`;
    if (reconciledSubmission.current === key) return;
    reconciledSubmission.current = key;
    void reconcile(storedAttempt);
  }, [reconcile, storedAttempt]);

  const handleSuccess = useCallback(
    (
      attempt: StoredRegistrationAttempt,
      result: CommitmentSubmissionSuccess,
    ) => {
      const attemptDuration = parseRegistrationDuration(attempt.duration);

      if (
        attempt.resolver.type === "dedicated" &&
        result.resolverReceipt !== undefined &&
        result.resolverTransactionHash !== undefined
      ) {
        emitNameRegistrationEvent(events.onResolverDeploy, {
          chainId: chain.id,
          factoryAddress: attempt.resolver.factoryAddress,
          implementationAddress: attempt.resolver.implementationAddress,
          network,
          owner: attempt.owner,
          receipt: result.resolverReceipt,
          resolverAddress: attempt.resolver.address,
          transactionHash: result.resolverTransactionHash,
        });
      }

      if (
        attemptDuration !== undefined &&
        result.commitmentReceipt !== undefined &&
        result.transactionHash !== undefined
      ) {
        emitNameRegistrationEvent(events.onCommit, {
          chainId: chain.id,
          commitment: attempt.commitment,
          registrationAttemptId: attempt.id,
          duration: attemptDuration,
          name: attempt.normalizedName,
          network,
          owner: attempt.owner,
          receipt: result.commitmentReceipt,
          referrer: attempt.referrer,
          registrarAddress: attempt.registrarAddress,
          transactionHash: result.transactionHash,
        });
      }

      onConfirmed();
    },
    [chain.id, events.onCommit, events.onResolverDeploy, network, onConfirmed],
  );

  const submit = async () => {
    setLocalError(undefined);
    onErrorClear?.();
    setIsTransactionConfirmed(false);
    setTransactionHash(undefined);
    transactionHashRef.current = undefined;

    if (connection.address === undefined) {
      reportError("WALLET_NOT_CONNECTED", "commitment");
      return;
    }

    if (isWrongNetwork) {
      setStatus("switching");

      try {
        await switchChainAsync({ chainId: chain.id });
      } catch {
        reportError("CHAIN_SWITCH_FAILED", "commitment");
      } finally {
        setStatus("idle");
      }

      return;
    }

    if (walletClient === undefined || publicClient === undefined) {
      reportError("WALLET_NOT_CONNECTED", "commitment");
      return;
    }

    activeSubmission.current = true;
    let attempt = storedAttempt;

    if (attempt === undefined) {
      setStatus("preparing");
      const prepared = await prepareRegistrationAttempt(publicClient, {
        account: connection.address,
        chainId: chain.id,
        duration,
        factoryAddress: contracts.verifiableFactory.address,
        implementationAddress:
          contracts.permissionedResolverImplementation.address,
        input,
        network,
        owner: connection.address,
        paymentTokenAddress,
        referrer,
        registrarAddress: contracts.ethRegistrar.address,
        resolverAddress,
      });

      if (prepared.isErr()) {
        reportError(prepared.error, "resolver");
        setStatus("idle");
        activeSubmission.current = false;
        return;
      }

      const inserted = insert(prepared.value);
      attempt = inserted.attempt;
      setRegistrationAttemptId(inserted.id);
    } else if (
      attempt.submission.type !== "prepared" &&
      attempt.submission.type !== "resolver-confirmed"
    ) {
      const reconciliation = await reconcile(attempt);

      if (
        reconciliation?.isOk() &&
        reconciliation.value.state === "READY" &&
        reconciliation.value.updates !== undefined
      ) {
        attempt = {
          ...attempt,
          ...reconciliation.value.updates,
        };
      } else {
        activeSubmission.current = false;
        return;
      }
    }

    const result = await submitRegistrationAttempt({
      attempt,
      chain,
      network,
      publicClient,
      walletClient,
      onProgress: handleProgress,
      onSubmissionChange: (submission) => update(attempt.id, { submission }),
    });
    activeSubmission.current = false;

    if (result.isErr()) {
      reportError(result.error, phaseRef.current, transactionHashRef.current);
      setStatus("idle");
      setIsTransactionConfirmed(false);
      setTransactionHash(undefined);
      return;
    }

    handleSuccess(attempt, result.value);
  };

  const buttonLabel =
    connection.address === undefined
      ? "Connect wallet to continue"
      : isWrongNetwork
        ? `Switch to ${chain.name}`
        : status === "preparing" || status === "reconciling"
          ? "Checking registration"
          : status === "signing"
            ? phase === "resolver"
              ? "Confirm resolver in wallet"
              : "Confirm commitment in wallet"
            : status === "confirming"
              ? phase === "resolver"
                ? "Confirming resolver"
                : "Confirming commitment"
              : storedAttempt?.submission.type === "resolver-confirmed"
                ? "Commit name"
                : "Start registration";

  return {
    buttonLabel,
    error: localError ?? externalError,
    isPending,
    isTransactionConfirmed,
    status,
    submit,
    transactionHash,
  };
}
