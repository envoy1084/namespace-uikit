"use client";

// @demo-title Email Setting
import { ItemCard } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { Separator } from "@thenamespace/uikit/separator";
import { Tooltip } from "@thenamespace/uikit/tooltip";

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
        <Dropdown>
          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <Button aria-label="Actions" isIconOnly size="sm" variant="outline">
                <Glyph icon="solar:menu-dots-bold" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Actions</Tooltip.Content>
          </Tooltip>
          <Dropdown.Popover className="min-w-[180px]" placement="bottom end">
            <Dropdown.Menu>
              <Dropdown.Item textValue="Change Email">
                <Glyph icon="solar:pen-linear" />
                <span>Change Email</span>
              </Dropdown.Item>
              <Dropdown.Item textValue="Set as Primary">
                <Glyph icon="solar:star-linear" />
                <span>Set as Primary</span>
              </Dropdown.Item>
              <Separator />
              <Dropdown.Item textValue="Remove Email">
                <Glyph icon="solar:trash-bin-trash-linear" />
                <span className="text-danger">Remove Email</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </ItemCard.Action>
    </ItemCard>
  </div>
);
