"use client";

// @demo-title Default
import { RadarChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

const skills = [
  { category: "Design", score: 86 },
  { category: "Frontend", score: 92 },
  { category: "Backend", score: 74 },
  { category: "DevOps", score: 65 },
  { category: "Testing", score: 78 },
  { category: "Leadership", score: 70 },
];

function DefaultTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const category = payload[0]?.payload?.category;
  return (
    <ChartTooltip>
      {category ? <ChartTooltip.Header>{category}</ChartTooltip.Header> : null}
      {payload.map((item: any) => (
        <ChartTooltip.Item key={String(item.dataKey)}>
          <ChartTooltip.Indicator
            color={item.color ?? item.stroke ?? item.fill}
          />
          <ChartTooltip.Label>{item.name}</ChartTooltip.Label>
          <ChartTooltip.Value>{item.value}</ChartTooltip.Value>
        </ChartTooltip.Item>
      ))}
    </ChartTooltip>
  );
}

export const ProDefaultExample = () => (
  <Card className="w-[420px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Skill Assessment</Card.Title>
    </Card.Header>
    <Card.Content className="flex flex-col items-center">
      <RadarChart data={skills} height={280}>
        <RadarChart.Grid />
        <RadarChart.AngleAxis dataKey="category" />
        <RadarChart.Radar
          dataKey="score"
          dot={{ fill: "var(--chart-3)", r: 3, strokeWidth: 0 }}
          fill="var(--chart-3)"
          fillOpacity={0.15}
          name="Score"
          stroke="var(--chart-3)"
          strokeWidth={2}
        />
        <RadarChart.Tooltip content={<DefaultTooltip />} />
      </RadarChart>
    </Card.Content>
  </Card>
);
