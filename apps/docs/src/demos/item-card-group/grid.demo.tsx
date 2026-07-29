// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Grid
import { ItemCardGroup } from "@thenamespace/uikit";
import { ItemCard } from "@thenamespace/uikit/item-card";

import { Icon } from "@/demos/icon";

type Item = {
  action?: React.ReactNode;
  description?: string;
  icon: string;
  title: string;
};

const Chevron = () => <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />;
const defaultRowAction = <Chevron />;

function Row({
  action = defaultRowAction,
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
        {description && <ItemCard.Description>{description}</ItemCard.Description>}
      </ItemCard.Content>
      {action !== null && <ItemCard.Action>{action}</ItemCard.Action>}
    </ItemCard>
  );
}

export const DemoGridExample = () => (
  <div className="w-[600px] rounded-2xl p-6">
    <ItemCardGroup layout="grid">
      <Row action={null} description="Personal info" icon="solar:user-linear" title="Profile" />
      <Row action={null} description="2FA & passwords" icon="solar:key-linear" title="Security" />
      <Row action={null} description="English (US)" icon="solar:global-linear" title="Language" />
      <Row
        action={null}
        description="Theme & colors"
        icon="solar:palette-linear"
        title="Appearance"
      />
    </ItemCardGroup>
  </div>
);
