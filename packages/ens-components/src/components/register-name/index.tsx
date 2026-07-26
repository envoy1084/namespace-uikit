"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { AnimatePresence, motion } from "motion/react";
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

const RegisterEnsHeader = new URL(
  "../../assets/register-ens-header.svg",
  import.meta.url,
);

export type RegisterEnsProps = Omit<RegisterNameProviderProps, "children">;

type RegisterNameView = "name-search" | "registration-process";
type TransitionDirection = -1 | 1;

const viewVariants = {
  center: {
    opacity: 1,
    x: 0,
  },
  enter: (direction: TransitionDirection) => ({
    opacity: 0,
    x: direction * 24,
  }),
  exit: (direction: TransitionDirection) => ({
    opacity: 0,
    x: direction * -24,
  }),
};

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
  const [transitionDirection, setTransitionDirection] =
    useState<TransitionDirection>(1);
  const isRegistrationProcess = view === "registration-process";
  const isRegistrationSuccess = registrationSuccess !== undefined;
  const viewKey = isRegistrationSuccess ? "success" : view;

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
    setTransitionDirection(1);
    setView("registration-process");
  };

  const handleBack = () => {
    setTransitionDirection(-1);
    setView("name-search");
  };

  const handleRegistrationSuccess = (details: RegistrationSuccessDetails) => {
    setTransitionDirection(1);
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
            {isRegistrationProcess && !isRegistrationSuccess ? (
              <Button
                isIconOnly
                aria-label="Back to name search"
                className="absolute top-4 left-4"
                size="sm"
                variant="secondary"
                onPress={handleBack}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} />
              </Button>
            ) : null}
            {!isRegistrationSuccess ? (
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
            ) : null}
            <Modal.Body className="flex-none overflow-x-hidden">
              <motion.div layout transition={{ duration: 0.22 }}>
                <AnimatePresence
                  custom={transitionDirection}
                  initial={false}
                  mode="wait"
                >
                  <motion.div
                    animate="center"
                    custom={transitionDirection}
                    exit="exit"
                    initial="enter"
                    key={viewKey}
                    transition={{
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    variants={viewVariants}
                  >
                    {isRegistrationSuccess ? (
                      <RegistrationSuccess
                        onDone={handleDone}
                        registration={registrationSuccess}
                      />
                    ) : isRegistrationProcess ? (
                      <RegistrationProcess
                        initialStep={registrationStep}
                        onSuccess={handleRegistrationSuccess}
                      />
                    ) : (
                      <NameSearchStep
                        onAvailabilityChange={setIsNameAvailable}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
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
