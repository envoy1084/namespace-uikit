"use client";

// @demo-title Disabled Item
import { Segment } from "@thenamespace/uikit";

export const ProDisabledItemExample = () => (
  <Segment defaultSelectedKey="dashboard">
    <Segment.Item id="dashboard">Dashboard</Segment.Item>
    <Segment.Item isDisabled id="analytics">
      Analytics
    </Segment.Item>
    <Segment.Item id="reports">Reports</Segment.Item>
  </Segment>
);
