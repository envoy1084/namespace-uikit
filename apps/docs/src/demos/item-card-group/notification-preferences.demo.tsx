// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Notification Preferences
import { useState } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { InlineSelect } from "@thenamespace/uikit/inline-select";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { ListBox } from "@thenamespace/uikit/list-box";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

type Item = {
  action?: React.ReactNode;
  description?: string;
  icon: string;
  title: string;
};

const Chevron = () => <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />;
const defaultRowAction = <Chevron />;

function Row({
  action = defaultRowAction,
  description,
  icon,
  pressable = false,
  title,
}: Item & { pressable?: boolean }) {
  return (
    <ItemCard
      className={
        pressable
          ? "hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
          : undefined
      }
      {...(pressable
        ? {
            render: (props: React.JSX.IntrinsicElements["div"]) => (
              <button type="button" {...props} />
            ),
          }
        : {})}
    >
      <ItemCard.Icon>
        <Icon icon={icon} />
      </ItemCard.Icon>
      <ItemCard.Content>
        <ItemCard.Title>{title}</ItemCard.Title>
        {description && <ItemCard.Description>{description}</ItemCard.Description>}
      </ItemCard.Content>
      <ItemCard.Action>{action}</ItemCard.Action>
    </ItemCard>
  );
}

function SelectAction({
  label,
  options: optionsProp,
  value: valueProp,
}: {
  label: string;
  options?: string[][];
  value?: string[];
}) {
  const [value, setValue] = useState<string[]>(valueProp ?? ["email", "push"]);
  const options = optionsProp ?? [
    ["email", "Email"],
    ["whatsapp", "WhatsApp"],
    ["push", "Push Notification"],
  ];
  return (
    <InlineSelect aria-label={label} selectionMode="multiple" value={value} onChange={setValue}>
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover>
        <ListBox selectionMode="multiple">
          {options.map(([id, text]) => (
            <ListBox.Item id={id} key={id} textValue={text}>
              {text}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </InlineSelect.Popover>
    </InlineSelect>
  );
}

export const DemoNotificationPreferencesExample = () => (
  <div className="w-[550px] rounded-2xl p-6">
    <ItemCardGroup>
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Notification Preferences</ItemCardGroup.Title>
        <ItemCardGroup.Description>
          Choose how you receive notifications for each event type
        </ItemCardGroup.Description>
      </ItemCardGroup.Header>
      <Row
        action={<SelectAction label="Event Invites" />}
        icon="solar:letter-linear"
        title="Event Invites"
      />
      <Separator />
      <Row
        action={
          <SelectAction
            label="Event Reminders"
            options={[
              ["email", "Email"],
              ["push", "Push Notification"],
            ]}
            value={["email"]}
          />
        }
        icon="solar:bell-linear"
        title="Event Reminders"
      />
      <Separator />
      <Row
        action={
          <SelectAction
            label="Event Blasts"
            options={[
              ["email", "Email"],
              ["push", "Push Notification"],
            ]}
          />
        }
        icon="solar:megaphone-linear"
        title="Event Blasts"
      />
    </ItemCardGroup>
  </div>
);
