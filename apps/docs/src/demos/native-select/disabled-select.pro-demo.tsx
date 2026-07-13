"use client";

// @demo-title Disabled Select
import { NativeSelect } from "@thenamespace/uikit";
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

export const ProDisabledSelectExample = () => (
  <div className="w-[220px]">
    <NativeSelect fullWidth>
      <Label>Status</Label>
      <NativeSelect.Trigger disabled defaultValue="done" name="status">
        <StatusOptions />
        <NativeSelect.Indicator />
      </NativeSelect.Trigger>
    </NativeSelect>
  </div>
);
