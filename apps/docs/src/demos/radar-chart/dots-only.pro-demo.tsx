"use client";

// @demo-title Dots Only
import { RadarChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const skills = [
  { category: "Design", score: 86 },
  { category: "Frontend", score: 92 },
  { category: "Backend", score: 74 },
  { category: "DevOps", score: 65 },
  { category: "Testing", score: 78 },
  { category: "Leadership", score: 70 },
];

export const ProDotsOnlyExample = () => (
  <Card className="w-[420px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Performance Metrics</Card.Title>
    </Card.Header>
    <Card.Content className="flex flex-col items-center">
      <RadarChart data={skills} height={280}>
        <RadarChart.Grid />
        <RadarChart.AngleAxis dataKey="category" />
        <RadarChart.Radar
          dataKey="score"
          dot={{ fill: "var(--chart-3)", r: 4, strokeWidth: 0 }}
          fill="none"
          name="Score"
          stroke="var(--chart-3)"
          strokeWidth={2}
        />
        <RadarChart.Tooltip content={<RadarChart.TooltipContent />} />
      </RadarChart>
    </Card.Content>
  </Card>
);
