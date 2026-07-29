"use client";

// @demo-title Standalone Ripple
import { PressableFeedback } from "@thenamespace/uikit";
import { ArrowRight01Icon, UserIcon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { ItemCard } from "@thenamespace/uikit/item-card";

function StandaloneRow({ mode }: { mode: "highlight" | "ripple" }) {
  return (
    <div className="w-[500px]">
      <ItemCard
        className="relative w-full cursor-pointer overflow-hidden"
        render={(props) => (
          <button type="button" {...(props as React.JSX.IntrinsicElements["button"])} />
        )}
      >
        {mode === "ripple" ? <PressableFeedback.Ripple /> : <PressableFeedback.Highlight />}
        <ItemCard.Icon>
          <HugeiconsIcon aria-hidden icon={UserIcon} size={16} strokeWidth={2} />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Profile</ItemCard.Title>
          <ItemCard.Description>Update your personal information</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <HugeiconsIcon
            aria-hidden
            className="text-muted size-4"
            icon={ArrowRight01Icon}
            strokeWidth={2}
          />
        </ItemCard.Action>
      </ItemCard>
    </div>
  );
}

export const DemoStandaloneRippleExample = () => <StandaloneRow mode="ripple" />;
