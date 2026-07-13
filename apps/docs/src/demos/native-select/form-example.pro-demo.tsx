"use client";

// @demo-title Form Example
import { useState } from "react";

import { NativeSelect } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

export const ProFormExampleExample = function Demo() {
  const [result, setResult] = useState<Record<string, string> | null>(null);
  return (
    <form
      className="flex w-[300px] flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data: Record<string, string> = {};
        new FormData(event.currentTarget).forEach((value, key) => {
          data[key] = value.toString();
        });
        setResult(data);
      }}
    >
      <NativeSelect fullWidth>
        <Label>Country</Label>
        <NativeSelect.Trigger required name="country">
          <NativeSelect.Option value="">Select a country</NativeSelect.Option>
          <NativeSelect.OptGroup label="North America">
            <NativeSelect.Option value="us">United States</NativeSelect.Option>
            <NativeSelect.Option value="ca">Canada</NativeSelect.Option>
            <NativeSelect.Option value="mx">Mexico</NativeSelect.Option>
          </NativeSelect.OptGroup>
          <NativeSelect.OptGroup label="Europe">
            <NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
            <NativeSelect.Option value="fr">France</NativeSelect.Option>
            <NativeSelect.Option value="de">Germany</NativeSelect.Option>
          </NativeSelect.OptGroup>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
      </NativeSelect>
      <NativeSelect fullWidth>
        <Label>Role</Label>
        <NativeSelect.Trigger required name="role">
          <NativeSelect.Option value="">Select a role</NativeSelect.Option>
          <NativeSelect.Option value="admin">Admin</NativeSelect.Option>
          <NativeSelect.Option value="editor">Editor</NativeSelect.Option>
          <NativeSelect.Option value="viewer">Viewer</NativeSelect.Option>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
        <Description>Choose the user's permission level</Description>
      </NativeSelect>
      <Button size="lg" type="submit">
        Submit
      </Button>
      {result ? (
        <pre className="text-muted bg-surface rounded-lg p-3 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </form>
  );
};
