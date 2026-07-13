"use client";

// @demo-title Controlled
import { useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const sections = [
  "Overview",
  "Installation",
  "Quick start",
  "Configuration",
  "API reference",
  "Troubleshooting",
].map((label) => ({ id: label.toLowerCase().replaceAll(" ", "-"), label }));

function ControlledDemo() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("overview");
  return (
    <div className="px-10 py-24">
      <div className="mb-6 flex items-center gap-3">
        <Button
          onPress={() => setOpen((value) => !value)}
          size="sm"
          variant="outline"
        >
          {open ? "Close" : "Open"} TOC
        </Button>
        <span className="text-muted inline-block w-24 text-sm">
          State: <strong>{open ? "open" : "closed"}</strong>
        </span>
      </div>
      <FloatingToc onOpenChange={setOpen} open={open}>
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

export const ProControlledExample = () => <ControlledDemo />;
