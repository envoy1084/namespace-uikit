"use client";

// @demo-title Traffic Source
import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const trafficData = [
  { month: "Jan", organic: 2000, paidAds: 1000 },
  { month: "Feb", organic: 15000, paidAds: 10000 },
  { month: "Mar", organic: 8000, paidAds: 12000 },
  { month: "Apr", organic: 14000, paidAds: 14000 },
  { month: "May", organic: 15000, paidAds: 8000 },
  { month: "Jun", organic: 8000, paidAds: 9000 },
  { month: "Jul", organic: 18000, paidAds: 12000 },
  { month: "Aug", organic: 18000, paidAds: 10000 },
  { month: "Sep", organic: 20000, paidAds: 5000 },
  { month: "Oct", organic: 17000, paidAds: 12000 },
  { month: "Nov", organic: 22000, paidAds: 18000 },
  { month: "Dec", organic: 15000, paidAds: 9000 },
];

function Legend({
  items,
}: {
  items: ReadonlyArray<{ color: string; dashed?: boolean; label: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ color, dashed, label }) => (
        <div className="flex items-center gap-1.5" key={label}>
          <span
            className={
              dashed
                ? "h-0 w-3 border-t-2 border-dashed"
                : "size-3 rounded-full"
            }
            style={dashed ? { borderColor: color } : { backgroundColor: color }}
          />
          <span className="text-muted text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

export const DemoTrafficSourceExample = () => (
  <Card className="w-[520px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Traffic Source</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Organic" },
          { color: "var(--chart-1)", label: "Paid Ads" },
        ]}
      />
    </Card.Header>
    <Card.Content className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-foreground text-lg font-semibold">231,856</span>
        <span className="text-muted text-xs">Sessions</span>
      </div>
      <LineChart data={trafficData} height={180}>
        <LineChart.Grid vertical={false} />
        <LineChart.XAxis dataKey="month" tickMargin={8} />
        <LineChart.YAxis
          tickFormatter={(value: number) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
          ticks={[0, 5000, 10000, 20000]}
          width={30}
        />
        <LineChart.Line
          dataKey="organic"
          dot={false}
          name="Organic"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="linear"
        />
        <LineChart.Line
          dataKey="paidAds"
          dot={false}
          name="Paid Ads"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="linear"
        />
        <LineChart.Tooltip content={<LineChart.TooltipContent />} />
      </LineChart>
    </Card.Content>
  </Card>
);
