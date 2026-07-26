"use client";

import {
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@thenamespace/uikit";

import { useNameRegistration } from "#/components/register-name/context";
import { isNonZeroAddress } from "#/lib/helpers";

export function CustomResolverAddress() {
  const { resolverInput, setResolverAddress, setResolverInput } =
    useNameRegistration();
  const trimmedValue = resolverInput.trim();
  const isInvalid = trimmedValue !== "" && !isNonZeroAddress(trimmedValue);

  const updateAddress = (nextValue: string) => {
    setResolverInput(nextValue);

    const address = nextValue.trim();
    setResolverAddress(isNonZeroAddress(address) ? address : null);
  };

  return (
    <TextField
      fullWidth
      isInvalid={isInvalid}
      name="custom-resolver-address"
      value={resolverInput}
      onChange={updateAddress}
    >
      <Label className="text-muted text-xs">Custom resolver</Label>
      <Input
        autoComplete="off"
        className="ring-inset"
        placeholder="0x0000…"
        spellCheck={false}
        variant="secondary"
      />
      <Description>
        Leave blank to deploy a dedicated resolver for this name.
      </Description>
      <FieldError>Enter a valid non-zero contract address.</FieldError>
    </TextField>
  );
}
