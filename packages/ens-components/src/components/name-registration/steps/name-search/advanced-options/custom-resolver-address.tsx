"use client";

import { useCallback } from "react";

import { FieldError, Input, Label, TextField } from "@thenamespace/uikit";

import { useNameRegistration } from "#/components/name-registration/context";
import { AdvancedOptionInfo } from "#/components/name-registration/steps/name-search/advanced-options/advanced-option-info";
import { isNonZeroAddress } from "#/lib/helpers";

export function CustomResolverAddress() {
  const { resolverInput, setResolverAddress, setResolverInput } = useNameRegistration();
  const trimmedValue = resolverInput.trim();
  const isInvalid = trimmedValue !== "" && !isNonZeroAddress(trimmedValue);

  const updateAddress = useCallback(
    (nextValue: string) => {
      setResolverInput(nextValue);

      const address = nextValue.trim();
      setResolverAddress(isNonZeroAddress(address) ? address : null);
    },
    [setResolverAddress, setResolverInput],
  );

  return (
    <TextField
      fullWidth
      isInvalid={isInvalid}
      name="custom-resolver-address"
      value={resolverInput}
      onChange={updateAddress}
    >
      <div className="flex items-center gap-1">
        <Label className="text-muted text-xs">Custom resolver</Label>
        <AdvancedOptionInfo label="custom resolver">
          Leave blank to deploy a dedicated resolver for this name.
        </AdvancedOptionInfo>
      </div>
      <Input
        autoComplete="off"
        className="ring-inset"
        placeholder="0x0000…"
        spellCheck={false}
        variant="secondary"
      />
      <FieldError className="mx-auto text-center">
        Enter a valid non-zero contract address.
      </FieldError>
    </TextField>
  );
}
