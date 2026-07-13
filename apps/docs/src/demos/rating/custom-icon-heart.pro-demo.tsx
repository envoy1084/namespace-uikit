"use client";

// @demo-title Custom Icon Heart
import { Rating } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

const Heart = () => <Icon icon="solar:heart-bold" />;

export const ProCustomIconHeartExample = () => (
  <Rating aria-label="Favorites" defaultValue={3} icon={<Heart />}>
    <Items />
  </Rating>
);
