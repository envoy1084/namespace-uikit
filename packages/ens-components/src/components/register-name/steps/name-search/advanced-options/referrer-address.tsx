"use client";

import {
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@thenamespace/uikit";
import { getAddress, isAddress, pad, zeroHash } from "viem";

import { useNameRegistration } from "#/components/register-name/context";

export function ReferrerAddress() {
  const { referrerInput, setReferrer, setReferrerInput } =
    useNameRegistration();
  const trimmedValue = referrerInput.trim();
  const isInvalid = trimmedValue !== "" && !isAddress(trimmedValue);

  const updateAddress = (nextValue: string) => {
    setReferrerInput(nextValue);

    const address = nextValue.trim();
    if (address === "") {
      setReferrer(zeroHash);
    } else if (isAddress(address)) {
      setReferrer(pad(getAddress(address), { size: 32 }));
    } else {
      setReferrer(zeroHash);
    }
  };

  return (
    <TextField
      fullWidth
      isInvalid={isInvalid}
      name="referrer-address"
      value={referrerInput}
      onChange={updateAddress}
    >
      <Label className="text-muted text-xs">Referrer address</Label>
      <Input
        autoComplete="off"
        className="ring-inset"
        placeholder="0x0000…"
        spellCheck={false}
        variant="secondary"
      />
      <Description>
        Optional address credited for this registration.
      </Description>
      <FieldError>Enter a valid Ethereum address.</FieldError>
    </TextField>
  );
}
