"use client";

// @demo-title Default
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const ProDefaultExample = () => (
  <Rating aria-label="Rating" defaultValue={3}>
    <Items />
  </Rating>
);
