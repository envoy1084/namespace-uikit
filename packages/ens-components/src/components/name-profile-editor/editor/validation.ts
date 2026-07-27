import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import { normalizeProfileRecords } from "#/components/name-profile-editor/normalize-profile-records";
import { emptyNameProfileFormValues } from "#/components/name-profile-editor/types";

function validateProfile(
  values: NameProfileFormValues,
  message: string,
): true | string {
  return normalizeProfileRecords(values).isOk() || message;
}

export function validateAddressRecord(
  value: string,
  coinType: string,
): true | string {
  if (value.trim().length === 0) return "Enter an address.";
  return validateProfile(
    {
      ...emptyNameProfileFormValues,
      addresses: [{ coinType, value }],
    },
    "Enter a valid address for this network.",
  );
}

export function validateContenthash(value: string): true | string {
  if (value.trim().length === 0) return "Enter a content hash.";
  return validateProfile(
    { ...emptyNameProfileFormValues, contenthash: value },
    "Enter a valid content hash URI.",
  );
}

export function validateNameRecord(value: string): true | string {
  if (value.trim().length === 0) return "Enter a name.";
  return validateProfile(
    { ...emptyNameProfileFormValues, name: value },
    "Enter a valid ENS name.",
  );
}

export function validateHexBytes(value: string): true | string {
  return (
    /^0x(?:[0-9a-fA-F]{2})*$/.test(value) || "Enter even-length hex bytes."
  );
}

export function validateBytes32(value: string): true | string {
  return /^0x[0-9a-fA-F]{64}$/.test(value) || "Enter a bytes32 hex value.";
}

export function validateInterfaceId(value: string): true | string {
  return /^0x[0-9a-fA-F]{8}$/.test(value) || "Enter a four-byte interface ID.";
}

export function validateUnsignedInteger(value: string): true | string {
  return /^\d+$/.test(value) || "Enter an unsigned integer.";
}
