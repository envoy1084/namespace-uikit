"use client";

import type { FieldPath } from "react-hook-form";

import type { NameProfileEditorRecordDefinition } from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import {
  Button,
  FieldError,
  Input,
  Label,
  Surface,
  TextField,
  Typography,
} from "@thenamespace/uikit";
import { Cancel01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { Controller, useFormContext } from "react-hook-form";

import { RecordIcon } from "#/components/name-profile-editor/editor/record-icon";
import {
  validateAddressRecord,
  validateBytes32,
  validateContenthash,
  validateHexBytes,
  validateInterfaceId,
  validateNameRecord,
  validateUnsignedInteger,
} from "#/components/name-profile-editor/editor/validation";

export interface ActiveProfileRecord {
  definition: NameProfileEditorRecordDefinition;
  id: string;
  index?: number;
}

function ProfileInput({
  label,
  name,
  placeholder,
  validate,
}: {
  label: string;
  name: FieldPath<NameProfileFormValues>;
  placeholder: string;
  validate?: (value: string) => true | string;
}) {
  const { control } = useFormContext<NameProfileFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => {
          const stringValue = typeof value === "string" ? value : "";
          if (stringValue.trim().length === 0) return "This field is required.";
          return validate?.(stringValue) ?? true;
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          isInvalid={fieldState.invalid}
          value={typeof field.value === "string" ? field.value : ""}
          onBlur={field.onBlur}
          onChange={field.onChange}
        >
          <Label className="text-muted text-xs">{label}</Label>
          <Input
            className="ring-inset"
            placeholder={placeholder}
            spellCheck={false}
            variant="secondary"
          />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}

function RecordInputs({ record }: { record: ActiveProfileRecord }) {
  const { definition, index } = record;

  if (definition.kind === "text" && index !== undefined) {
    const isCustom = definition.id === "custom-text";
    return (
      <div className={isCustom ? "grid gap-3 sm:grid-cols-2" : undefined}>
        {isCustom && (
          <ProfileInput
            label="Record key"
            name={`text.${index}.key`}
            placeholder="com.example"
          />
        )}
        <ProfileInput
          label={isCustom ? "Record value" : definition.label}
          name={`text.${index}.value`}
          placeholder={definition.placeholder}
        />
      </div>
    );
  }

  if (definition.kind === "address" && index !== undefined) {
    const coinType = definition.coinType ?? "";
    return (
      <ProfileInput
        label={`${definition.label} address`}
        name={`addresses.${index}.value`}
        placeholder={definition.placeholder}
        validate={(value) => validateAddressRecord(value, coinType)}
      />
    );
  }

  if (definition.kind === "contenthash") {
    return (
      <ProfileInput
        label="Content hash URI"
        name="contenthash"
        placeholder={definition.placeholder}
        validate={validateContenthash}
      />
    );
  }

  if (definition.kind === "name") {
    return (
      <ProfileInput
        label="Name"
        name="name"
        placeholder={definition.placeholder}
        validate={validateNameRecord}
      />
    );
  }

  if (definition.kind === "pubkey") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileInput
          label="X coordinate"
          name="pubkey.x"
          placeholder="0x…"
          validate={validateBytes32}
        />
        <ProfileInput
          label="Y coordinate"
          name="pubkey.y"
          placeholder="0x…"
          validate={validateBytes32}
        />
      </div>
    );
  }

  if (definition.kind === "data" && index !== undefined) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileInput
          label="Data key"
          name={`data.${index}.key`}
          placeholder="Key"
        />
        <ProfileInput
          label="Bytes"
          name={`data.${index}.value`}
          placeholder="0x…"
          validate={validateHexBytes}
        />
      </div>
    );
  }

  if (definition.kind === "abi" && index !== undefined) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileInput
          label="Content type"
          name={`abi.${index}.contentType`}
          placeholder="1"
          validate={validateUnsignedInteger}
        />
        <ProfileInput
          label="ABI bytes"
          name={`abi.${index}.value`}
          placeholder="0x…"
          validate={validateHexBytes}
        />
      </div>
    );
  }

  if (definition.kind === "interface" && index !== undefined) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileInput
          label="Interface ID"
          name={`interfaces.${index}.interfaceId`}
          placeholder="0x00000000"
          validate={validateInterfaceId}
        />
        <ProfileInput
          label="Implementer"
          name={`interfaces.${index}.implementer`}
          placeholder="0x0000…"
          validate={(value) =>
            /^0x[0-9a-fA-F]{40}$/.test(value) || "Enter an Ethereum address."
          }
        />
      </div>
    );
  }

  return null;
}

export function RecordField({
  onRemove,
  record,
}: {
  onRemove: (record: ActiveProfileRecord) => void;
  record: ActiveProfileRecord;
}) {
  return (
    <Surface className="border-default rounded-2xl border p-3 sm:p-4">
      <div className="mb-3 flex items-start gap-3">
        <RecordIcon icon={record.definition.icon} />
        <div className="min-w-0 flex-1">
          <Typography.Paragraph size="sm" weight="medium">
            {record.definition.label}
          </Typography.Paragraph>
          <Typography.Paragraph color="muted" size="xs">
            {record.definition.description}
          </Typography.Paragraph>
        </div>
        <Button
          isIconOnly
          aria-label={`Remove ${record.definition.label}`}
          className="size-8 min-w-8 rounded-full"
          size="sm"
          variant="ghost"
          onPress={() => onRemove(record)}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={15} />
        </Button>
      </div>
      <RecordInputs record={record} />
    </Surface>
  );
}
