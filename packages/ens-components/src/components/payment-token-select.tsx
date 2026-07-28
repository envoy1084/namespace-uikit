"use client";

import { useCallback } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { ListBox } from "@thenamespace/uikit/list-box";
import type { Address } from "viem";

import { PaymentTokenIcon } from "#/components/payment-token-icon";
import type { EnsPaymentToken, EnsPaymentTokens } from "#/data";
import { findPaymentToken, resolvePaymentToken } from "#/lib/helpers";

function TokenIcon({ token }: { token: EnsPaymentToken }) {
  return <PaymentTokenIcon icon={token.icon} symbol={token.symbol} />;
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
  const handleChange = useCallback(
    (nextValue: number | string | readonly (number | string)[] | null) => {
      if (Array.isArray(nextValue)) return;
      const token = findPaymentToken(tokens, nextValue?.toString());
      if (token !== undefined) onChange(token.address);
    },
    [onChange, tokens],
  );

  return (
    <InlineSelect
      aria-label="Payment token"
      isDisabled={isDisabled}
      onChange={handleChange}
      value={selectedToken.address}
    >
      <InlineSelect.Trigger className="gap-1.5">
        <TokenIcon token={selectedToken} />
        <span className="text-xs font-medium">{selectedToken.symbol}</span>
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover className="min-w-32">
        <ListBox>
          {tokens.map((token) => (
            <ListBox.Item id={token.address} key={token.address} textValue={token.symbol}>
              <TokenIcon token={token} />
              <span className="text-sm font-medium">{token.symbol}</span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  );
}
