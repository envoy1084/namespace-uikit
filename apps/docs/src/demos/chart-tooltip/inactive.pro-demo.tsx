"use client";

// @demo-title Inactive
import { ChartTooltip } from "@thenamespace/uikit";

export const ProInactiveExample = () => (
  <div className="space-y-3 text-center">
    <p className="text-muted text-sm">
      The tooltip below is inactive (active=false) — nothing should render:
    </p>
    <div className="border-separator text-muted rounded border border-dashed p-6 text-sm">
      <ChartTooltip active={false}>Hidden</ChartTooltip>
      (empty — tooltip hidden)
    </div>
  </div>
);
