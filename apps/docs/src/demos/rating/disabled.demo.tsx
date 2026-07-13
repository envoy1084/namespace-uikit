"use client";

// @demo-title Disabled
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const DemoDisabledExample = () => (
  <Rating isDisabled aria-label="Rating" defaultValue={3}>
    <Items />
  </Rating>
);
