"use client";

// @demo-title With Label
import { NativeSelect } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
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

function LabeledStatus({ description = false }: { description?: boolean }) {
  return (
    <NativeSelect fullWidth>
      <Label>Status</Label>
      <NativeSelect.Trigger name="status">
        <StatusOptions />
        <NativeSelect.Indicator />
      </NativeSelect.Trigger>
      {description ? (
        <Description>Choose the current task status</Description>
      ) : null}
    </NativeSelect>
  );
}

export const ProWithLabelExample = () => (
  <div className="w-[220px]">
    <LabeledStatus description />
  </div>
);
