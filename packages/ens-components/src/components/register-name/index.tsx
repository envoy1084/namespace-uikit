"use client";

import { Button, Modal } from "@thenamespace/uikit";

import {
  RegisterNameProvider,
  type RegisterNameProviderProps,
} from "#/components/register-name/context";
import { NameSearchStep } from "#/components/register-name/steps";

export * from "#/components/register-name/context";

const RegisterEnsHeader = new URL(
  "../../assets/register-ens-header.png",
  import.meta.url,
);

export type RegisterEnsProps = Omit<RegisterNameProviderProps, "children">;

function RegisterEnsContent() {
  return (
    <Modal>
      <Button variant="secondary">Register</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header className="mx-auto">
              <img
                src={RegisterEnsHeader.href}
                className="mx-auto w-full max-w-64"
              />
              <div>
                <Modal.Heading className="mx-auto text-center">
                  Register your ENS Name
                </Modal.Heading>
                <p className="text-muted text-center text-sm">
                  Register your ENS name and set a profile
                </p>
              </div>
            </Modal.Header>
            <Modal.Body className="flex-none">
              <NameSearchStep />
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">Next</Button>
            </Modal.Footer>
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
