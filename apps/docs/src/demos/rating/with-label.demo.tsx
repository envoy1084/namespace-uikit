"use client";

// @demo-title With Label
import { useState } from "react";

import { Rating } from "@thenamespace/uikit";
import { Label } from "@thenamespace/uikit/label";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const DemoWithLabelExample = function Demo() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col gap-1.5">
      <Label>How would you rate this product?</Label>
      <Rating
        aria-label="Product rating"
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </Rating>
      {value > 0 ? (
        <span className="text-muted text-xs">
          You selected {value} {value === 1 ? "star" : "stars"}
        </span>
      ) : null}
    </div>
  );
};
