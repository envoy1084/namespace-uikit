"use client";

import type { Address } from "viem";

import type { EnsPaymentToken, EnsPaymentTokens } from "#/data";

import { Avatar, InlineSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";

import { findPaymentToken, resolvePaymentToken } from "#/lib/helpers";

interface PaymentTokenIconProps {
  token: EnsPaymentToken;
}

function PaymentTokenIcon({ token }: PaymentTokenIconProps) {
  return (
    <Avatar className="size-5">
      <Avatar.Image alt="" src={token.icon} />
      <Avatar.Fallback>{token.symbol.slice(0, 1)}</Avatar.Fallback>
    </Avatar>
  );
}

export interface PaymentTokenSelectProps {
  isDisabled?: boolean;
  onChange: (address: Address) => void;
  tokens: EnsPaymentTokens;
  value: Address;
}

export function PaymentTokenSelect({
  isDisabled = false,
  onChange,
  tokens,
  value,
}: PaymentTokenSelectProps) {
  const selectedToken = resolvePaymentToken(tokens, value);

  return (
    <InlineSelect
      aria-label="Payment token"
      isDisabled={isDisabled}
      value={selectedToken.address}
      onChange={(nextValue) => {
        const token = findPaymentToken(tokens, nextValue?.toString());

        if (token !== undefined) onChange(token.address);
      }}
    >
      <InlineSelect.Trigger className="gap-1.5">
        <PaymentTokenIcon token={selectedToken} />
        <span className="text-xs font-medium">{selectedToken.symbol}</span>
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="w-40">
        <ListBox>
          {tokens.map((token) => (
            <ListBox.Item
              id={token.address}
              key={token.address}
              textValue={token.name}
            >
              <PaymentTokenIcon token={token} />
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-medium">{token.symbol}</span>
                <span className="text-muted truncate text-xs">
                  {token.name}
                </span>
              </span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  );
}
