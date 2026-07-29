// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Multiple Sections
import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { Separator } from "@thenamespace/uikit/separator";
import { Switch } from "@thenamespace/uikit/switch";

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

export const DemoMultipleSectionsExample = () => (
  <div className="flex w-[500px] flex-col gap-6 rounded-2xl p-6">
    <ItemCardGroup>
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Account</ItemCardGroup.Title>
      </ItemCardGroup.Header>
      <Row {...settings[0]} action={<Chevron />} />
      <Separator />
      <Row {...settings[1]} action={<Chevron />} />
    </ItemCardGroup>
    <ItemCardGroup>
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Preferences</ItemCardGroup.Title>
      </ItemCardGroup.Header>
      <Row {...settings[2]} />
      <Separator />
      <Row
        action={
          <Switch aria-label="Switch Dark mode">
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        }
        description="Use dark theme across the app"
        icon="solar:moon-linear"
        title="Dark mode"
      />
    </ItemCardGroup>
  </div>
);
