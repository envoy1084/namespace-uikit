"use client";

// @demo-title Sizes
import { TrendChip } from "@thenamespace/uikit";

export const DemoSizesExample = () => (
  <div className="flex items-center gap-3 rounded-2xl p-6">
    {(["sm", "md", "lg"] as const).map((size) => (
      <TrendChip key={size} size={size} trend="up">
        +3.3%
      </TrendChip>
    ))}
  </div>
);
