"use client";

// @demo-title With KPIs
import { Widget } from "@thenamespace/uikit";
import { KPI } from "@thenamespace/uikit/kpi";
import { KPIGroup } from "@thenamespace/uikit/kpi-group";
import { TrendChip } from "@thenamespace/uikit/trend-chip";

const sparksUp = [
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 38 },
  { value: 45 },
  { value: 50 },
  { value: 48 },
  { value: 55 },
  { value: 60 },
  { value: 58 },
  { value: 65 },
];

const sparksDown = sparksUp.toReversed();

function SparkMetric({
  color,
  data,
  title,
  trend,
  value,
}: {
  color: string;
  data: { value: number }[];
  title: string;
  trend: "down" | "up";
  value: React.ReactNode;
}) {
  return (
    <KPI>
      <KPI.Header>
        <KPI.Title>{title}</KPI.Title>
      </KPI.Header>
      <KPI.Content className="grid-cols-[1fr_1fr] items-end">
        <div className="flex flex-col gap-1">
          {value}
          <TrendChip trend={trend} variant="tertiary">
            {trend === "up" ? "3.3%" : "5.9%"}
            <TrendChip.Suffix>
              {trend === "up" ? "last 30d" : "vs last 7d"}
            </TrendChip.Suffix>
          </TrendChip>
        </div>
        <KPI.Chart color={color} data={data} height={60} strokeWidth={1.5} />
      </KPI.Content>
    </KPI>
  );
}

export const ProWithKPIsExample = () => (
  <Widget className="w-full max-w-[900px]">
    <Widget.Header>
      <div>
        <Widget.Title>Key Metrics</Widget.Title>
        <Widget.Description className="block">Last 30 days</Widget.Description>
      </div>
    </Widget.Header>
    <Widget.Content>
      <KPIGroup className="bg-transparent shadow-none">
        <SparkMetric
          color="var(--color-accent)"
          data={sparksUp}
          title="Total Revenue"
          trend="up"
          value={
            <KPI.Value
              className="text-3xl"
              currency="USD"
              maximumFractionDigits={0}
              style="currency"
              value={228451}
            />
          }
        />
        <KPIGroup.Separator />
        <SparkMetric
          color="var(--color-danger)"
          data={sparksDown}
          title="Bounce Rate"
          trend="down"
          value={
            <KPI.Value
              className="text-3xl"
              maximumFractionDigits={1}
              style="percent"
              value={0.423}
            />
          }
        />
        <KPIGroup.Separator />
        <SparkMetric
          color="var(--color-success)"
          data={sparksUp}
          title="Active Users"
          trend="up"
          value={
            <KPI.Value
              className="text-3xl"
              maximumFractionDigits={0}
              notation="compact"
              value={97859}
            />
          }
        />
      </KPIGroup>
    </Widget.Content>
  </Widget>
);
