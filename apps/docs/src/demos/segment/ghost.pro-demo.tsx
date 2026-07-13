"use client";

// @demo-title Ghost
import { Segment } from "@thenamespace/uikit";

export const ProGhostExample = () => (
  <Segment defaultSelectedKey="mtd" size="sm" variant="ghost">
    {["1W", "4W", "1Y", "MTD", "QTD", "YTD", "ALL"].map((label) => (
      <Segment.Item id={label.toLowerCase()} key={label}>
        {label}
      </Segment.Item>
    ))}
  </Segment>
);
