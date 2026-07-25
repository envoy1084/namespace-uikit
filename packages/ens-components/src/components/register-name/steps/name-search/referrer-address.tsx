"use client";

import { useState } from "react";

import {
  Button,
  Description,
  Disclosure,
  FieldError,
  Input,
  Label,
  TextField,
} from "@thenamespace/uikit";
import { getAddress, isAddress, pad, slice, zeroHash } from "viem";

import { useRegisterName } from "#/components/register-name/context";

export function ReferrerAddress() {
  const { referrer, setReferrer } = useRegisterName();
  const [value, setValue] = useState(
    referrer === zeroHash ? "" : getAddress(slice(referrer, 12)),
  );
  const trimmedValue = value.trim();
  const isInvalid = trimmedValue !== "" && !isAddress(trimmedValue);

  const updateAddress = (nextValue: string) => {
    setValue(nextValue);

    const address = nextValue.trim();
    if (address === "") {
      setReferrer(zeroHash);
    } else if (isAddress(address)) {
      setReferrer(pad(getAddress(address), { size: 32 }));
    }
  };

  return (
    <Disclosure className="border-default mt-4 border-t pt-3">
      <Disclosure.Heading>
        <Button
          className="h-auto w-full justify-between px-0 py-1 text-xs"
          slot="trigger"
          variant="tertiary"
        >
          <span>Referrer address</span>
          <Disclosure.Indicator className="text-muted size-4" />
        </Button>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="pt-3">
          <TextField
            fullWidth
            isInvalid={isInvalid}
            name="referrer-address"
            value={value}
            onChange={updateAddress}
          >
            <Label className="sr-only">Referrer address</Label>
            <Input
              autoComplete="off"
              placeholder="0x0000…"
              spellCheck={false}
              variant="secondary"
            />
            <Description>
              Optional address credited for this registration.
            </Description>
            <FieldError>Enter a valid Ethereum address.</FieldError>
          </TextField>
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}
