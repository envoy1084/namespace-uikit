"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
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
  type RegistrationProcessStep,
} from "#/components/register-name/steps";
import { useCommitments } from "#/hooks";
import { useEnsConfig } from "#/providers";

export * from "#/components/register-name/context";

const RegisterEnsHeader = new URL(
  "../../assets/register-ens-header.svg",
  import.meta.url,
);

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
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const isRegistrationProcess = view === "registration-process";

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

  const handleDone = () => {
    setCommitmentId(null);
    setInput("");
    setIsNameAvailable(false);
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
            {isRegistrationProcess ? (
              <Button
                isIconOnly
                aria-label="Back to name search"
                className="absolute top-4 left-4"
                size="sm"
                variant="secondary"
                onPress={() => setView("name-search")}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} />
              </Button>
            ) : null}
            <Modal.Header className="mx-auto">
              <img
                src={RegisterEnsHeader.href}
                className="mx-auto w-full max-w-64"
              />
              <div>
                <Modal.Heading className="mx-auto text-center">
                  {isRegistrationProcess
                    ? "ENS Registration Process"
                    : "Register your ENS Name"}
                </Modal.Heading>
                <p className="text-muted text-center text-sm">
                  {isRegistrationProcess
                    ? "Registration consists of 3 steps"
                    : "Register your ENS name and set a profile"}
                </p>
              </div>
            </Modal.Header>
            <Modal.Body className="flex-none">
              {isRegistrationProcess ? (
                <RegistrationProcess
                  initialStep={registrationStep}
                  onDone={handleDone}
                />
              ) : (
                <NameSearchStep onAvailabilityChange={setIsNameAvailable} />
              )}
            </Modal.Body>
            {!isRegistrationProcess ? (
              <Modal.Footer>
                <Button
                  className="w-full"
                  isDisabled={!isNameAvailable}
                  onPress={handleNext}
                >
                  Next
                </Button>
              </Modal.Footer>
            ) : null}
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
