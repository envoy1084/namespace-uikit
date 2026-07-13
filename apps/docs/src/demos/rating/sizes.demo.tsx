"use client";

// @demo-title Sizes
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const DemoSizesExample = () => (
  <div className="flex items-center gap-8">
    {(["sm", "md", "lg"] as const).map((size) => (
      <div className="flex flex-col items-center gap-2" key={size}>
        <span className="text-muted text-xs">{size}</span>
        <Rating aria-label={`Rating ${size}`} defaultValue={3} size={size}>
          <Items />
        </Rating>
      </div>
    ))}
  </div>
);
