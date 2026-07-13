"use client";

import { useState } from "react";

import { Checkbox } from "@thenamespace/uikit";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        id="email-notifications"
        isSelected={isSelected}
        onChange={setIsSelected}
      >
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Email notifications
        </Checkbox.Content>
      </Checkbox>
      <p className="text-muted text-sm">
        Status:{" "}
        <span className="font-medium">
          {isSelected ? "Enabled" : "Disabled"}
        </span>
      </p>
    </div>
  );
}
