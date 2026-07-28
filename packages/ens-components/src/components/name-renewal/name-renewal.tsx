"use client";

import { useCallback, useRef, useState } from "react";

import { Button, Modal, Surface } from "@thenamespace/uikit";

import {
  NameRenewalProvider,
  type NameRenewalProviderProps,
  useNameRenewal,
} from "#/components/name-renewal/context";
import { NameRenewalForm } from "#/components/name-renewal/steps/renewal-form/renewal-form";
import { NameRenewalSuccess } from "#/components/name-renewal/steps/renewal-success";
import type { NameRenewalSuccessDetails } from "#/components/name-renewal/types";

export type NameRenewalProps = Omit<NameRenewalProviderProps, "children">;

function NameRenewalContent() {
  const { messages, presentation, reset, slots } = useNameRenewal();
  const [renewal, setRenewal] = useState<NameRenewalSuccessDetails>();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const shouldResetOnOpenRef = useRef(false);

  const resetRenewal = useCallback(() => {
    reset();
    setRenewal(undefined);
  }, [reset]);

  const handleDone = useCallback(() => {
    if (presentation === "dialog") {
      shouldResetOnOpenRef.current = true;
      return;
    }
    resetRenewal();
  }, [presentation, resetRenewal]);

  const handleDialogOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen || !shouldResetOnOpenRef.current) return;
      shouldResetOnOpenRef.current = false;
      resetRenewal();
    },
    [resetRenewal],
  );

  const content =
    renewal === undefined ? (
      <NameRenewalForm onPendingChange={setIsTransactionPending} onSuccess={setRenewal} />
    ) : (
      <NameRenewalSuccess onDone={handleDone} renewal={renewal} />
    );

  if (presentation === "inline") {
    return (
      <Surface
        className="relative flex w-full max-w-md flex-col rounded-3xl p-6"
        data-name-renewal-presentation="inline"
      >
        {content}
      </Surface>
    );
  }

  return (
    <Modal onOpenChange={handleDialogOpenChange}>
      {slots.trigger ?? <Button variant="secondary">{messages.triggerLabel}</Button>}
      <Modal.Backdrop
        data-name-renewal-presentation="dialog"
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

export function NameRenewal(props: NameRenewalProps) {
  return (
    <NameRenewalProvider {...props}>
      <NameRenewalContent />
    </NameRenewalProvider>
  );
}
