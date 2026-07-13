// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Pressable
import { Fragment } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

type Item = {
  action?: React.ReactNode;
  description?: string;
  icon: string;
  title: string;
};

const Chevron = () => (
  <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />
);

function Row({
  action = <Chevron />,
  description,
  icon,
  pressable = false,
  title,
}: Item & { pressable?: boolean }) {
  return (
    <ItemCard
      className={
        pressable
          ? "hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          : undefined
      }
      {...(pressable
        ? {
            render: (props: React.JSX.IntrinsicElements["div"]) => (
              <button type="button" {...props} />
            ),
          }
        : {})}
    >
      <ItemCard.Icon>
        <Icon icon={icon} />
      </ItemCard.Icon>
      <ItemCard.Content>
        <ItemCard.Title>{title}</ItemCard.Title>
        {description && (
          <ItemCard.Description>{description}</ItemCard.Description>
        )}
      </ItemCard.Content>
      <ItemCard.Action>{action}</ItemCard.Action>
    </ItemCard>
  );
}

function Rows({
  items,
  pressable = false,
}: {
  items: Item[];
  pressable?: boolean;
}) {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.title}>
          {index > 0 && <Separator />}
          <Row {...item} pressable={pressable} />
        </Fragment>
      ))}
    </>
  );
}

const settings: Item[] = [
  {
    title: "Profile",
    description: "Update your personal information",
    icon: "solar:user-linear",
    action: (
      <Button size="sm" variant="outline">
        Update
      </Button>
    ),
  },
  {
    title: "Security",
    description: "Manage passwords and 2FA",
    icon: "solar:key-linear",
    action: (
      <Button size="sm" variant="outline">
        Manage
      </Button>
    ),
  },
  {
    title: "Language",
    description: "Choose your preferred language",
    icon: "solar:global-linear",
    action: (
      <Button size="sm" variant="outline">
        English
      </Button>
    ),
  },
];

export const DemoPressableExample = () => (
  <div className="w-[500px] rounded-2xl p-6">
    <ItemCardGroup className="overflow-hidden">
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Account</ItemCardGroup.Title>
        <ItemCardGroup.Description>
          Manage your account settings and preferences
        </ItemCardGroup.Description>
      </ItemCardGroup.Header>
      <Rows
        items={[
          ...settings.slice(0, 2).map((item) => ({
            action: <Chevron />,
            description: item.description,
            icon: item.icon,
            title: item.title,
          })),
          {
            title: "Cloud sync",
            description: "Sync data across your devices",
            icon: "solar:cloud-linear",
          },
        ]}
        pressable
      />
    </ItemCardGroup>
  </div>
);
