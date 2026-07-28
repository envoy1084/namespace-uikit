"use client";

import type { FieldPath } from "react-hook-form";

import type { NameProfileEditorRecordDefinition } from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import {
  Button,
  FieldError,
  InputGroup,
  Label,
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
  icon,
  label,
  name,
  placeholder,
  validate,
}: {
  icon?: string;
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
          <Label className="sr-only">{label}</Label>
          <InputGroup
            className="border-default bg-background h-14 w-full rounded-xl border px-3 ring-inset @min-[800px]:h-20 @min-[800px]:rounded-2xl @min-[800px]:px-4"
            variant="secondary"
          >
            {icon && (
              <InputGroup.Prefix className="mr-2">
                <RecordIcon icon={icon} />
              </InputGroup.Prefix>
            )}
            <InputGroup.Input
              className="w-full text-base @min-[800px]:text-xl"
              placeholder={placeholder}
              spellCheck={false}
            />
          </InputGroup>
          <FieldError className="mt-1">{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}

function RecordInputs({ record }: { record: ActiveProfileRecord }) {
  const { definition, index } = record;

  if (definition.kind === "text" && index !== undefined) {
    const isCustom = definition.id === "custom-text";
    return isCustom ? (
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileInput
          label="Record key"
          name={`text.${index}.key`}
          placeholder="Record key"
        />
        <ProfileInput
          label="Record value"
          name={`text.${index}.value`}
          placeholder="Record value"
        />
      </div>
    ) : (
      <ProfileInput
        icon={definition.icon}
        label={definition.label}
        name={`text.${index}.value`}
        placeholder={definition.placeholder}
      />
    );
  }

  if (definition.kind === "address" && index !== undefined) {
    const coinType = definition.coinType ?? "";
    return (
      <ProfileInput
        icon={definition.icon}
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
        icon={definition.icon}
        label={definition.label}
        name="contenthash"
        placeholder={definition.placeholder}
        validate={validateContenthash}
      />
    );
  }

  if (definition.kind === "name") {
    return (
      <ProfileInput
        icon={definition.icon}
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
          placeholder="X coordinate"
          validate={validateBytes32}
        />
        <ProfileInput
          label="Y coordinate"
          name="pubkey.y"
          placeholder="Y coordinate"
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
          placeholder="Data key"
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
          placeholder="Content type"
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
    <div className="col-span-full">
      <Typography.Paragraph className="mb-1" color="muted" size="sm">
        {record.definition.label}
      </Typography.Paragraph>
      <div className="flex items-center gap-2.5">
        <div className="min-w-0 flex-1">
          <RecordInputs record={record} />
        </div>
        <Button
          isIconOnly
          aria-label={`Remove ${record.definition.label}`}
          className="size-10 min-w-10 rounded-full text-[#10232e]"
          size="sm"
          variant="ghost"
          onPress={() => onRemove(record)}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={28} strokeWidth={1.8} />
        </Button>
      </div>
    </div>
  );
}
