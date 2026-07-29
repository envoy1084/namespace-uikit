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
  change,
  color,
  data,
  suffix,
  title,
  trend,
  value,
}: {
  change: string;
  color: string;
  data: { value: number }[];
  suffix: string;
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
            {change}
            <TrendChip.Suffix>{suffix}</TrendChip.Suffix>
          </TrendChip>
        </div>
        <KPI.Chart color={color} data={data} height={60} strokeWidth={1.5} />
      </KPI.Content>
    </KPI>
  );
}

export const DemoWithKPIsExample = () => (
  <Widget className="w-full max-w-[900px]">
    <Widget.Header>
      <Widget.Title>Key Metrics</Widget.Title>
      <Widget.Description>Last 30 days</Widget.Description>
    </Widget.Header>
    <Widget.Content>
      <KPIGroup className="bg-transparent shadow-none">
        <SparkMetric
          change="3.3%"
          color="var(--color-accent)"
          data={sparksUp}
          suffix="last 30d"
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
          change="5.9%"
          color="var(--color-danger)"
          data={sparksDown}
          suffix="vs last 7d"
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
          change="10.9%"
          color="var(--color-success)"
          data={sparksUp}
          suffix="this month"
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
