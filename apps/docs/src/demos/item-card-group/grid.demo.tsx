// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Grid
import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";

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

export const DemoGridExample = () => (
  <div className="w-[600px] rounded-2xl p-6">
    <ItemCardGroup layout="grid">
      {settings.slice(0, 2).map((item) => (
        <Row {...item} action={undefined} key={item.title} />
      ))}
      <Row
        description="English (US)"
        icon="solar:global-linear"
        title="Language"
      />
      <Row
        description="Theme & colors"
        icon="solar:palette-linear"
        title="Appearance"
      />
    </ItemCardGroup>
  </div>
);
