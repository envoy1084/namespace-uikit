import type { FieldErrors, Resolver } from "react-hook-form";

import type { ProfileEditorSection } from "#/components/name-profile-editor/editor/types";
import type { NormalizeProfileRecordsError } from "#/components/name-profile-editor/normalize-profile-records";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import { findRecordDefinition } from "#/components/name-profile-editor/editor/record-definitions";
import { normalizeProfileRecords } from "#/components/name-profile-editor/normalize-profile-records";
import { emptyNameProfileFormValues } from "#/components/name-profile-editor/types";
import { formatError } from "#/lib/error";

type ArrayErrorTarget = "abi" | "addresses" | "data" | "interfaces" | "text";
type ErrorTarget =
  | ArrayErrorTarget
  | "contenthash"
  | "name"
  | "profile"
  | "pubkey";

interface ErrorLocation {
  field?: string;
  target: ErrorTarget;
}

const ERROR_LOCATIONS: Readonly<
  Record<NormalizeProfileRecordsError, ErrorLocation>
> = {
  DUPLICATE_ABI_CONTENT_TYPE: { field: "contentType", target: "abi" },
  DUPLICATE_ADDRESS_COIN_TYPE: { field: "coinType", target: "addresses" },
  DUPLICATE_DATA_KEY: { field: "key", target: "data" },
  DUPLICATE_INTERFACE_ID: { field: "interfaceId", target: "interfaces" },
  DUPLICATE_TEXT_KEY: { field: "key", target: "text" },
  INVALID_ABI_CONTENT_TYPE: { field: "contentType", target: "abi" },
  INVALID_ABI_VALUE: { field: "value", target: "abi" },
  INVALID_ADDRESS: { field: "value", target: "addresses" },
  INVALID_COIN_TYPE: { field: "coinType", target: "addresses" },
  INVALID_CONTENTHASH: { target: "contenthash" },
  INVALID_DATA_KEY: { field: "key", target: "data" },
  INVALID_DATA_VALUE: { field: "value", target: "data" },
  INVALID_EMAIL: { field: "value", target: "text" },
  INVALID_IMAGE_URL: { field: "value", target: "text" },
  INVALID_INTERFACE_ID: { field: "interfaceId", target: "interfaces" },
  INVALID_INTERFACE_IMPLEMENTER: {
    field: "implementer",
    target: "interfaces",
  },
  INVALID_NAME_RECORD: { target: "name" },
  INVALID_PROFILE_RECORDS: { target: "profile" },
  INVALID_PUBLIC_KEY: { field: "x", target: "pubkey" },
  INVALID_PUBLIC_KEY_X: { field: "x", target: "pubkey" },
  INVALID_PUBLIC_KEY_Y: { field: "y", target: "pubkey" },
  INVALID_TEXT_KEY: { field: "key", target: "text" },
  INVALID_TIMEZONE: { field: "value", target: "text" },
  INVALID_URL: { field: "value", target: "text" },
  MISSING_PUBLIC_KEY_X: { field: "x", target: "pubkey" },
  MISSING_PUBLIC_KEY_Y: { field: "y", target: "pubkey" },
  UNSUPPORTED_COIN_TYPE: { field: "coinType", target: "addresses" },
};

function isArrayErrorTarget(target: ErrorTarget): target is ArrayErrorTarget {
  return (
    target === "abi" ||
    target === "addresses" ||
    target === "data" ||
    target === "interfaces" ||
    target === "text"
  );
}

function findArrayErrorIndex(
  error: NormalizeProfileRecordsError,
  target: ArrayErrorTarget,
  values: NameProfileFormValues,
): number {
  const records = values[target];

  for (let index = 0; index < records.length; index += 1) {
    const candidate = {
      ...emptyNameProfileFormValues,
      pubkey: { ...emptyNameProfileFormValues.pubkey },
      [target]: records.slice(0, index + 1),
    };
    const normalized = normalizeProfileRecords(candidate);
    if (normalized.isErr() && normalized.error === error) return index;
  }

  return Math.max(records.length - 1, 0);
}

function createErrors(
  error: NormalizeProfileRecordsError,
  values: NameProfileFormValues,
): FieldErrors<NameProfileFormValues> {
  const { field, target } = ERROR_LOCATIONS[error];
  const errors: FieldErrors<NameProfileFormValues> = {};
  const createFieldError = (index?: number) => {
    const coinType =
      target === "addresses" && index !== undefined
        ? values.addresses[index]?.coinType
        : undefined;
    const network =
      coinType === undefined
        ? undefined
        : (findRecordDefinition("address", coinType)?.label ??
          `coin type ${coinType}`);

    return {
      message: formatError(
        error,
        network === undefined ? undefined : { network },
      ),
      type: error,
    };
  };

  if (target === "profile") {
    errors.root = { profile: createFieldError() };
  } else if (target === "contenthash" || target === "name") {
    (errors as Record<string, unknown>)[target] = createFieldError();
  } else if (target === "pubkey") {
    errors.pubkey = { [field ?? "x"]: createFieldError() };
  } else if (isArrayErrorTarget(target)) {
    const index = findArrayErrorIndex(error, target, values);
    const arrayErrors = Array.from<unknown>({
      length: Math.max(values[target].length, index + 1),
    });
    const fieldError = createFieldError(index);
    arrayErrors[index] =
      field === undefined ? { root: fieldError } : { [field]: fieldError };
    (errors as Record<string, unknown>)[target] = arrayErrors;
  } else {
    (errors as Record<string, unknown>)[target] = {
      root: createFieldError(),
    };
  }

  return errors;
}

function errorMessage(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;

  if (
    "message" in value &&
    typeof value.message === "string" &&
    value.message.length > 0
  ) {
    return value.message;
  }

  for (const nested of Object.values(value)) {
    const message = errorMessage(nested);
    if (message !== undefined) return message;
  }

  return undefined;
}

function firstErrorMessage(
  errors: FieldErrors<NameProfileFormValues>,
  keys: readonly string[],
): string | undefined {
  for (const key of keys) {
    const message = errorMessage((errors as Record<string, unknown>)[key]);
    if (message) return message;
  }

  return errorMessage(errors.root);
}

export function getProfileSectionError(
  errors: FieldErrors<NameProfileFormValues>,
  section: ProfileEditorSection,
): string | undefined {
  if (section === "addresses") {
    return firstErrorMessage(errors, ["addresses"]);
  }

  if (section === "website") {
    return firstErrorMessage(errors, ["contenthash"]);
  }

  if (section === "advanced") {
    return firstErrorMessage(errors, [
      "abi",
      "data",
      "interfaces",
      "name",
      "pubkey",
    ]);
  }

  return firstErrorMessage(errors, ["text"]);
}

export const profileFormResolver: Resolver<NameProfileFormValues> = async (
  values,
) => {
  const normalized = normalizeProfileRecords(values);

  if (normalized.isErr()) {
    return {
      errors: createErrors(normalized.error, values),
      values: {},
    };
  }

  return {
    errors: {},
    values,
  };
};
