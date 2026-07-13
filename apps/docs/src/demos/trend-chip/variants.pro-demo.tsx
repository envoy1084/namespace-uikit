"use client";

// @demo-title Variants
import { TrendChip } from "@thenamespace/uikit";

export const ProVariantsExample = () => (
  <div className="flex flex-col gap-3 rounded-2xl p-6">
    {(["primary", "secondary", "tertiary", "soft"] as const).map((variant) => (
      <div className="flex items-center gap-3" key={variant}>
        <span className="text-muted w-20 text-xs">{variant}</span>
        <TrendChip trend="up" variant={variant}>
          +3.3%
        </TrendChip>
        <TrendChip trend="down" variant={variant}>
          -2.1%
        </TrendChip>
        <TrendChip trend="neutral" variant={variant}>
          0.0%
        </TrendChip>
      </div>
    ))}
  </div>
);
