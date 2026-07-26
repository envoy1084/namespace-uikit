"use client";

import { useState } from "react";

import { Button, Modal, Surface } from "@thenamespace/uikit";
import { zeroAddress, zeroHash } from "viem";
import { useConnection } from "wagmi";

import {
  COMMITMENT_VALID_DURATION_MS,
  COMMITMENT_WAIT_DURATION_MS,
  NameRegistrationProvider,
  type NameRegistrationProviderProps,
  useNameRegistration,
} from "#/components/register-name/context";
import {
  NameSearchStep,
  RegistrationProcess,
  RegistrationSuccess,
  type RegistrationSuccessDetails,
  type RegistrationProcessStep,
} from "#/components/register-name/steps";
import { useRegistrationAttempts } from "#/hooks/use-registration-attempts";
import { useEnsConfig } from "#/providers";

export * from "#/components/register-name/context";
export * from "#/components/register-name/customization";
export * from "#/components/register-name/events";

export type NameRegistrationProps = Omit<
  NameRegistrationProviderProps,
  "children"
>;

type NameRegistrationView = "name-search" | "registration-process";

function NameRegistrationContent() {
  const connection = useConnection();
  const {
    duration,
    input,
    messages,
    presentation,
    referrer,
    resolverAddress,
    setRegistrationAttemptId,
    setInput,
    setReferrer,
    setReferrerInput,
    setResolverAddress,
    setResolverInput,
    slots,
  } = useNameRegistration();
  const { chain, contracts } = useEnsConfig();
  const { find } = useRegistrationAttempts();
  const [view, setView] = useState<NameRegistrationView>("name-search");
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationProcessStep>("commitment");
  const [registrationSuccess, setRegistrationSuccess] =
    useState<RegistrationSuccessDetails>();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const isRegistrationSuccess = registrationSuccess !== undefined;

  const handleNext = () => {
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

    const confirmedAt =
      storedAttempt?.attempt.submission.type === "confirmed"
        ? storedAttempt.attempt.submission.confirmedAt
        : undefined;
    const isConfirmedAndValid =
      confirmedAt !== undefined &&
      Date.now() < confirmedAt + COMMITMENT_VALID_DURATION_MS;
    const nextStep = !isConfirmedAndValid
      ? "commitment"
      : Date.now() >= confirmedAt + COMMITMENT_WAIT_DURATION_MS
        ? "complete-registration"
        : "timer";

    setRegistrationAttemptId(storedAttempt?.id ?? null);
    setRegistrationStep(nextStep);
    setView("registration-process");
  };

  const handleRegistrationSuccess = (details: RegistrationSuccessDetails) => {
    setRegistrationSuccess(details);
  };

  const handleDone = () => {
    setRegistrationAttemptId(null);
    setInput("");
    setReferrer(zeroHash);
    setReferrerInput("");
    setResolverAddress(null);
    setResolverInput("");
    setRegistrationSuccess(undefined);
    setRegistrationStep("commitment");
    setView("name-search");
  };

  const content = isRegistrationSuccess ? (
    <RegistrationSuccess
      onDone={handleDone}
      registration={registrationSuccess}
    />
  ) : view === "registration-process" ? (
    <RegistrationProcess
      initialStep={registrationStep}
      onBack={() => setView("name-search")}
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
    <Modal>
      {slots.trigger ?? (
        <Button variant="secondary">{messages.triggerLabel}</Button>
      )}
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
