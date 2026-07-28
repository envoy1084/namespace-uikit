"use client";

import type {
  NameProfileEditorReview,
  NameProfileEditorUploadHandlers,
} from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";

import { Button, Form, Modal, cn } from "@thenamespace/uikit";
import { FormProvider, useForm } from "react-hook-form";

import { diffProfileRecords } from "#/components/name-profile-editor/diff-profile-records";
import { NameProfileEditorForm } from "#/components/name-profile-editor/editor/editor-view";
import {
  normalizeProfileRecords,
  type NormalizeProfileRecordsError,
} from "#/components/name-profile-editor/normalize-profile-records";

const normalizationErrorMessages: Record<NormalizeProfileRecordsError, string> =
  {
    DUPLICATE_ABI_CONTENT_TYPE: "Each ABI content type can only be added once.",
    DUPLICATE_ADDRESS_COIN_TYPE: "Each address network can only be added once.",
    DUPLICATE_DATA_KEY: "Each data key can only be added once.",
    DUPLICATE_INTERFACE_ID: "Each interface ID can only be added once.",
    DUPLICATE_TEXT_KEY: "Each text record key can only be added once.",
    INVALID_ABI_CONTENT_TYPE: "Enter a valid ABI content type.",
    INVALID_ABI_VALUE: "Enter valid ABI bytes.",
    INVALID_ADDRESS: "One or more network addresses are invalid.",
    INVALID_COIN_TYPE: "Enter a valid address coin type.",
    INVALID_CONTENTHASH: "Enter a valid content hash URI.",
    INVALID_DATA_KEY: "Every data record needs a key.",
    INVALID_DATA_VALUE: "Enter valid data bytes.",
    INVALID_INTERFACE_ID: "Enter a valid four-byte interface ID.",
    INVALID_INTERFACE_IMPLEMENTER: "Enter a valid interface implementer.",
    INVALID_NAME_RECORD: "Enter a valid ENS name record.",
    INVALID_PROFILE_RECORDS: "The profile records could not be validated.",
    INVALID_PUBLIC_KEY: "Enter valid bytes32 public key coordinates.",
    INVALID_TEXT_KEY: "Every text record needs a key.",
    UNSUPPORTED_COIN_TYPE: "This address coin type is not supported.",
  };

export interface NameProfileEditorProps {
  className?: string;
  /** Current resolver records used as the comparison baseline. */
  initialRecords: NameProfileFormValues;
  /** Fixed ENS name being edited. */
  name: string;
  /** Called with canonical records and their semantic changes. */
  onReview?: (review: NameProfileEditorReview) => void;
  /** Renders as a trigger-controlled dialog or directly in the page. */
  presentation?: "dialog" | "inline";
  /** Optional replacements for component-owned UI. */
  slots?: {
    trigger?: ReactNode;
  };
  /** Optional media upload handlers. URL inputs are used when omitted. */
  upload?: NameProfileEditorUploadHandlers;
}

export function NameProfileEditor({
  className,
  initialRecords,
  name,
  onReview,
  presentation = "dialog",
  slots,
  upload,
}: NameProfileEditorProps) {
  const initialRecordsSnapshot = JSON.stringify(initialRecords);
  const initialResult = useMemo(
    () =>
      normalizeProfileRecords(
        JSON.parse(initialRecordsSnapshot) as NameProfileFormValues,
      ),
    [initialRecordsSnapshot],
  );
  const baseline = initialResult.isOk() ? initialResult.value : initialRecords;
  const form = useForm<NameProfileFormValues>({
    defaultValues: baseline,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    form.reset(baseline);
  }, [baseline, form]);

  const review = (values: NameProfileFormValues) => {
    form.clearErrors("root");

    if (initialResult.isErr()) {
      form.setError("root", {
        message: `The initial profile is invalid. ${normalizationErrorMessages[initialResult.error]}`,
      });
      return;
    }

    const normalized = normalizeProfileRecords(values);
    if (normalized.isErr()) {
      form.setError("root", {
        message: normalizationErrorMessages[normalized.error],
      });
      return;
    }

    const changes = diffProfileRecords(initialResult.value, normalized.value);
    if (changes.length === 0) {
      form.setError("root", {
        message: "Make at least one profile change to continue.",
      });
      return;
    }

    onReview?.({ changes, values: normalized.value });
  };

  const editor = (
    <FormProvider {...form}>
      <Form
        className={cn("w-full max-w-md", className) ?? ""}
        validationBehavior="aria"
        onSubmit={(event) => {
          void form.handleSubmit(review)(event);
        }}
      >
        <NameProfileEditorForm
          key={initialRecordsSnapshot}
          {...(upload === undefined ? {} : { upload })}
        />
      </Form>
    </FormProvider>
  );

  if (presentation === "inline") return editor;

  return (
    <Modal>
      {slots?.trigger ?? <Button>Edit profile</Button>}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            aria-label={`Edit ${name} profile`}
            className="w-full max-w-md bg-transparent p-0 shadow-none"
          >
            <Modal.CloseTrigger className="top-4 right-auto left-4 z-50" />
            {editor}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
