"use client";

import { useCallback } from "react";

import { FieldError, Input, Label, TextField } from "@thenamespace/uikit";
import { isAddress, zeroHash } from "viem";

import { useNameRegistration } from "#/components/name-registration/context";
import { AdvancedOptionInfo } from "#/components/name-registration/steps/name-search/advanced-options/advanced-option-info";
import { encodeReferrerAddressInput } from "#/lib/helpers";

export function ReferrerAddress() {
  const { referrerInput, setReferrer, setReferrerInput } = useNameRegistration();
  const trimmedValue = referrerInput.trim();
  const isInvalid = trimmedValue !== "" && !isAddress(trimmedValue);

  const updateAddress = useCallback(
    (nextValue: string) => {
      setReferrerInput(nextValue);

      setReferrer(encodeReferrerAddressInput(nextValue) ?? zeroHash);
    },
    [setReferrer, setReferrerInput],
  );

  return (
    <TextField
      fullWidth
      isInvalid={isInvalid}
      name="referrer-address"
      value={referrerInput}
      onChange={updateAddress}
    >
      <div className="flex items-center gap-1">
        <Label className="text-muted text-xs">Referrer address</Label>
        <AdvancedOptionInfo label="referrer address">
          Optional address credited for this registration.
        </AdvancedOptionInfo>
      </div>
      <Input
        autoComplete="off"
        className="ring-inset"
        placeholder="0x0000…"
        spellCheck={false}
        variant="secondary"
      />
      <FieldError className="mx-auto text-center">Enter a valid Ethereum address.</FieldError>
    </TextField>
  );
}
