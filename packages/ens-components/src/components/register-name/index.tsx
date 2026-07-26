"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
import { zeroAddress } from "viem";
import { useConnection } from "wagmi";

import {
  COMMITMENT_VALID_DURATION_MS,
  COMMITMENT_WAIT_DURATION_MS,
  RegisterNameProvider,
  type RegisterNameProviderProps,
  useRegisterName,
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

export type RegisterEnsProps = Omit<RegisterNameProviderProps, "children">;

type RegisterNameView = "name-search" | "registration-process";

function RegisterEnsContent() {
  const connection = useConnection();
  const { duration, input, referrer, setCommitmentId, setInput } =
    useRegisterName();
  const { chain, contracts } = useEnsConfig();
  const { delete: deleteCommitment, find } = useCommitments();
  const [view, setView] = useState<RegisterNameView>("name-search");
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationProcessStep>("commitment");
  const [registrationSuccess, setRegistrationSuccess] =
    useState<RegistrationSuccessDetails>();
  const [isNameAvailable, setIsNameAvailable] = useState(false);
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
    setIsNameAvailable(false);
    setRegistrationSuccess(undefined);
    setRegistrationStep("commitment");
    setView("name-search");
  };

  return (
    <Modal>
      <Button variant="secondary">Register</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            {isRegistrationSuccess ? (
              <RegistrationSuccess
                onDone={handleDone}
                registration={registrationSuccess}
              />
            ) : view === "registration-process" ? (
              <RegistrationProcess
                initialStep={registrationStep}
                onBack={() => setView("name-search")}
                onSuccess={handleRegistrationSuccess}
              />
            ) : (
              <NameSearchStep
                isNextDisabled={!isNameAvailable}
                onAvailabilityChange={setIsNameAvailable}
                onNext={handleNext}
              />
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export function RegisterEns(props: RegisterEnsProps) {
  return (
    <RegisterNameProvider {...props}>
      <RegisterEnsContent />
    </RegisterNameProvider>
  );
}
