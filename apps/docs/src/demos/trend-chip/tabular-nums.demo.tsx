"use client";

// @demo-title Tabular Nums
import { TrendChip } from "@thenamespace/uikit";

export const DemoTabularNumsExample = () => (
  <div className="flex flex-col items-start gap-2 rounded-2xl p-6">
    <TrendChip trend="up">+1.1%</TrendChip>
    <TrendChip trend="up">+22.2%</TrendChip>
    <TrendChip trend="down">-333.3%</TrendChip>
    <TrendChip trend="neutral">0.0%</TrendChip>
  </div>
);
