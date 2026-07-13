"use client";

// @demo-title With Icons
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

import { Icon } from "@/demos/pro-icon";

const permissions = [
  [
    "content",
    "Content Management",
    "Create, edit, and delete content",
    "solar:cloud-outline",
  ],
  [
    "users",
    "User Administration",
    "Manage team members and roles",
    "solar:shield-keyhole-outline",
  ],
  [
    "analytics",
    "Analytics Access",
    "View and export reports",
    "solar:database-outline",
  ],
  [
    "settings",
    "Settings",
    "Configure system preferences",
    "solar:lock-outline",
  ],
];

export const ProWithIconsExample = () => (
  <CheckboxButtonGroup
    className="w-full max-w-2xl grid-cols-2"
    defaultValue={["content", "analytics"]}
    layout="grid"
    name="permissions"
    variant="secondary"
  >
    <Label className="col-span-full">Role permissions</Label>
    {permissions.map(([value, title, description, icon]) => (
      <CheckboxButtonGroup.Item key={value} value={value}>
        <CheckboxButtonGroup.ItemContent className="flex-row items-center gap-4">
          <CheckboxButtonGroup.ItemIcon>
            <Icon icon={icon} />
          </CheckboxButtonGroup.ItemIcon>
          <div className="flex flex-col gap-0.5">
            <Label>{title}</Label>
            <Description>{description}</Description>
          </div>
        </CheckboxButtonGroup.ItemContent>
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
