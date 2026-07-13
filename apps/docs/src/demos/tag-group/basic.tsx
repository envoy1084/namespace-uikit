"use client";

import { Tag, TagGroup } from "@thenamespace/uikit";
import {
  Globe02Icon,
  Rocket01Icon,
  ShoppingBag01Icon,
  File02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function TagGroupBasic() {
  return (
    <TagGroup aria-label="Tags" selectionMode="single">
      <TagGroup.List>
        <Tag id="default-news">
          <HugeiconsIcon icon={File02Icon} />
          News
        </Tag>
        <Tag id="default-travel">
          <HugeiconsIcon icon={Globe02Icon} />
          Travel
        </Tag>
        <Tag id="default-gaming">
          <HugeiconsIcon icon={Rocket01Icon} />
          Gaming
        </Tag>
        <Tag id="default-shopping">
          <HugeiconsIcon icon={ShoppingBag01Icon} />
          Shopping
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}
