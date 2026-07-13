"use client";

// @demo-title Controlled
import { useState } from "react";

import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const DemoControlledExample = function Demo() {
  const [value, setValue] = useState(3);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating aria-label="Rating" value={value} onValueChange={setValue}>
        <Items />
      </Rating>
      <span className="text-muted text-sm">
        {value} {value === 1 ? "star" : "stars"}
      </span>
    </div>
  );
};
