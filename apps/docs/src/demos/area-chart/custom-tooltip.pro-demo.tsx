"use client";

// @demo-title Custom Tooltip
import { AreaChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

const trafficData = [
  { month: "Jan", organic: 2000, paidAds: 1000 },
  { month: "Feb", organic: 5000, paidAds: 3000 },
  { month: "Mar", organic: 8000, paidAds: 5000 },
  { month: "Apr", organic: 7000, paidAds: 6000 },
  { month: "May", organic: 9500, paidAds: 4000 },
  { month: "Jun", organic: 8000, paidAds: 5500 },
  { month: "Jul", organic: 12000, paidAds: 7000 },
  { month: "Aug", organic: 11000, paidAds: 6500 },
  { month: "Sep", organic: 14000, paidAds: 8000 },
  { month: "Oct", organic: 13000, paidAds: 9000 },
  { month: "Nov", organic: 16000, paidAds: 10000 },
  { month: "Dec", organic: 15000, paidAds: 9500 },
];

function AxisSet() {
  return (
    <>
      <AreaChart.Grid vertical={false} />
      <AreaChart.XAxis dataKey="month" tickMargin={8} />
      <AreaChart.YAxis
        tickFormatter={(value: number) =>
          value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
        }
        width={30}
      />
    </>
  );
}

function Legend({
  items,
}: {
  items: ReadonlyArray<{ color: string; label: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ color, label }) => (
        <div className="flex items-center gap-1.5" key={label}>
          <span
            className="size-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-muted text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

export const ProCustomTooltipExample = () => (
  <Card className="w-full max-w-[520px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Sessions</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Organic" },
          { color: "var(--chart-1)", label: "Paid Ads" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <AreaChart data={trafficData} height={200}>
        <defs>
          {[
            ["custom-organic", "var(--chart-3)"],
            ["custom-paid", "var(--chart-1)"],
          ].map(([id, color]) => (
            <linearGradient id={id} key={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <AxisSet />
        <AreaChart.Area
          dataKey="organic"
          dot={false}
          fill="url(#custom-organic)"
          name="Organic"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="monotone"
        />
        <AreaChart.Area
          dataKey="paidAds"
          dot={false}
          fill="url(#custom-paid)"
          name="Paid Ads"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="monotone"
        />
        <AreaChart.Tooltip
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
      </AreaChart>
    </Card.Content>
  </Card>
);
