"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import { Button, InputGroup, Spinner, Typography } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { useNameRenewal } from "#/components/name-renewal/context";
import {
  NameRenewalBody,
  NameRenewalFooter,
  NameRenewalHeader,
  NameRenewalHeading,
} from "#/components/name-renewal/layout";
import { RenewalDetails } from "#/components/name-renewal/steps/renewal-form/renewal-details";
import { useRenewalSubmission } from "#/components/name-renewal/steps/renewal-form/use-renewal-submission";
import type { NameRenewalSuccessDetails } from "#/components/name-renewal/types";
import { TransactionProgress } from "#/components/transaction-progress";
import { useNameRenewalPrice } from "#/hooks";
import { formatError } from "#/lib";
import { parseNameInput } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

const DefaultNameRenewalGraphic = new URL(
  "../../../../assets/register-ens-header.svg",
  import.meta.url,
);

export interface NameRenewalFormProps {
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (details: NameRenewalSuccessDetails) => void;
}

export function NameRenewalForm({ onPendingChange, onSuccess }: NameRenewalFormProps) {
  const { duration, input, isReferrerValid, messages, paymentTokenAddress, setInput, slots } =
    useNameRenewal();
  const { chain } = useEnsConfig();
  const parsedInput = parseNameInput(input);
  const normalizedName = parsedInput.isOk() ? parsedInput.value.normalizedName : input;
  const inputError =
    input.trim() === ""
      ? undefined
      : parsedInput.isErr()
        ? parsedInput.error
        : parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth"
          ? ("UNSUPPORTED_NAME" as const)
          : undefined;
  const [quotedName, setQuotedName] = useState<string>();
  const quote = useNameRenewalPrice({
    duration,
    input,
    paymentTokenAddress,
    query: {
      placeholderData: (previous) => previous,
      retry: (failureCount, error) => error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const submission = useRenewalSubmission({
    onSuccess,
    ...(onPendingChange === undefined ? {} : { onPendingChange }),
  });
  const hasMatchingQuote = quote.data !== undefined && quotedName === normalizedName;
  const canRenew =
    hasMatchingQuote &&
    !quote.isFetching &&
    inputError === undefined &&
    isReferrerValid &&
    !submission.isPending;
  const showEthSuffix = !input.trim().includes(".");
  const displayedError = inputError ?? quote.error;

  useEffect(() => {
    if (quote.isSuccess && !quote.isPlaceholderData && inputError === undefined) {
      setQuotedName(normalizedName);
    }
  }, [inputError, normalizedName, quote.isPlaceholderData, quote.isSuccess]);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
      setQuotedName(undefined);
    },
    [setInput],
  );

  return (
    <>
      <NameRenewalHeader className="mx-auto">
        {slots.formGraphic === undefined ? (
          <img alt="" className="mx-auto w-full max-w-64" src={DefaultNameRenewalGraphic.href} />
        ) : (
          slots.formGraphic
        )}
        <div>
          <NameRenewalHeading className="mx-auto text-center">
            {messages.formTitle}
          </NameRenewalHeading>
          <p className="text-muted text-center text-sm">{messages.formDescription}</p>
        </div>
      </NameRenewalHeader>

      <NameRenewalBody className="mt-2 flex-none">
        <InputGroup className="w-full" variant="secondary">
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon={Search01Icon} strokeWidth={2} />
          </InputGroup.Prefix>
          <InputGroup.Input
            className="w-full"
            disabled={submission.isPending}
            placeholder={messages.searchPlaceholder}
            value={input}
            onChange={handleInputChange}
          />
          {showEthSuffix ? (
            <InputGroup.Suffix>
              <span>.eth</span>
            </InputGroup.Suffix>
          ) : null}
        </InputGroup>

        {!hasMatchingQuote && (inputError !== undefined || quote.isFetching || quote.isError) ? (
          <div aria-live="polite" className="mt-2 flex min-h-5 items-center justify-center">
            {quote.isFetching && inputError === undefined ? (
              <div className="flex items-center gap-2">
                <Spinner className="size-3" size="sm" />
                <Typography.Paragraph color="muted" size="xs">
                  Checking renewal…
                </Typography.Paragraph>
              </div>
            ) : (
              <Typography.Paragraph className="mx-auto text-center" color="muted" size="xs">
                {formatError(displayedError, { name: normalizedName })}
              </Typography.Paragraph>
            )}
          </div>
        ) : null}

        {hasMatchingQuote && quote.data !== undefined ? (
          <RenewalDetails
            isDisabled={submission.isPending}
            isPriceFetching={quote.isFetching}
            price={quote.data}
          />
        ) : null}
      </NameRenewalBody>

      <NameRenewalFooter className="mt-5 flex-col">
        {submission.isConfirming ? (
          <TransactionProgress
            account={submission.account}
            blockExplorerUrl={chain.blockExplorers?.default.url}
            chainId={chain.id}
            className="w-full"
            icon={slots.transactionProgressIcon}
            isConfirmed={submission.isTransactionConfirmed}
            transactionHash={submission.transactionHash}
          />
        ) : (
          <Button
            className="w-full"
            isDisabled={!canRenew || !submission.isWalletConnected}
            isPending={submission.isPending}
            onPress={submission.handleRenew}
          >
            {submission.buttonLabel}
          </Button>
        )}

        {submission.payment.data !== undefined && !submission.payment.data.hasSufficientBalance ? (
          <Typography.Paragraph className="text-danger mx-auto mt-2 text-center" size="xs">
            Insufficient {submission.paymentToken.symbol} balance.
          </Typography.Paragraph>
        ) : submission.payment.isError || submission.error !== undefined ? (
          <Typography.Paragraph
            className="text-danger mx-auto mt-2 text-center"
            role="alert"
            size="xs"
          >
            {formatError(submission.error ?? submission.payment.error, {
              name: normalizedName,
            })}
          </Typography.Paragraph>
        ) : null}
      </NameRenewalFooter>
    </>
  );
}
