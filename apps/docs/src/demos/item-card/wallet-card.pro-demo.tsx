"use client";

// @demo-title Wallet Card
import { ItemCard } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

const Glyph = ({ icon }: { icon: string }) => <Icon icon={icon} />;

export const ProWalletCardExample = () => (
  <div className="w-[500px] rounded-2xl p-6">
    <ItemCard>
      <ItemCard.Icon className="size-10 rounded-full bg-green-500 text-lg">
        <Icon icon="gravity-ui:globe" width={20} />
      </ItemCard.Icon>
      <ItemCard.Content>
        <ItemCard.Title>SLMobbin&apos;s</ItemCard.Title>
        <ItemCard.Description>0x9DC5...621a</ItemCard.Description>
      </ItemCard.Content>
      <ItemCard.Action>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-foreground text-sm font-semibold">$34.99</p>
            <p className="text-muted text-xs">0.021 ETH</p>
          </div>
          <Button
            aria-label="Wallet actions"
            isIconOnly
            size="sm"
            variant="ghost"
          >
            <Glyph icon="solar:menu-dots-bold" />
          </Button>
        </div>
      </ItemCard.Action>
    </ItemCard>
  </div>
);
