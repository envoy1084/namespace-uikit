"use client";

// @demo-title Custom Tooltip
import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

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

function TrafficAxes({ currency = false }: { currency?: boolean }) {
  return (
    <>
      <LineChart.Grid vertical={false} />
      <LineChart.XAxis dataKey="month" tickMargin={8} />
      <LineChart.YAxis
        tickFormatter={(value: number) =>
          currency
            ? `$${(value / 1000).toFixed(0)}k`
            : value >= 1000
              ? `${(value / 1000).toFixed(0)}k`
              : `${value}`
        }
        width={currency ? 40 : 30}
      />
    </>
  );
}

export const ProCustomTooltipExample = () => (
  <Card className="w-[520px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Sessions</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Organic" },
          { color: "var(--chart-2)", label: "Paid Ads" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <LineChart data={trafficData} height={200}>
        <TrafficAxes />
        <LineChart.Line
          dataKey="organic"
          dot={false}
          name="Organic"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="monotone"
        />
        <LineChart.Line
          dataKey="paidAds"
          dot={false}
          name="Paid Ads"
          stroke="var(--chart-2)"
          strokeWidth={2}
          type="monotone"
        />
        <LineChart.Tooltip
          content={({ active, label, payload }) => {
            if (!active || !payload?.length) return null;
            const total = payload.reduce(
              (sum, entry) => sum + Number(entry.value ?? 0),
              0,
            );
            return (
              <ChartTooltip indicator="line">
                <ChartTooltip.Header>{label}</ChartTooltip.Header>
                {payload.map((entry, index) => (
                  <ChartTooltip.Item key={index}>
                    <ChartTooltip.Indicator color={entry.stroke} />
                    <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                    <ChartTooltip.Value>
                      {Number(entry.value).toLocaleString()}
                    </ChartTooltip.Value>
                  </ChartTooltip.Item>
                ))}
                <div className="border-separator mt-1 flex items-center justify-between border-t pt-1.5">
                  <span className="text-muted text-xs font-medium">Total</span>
                  <span className="text-foreground text-xs font-semibold">
                    {total.toLocaleString()}
                  </span>
                </div>
              </ChartTooltip>
            );
          }}
        />
      </LineChart>
    </Card.Content>
  </Card>
);
