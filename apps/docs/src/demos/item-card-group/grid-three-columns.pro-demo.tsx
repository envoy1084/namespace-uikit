// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Grid Three Columns
import { ItemCardGroup } from "@thenamespace/uikit";
import { ItemCard } from "@thenamespace/uikit/item-card";

import { Icon } from "@/demos/pro-icon";

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

export const ProGridThreeColumnsExample = () => (
  <div className="w-[720px] rounded-2xl p-6">
    <ItemCardGroup columns={3} layout="grid">
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Devices</ItemCardGroup.Title>
        <ItemCardGroup.Description>
          Manage your connected devices
        </ItemCardGroup.Description>
      </ItemCardGroup.Header>
      {[
        ["MacBook Pro", "Active now", "solar:laptop-linear"],
        ["iMac", "3 days ago", "solar:monitor-linear"],
        ["iPhone 15", "1 hour ago", "solar:smartphone-linear"],
      ].map(([title, description, icon]) => (
        <Row description={description} icon={icon} key={title} title={title} />
      ))}
    </ItemCardGroup>
  </div>
);
