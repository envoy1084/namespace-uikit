"use client";

import React from "react";

import { Switch } from "@thenamespace/uikit";

export function Controlled() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Switch isSelected={isSelected} onChange={setIsSelected}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Enable notifications
        </Switch.Content>
      </Switch>
      <p className="text-muted text-sm">
        Switch is {isSelected ? "on" : "off"}
      </p>
    </div>
  );
}
