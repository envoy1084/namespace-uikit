"use client";

// @demo-title In Page Context
import { useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";

const article = [
  [
    "intro",
    "Introduction",
    "Welcome to the documentation. This guide covers everything you need to get started with the library, from installation to advanced usage patterns.",
  ],
  [
    "setup",
    "Getting Started",
    "Install the package using your preferred package manager. The library supports npm, yarn, and pnpm out of the box with zero configuration needed.",
  ],
  [
    "api",
    "API Reference",
    "The API provides a clean interface for building composable components. Each component follows the compound pattern, giving you full control over rendering.",
  ],
  [
    "examples",
    "Examples",
    "Browse through real-world examples to see how the components work in production scenarios. Each example is fully functional and can be copied directly.",
  ],
  [
    "faq",
    "FAQ",
    "Find answers to the most commonly asked questions about the library, including migration guides, browser support, and accessibility compliance.",
  ],
].map(([id, label, text]) => ({ id, label, text }));

function InPage() {
  const [active, setActive] = useState("intro");
  return (
    <div className="border-border relative h-[420px] w-[640px] overflow-hidden rounded-xl border">
      <div className="h-full overflow-auto p-8 pr-16">
        {article.map((item) => (
          <div className="mb-10 last:mb-0" key={item.id}>
            <h2
              className={`text-base font-semibold ${item.id === active ? "text-accent" : ""}`}
            >
              {item.label}
            </h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 right-3 -translate-y-1/2">
        <FloatingToc>
          <FloatingToc.Trigger aria-label="Table of contents">
            {article.map((item) => (
              <FloatingToc.Bar active={item.id === active} key={item.id} />
            ))}
          </FloatingToc.Trigger>
          <FloatingToc.Content>
            {article.map((item) => (
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
    </div>
  );
}

export const DemoInPageContextExample = () => <InPage />;
