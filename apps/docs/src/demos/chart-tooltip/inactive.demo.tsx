"use client";

// @demo-title Inactive
import { ChartTooltip } from "@thenamespace/uikit";

export const DemoInactiveExample = () => (
  <div className="flex flex-col gap-4">
    <p className="text-muted text-sm">
      The tooltip below is inactive (active=false) — nothing should render:
    </p>
    <div className="bg-default flex h-16 items-center justify-center rounded-lg">
      <ChartTooltip.Content active={false} />
      <span className="text-muted text-xs">(empty — tooltip hidden)</span>
    </div>
  </div>
);
