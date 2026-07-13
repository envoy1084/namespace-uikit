"use client";

// @demo-title Hierarchical
import { useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";

const hierarchy = [
  ["s1", "Design principles", 1],
  ["s1-1", "Composability", 2],
  ["s1-2", "Accessibility first", 2],
  ["s2", "Getting started", 1],
  ["s2-1", "Installation", 2],
  ["s2-2", "Project setup", 2],
  ["s3", "Core components", 1],
  ["s3-1", "Layout primitives", 2],
  ["s3-2", "Interactive elements", 2],
  ["s3-2-1", "Buttons & actions", 3],
  ["s3-2-2", "Form controls", 3],
  ["s3-3", "Data display", 2],
  ["s3-3-1", "Tables", 3],
  ["s3-3-2", "Charts", 3],
  ["s4", "Theming", 1],
  ["s4-1", "Color tokens", 2],
  ["s4-2", "Dark mode", 2],
  ["s5", "Advanced patterns", 1],
  ["s6", "Changelog", 1],
].map(([id, label, level]) => ({
  id: String(id),
  label: String(label),
  level: Number(level),
}));

function HierarchicalDemo({ press = false }: { press?: boolean }) {
  const [active, setActive] = useState(press ? "s1" : "s3-2-1");
  return (
    <div className="px-10 py-10">
      <FloatingToc
        placement={press ? "left" : "right"}
        triggerMode={press ? "press" : "hover"}
      >
        <FloatingToc.Trigger aria-label="Table of contents">
          {hierarchy.map((item) => (
            <FloatingToc.Bar
              active={item.id === active}
              key={item.id}
              level={item.level}
            />
          ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content>
          <span className="text-muted mb-1 block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
            Contents
          </span>
          {hierarchy.map((item) => (
            <FloatingToc.Item
              active={item.id === active}
              key={item.id}
              level={item.level}
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

export const DemoHierarchicalExample = () => <HierarchicalDemo />;
