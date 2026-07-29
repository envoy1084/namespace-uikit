// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Pressable
import { ItemCard } from "@thenamespace/uikit";
import { PressableFeedback } from "@thenamespace/uikit/pressable-feedback";

import { Icon } from "@/demos/icon";

const Glyph = ({ icon }: { icon: string }) => <Icon icon={icon} />;

const Arrow = () => <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />;

export const DemoPressableExample = () => (
  <div className="w-[500px] space-y-4 rounded-2xl p-6">
    <ItemCard
      className="relative w-full cursor-pointer overflow-hidden"
      render={(props) => <button type="button" {...props} />}
    >
      <PressableFeedback.Highlight />
      <ItemCard.Icon>
        <Glyph icon="solar:user-linear" />
      </ItemCard.Icon>
      <ItemCard.Content>
        <ItemCard.Title>Account settings</ItemCard.Title>
        <ItemCard.Description>Manage your account preferences</ItemCard.Description>
      </ItemCard.Content>
      <ItemCard.Action>
        <Arrow />
      </ItemCard.Action>
    </ItemCard>
    <ItemCard
      className="relative w-full cursor-pointer overflow-hidden"
      render={(props) => <button type="button" {...props} />}
    >
      <PressableFeedback.Ripple />
      <ItemCard.Icon>
        <Glyph icon="solar:key-linear" />
      </ItemCard.Icon>
      <ItemCard.Content className="w-full flex-1">
        <ItemCard.Title>Security</ItemCard.Title>
        <ItemCard.Description>Passwords and two-factor authentication</ItemCard.Description>
      </ItemCard.Content>
      <ItemCard.Action>
        <Arrow />
      </ItemCard.Action>
    </ItemCard>
  </div>
);
