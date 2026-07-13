"use client";

// @demo-title Wallet List
import { Fragment } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

const wallets = [
  {
    address: "0x34E6...6255",
    icon: "hugeicons:wallet",
    bg: "bg-neutral-800",
    eth: "0.0 ETH",
    name: "Funds",
    usd: "$0.00",
  },
  {
    address: "0xD9EA...f40e",
    icon: "hugeicons:globe",
    bg: "bg-blue-500",
    eth: "0.0 ETH",
    name: "0xD9EA...f40e",
    usd: "$0.00",
  },
  {
    address: "0x9DC5...621a",
    icon: "hugeicons:planet-earth",
    bg: "bg-green-500",
    eth: "0.021 ETH",
    name: "SLMobbin's",
    usd: "$37.09",
  },
  {
    address: "0xa98b...4daa",
    icon: "hugeicons:person",
    bg: "bg-orange-400",
    eth: "0.0 ETH",
    name: "Sam Lee's Wallet",
    usd: "$0.00",
  },
];

export const DemoWalletListExample = () => (
  <ItemCardGroup className="w-[500px]">
    {wallets.map((wallet, index) => (
      <Fragment key={wallet.address}>
        {index > 0 && <Separator />}
        <ItemCard>
          <ItemCard.Icon
            className={`size-10 rounded-full ${wallet.bg} text-lg`}
          >
            <Icon icon={wallet.icon} width={20} />
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>{wallet.name}</ItemCard.Title>
            <ItemCard.Description>{wallet.address}</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-foreground text-sm font-semibold">
                  {wallet.usd}
                </p>
                <p className="text-muted text-xs">{wallet.eth}</p>
              </div>
              <Button
                aria-label="Wallet actions"
                isIconOnly
                size="sm"
                variant="ghost"
              >
                <Icon icon="solar:menu-dots-bold" />
              </Button>
            </div>
          </ItemCard.Action>
        </ItemCard>
      </Fragment>
    ))}
  </ItemCardGroup>
);
