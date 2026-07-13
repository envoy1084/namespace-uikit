"use client";

// @demo-title Custom Tooltip
import { BarChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

const channels = [
  { direct: 3200, month: "Jan", online: 4200, retail: 2800 },
  { direct: 4100, month: "Feb", online: 5800, retail: 3400 },
  { direct: 3800, month: "Mar", online: 4900, retail: 3100 },
  { direct: 5200, month: "Apr", online: 7200, retail: 4200 },
  { direct: 4600, month: "May", online: 6100, retail: 3800 },
  { direct: 5800, month: "Jun", online: 8400, retail: 4500 },
];

const channelSeries = [
  { color: "var(--chart-3)", key: "online", label: "Online" },
  { color: "var(--chart-2)", key: "retail", label: "Retail" },
  { color: "var(--chart-1)", key: "direct", label: "Direct" },
] as const;

export const DemoCustomTooltipExample = () => (
  <Card className="w-full max-w-[480px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Revenue by Channel</Card.Title>
    </Card.Header>
    <Card.Content>
      <BarChart data={channels} height={220}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis dataKey="month" tickMargin={8} />
        <BarChart.YAxis
          tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          width={40}
        />
        {channelSeries.map((series) => (
          <BarChart.Bar
            barSize={10}
            dataKey={series.key}
            fill={series.color}
            key={series.key}
            name={series.label}
            radius={[4, 4, 0, 0]}
          />
        ))}
        <BarChart.Tooltip
          content={({ active, label, payload }) => {
            if (
              !active ||
              !payload?.length ||
              !payload.every((entry) => typeof entry.value === "number")
            )
              return null;
            const total = payload.reduce(
              (sum, entry) => sum + Number(entry.value ?? 0),
              0,
            );
            return (
              <ChartTooltip>
                <ChartTooltip.Header>{label}</ChartTooltip.Header>
                {payload.map((entry, index) => (
                  <ChartTooltip.Item key={index}>
                    <ChartTooltip.Indicator color={entry.fill} />
                    <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                    <ChartTooltip.Value>
                      ${Number(entry.value).toLocaleString()}
                    </ChartTooltip.Value>
                  </ChartTooltip.Item>
                ))}
                <div className="border-separator mt-1 flex items-center justify-between border-t pt-1.5">
                  <span className="text-muted text-xs font-medium">Total</span>
                  <span className="text-foreground text-xs font-semibold">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </ChartTooltip>
            );
          }}
        />
      </BarChart>
    </Card.Content>
  </Card>
);
