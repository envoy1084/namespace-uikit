"use client";

// @demo-title With Actions
import { KPI } from "@thenamespace/uikit";
import { NumberValue } from "@thenamespace/uikit/number-value";

import { Icon } from "@/demos/pro-icon";

export const ProWithActionsExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Conversion Rate",
        value: 0.038,
        trend: "+1.7%",
        status: "success",
      },
      {
        title: "Bounce Rate",
        value: 0.423,
        trend: "-5.9%",
        status: "danger",
      },
      { title: "Load Time", value: 856, trend: null, status: "warning" },
    ].map((card) => (
      <KPI key={card.title}>
        <KPI.Header>
          <KPI.Icon status={card.status as "danger" | "success" | "warning"}>
            <Icon icon="solar:target-linear" />
          </KPI.Icon>
          <KPI.Title>{card.title}</KPI.Title>
        </KPI.Header>
        <KPI.Actions aria-label={`${card.title} actions`} />
        <KPI.Content>
          <KPI.Value
            maximumFractionDigits={1}
            {...(card.title !== "Load Time"
              ? { style: "percent" as const }
              : {})}
            value={card.value}
          >
            {card.title === "Load Time" ? (
              <NumberValue.Suffix>ms</NumberValue.Suffix>
            ) : undefined}
          </KPI.Value>
          {card.trend ? (
            <KPI.Trend trend={card.status === "danger" ? "down" : "up"}>
              {card.trend}
            </KPI.Trend>
          ) : (
            <KPI.Progress status="warning" value={56} />
          )}
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
