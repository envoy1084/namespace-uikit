"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
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
import { useCommitments } from "#/hooks";
import { useEnsConfig } from "#/providers";

export * from "#/components/register-name/context";
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
    referrer,
    setCommitmentId,
    setInput,
    setReferrer,
    setReferrerInput,
  } = useNameRegistration();
  const { chain, contracts } = useEnsConfig();
  const { delete: deleteCommitment, find } = useCommitments();
  const [view, setView] = useState<NameRegistrationView>("name-search");
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationProcessStep>("commitment");
  const [registrationSuccess, setRegistrationSuccess] =
    useState<RegistrationSuccessDetails>();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const isRegistrationSuccess = registrationSuccess !== undefined;

  const handleNext = () => {
    let storedCommitment =
      connection.address === undefined
        ? undefined
        : find({
            chainId: chain.id,
            duration,
            input,
            owner: connection.address,
            referrer,
            registrarAddress: contracts.ethRegistrar.address,
            resolverAddress: zeroAddress,
            subregistryAddress: zeroAddress,
          });

    if (
      storedCommitment !== undefined &&
      Date.now() >=
        storedCommitment.commitment.createdAt + COMMITMENT_VALID_DURATION_MS
    ) {
      deleteCommitment(storedCommitment.id);
      storedCommitment = undefined;
    }

    const nextStep =
      storedCommitment === undefined
        ? "commitment"
        : Date.now() >=
            storedCommitment.commitment.createdAt + COMMITMENT_WAIT_DURATION_MS
          ? "complete-registration"
          : "timer";

    setCommitmentId(storedCommitment?.id ?? null);
    setRegistrationStep(nextStep);
    setView("registration-process");
  };

  const handleRegistrationSuccess = (details: RegistrationSuccessDetails) => {
    setRegistrationSuccess(details);
  };

  const handleDone = () => {
    setCommitmentId(null);
    setInput("");
    setReferrer(zeroHash);
    setReferrerInput("");
    setRegistrationSuccess(undefined);
    setRegistrationStep("commitment");
    setView("name-search");
  };

  return (
    <Modal>
      <Button variant="secondary">Register</Button>
      <Modal.Backdrop
        isDismissable={!isTransactionPending}
        isKeyboardDismissDisabled={isTransactionPending}
      >
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger isDisabled={isTransactionPending} />
            {isRegistrationSuccess ? (
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
            )}
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
