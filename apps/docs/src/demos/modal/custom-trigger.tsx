"use client";

import { Button, Modal } from "@thenamespace/uikit";
import { Gear } from "@thenamespace/uikit/icons";

export function CustomTrigger() {
  return (
    <Modal>
      <Modal.Trigger className="group bg-surface hover:bg-surface-secondary flex items-center gap-3 rounded-2xl p-4 shadow-xs select-none">
        <div className="bg-accent-soft text-accent-soft-foreground flex size-12 shrink-0 items-center justify-center rounded-xl">
          <Gear className="size-6" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">Settings</p>
          <p className="text-muted text-xs">Manage your preferences</p>
        </div>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Gear className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Settings</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Use <code>Modal.Trigger</code> to create custom trigger elements
                beyond standard buttons. This example shows a card-style trigger
                with icons and descriptive text.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Save</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
