"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button, Modal, Surface } from "@thenamespace/uikit";
import { isAddressEqual, zeroAddress, zeroHash } from "viem";
import { useAccount } from "wagmi";

import {
  COMMITMENT_VALID_DURATION_MS,
  COMMITMENT_WAIT_DURATION_MS,
  NameRegistrationProvider,
  type NameRegistrationProviderProps,
  useNameRegistration,
} from "#/components/name-registration/context";
import { useRegistrationAttempts } from "#/components/name-registration/hooks/use-registration-attempts";
import {
  NameSearchStep,
  RegistrationProcess,
  RegistrationSuccessStep,
  type RegistrationSuccessDetails,
  type RegistrationProcessStep,
} from "#/components/name-registration/steps";
import { findPaymentToken } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type NameRegistrationProps = Omit<NameRegistrationProviderProps, "children">;

type NameRegistrationView = "name-search" | "registration-process" | "registration-success";

function NameRegistrationContent() {
  const connection = useAccount();
  const {
    duration,
    input,
    messages,
    paymentTokenAddress,
    presentation,
    referrer,
    resolverAddress,
    setShouldSetPrimaryName,
    setRegistrationAttemptId,
    setInput,
    setPaymentTokenAddress,
    setReferrer,
    setReferrerInput,
    setResolverAddress,
    setResolverInput,
    shouldSetPrimaryName,
    slots,
  } = useNameRegistration();
  const { chain, contracts } = useEnsConfig();
  const { find, update } = useRegistrationAttempts();
  const [view, setView] = useState<NameRegistrationView>("name-search");
  const [registrationStep, setRegistrationStep] = useState<RegistrationProcessStep>("commitment");
  const [registrationSuccess, setRegistrationSuccess] = useState<RegistrationSuccessDetails>();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const shouldResetOnOpenRef = useRef(false);
  const storedAttempt =
    connection.address === undefined
      ? undefined
      : find({
          account: connection.address,
          chainId: chain.id,
          duration,
          input,
          owner: connection.address,
          referrer,
          registrarAddress: contracts.ethRegistrar.address,
          resolverAddress,
          subregistry: zeroAddress,
        });
  const storedPaymentToken = findPaymentToken(
    contracts.paymentTokens,
    storedAttempt?.attempt.paymentTokenAddress,
  );
  const storedPaymentTokenAddress = storedPaymentToken?.address;
  const storedShouldSetPrimaryName = storedAttempt?.attempt.setPrimaryName;

  useEffect(() => {
    if (storedPaymentTokenAddress !== undefined) {
      setPaymentTokenAddress(storedPaymentTokenAddress);
    }
  }, [setPaymentTokenAddress, storedAttempt?.id, storedPaymentTokenAddress]);

  useEffect(() => {
    if (storedShouldSetPrimaryName !== undefined) {
      setShouldSetPrimaryName(storedShouldSetPrimaryName);
    }
  }, [setShouldSetPrimaryName, storedShouldSetPrimaryName]);

  const handleNext = useCallback(() => {
    if (storedAttempt !== undefined) {
      const updates = {
        ...(!isAddressEqual(storedAttempt.attempt.paymentTokenAddress, paymentTokenAddress)
          ? { paymentTokenAddress }
          : {}),
        ...(storedAttempt.attempt.setPrimaryName !== shouldSetPrimaryName
          ? { setPrimaryName: shouldSetPrimaryName }
          : {}),
      };

      if (Object.keys(updates).length > 0) {
        update(storedAttempt.id, updates);
      }
    }

    const confirmedAt =
      storedAttempt?.attempt.submission.type === "confirmed"
        ? storedAttempt.attempt.submission.confirmedAt
        : undefined;
    const isConfirmedAndValid =
      confirmedAt !== undefined && Date.now() < confirmedAt + COMMITMENT_VALID_DURATION_MS;
    const nextStep = !isConfirmedAndValid
      ? "commitment"
      : Date.now() >= confirmedAt + COMMITMENT_WAIT_DURATION_MS
        ? "complete-registration"
        : "timer";

    setRegistrationAttemptId(storedAttempt?.id ?? null);
    setRegistrationStep(nextStep);
    setView("registration-process");
  }, [paymentTokenAddress, setRegistrationAttemptId, shouldSetPrimaryName, storedAttempt, update]);

  const handleRegistrationSuccess = useCallback((details: RegistrationSuccessDetails) => {
    setRegistrationSuccess(details);
    setView("registration-success");
  }, []);

  const resetRegistration = useCallback(() => {
    setRegistrationAttemptId(null);
    setInput("");
    setReferrer(zeroHash);
    setReferrerInput("");
    setResolverAddress(null);
    setResolverInput("");
    setShouldSetPrimaryName(false);
    setRegistrationSuccess(undefined);
    setRegistrationStep("commitment");
    setView("name-search");
  }, [
    setInput,
    setReferrer,
    setReferrerInput,
    setRegistrationAttemptId,
    setResolverAddress,
    setResolverInput,
    setShouldSetPrimaryName,
  ]);

  const handleDone = useCallback(() => {
    if (presentation === "dialog") {
      shouldResetOnOpenRef.current = true;
      return;
    }

    resetRegistration();
  }, [presentation, resetRegistration]);

  const handleDialogOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen || !shouldResetOnOpenRef.current) return;

      shouldResetOnOpenRef.current = false;
      resetRegistration();
    },
    [resetRegistration],
  );
  const handleBack = useCallback(() => setView("name-search"), []);

  const content =
    view === "registration-success" && registrationSuccess !== undefined ? (
      <RegistrationSuccessStep onDone={handleDone} registration={registrationSuccess} />
    ) : view === "registration-process" ? (
      <RegistrationProcess
        initialStep={registrationStep}
        onBack={handleBack}
        onPendingChange={setIsTransactionPending}
        onSuccess={handleRegistrationSuccess}
      />
    ) : (
      <NameSearchStep onNext={handleNext} />
    );

  if (presentation === "inline") {
    return (
      <Surface
        className="relative flex w-full max-w-md flex-col rounded-3xl p-6"
        data-name-registration-presentation="inline"
      >
        {content}
      </Surface>
    );
  }

  return (
    <Modal onOpenChange={handleDialogOpenChange}>
      {slots.trigger ?? <Button variant="secondary">{messages.triggerLabel}</Button>}
      <Modal.Backdrop
        data-name-registration-presentation="dialog"
        isDismissable={!isTransactionPending}
        isKeyboardDismissDisabled={isTransactionPending}
      >
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger isDisabled={isTransactionPending} />
            {content}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function NameRegistration(props: NameRegistrationProps) {
  return (
    <NameRegistrationProvider {...props}>
      <NameRegistrationContent />
    </NameRegistrationProvider>
  );
}
