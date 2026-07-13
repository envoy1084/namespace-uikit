"use client";

// @demo-title Custom Color
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const DemoCustomColorExample = () => (
  <div className="flex flex-col gap-4">
    {[
      { label: "Accent", color: "var(--color-accent)" },
      { label: "Danger", color: "var(--color-danger)" },
      { label: "Success", color: "var(--color-success)" },
    ].map((item) => (
      <div className="flex flex-col gap-1" key={item.label}>
        <span className="text-muted text-xs">{item.label}</span>
        <Rating
          aria-label={`Rating ${item.label.toLowerCase()}`}
          defaultValue={4}
          style={{ "--rating-active-color": item.color } as React.CSSProperties}
        >
          <Items />
        </Rating>
      </div>
    ))}
  </div>
);
