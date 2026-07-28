"use client";

import { Switch } from "@thenamespace/uikit";

import { useNameRegistration } from "#/components/name-registration/context";
import { AdvancedOptionInfo } from "#/components/name-registration/steps/name-search/advanced-options/advanced-option-info";

export function SetPrimaryName() {
  const { resolverAddress, setShouldSetPrimaryName, shouldSetPrimaryName } = useNameRegistration();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-1">
        <span className="text-muted text-xs">Set as primary name</span>
        <AdvancedOptionInfo label="set as primary name">
          {resolverAddress === null
            ? "Use this name as your default ENS identity."
            : "Your custom resolver must allow this wallet to update its address record."}
        </AdvancedOptionInfo>
      </div>
      <Switch
        aria-label="Set as primary name"
        isSelected={shouldSetPrimaryName}
        name="set-primary-name"
        onChange={setShouldSetPrimaryName}
      >
        <Switch.Content aria-label="Set as primary name">
          <Switch.Control className="shrink-0">
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  );
}
