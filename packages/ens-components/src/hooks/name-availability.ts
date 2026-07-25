import { normalize } from "viem/ens";

const MAX_LABEL_BYTES = 255;
const MAX_INPUT_CODE_UNITS = 1_024;
const UTF8_ENCODER = new TextEncoder();

export type NameAvailabilityValidationErrorCode =
  | "empty"
  | "invalid-name"
  | "unsupported-tld"
  | "subname-not-supported"
  | "label-too-long";

export interface NameAvailabilityValidationError {
  code: NameAvailabilityValidationErrorCode;
  message: string;
}

export type NormalizedEthNameInput =
  | {
      isValid: true;
      label: string;
      name: `${string}.eth`;
    }
  | {
      isValid: false;
      error: NameAvailabilityValidationError;
    };

function invalid(
  code: NameAvailabilityValidationErrorCode,
  message: string,
): NormalizedEthNameInput {
  return { isValid: false, error: { code, message } };
}

/**
 * Converts a label or second-level `.eth` name into the label expected by the
 * ENSv2 ETHRegistrar.
 */
export function normalizeEthNameInput(
  input: string | null | undefined,
): NormalizedEthNameInput {
  const value = (input ?? "").trim();

  if (value.length === 0) {
    return invalid("empty", "Enter an ENS name.");
  }

  // Bound synchronous ENS normalization work for untrusted form input.
  if (value.length > MAX_INPUT_CODE_UNITS) {
    return invalid("label-too-long", "The ENS label is too long.");
  }

  let normalizedInput: string;
  try {
    normalizedInput = normalize(value);
  } catch {
    return invalid(
      "invalid-name",
      "This name is not valid according to ENSIP-15.",
    );
  }

  const labels = normalizedInput.split(".");
  let label: string;

  if (labels.length === 1) {
    label = labels[0] ?? "";
  } else if (labels.at(-1) !== "eth") {
    return invalid(
      "unsupported-tld",
      "Only second-level .eth names are supported.",
    );
  } else if (labels.length !== 2) {
    return invalid(
      "subname-not-supported",
      "Subnames cannot be checked with the .eth registrar.",
    );
  } else {
    label = labels[0] ?? "";
  }

  if (label.length === 0) {
    return invalid("invalid-name", "The ENS label cannot be empty.");
  }

  if (UTF8_ENCODER.encode(label).byteLength > MAX_LABEL_BYTES) {
    return invalid("label-too-long", "The ENS label is too long.");
  }

  return {
    isValid: true,
    label,
    name: `${label}.eth`,
  };
}
