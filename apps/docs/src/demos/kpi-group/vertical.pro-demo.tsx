// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Vertical
import { Fragment } from "react";

import { KPIGroup } from "@thenamespace/uikit";
import { KPI } from "@thenamespace/uikit/kpi";

function Metric({
  change,
  currency,
  digits,
  from,
  title,
  trend,
  value,
}: {
  change: string;
  currency?: boolean;
  digits: number;
  from?: string;
  title: string;
  trend: "down" | "up";
  value: number;
}) {
  return (
    <KPI>
      <KPI.Header>
        <KPI.Title>{title}</KPI.Title>
      </KPI.Header>
      <KPI.Content>
        {from ? (
          <div className="flex items-baseline gap-2">
            <KPI.Value
              {...(currency
                ? { currency: "USD", style: "currency" as const }
                : title.includes("Rate")
                  ? { style: "percent" as const }
                  : {})}
              maximumFractionDigits={digits}
              value={value}
            />
            <span className="text-muted text-sm">from {from}</span>
          </div>
        ) : (
          <KPI.Value
            {...(currency
              ? { currency: "USD", style: "currency" as const }
              : title.includes("Rate")
                ? { style: "percent" as const }
                : {})}
            maximumFractionDigits={digits}
            value={value}
          />
        )}
        <KPI.Trend trend={trend}>{change}</KPI.Trend>
      </KPI.Content>
    </KPI>
  );
}

function WithSeparators({ children }: { children: React.ReactNode[] }) {
  return (
    <>
      {children.map((child, index) => (
        <Fragment key={index}>
          {index > 0 && <KPIGroup.Separator />}
          {child}
        </Fragment>
      ))}
    </>
  );
}

export const ProVerticalExample = () => (
  <div className="flex w-[400px] items-center justify-center rounded-2xl p-6">
    <KPIGroup orientation="vertical">
      <WithSeparators>
        {[
          { title: "Revenue", value: 228451, trend: "up", change: "+3.3%" },
          { title: "Expenses", value: 25108, trend: "down", change: "-3.3%" },
          { title: "Profit", value: 203133, trend: "up", change: "+4.1%" },
        ].map((metric) => (
          <Metric {...metric} currency digits={0} key={metric.title} />
        ))}
      </WithSeparators>
    </KPIGroup>
  </div>
);
