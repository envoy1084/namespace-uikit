import { parseNameInput } from "../actions/parse-name-input";

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
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    if (parsedInput.error === "EMPTY_INPUT") {
      return invalid("empty", "Enter an ENS name or label.");
    }

    if (
      parsedInput.error === "INPUT_TOO_LONG" ||
      parsedInput.error === "LABEL_TOO_LONG"
    ) {
      return invalid("label-too-long", "The ENS name or label is too long.");
    }

    return invalid(
      "invalid-name",
      "This name is not valid according to ENSIP-15.",
    );
  }

  const parsedName = parsedInput.value;

  if (parsedName.tld !== "eth") {
    return invalid(
      "unsupported-tld",
      "Only second-level .eth names are supported.",
    );
  }

  if (parsedName.nameLevel !== 2) {
    return invalid(
      "subname-not-supported",
      "Subnames cannot be checked with the .eth registrar.",
    );
  }

  return {
    isValid: true,
    label: parsedName.label,
    name: parsedName.normalizedName as `${string}.eth`,
  };
}
