"use client";

// @demo-title Default
import { TrendChip } from "@thenamespace/uikit";

export const ProDefaultExample = () => (
  <div className="flex items-center gap-3 rounded-2xl p-6">
    <TrendChip trend="up">+3.3%</TrendChip>
    <TrendChip trend="down">-2.1%</TrendChip>
    <TrendChip trend="neutral">0.0%</TrendChip>
  </div>
);
