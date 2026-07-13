"use client";

import { Switch } from "@thenamespace/uikit";

export function RenderProps() {
  return (
    <Switch>
      {({ isSelected }) => (
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          {isSelected ? "Enabled" : "Disabled"}
        </Switch.Content>
      )}
    </Switch>
  );
}
