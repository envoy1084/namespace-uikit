"use client";

// @demo-title Variants
import { ItemCard } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

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

export const ProVariantsExample = () => (
  <div className="w-[500px] space-y-3 p-6">
    {(
      ["default", "secondary", "tertiary", "outline", "transparent"] as const
    ).map((variant) => (
      <Card
        description={
          {
            default: "Surface background with shadow",
            secondary: "Secondary surface, no shadow",
            tertiary: "Tertiary surface, no shadow",
            outline: "Transparent with border, no shadow",
            transparent: "No background, no border, no shadow",
          }[variant]
        }
        icon={
          {
            default: "solar:global-linear",
            secondary: "solar:palette-linear",
            tertiary: "solar:moon-linear",
            outline: "solar:key-linear",
            transparent: "solar:bell-linear",
          }[variant]
        }
        key={variant}
        title={variant[0].toUpperCase() + variant.slice(1)}
        variant={variant}
      />
    ))}
  </div>
);
