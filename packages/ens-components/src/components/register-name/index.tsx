"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
import { AnimatePresence, motion, type Variants } from "motion/react";
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
type TransitionDirection = -1 | 1;

const screenVariants: Variants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.055,
      duration: 0.165,
      ease: [0.26, 0.08, 0.25, 1],
    },
  },
  exit: (direction: TransitionDirection) => ({
    opacity: 0,
    pointerEvents: "none" as const,
    position: "absolute" as const,
    scale: direction === 1 ? 1.1 : 0.85,
    transition: {
      duration: 0.22,
      ease: [0.26, 0.08, 0.25, 1],
    },
    width: "100%",
  }),
  initial: (direction: TransitionDirection) => ({
    opacity: 0,
    scale: direction === 1 ? 0.85 : 1.1,
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
          <Modal.Dialog className="overflow-hidden">
            <Modal.CloseTrigger />
            <motion.div
              className="relative w-full"
              layout="size"
              transition={{
                layout: {
                  duration: 0.2,
                  ease: [0.26, 0.08, 0.25, 1],
                },
              }}
            >
              <AnimatePresence custom={transitionDirection} initial={false}>
                <motion.div
                  animate="animate"
                  className="w-full origin-center"
                  custom={transitionDirection}
                  exit="exit"
                  initial="initial"
                  key={viewKey}
                  variants={screenVariants}
                >
                  {isRegistrationSuccess ? (
                    <RegistrationSuccess
                      onDone={handleDone}
                      registration={registrationSuccess}
                    />
                  ) : view === "registration-process" ? (
                    <RegistrationProcess
                      initialStep={registrationStep}
                      onBack={handleBack}
                      onSuccess={handleRegistrationSuccess}
                    />
                  ) : (
                    <NameSearchStep
                      isNextDisabled={!isNameAvailable}
                      onAvailabilityChange={setIsNameAvailable}
                      onNext={handleNext}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
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
