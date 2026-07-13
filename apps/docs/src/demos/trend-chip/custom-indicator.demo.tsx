"use client";

// @demo-title Custom Indicator
import { TrendChip } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoCustomIndicatorExample = () => (
  <div className="flex items-center gap-3 rounded-2xl p-6">
    <TrendChip trend="up">
      <TrendChip.Indicator>
        <Icon icon="solar:arrow-up-linear" />
      </TrendChip.Indicator>
      +3.3%
    </TrendChip>
    <TrendChip trend="down">
      <TrendChip.Indicator>
        <Icon icon="solar:arrow-down-linear" />
      </TrendChip.Indicator>
      -2.1%
    </TrendChip>
    <TrendChip trend="up">
      <TrendChip.Indicator>
        <Icon icon="solar:fire-linear" />
      </TrendChip.Indicator>
      +12.5%
    </TrendChip>
    <TrendChip trend="neutral">
      <TrendChip.Indicator>
        <Icon icon="solar:bolt-linear" />
      </TrendChip.Indicator>
      0.0%
    </TrendChip>
  </div>
);
