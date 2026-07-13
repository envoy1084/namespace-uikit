// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Pressable
import { ItemCard } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const Glyph = ({ icon }: { icon: string }) => <Icon icon={icon} />;

const Arrow = () => (
  <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />
);

export const ProPressableExample = () => (
  <div className="w-[500px] space-y-4 rounded-2xl p-6">
    {[
      [
        "Account settings",
        "Manage your account preferences",
        "solar:user-linear",
      ],
      [
        "Security",
        "Passwords and two-factor authentication",
        "solar:key-linear",
      ],
    ].map(([title, description, icon]) => (
      <ItemCard
        className="relative w-full cursor-pointer overflow-hidden"
        key={title}
        render={(props) => <button type="button" {...props} />}
      >
        <ItemCard.Icon>
          <Glyph icon={icon} />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>{title}</ItemCard.Title>
          <ItemCard.Description>{description}</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Arrow />
        </ItemCard.Action>
      </ItemCard>
    ))}
  </div>
);
