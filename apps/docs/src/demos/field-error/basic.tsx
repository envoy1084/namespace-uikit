"use client";

import { useState } from "react";

import { FieldError, Input, Label, TextField } from "@thenamespace/uikit";

export function Basic() {
  const [value, setValue] = useState("jr");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <TextField className="w-64" isInvalid={isInvalid}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        placeholder="Enter username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldError>Username must be at least 3 characters</FieldError>
    </TextField>
  );
}
