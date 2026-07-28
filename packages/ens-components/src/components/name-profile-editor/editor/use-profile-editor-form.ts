"use client";

import type {
  EditorRecord,
  EditorRecordFieldIds,
  ProfileEditorSection,
  RecordDefinition,
} from "#/components/name-profile-editor/editor/types";
import type {
  NameProfileFormValues,
  NameProfileImageRecord,
  NameProfileTextRecord,
} from "#/components/name-profile-editor/types";

import { useEffect, useMemo, useState } from "react";

import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { diffProfileRecords } from "#/components/name-profile-editor/diff-profile-records";
import {
  createEditorRecords,
  createInitialActiveDefinitionIds,
  isCustomTextRecordKey,
  isRecordDefinitionActive,
} from "#/components/name-profile-editor/editor/editor-records";
import { profileFormResolver } from "#/components/name-profile-editor/editor/profile-form-resolver";
import { normalizeProfileRecords } from "#/components/name-profile-editor/normalize-profile-records";

function normalizedInitialRecords(
  records: NameProfileFormValues,
): NameProfileFormValues {
  const normalized = normalizeProfileRecords(records);
  return normalized.isOk() ? normalized.value : records;
}

function mediaDefinition(
  definition: RecordDefinition,
): NameProfileImageRecord | undefined {
  if (
    definition.type === "text" &&
    (definition.name === "avatar" || definition.name === "header")
  ) {
    return definition.name;
  }

  return undefined;
}

function removeFromSet<T>(values: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(values);
  next.delete(value);
  return next;
}

export function useProfileEditorForm(initialRecords: NameProfileFormValues) {
  const defaultValues = useMemo(
    () => normalizedInitialRecords(initialRecords),
    [initialRecords],
  );
  const form = useForm<NameProfileFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: profileFormResolver,
  });
  const { control } = form;
  const abiFields = useFieldArray({ control, keyName: "fieldId", name: "abi" });
  const addressFields = useFieldArray({
    control,
    keyName: "fieldId",
    name: "addresses",
  });
  const dataFields = useFieldArray({
    control,
    keyName: "fieldId",
    name: "data",
  });
  const interfaceFields = useFieldArray({
    control,
    keyName: "fieldId",
    name: "interfaces",
  });
  const textFields = useFieldArray({
    control,
    keyName: "fieldId",
    name: "text",
  });
  const values = useWatch({
    control,
    defaultValue: defaultValues,
  }) as NameProfileFormValues;
  const [activeSection, setActiveSection] =
    useState<ProfileEditorSection>("general");
  const [activeDefinitionIds, setActiveDefinitionIds] = useState(() =>
    createInitialActiveDefinitionIds(defaultValues),
  );
  const [customTextFieldIds, setCustomTextFieldIds] = useState<Set<string>>(
    () =>
      new Set(
        textFields.fields
          .filter((field) => isCustomTextRecordKey(field.key))
          .map((field) => field.fieldId),
      ),
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    form.reset(defaultValues);
    setActiveDefinitionIds(createInitialActiveDefinitionIds(defaultValues));
    setCustomTextFieldIds(new Set());
  }, [defaultValues, form]);

  useEffect(() => {
    setCustomTextFieldIds((current) => {
      const currentFieldIds = new Set(
        textFields.fields.map((field) => field.fieldId),
      );
      const next = new Set(
        [...current].filter((fieldId) => currentFieldIds.has(fieldId)),
      );

      for (const field of textFields.fields) {
        if (
          !current.has(field.fieldId) &&
          typeof field.key === "string" &&
          isCustomTextRecordKey(field.key)
        ) {
          next.add(field.fieldId);
        }
      }

      if (
        next.size === current.size &&
        [...next].every((fieldId) => current.has(fieldId))
      ) {
        return current;
      }

      return next;
    });
  }, [textFields.fields]);

  const fieldIds: EditorRecordFieldIds = {
    abi: abiFields.fields.map((field) => field.fieldId),
    addresses: addressFields.fields.map((field) => field.fieldId),
    data: dataFields.fields.map((field) => field.fieldId),
    interfaces: interfaceFields.fields.map((field) => field.fieldId),
    text: textFields.fields.map((field) => field.fieldId),
  };
  const records = createEditorRecords({
    activeDefinitionIds,
    customTextFieldIds,
    fieldIds,
    fieldKeys: {
      addresses: addressFields.fields.map((field) => field.coinType),
      text: textFields.fields.map((field) => field.key),
    },
    values,
  });
  const normalizedDraft = normalizeProfileRecords(values);
  const review = normalizedDraft.isOk()
    ? {
        changes: diffProfileRecords(defaultValues, normalizedDraft.value),
        values: normalizedDraft.value,
      }
    : undefined;
  const hasChanges = review !== undefined && review.changes.length > 0;

  function activateDefinition(definition: RecordDefinition) {
    setActiveDefinitionIds((current) => {
      const next = new Set(current);
      next.add(definition.id);
      return next;
    });
  }

  function addRecord(
    definition: RecordDefinition,
    requestMedia: (record: NameProfileImageRecord) => void,
  ) {
    const media = mediaDefinition(definition);
    if (media) {
      requestMedia(media);
      return;
    }

    if (isRecordDefinitionActive(definition, records)) return;

    if (definition.type === "text") {
      textFields.append({
        key: definition.isCustom ? "" : definition.name,
        value: "",
      });
    } else if (definition.type === "address") {
      addressFields.append({ coinType: definition.name, value: "" });
    } else if (definition.type === "abi") {
      abiFields.append({ contentType: "", value: "" });
    } else if (definition.type === "data") {
      dataFields.append({ key: "", value: "" });
    } else if (definition.type === "interface") {
      interfaceFields.append({ implementer: "", interfaceId: "" });
    } else {
      activateDefinition(definition);
    }
  }

  function removeRecord(record: EditorRecord) {
    const index = record.arrayIndex;

    if (record.type === "text" && index !== undefined) {
      textFields.remove(index);
      return;
    }
    if (record.type === "address" && index !== undefined) {
      addressFields.remove(index);
      return;
    }
    if (record.type === "abi" && index !== undefined) {
      abiFields.remove(index);
      return;
    }
    if (record.type === "data" && index !== undefined) {
      dataFields.remove(index);
      return;
    }
    if (record.type === "interface" && index !== undefined) {
      interfaceFields.remove(index);
      return;
    }

    if (record.type === "contenthash") {
      form.setValue("contenthash", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (record.type === "name") {
      form.setValue("name", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (record.type === "pubkey") {
      form.setValue(
        "pubkey",
        { x: "", y: "" },
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
    }

    setActiveDefinitionIds((current) => removeFromSet(current, record.id));
  }

  function appendText(record: NameProfileTextRecord) {
    textFields.append(record);
  }

  return {
    activeSection,
    addRecord,
    appendText,
    form,
    hasChanges,
    records,
    removeRecord,
    review,
    search,
    setActiveSection,
    setSearch,
    values,
  };
}
