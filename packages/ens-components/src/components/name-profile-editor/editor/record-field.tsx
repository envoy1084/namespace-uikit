"use client";

import type { EditorRecord } from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import type { ReactNode } from "react";

import {
  Button,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "@thenamespace/uikit";
import { Cancel01Icon, Icon } from "@thenamespace/uikit/icons";
import { Controller, type FieldPath, useFormContext } from "react-hook-form";

import { getRecordIcon } from "#/components/name-profile-editor/get-record-icon";

function formPath(value: string): FieldPath<NameProfileFormValues> {
  return value as FieldPath<NameProfileFormValues>;
}

function RemoveButton({
  isDisabled = false,
  label,
  onRemove,
}: {
  isDisabled?: boolean;
  label: string;
  onRemove: () => void;
}) {
  return (
    <Button
      isIconOnly
      aria-label={label}
      className="size-6 min-w-6"
      isDisabled={isDisabled}
      size="sm"
      type="button"
      variant="ghost"
      onPress={onRemove}
    >
      <Icon aria-hidden icon={Cancel01Icon} size={14} strokeWidth={2} />
    </Button>
  );
}

function RecordInput({
  inputMode,
  isDisabled = false,
  label,
  name,
  placeholder,
  prefix,
  suffix,
  validationGroup,
}: {
  inputMode?: "numeric" | "text";
  isDisabled?: boolean;
  label: string;
  name: FieldPath<NameProfileFormValues>;
  placeholder: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  validationGroup?: FieldPath<NameProfileFormValues>;
}) {
  const { control, trigger } = useFormContext<NameProfileFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          className="min-w-0 gap-1"
          isDisabled={isDisabled}
          isInvalid={fieldState.invalid}
          name={field.name}
          value={typeof field.value === "string" ? field.value : ""}
          onBlur={field.onBlur}
          onChange={(value) => {
            field.onChange(value);
            if (validationGroup !== undefined) {
              queueMicrotask(() => void trigger(validationGroup));
            }
          }}
        >
          <Label className="text-muted truncate text-[11px] font-medium">
            {label}
          </Label>
          <InputGroup
            className="w-full min-w-0 outline-offset-[-1px] ring-inset"
            variant="secondary"
          >
            {prefix === undefined ? null : (
              <InputGroup.Prefix>{prefix}</InputGroup.Prefix>
            )}
            <InputGroup.Input
              ref={field.ref}
              className="w-full min-w-0 ring-inset"
              inputMode={inputMode}
              placeholder={placeholder}
            />
            {suffix === undefined ? null : (
              <InputGroup.Suffix>{suffix}</InputGroup.Suffix>
            )}
          </InputGroup>
          <FieldError className="px-0 text-left text-xs leading-4">
            {fieldState.error?.message}
          </FieldError>
        </TextField>
      )}
    />
  );
}

function PairField({
  first,
  isDisabled = false,
  onRemove,
  removeLabel,
  second,
}: {
  first: {
    inputMode?: "numeric" | "text";
    label: string;
    name: FieldPath<NameProfileFormValues>;
    placeholder: string;
    validationGroup?: FieldPath<NameProfileFormValues>;
  };
  isDisabled?: boolean;
  onRemove: () => void;
  removeLabel: string;
  second: {
    label: string;
    name: FieldPath<NameProfileFormValues>;
    placeholder: string;
    validationGroup?: FieldPath<NameProfileFormValues>;
  };
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <RecordInput {...first} isDisabled={isDisabled} />
      <RecordInput
        {...second}
        isDisabled={isDisabled}
        suffix={
          <RemoveButton
            isDisabled={isDisabled}
            label={removeLabel}
            onRemove={onRemove}
          />
        }
      />
    </div>
  );
}

export function RecordField({
  isDisabled = false,
  record,
  onRemove,
}: {
  isDisabled?: boolean;
  record: EditorRecord;
  onRemove: () => void;
}) {
  const index = record.arrayIndex;
  const removeLabel = `Remove ${record.label.toLowerCase()} record`;

  if (record.type === "pubkey") {
    return (
      <PairField
        first={{
          label: "X coordinate",
          name: "pubkey.x",
          placeholder: "0x79be667e…16f81798",
          validationGroup: "pubkey",
        }}
        isDisabled={isDisabled}
        removeLabel={removeLabel}
        second={{
          label: "Y coordinate",
          name: "pubkey.y",
          placeholder: "0x483ada77…fb10d4b8",
          validationGroup: "pubkey",
        }}
        onRemove={onRemove}
      />
    );
  }

  if (record.type === "abi" && index !== undefined) {
    return (
      <PairField
        first={{
          inputMode: "numeric",
          label: "Content type",
          name: formPath(`abi.${index}.contentType`),
          placeholder: "1",
        }}
        isDisabled={isDisabled}
        removeLabel={removeLabel}
        second={{
          label: "Encoded value",
          name: formPath(`abi.${index}.value`),
          placeholder: record.placeholder,
        }}
        onRemove={onRemove}
      />
    );
  }

  if (record.type === "data" && index !== undefined) {
    return (
      <PairField
        first={{
          label: "Data key",
          name: formPath(`data.${index}.key`),
          placeholder: "com.piedpiper.data",
        }}
        isDisabled={isDisabled}
        removeLabel={removeLabel}
        second={{
          label: "Encoded value",
          name: formPath(`data.${index}.value`),
          placeholder: record.placeholder,
        }}
        onRemove={onRemove}
      />
    );
  }

  if (record.type === "interface" && index !== undefined) {
    return (
      <PairField
        first={{
          label: "Interface ID",
          name: formPath(`interfaces.${index}.interfaceId`),
          placeholder: "0x01ffc9a7",
        }}
        isDisabled={isDisabled}
        removeLabel={removeLabel}
        second={{
          label: "Implementer",
          name: formPath(`interfaces.${index}.implementer`),
          placeholder: "0xA0b86991…3606eB48",
        }}
        onRemove={onRemove}
      />
    );
  }

  if (record.type === "text" && record.isCustom && index !== undefined) {
    return (
      <PairField
        first={{
          label: "Record key",
          name: formPath(`text.${index}.key`),
          placeholder: "com.piedpiper",
        }}
        isDisabled={isDisabled}
        removeLabel="Remove custom record"
        second={{
          label: "Record value",
          name: formPath(`text.${index}.value`),
          placeholder: "Value",
        }}
        onRemove={onRemove}
      />
    );
  }

  let name: FieldPath<NameProfileFormValues>;

  if (record.type === "text" && index !== undefined) {
    name = formPath(`text.${index}.value`);
  } else if (record.type === "address" && index !== undefined) {
    name = formPath(`addresses.${index}.value`);
  } else if (record.type === "contenthash") {
    name = "contenthash";
  } else if (record.type === "name") {
    name = "name";
  } else {
    return null;
  }

  const RecordIcon = getRecordIcon(record.name, record.type);

  return (
    <RecordInput
      isDisabled={isDisabled}
      label={record.label}
      name={name}
      placeholder={record.placeholder}
      prefix={<RecordIcon aria-hidden className="size-5 shrink-0" />}
      suffix={
        <RemoveButton
          isDisabled={isDisabled}
          label={removeLabel}
          onRemove={onRemove}
        />
      }
    />
  );
}
