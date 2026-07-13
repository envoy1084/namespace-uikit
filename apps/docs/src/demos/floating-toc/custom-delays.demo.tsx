"use client";

// @demo-title Custom Delays
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

function Delays() {
  const [active, setActive] = useState("overview");
  return (
    <div className="flex items-center gap-12 px-10 py-24">
      {[
        { closeDelay: 0, label: "Instant", openDelay: 0 },
        { closeDelay: 300, label: "Default (200/300)", openDelay: 200 },
        { closeDelay: 500, label: "Slow (600/500)", openDelay: 600 },
      ].map((config) => (
        <div className="flex flex-col items-center gap-3" key={config.label}>
          <span className="text-muted text-xs">{config.label}</span>
          <FloatingToc
            closeDelay={config.closeDelay}
            openDelay={config.openDelay}
          >
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
      ))}
    </div>
  );
}

export const DemoCustomDelaysExample = () => <Delays />;
