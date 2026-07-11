import { Button, Modal } from "@thenamespace/uikit";

import { NameSearchStep } from "./steps";

const RegisterEnsHeader = new URL(
  "../../assets/register-ens-header.png",
  import.meta.url,
);

export const RegisterEns = () => {
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
            <Modal.Body>
              <NameSearchStep />
              <div className="bg-surface my-4 h-20 rounded-2xl border p-4"></div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">Next</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
