"use client";

// @demo-title Theme Switcher
import { Segment } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoThemeSwitcherExample = () => (
  <Segment defaultSelectedKey="system" size="sm">
    <Segment.Item aria-label="Light" id="light">
      <Icon icon="lucide:sun" />
    </Segment.Item>
    <Segment.Item aria-label="Dark" id="dark">
      <Icon icon="lucide:moon" />
    </Segment.Item>
    <Segment.Item aria-label="System" id="system">
      <Icon icon="lucide:monitor" />
    </Segment.Item>
  </Segment>
);
