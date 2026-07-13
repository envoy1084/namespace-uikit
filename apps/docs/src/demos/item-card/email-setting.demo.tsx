"use client";

// @demo-title Email Setting
import { ItemCard } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";

import { Icon } from "@/demos/icon";

const Glyph = ({ icon }: { icon: string }) => <Icon icon={icon} />;

export const DemoEmailSettingExample = () => (
  <div className="w-[600px] rounded-2xl p-6">
    <ItemCard>
      <ItemCard.Content>
        <ItemCard.Title>
          junior@namespace.ninja{" "}
          <Chip className="ml-2 align-middle" size="sm" variant="soft">
            Primary
          </Chip>
        </ItemCard.Title>
        <ItemCard.Description>
          Notifications and account updates will be sent to this address.
        </ItemCard.Description>
      </ItemCard.Content>
      <ItemCard.Action>
        <Button aria-label="Actions" isIconOnly size="sm" variant="outline">
          <Glyph icon="solar:menu-dots-bold" />
        </Button>
      </ItemCard.Action>
    </ItemCard>
  </div>
);
