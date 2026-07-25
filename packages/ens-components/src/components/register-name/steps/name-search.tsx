"use client";

import { InputGroup, Spinner, Typography } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { parseNameInput } from "../../../actions";
import { useNameAvailability } from "../../../hooks";
import { useRegisterName } from "../context";

export const NameSearchStep = () => {
  const { input, setInput } = useRegisterName();
  const availability = useNameAvailability({ input });
  const parsedInput = parseNameInput(input);
  const name = parsedInput.isOk() ? parsedInput.value.normalizedName : input;

  return (
    <div>
      <InputGroup className="w-full" variant="secondary">
        <InputGroup.Prefix>
          <Icon
            icon={Search01Icon}
            className="text-muted size-4"
            strokeWidth={2}
          />
        </InputGroup.Prefix>
        <InputGroup.Input
          className="w-full"
          placeholder="Search Label, eg- vitalik"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <InputGroup.Suffix>
          <span>.eth</span>
        </InputGroup.Suffix>
      </InputGroup>
      <div
        className="mt-2 flex min-h-5 items-center justify-center"
        aria-live="polite"
      >
        {availability.isFetching ? (
          <div className="flex items-center gap-2">
            <Spinner className="size-3" size="sm" />
            <Typography.Paragraph color="muted" size="xs">
              Checking availability…
            </Typography.Paragraph>
          </div>
        ) : availability.isSuccess ? (
          <Typography.Paragraph
            className={availability.data ? "text-success" : "text-danger"}
            size="xs"
            weight="medium"
          >
            {availability.data
              ? `${name} is available.`
              : `${name} is not available.`}
          </Typography.Paragraph>
        ) : availability.isError ? (
          <Typography.Paragraph color="muted" size="xs">
            Unable to check availability.
          </Typography.Paragraph>
        ) : null}
      </div>
    </div>
  );
};
