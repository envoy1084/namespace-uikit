"use client";

// @demo-title Sparkline
import { AreaChart } from "@thenamespace/uikit";

const sparkUp = [30, 35, 28, 42, 38, 45, 50, 48, 55, 60, 58, 65].map(
  (value) => ({ value }),
);

const sparkDown = [65, 60, 62, 55, 58, 52, 50, 48, 45, 42, 44, 40].map(
  (value) => ({ value }),
);

function SparkArea({
  color,
  data,
  id,
  label,
}: {
  color: string;
  data: { value: number }[];
  id: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-muted text-xs">{label}</span>
      <AreaChart
        data={data}
        height={48}
        margin={{ bottom: 0, left: 0, right: 0, top: 2 }}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <AreaChart.Area
          dataKey="value"
          dot={false}
          fill={`url(#${id})`}
          stroke={color}
          strokeWidth={1.5}
          type="monotone"
        />
      </AreaChart>
    </div>
  );
}

export const ProSparklineExample = () => (
  <div className="flex w-full items-center gap-6">
    <SparkArea
      color="var(--color-success)"
      data={sparkUp}
      id="spark-up"
      label="Revenue"
    />
    <SparkArea
      color="var(--color-danger)"
      data={sparkDown}
      id="spark-down"
      label="Churn"
    />
    <SparkArea
      color="var(--chart-3)"
      data={sparkUp}
      id="spark-accent"
      label="Users"
    />
  </div>
);
