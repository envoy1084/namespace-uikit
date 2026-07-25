import { err, ok, type Result } from "neverthrow";
import { normalize } from "viem/ens";

const MAX_LABEL_BYTES = 255;
const MAX_INPUT_CODE_UNITS = 1_024;
const UTF8_ENCODER = new TextEncoder();

export type ParseNameInputError =
  | "empty-input"
  | "empty-label"
  | "input-too-long"
  | "invalid-name"
  | "label-too-long";

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
    return err("empty-input");
  }

  if (value.length > MAX_INPUT_CODE_UNITS) {
    return err("input-too-long");
  }

  let normalizedInput: string;
  try {
    normalizedInput = normalize(value);
  } catch {
    return err("invalid-name");
  }

  const isLabelInput = !normalizedInput.includes(".");
  const normalizedName = isLabelInput
    ? `${normalizedInput}.eth`
    : normalizedInput;
  const labels = normalizedName.split(".") as [string, ...string[]];

  for (const label of labels) {
    if (label.length === 0) {
      return err("empty-label");
    }

    if (UTF8_ENCODER.encode(label).byteLength > MAX_LABEL_BYTES) {
      return err("label-too-long");
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
