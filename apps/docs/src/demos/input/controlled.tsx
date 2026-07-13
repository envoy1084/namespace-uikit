"use client";

import React from "react";

import { Input } from "@thenamespace/uikit";

export function Controlled() {
  const [value, setValue] = React.useState("namespace.ninja");

  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        aria-label="Domain"
        placeholder="domain"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="text-muted px-1 text-sm">
        https://{value || "your-domain"}
      </span>
    </div>
  );
}
