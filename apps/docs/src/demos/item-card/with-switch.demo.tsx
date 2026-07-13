"use client";

// @demo-title With Switch
import { useState } from "react";

import { ItemCard } from "@thenamespace/uikit";
import { Switch } from "@thenamespace/uikit/switch";

import { Icon } from "@/demos/icon";

const Glyph = ({ icon }: { icon: string }) => <Icon icon={icon} />;

const Arrow = () => (
  <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />
);

function Card({
  action = <Arrow />,
  description,
  icon = "solar:global-linear",
  title,
  variant = "default",
}: {
  action?: React.ReactNode;
  description?: string;
  icon?: string;
  title: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "tertiary" | "transparent";
}) {
  return (
    <ItemCard variant={variant}>
      <ItemCard.Icon>
        <Glyph icon={icon} />
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

function SwitchCard() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <Card
        action={
          <Switch
            aria-label="Switch Dark mode"
            isSelected={selected}
            onChange={setSelected}
          >
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
    </div>
  );
}

export const DemoWithSwitchExample = () => <SwitchCard />;
