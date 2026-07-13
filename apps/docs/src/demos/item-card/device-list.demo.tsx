"use client";

// @demo-title Device List
import { ItemCard } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";

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

export const DemoDeviceListExample = () => (
  <div className="w-[500px] space-y-2 rounded-2xl p-6">
    {[
      ["MacBook Pro", "Last active: 2 minutes ago", "solar:smartphone-linear"],
      ["iMac", "Last active: 3 days ago", "solar:monitor-linear"],
      ["iPhone 15 Pro", "Last active: 1 hour ago", "solar:shield-check-linear"],
    ].map(([title, description, icon], index) => (
      <Card
        action={
          index === 0 ? (
            <Chip color="success" size="sm" variant="soft">
              Active
            </Chip>
          ) : (
            <Button size="sm" variant="outline">
              Revoke
            </Button>
          )
        }
        description={description}
        icon={icon}
        key={title}
        title={title}
      />
    ))}
  </div>
);
