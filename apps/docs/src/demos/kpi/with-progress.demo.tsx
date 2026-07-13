"use client";

// @demo-title With Progress
import { KPI } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoWithProgressExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      { title: "Server Load", value: 0.38, progress: 38, status: "success" },
      { title: "Server Load", value: 0.98, progress: 98, status: "danger" },
      {
        title: "Average Memory Used",
        value: 0.64,
        progress: 64,
        status: "warning",
      },
    ].map((card, index) => (
      <KPI key={`${card.title}-${index}`}>
        <KPI.Header>
          <KPI.Icon status={card.status as "danger" | "success" | "warning"}>
            <Icon icon="solar:server-square-linear" />
          </KPI.Icon>
          <KPI.Title>{card.title}</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            maximumFractionDigits={0}
            style="percent"
            value={card.value}
          />
          <KPI.Progress
            status={card.status as "danger" | "success" | "warning"}
            value={card.progress}
          />
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
