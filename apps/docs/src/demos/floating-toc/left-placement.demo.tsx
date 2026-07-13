"use client";

// @demo-title Left Placement
import { useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";

const sections = [
  "Overview",
  "Installation",
  "Quick start",
  "Configuration",
  "API reference",
  "Troubleshooting",
].map((label) => ({ id: label.toLowerCase().replaceAll(" ", "-"), label }));

function Basic({
  placement = "right",
  triggerMode = "hover",
}: {
  placement?: "left" | "right";
  triggerMode?: "hover" | "press";
}) {
  const [active, setActive] = useState("overview");
  return (
    <div className="px-10 py-24">
      <FloatingToc placement={placement} triggerMode={triggerMode}>
        <FloatingToc.Trigger aria-label="Table of contents">
          {sections.map((item) => (
            <FloatingToc.Bar active={item.id === active} key={item.id} />
          ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content>
          {sections.map((item) => (
            <FloatingToc.Item
              active={item.id === active}
              key={item.id}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </FloatingToc.Item>
          ))}
        </FloatingToc.Content>
      </FloatingToc>
    </div>
  );
}

export const DemoLeftPlacementExample = () => <Basic placement="left" />;
