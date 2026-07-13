"use client";

import { Tag, TagGroup } from "@thenamespace/uikit";
import {
  PlanetEarth,
  Rocket,
  ShoppingBag,
  SquareArticle,
} from "@thenamespace/uikit/icons";

export function TagGroupBasic() {
  return (
    <TagGroup aria-label="Tags" selectionMode="single">
      <TagGroup.List>
        <Tag id="default-news">
          <SquareArticle />
          News
        </Tag>
        <Tag id="default-travel">
          <PlanetEarth />
          Travel
        </Tag>
        <Tag id="default-gaming">
          <Rocket />
          Gaming
        </Tag>
        <Tag id="default-shopping">
          <ShoppingBag />
          Shopping
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}
