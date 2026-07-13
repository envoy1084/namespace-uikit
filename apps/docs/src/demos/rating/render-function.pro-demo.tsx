"use client";

// @demo-title Render Function
import { useState } from "react";

import { Rating, StarIcon } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

export const ProRenderFunctionExample = function Demo() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating aria-label="Rating" value={value} onValueChange={setValue}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Rating.Item key={item} value={item}>
            {({ isActive }) => (
              <span
                className="flex size-5"
                style={{
                  color: isActive
                    ? "var(--color-warning)"
                    : "var(--color-muted)",
                }}
              >
                {isActive ? <StarIcon /> : <Icon icon="solar:star-linear" />}
              </span>
            )}
          </Rating.Item>
        ))}
      </Rating>
      <span className="text-muted text-sm">
        {value === 0
          ? "No rating"
          : `${value} ${value === 1 ? "star" : "stars"}`}
      </span>
    </div>
  );
};
