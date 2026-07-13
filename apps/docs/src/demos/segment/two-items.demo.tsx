"use client";

// @demo-title Two Items
import { Segment } from "@thenamespace/uikit";

export const DemoTwoItemsExample = () => (
  <Segment defaultSelectedKey="monthly" size="sm">
    <Segment.Item id="monthly">Monthly</Segment.Item>
    <Segment.Item id="yearly">Yearly</Segment.Item>
  </Segment>
);
