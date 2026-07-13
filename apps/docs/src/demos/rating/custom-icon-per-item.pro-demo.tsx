"use client";

// @demo-title Custom Icon Per Item
import { Rating } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const Heart = () => <Icon icon="solar:heart-bold" />;

export const ProCustomIconPerItemExample = () => (
  <Rating
    aria-label="Favorites"
    defaultValue={3}
    style={
      {
        "--rating-active-color": "var(--color-danger)",
      } as React.CSSProperties
    }
  >
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value}>
        <Heart />
      </Rating.Item>
    ))}
  </Rating>
);
