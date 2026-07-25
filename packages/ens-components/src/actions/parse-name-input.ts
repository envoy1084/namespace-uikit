import { err, ok, type Result } from "neverthrow";
import { normalize } from "viem/ens";

const MAX_LABEL_BYTES = 255;
const MAX_INPUT_CODE_UNITS = 1_024;
const UTF8_ENCODER = new TextEncoder();

export type ParseNameInputErrorCode =
  | "empty-input"
  | "empty-label"
  | "input-too-long"
  | "invalid-name"
  | "label-too-long";

export interface ParseNameInputErrorOptions {
  readonly cause?: unknown;
  readonly label?: string;
}

export class ParseNameInputError extends Error {
  override readonly name = "ParseNameInputError";
  readonly code: ParseNameInputErrorCode;
  readonly label: string | undefined;

  constructor(
    code: ParseNameInputErrorCode,
    message: string,
    options: ParseNameInputErrorOptions = {},
  ) {
    super(
      message,
      options.cause === undefined ? undefined : { cause: options.cause },
    );
    this.code = code;
    this.label = options.label;
  }
}

export interface ParsedNameInput {
  /** The first (leftmost) label. */
  readonly label: string;
  /** Whether the provided input was a single label before `.eth` was added. */
  readonly isLabelInput: boolean;
  /** The normalized labels in left-to-right order. */
  readonly labels: readonly [string, ...string[]];
  /** Number of labels in the normalized name. */
  readonly nameLevel: number;
  /** ENSIP-15 normalized name. */
  readonly normalizedName: string;
  /** Everything after the first label. */
  readonly parentName: string;
  /** The final (rightmost) label. */
  readonly tld: string;
}

/**
 * Parses user-provided ENS input using ENSIP-15 and NameCoder-compatible label
 * rules. A single label is interpreted as a second-level `.eth` name.
 */
export function parseNameInput(
  input: string | null | undefined,
): Result<ParsedNameInput, ParseNameInputError> {
  const value = (input ?? "").trim();

  if (value.length === 0) {
    return err(
      new ParseNameInputError("empty-input", "Enter an ENS name or label."),
    );
  }

  if (value.length > MAX_INPUT_CODE_UNITS) {
    return err(
      new ParseNameInputError(
        "input-too-long",
        "The ENS name is too long to process.",
      ),
    );
  }

  let normalizedInput: string;
  try {
    normalizedInput = normalize(value);
  } catch (cause) {
    return err(
      new ParseNameInputError(
        "invalid-name",
        "This name is not valid according to ENSIP-15.",
        { cause },
      ),
    );
  }

  const isLabelInput = !normalizedInput.includes(".");
  const normalizedName = isLabelInput
    ? `${normalizedInput}.eth`
    : normalizedInput;
  const labels = normalizedName.split(".") as [string, ...string[]];

  for (const label of labels) {
    if (label.length === 0) {
      return err(
        new ParseNameInputError(
          "empty-label",
          "ENS names cannot contain empty labels.",
        ),
      );
    }

    if (UTF8_ENCODER.encode(label).byteLength > MAX_LABEL_BYTES) {
      return err(
        new ParseNameInputError(
          "label-too-long",
          "ENS labels cannot exceed 255 bytes.",
          { label },
        ),
      );
    }
  }

  return ok({
    label: labels[0],
    isLabelInput,
    labels,
    nameLevel: labels.length,
    normalizedName,
    parentName: labels.slice(1).join("."),
    tld: labels.at(-1) ?? "",
  });
}
