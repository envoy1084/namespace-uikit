"use client";

import { Avatar, Description, Label, Tag, TagGroup } from "@thenamespace/uikit";
import {
  Globe02Icon,
  Rocket01Icon,
  ShoppingBag01Icon,
  File02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function TagGroupWithPrefix() {
  return (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single">
        <Label>With Icons</Label>
        <TagGroup.List>
          <Tag>
            <HugeiconsIcon icon={File02Icon} />
            News
          </Tag>
          <Tag>
            <HugeiconsIcon icon={Globe02Icon} />
            Travel
          </Tag>
          <Tag>
            <HugeiconsIcon icon={Rocket01Icon} />
            Gaming
          </Tag>
          <Tag>
            <HugeiconsIcon icon={ShoppingBag01Icon} />
            Shopping
          </Tag>
        </TagGroup.List>
        <Description>Tags with icons</Description>
      </TagGroup>

      <TagGroup selectionMode="single">
        <Label>With Avatars</Label>
        <TagGroup.List>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="/assets/avatars/blue.jpg" />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar>
            Fred
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="/assets/avatars/green.jpg" />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar>
            Michael
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="/assets/avatars/purple.jpg" />
              <Avatar.Fallback>J</Avatar.Fallback>
            </Avatar>
            Jane
          </Tag>
        </TagGroup.List>
        <Description>Tags with avatars</Description>
      </TagGroup>
    </div>
  );
}
