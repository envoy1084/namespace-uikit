"use client";

import { Description, Label, Switch } from "@thenamespace/uikit";

import { useNameRegistration } from "#/components/register-name/context";

export function SetPrimaryName() {
  const { resolverAddress, setShouldSetPrimaryName, shouldSetPrimaryName } =
    useNameRegistration();

  return (
    <Switch
      isSelected={shouldSetPrimaryName}
      name="set-primary-name"
      onChange={setShouldSetPrimaryName}
    >
      <div className="border-default mt-4 flex items-center justify-between gap-4 border-t pt-4">
        <div className="min-w-0 space-y-1">
          <Label className="text-xs">Set as primary name</Label>
          <Description>
            {resolverAddress === null
              ? "Use this name as your default ENS identity."
              : "Your custom resolver must allow this wallet to update its address record."}
          </Description>
        </div>
        <Switch.Control className="shrink-0">
          <Switch.Thumb />
        </Switch.Control>
      </div>
    </Switch>
  );
}
