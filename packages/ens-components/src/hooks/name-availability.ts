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
    if (parsedInput.error.code === "empty-input") {
      return invalid("empty", parsedInput.error.message);
    }

    if (
      parsedInput.error.code === "input-too-long" ||
      parsedInput.error.code === "label-too-long"
    ) {
      return invalid("label-too-long", parsedInput.error.message);
    }

    return invalid("invalid-name", parsedInput.error.message);
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
