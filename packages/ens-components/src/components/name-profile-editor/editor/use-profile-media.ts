"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useRef, useState } from "react";

import type { UseFormReturn } from "react-hook-form";

import type { ProfileEditorSection } from "#/components/name-profile-editor/editor/types";
import type {
  NameProfileFormValues,
  NameProfileImageRecord,
  NameProfileImageUpload,
  NameProfileTextRecord,
} from "#/components/name-profile-editor/types";
import { formatError } from "#/lib/error";

function textRecordValue(
  records: readonly NameProfileTextRecord[],
  key: NameProfileImageRecord,
): string | undefined {
  return records.find((record) => record.key === key)?.value;
}

function removeFromSet<T>(values: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(values);
  next.delete(value);
  return next;
}

export function useProfileMedia({
  appendText,
  form,
  name,
  setActiveSection,
  uploadImage,
  values,
}: {
  appendText: (record: NameProfileTextRecord) => void;
  form: UseFormReturn<NameProfileFormValues>;
  name: string;
  setActiveSection: Dispatch<SetStateAction<ProfileEditorSection>>;
  uploadImage?: NameProfileImageUpload | undefined;
  values: NameProfileFormValues;
}) {
  const [uploadingRecords, setUploadingRecords] = useState<Set<NameProfileImageRecord>>(new Set());
  const [uploadError, setUploadError] = useState<string>();
  const avatarInput = useRef<HTMLInputElement>(null);
  const headerInput = useRef<HTMLInputElement>(null);

  function ensureMediaRecord(record: NameProfileImageRecord, value?: string) {
    setActiveSection("general");
    const textRecords = form.getValues("text");
    const index = textRecords.findIndex((item) => item.key === record);

    if (index >= 0) {
      if (value !== undefined) {
        form.setValue(`text.${index}.value`, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
      form.setFocus(`text.${index}.value`);
      return;
    }

    const nextIndex = textRecords.length;
    appendText({ key: record, value: value ?? "" });
    queueMicrotask(() => form.setFocus(`text.${nextIndex}.value`));
  }

  function requestMedia(record: NameProfileImageRecord) {
    setActiveSection("general");
    setUploadError(undefined);

    if (uploadImage === undefined) {
      ensureMediaRecord(record);
      return;
    }

    (record === "avatar" ? avatarInput : headerInput).current?.click();
  }

  async function uploadMedia(record: NameProfileImageRecord, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file === undefined || uploadImage === undefined) return;

    if (!file.type.startsWith("image/")) {
      setUploadError(formatError("INVALID_IMAGE_FILE"));
      return;
    }

    setUploadError(undefined);
    setUploadingRecords((current) => new Set(current).add(record));

    try {
      const uploaded = await uploadImage(file, { name, record });
      const value = uploaded.trim();
      if (value.length === 0) {
        setUploadError(formatError("IMAGE_UPLOAD_FAILED"));
        return;
      }

      ensureMediaRecord(record, value);
      await form.trigger("text");
    } catch (error) {
      setUploadError(formatError(error));
    } finally {
      setUploadingRecords((current) => removeFromSet(current, record));
    }
  }

  return {
    avatarInput,
    avatarUrl: textRecordValue(values.text, "avatar"),
    headerInput,
    headerUrl: textRecordValue(values.text, "header"),
    requestMedia,
    uploadError,
    uploadMedia,
    uploadingRecords,
  };
}
