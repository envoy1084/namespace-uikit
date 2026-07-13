"use client";

// @demo-title Default
import { NativeSelect } from "@thenamespace/uikit";

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

export const DemoDefaultExample = () => (
  <div className="w-full max-w-[220px]">
    <NativeSelect className="w-full">
      <NativeSelect.Trigger>
        <StatusOptions />
        <NativeSelect.Indicator />
      </NativeSelect.Trigger>
    </NativeSelect>
  </div>
);
