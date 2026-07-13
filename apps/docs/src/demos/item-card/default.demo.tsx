"use client";

// @demo-title Default
import { ItemCard } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

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

export const DemoDefaultExample = () => (
  <div className="w-[500px] rounded-2xl p-6">
    <Card
      action={
        <Button size="sm" variant="outline">
          English <Arrow />
        </Button>
      }
      description="Choose your preferred language"
      title="Language"
    />
  </div>
);
