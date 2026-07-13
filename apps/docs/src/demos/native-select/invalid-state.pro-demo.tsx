"use client";

// @demo-title Invalid State
import { NativeSelect } from "@thenamespace/uikit";
import { FieldError } from "@thenamespace/uikit/field-error";
import { Label } from "@thenamespace/uikit/label";

const statuses = [
  ["", "Select status"],
  ["todo", "Todo"],
  ["in-progress", "In Progress"],
  ["done", "Done"],
  ["cancelled", "Cancelled"],
];

function StatusOptions() {
  return statuses.map(([value, label]) => (
    <NativeSelect.Option key={value} value={value}>
      {label}
    </NativeSelect.Option>
  ));
}

export const ProInvalidStateExample = () => (
  <div className="w-[220px]">
    <NativeSelect aria-invalid="true" className="w-full" data-invalid="true">
      <Label>Status</Label>
      <NativeSelect.Trigger aria-invalid="true" name="status">
        <StatusOptions />
        <NativeSelect.Indicator />
      </NativeSelect.Trigger>
      <FieldError>Please select a status</FieldError>
    </NativeSelect>
  </div>
);
