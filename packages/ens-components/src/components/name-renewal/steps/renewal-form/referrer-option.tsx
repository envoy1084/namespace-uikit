"use client";

import { useCallback } from "react";

import { Disclosure, FieldError, Input, Label, TextField, Tooltip } from "@thenamespace/uikit";
import { HugeiconsIcon, InformationCircleIcon } from "@thenamespace/uikit/icons";
import { getAddress, isAddress, pad, zeroHash } from "viem";

import { useNameRenewal } from "#/components/name-renewal/context";

export function RenewalAdvancedOptions({ isDisabled = false }: { isDisabled?: boolean }) {
  const { referrerInput, setReferrer, setReferrerInput } = useNameRenewal();
  const trimmedValue = referrerInput.trim();
  const isInvalid = trimmedValue !== "" && !isAddress(trimmedValue);

  const updateAddress = useCallback(
    (nextValue: string) => {
      setReferrerInput(nextValue);
      const address = nextValue.trim();
      if (address === "") {
        setReferrer(zeroHash);
      } else if (isAddress(address)) {
        setReferrer(pad(getAddress(address), { size: 32 }));
      } else {
        setReferrer(zeroHash);
      }
    },
    [setReferrer, setReferrerInput],
  );

  return (
    <Disclosure className="border-default mt-4 border-t pt-3">
      <Disclosure.Heading>
        <Disclosure.Trigger className="text-foreground flex w-full items-center bg-transparent px-0 py-1 text-xs font-medium">
          <span>Advanced options</span>
          <Disclosure.Indicator className="text-muted size-4" />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="px-0 pt-3 pb-0">
          <TextField
            fullWidth
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            name="renewal-referrer-address"
            value={referrerInput}
            onChange={updateAddress}
          >
            <div className="flex items-center gap-1">
              <Label className="text-muted text-xs">Referrer address</Label>
              <Tooltip>
                <Tooltip.Trigger
                  aria-label="About referrer address"
                  className="text-muted inline-flex size-4 items-center justify-center bg-transparent p-0"
                >
                  <HugeiconsIcon className="size-3.5" icon={InformationCircleIcon} />
                </Tooltip.Trigger>
                <Tooltip.Content className="max-w-56">
                  Optional address credited for this renewal.
                </Tooltip.Content>
              </Tooltip>
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
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}
