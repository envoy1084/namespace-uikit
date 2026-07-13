"use client";

// @demo-title Variants
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

export const ProVariantsExample = () => (
  <div className="flex flex-wrap items-start gap-6">
    {(["primary", "secondary"] as const).map((variant) => (
      <div className="flex w-[220px] flex-col gap-2" key={variant}>
        <span className="text-muted text-xs">{variant}</span>
        <NativeSelect className="w-full" variant={variant}>
          <NativeSelect.Trigger>
            <StatusOptions />
            <NativeSelect.Indicator />
          </NativeSelect.Trigger>
        </NativeSelect>
      </div>
    ))}
  </div>
);
