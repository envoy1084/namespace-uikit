"use client";

// @demo-title Prefix And Suffix
import { TrendChip } from "@thenamespace/uikit";

export const ProPrefixAndSuffixExample = () => (
  <div className="flex flex-col items-start gap-3 rounded-2xl p-6">
    <TrendChip trend="up">
      <TrendChip.Prefix>+$</TrendChip.Prefix>1,234
    </TrendChip>
    <TrendChip trend="down">
      -5.9%<TrendChip.Suffix>vs last month</TrendChip.Suffix>
    </TrendChip>
    <TrendChip trend="up">
      <TrendChip.Prefix>+</TrendChip.Prefix>3.3%
      <TrendChip.Suffix>MoM</TrendChip.Suffix>
    </TrendChip>
  </div>
);
