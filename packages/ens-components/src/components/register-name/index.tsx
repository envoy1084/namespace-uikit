"use client";

import { useState } from "react";

import { Button, Modal } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { zeroAddress } from "viem";
import { useConnection } from "wagmi";

import {
  RegisterNameProvider,
  type RegisterNameProviderProps,
  useRegisterName,
} from "#/components/register-name/context";
import {
  NameSearchStep,
  RegistrationProcess,
} from "#/components/register-name/steps";
import { useCommitments } from "#/hooks";
import { useEnsConfig } from "#/providers";

export * from "#/components/register-name/context";

const RegisterEnsHeader = new URL(
  "../../assets/register-ens-header.png",
  import.meta.url,
);

export type RegisterEnsProps = Omit<RegisterNameProviderProps, "children">;

type RegisterNameView = "name-search" | "registration-process";

function RegisterEnsContent() {
  const connection = useConnection();
  const { duration, input, referrer, setCommitmentId } = useRegisterName();
  const { chain, contracts } = useEnsConfig();
  const { find } = useCommitments();
  const [view, setView] = useState<RegisterNameView>("name-search");
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const isRegistrationProcess = view === "registration-process";

  const handleNext = () => {
    const storedCommitment =
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

    setCommitmentId(storedCommitment?.id ?? null);
    setView("registration-process");
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
                <RegistrationProcess />
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
