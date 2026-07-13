"use client";

// @demo-title With Icon
import { KPI } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoWithIconExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Total Users",
        value: 5400,
        change: "+33%",
        trend: "up",
        status: "success",
        icon: "solar:user-plus-linear",
      },
      {
        title: "Total Sales",
        value: 15400,
        change: "0.0%",
        trend: "neutral",
        status: "warning",
        icon: "solar:dollar-minimalistic-linear",
      },
      {
        title: "Net Profit",
        value: 10400,
        change: "-3.3%",
        trend: "down",
        status: "danger",
        icon: "solar:tag-price-linear",
      },
    ].map((card) => (
      <KPI key={card.title}>
        <KPI.Header>
          <KPI.Icon status={card.status as "danger" | "success" | "warning"}>
            <Icon icon={card.icon} />
          </KPI.Icon>
          <KPI.Title>{card.title}</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            {...(card.title !== "Total Users"
              ? { currency: "USD", style: "currency" as const }
              : {})}
            maximumFractionDigits={0}
            value={card.value}
          />
          <KPI.Trend trend={card.trend as "down" | "neutral" | "up"}>
            {card.change}
          </KPI.Trend>
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
