"use client";

import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react";

import { cn } from "@heroui/react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as RechartsComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type Margin,
} from "recharts";

import { ChartTooltip } from "../chart-tooltip";

export interface ComposedChartRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: ReactNode;
  data: Record<string, number | string>[];
  height?: number;
  margin?: Margin;
  ref?: Ref<HTMLDivElement>;
  width?: number | `${number}%`;
}

function ComposedChartRoot({
  children,
  className,
  data,
  height = 300,
  margin = { bottom: 0, left: 0, right: 8, top: 8 },
  ref,
  width = "100%",
  ...props
}: ComposedChartRootProps): ReactElement {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("composed-chart", className)}
      data-slot="composed-chart"
    >
      <ResponsiveContainer height={height} width={width}>
        <RechartsComposedChart data={data} margin={margin}>
          {children}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

type ComposedChartComponent = typeof ComposedChartRoot & {
  Area: typeof Area;
  Bar: typeof Bar;
  Grid: typeof CartesianGrid;
  Line: typeof Line;
  Root: typeof ComposedChartRoot;
  Tooltip: typeof Tooltip;
  TooltipContent: typeof ChartTooltip.Content;
  XAxis: typeof XAxis;
  YAxis: typeof YAxis;
};

export const ComposedChart: ComposedChartComponent = Object.assign(
  ComposedChartRoot,
  {
    Area,
    Bar,
    Grid: CartesianGrid,
    Line,
    Root: ComposedChartRoot,
    Tooltip,
    TooltipContent: ChartTooltip.Content,
    XAxis,
    YAxis,
  },
);
