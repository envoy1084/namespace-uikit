"use client";

import { InputGroup, Spinner, Typography } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { useNameAvailability } from "../../../hooks";
import { useRegisterName } from "../context";

export const NameSearchStep = () => {
  const { input, setInput } = useRegisterName();
  const availability = useNameAvailability({ input });

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
      <div className="mt-2 min-h-5" aria-live="polite">
        {availability.isFetching ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <Typography.Paragraph color="muted" size="sm">
              Checking availability…
            </Typography.Paragraph>
          </div>
        ) : availability.isSuccess ? (
          <Typography.Paragraph
            className={availability.data ? "text-success" : "text-danger"}
            size="sm"
            weight="medium"
          >
            {availability.data
              ? "Name is available."
              : "Name is not available."}
          </Typography.Paragraph>
        ) : availability.isError ? (
          <Typography.Paragraph color="muted" size="sm">
            Unable to check availability.
          </Typography.Paragraph>
        ) : null}
      </div>
    </div>
  );
};
