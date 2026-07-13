"use client";

// @demo-title Vertical Stack
import { ItemCard } from "@thenamespace/uikit";

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

export const DemoVerticalStackExample = () => (
  <div className="w-[500px] space-y-2 rounded-2xl p-6">
    {[
      ["Profile", "Update your personal information", "solar:user-linear"],
      ["Security", "Manage passwords and 2FA", "solar:key-linear"],
      ["Cloud sync", "Sync data across your devices", "solar:cloud-linear"],
    ].map(([title, description, icon]) => (
      <Card description={description} icon={icon} key={title} title={title} />
    ))}
  </div>
);
