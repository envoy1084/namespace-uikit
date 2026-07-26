"use client";

import {
  Description,
  Disclosure,
  FieldError,
  Input,
  Label,
  TextField,
} from "@thenamespace/uikit";
import { getAddress, isAddress, pad, zeroHash } from "viem";

import { useRegisterName } from "#/components/register-name/context";

export function ReferrerAddress() {
  const { referrerInput, setReferrer, setReferrerInput } = useRegisterName();
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
    <Disclosure className="border-default mt-4 border-t pt-3">
      <Disclosure.Heading>
        <Disclosure.Trigger className="text-foreground flex w-full items-center bg-transparent px-0 py-1 text-xs font-medium">
          <span>Advanced options</span>
          <Disclosure.Indicator className="text-muted size-4" />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="px-0 pt-3 pb-0" style={{ padding: 0 }}>
          <TextField
            fullWidth
            isInvalid={isInvalid}
            name="referrer-address"
            value={referrerInput}
            onChange={updateAddress}
          >
            <Label className="sr-only">Referrer address</Label>
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
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}
