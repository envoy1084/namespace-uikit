// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Notification Preferences
import { Fragment, useState } from "react";

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

const Chevron = () => (
  <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />
);

function Row({
  action = <Chevron />,
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
        {description && (
          <ItemCard.Description>{description}</ItemCard.Description>
        )}
      </ItemCard.Content>
      <ItemCard.Action>{action}</ItemCard.Action>
    </ItemCard>
  );
}

function Rows({
  items,
  pressable = false,
}: {
  items: Item[];
  pressable?: boolean;
}) {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.title}>
          {index > 0 && <Separator />}
          <Row {...item} pressable={pressable} />
        </Fragment>
      ))}
    </>
  );
}

function SelectAction({
  label,
  multiple = false,
}: {
  label: string;
  multiple?: boolean;
}) {
  const [value, setValue] = useState<string | string[]>(
    multiple ? ["email", "push"] : "view",
  );
  const options = multiple
    ? [
        ["email", "Email"],
        ["whatsapp", "WhatsApp"],
        ["push", "Push Notification"],
      ]
    : [
        ["none", "None"],
        ["view", "View"],
        ["edit", "Edit"],
        ["manage", "Manage"],
      ];
  return (
    <InlineSelect
      aria-label={label}
      selectionMode={multiple ? "multiple" : "single"}
      value={value}
      onChange={setValue}
    >
      <InlineSelect.Trigger>
        <InlineSelect.Value />
        <InlineSelect.Indicator />
      </InlineSelect.Trigger>
      <InlineSelect.Popover>
        <ListBox selectionMode={multiple ? "multiple" : "single"}>
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
  <div className="w-[500px] rounded-2xl p-6">
    <ItemCardGroup>
      <ItemCardGroup.Header>
        <ItemCardGroup.Title>Notification Preferences</ItemCardGroup.Title>
        <ItemCardGroup.Description>
          Choose how you receive notifications for each event type
        </ItemCardGroup.Description>
      </ItemCardGroup.Header>
      <Rows
        items={[
          ["Event Invites", "solar:letter-linear"],
          ["Event Reminders", "solar:bell-linear"],
          ["Event Blasts", "solar:megaphone-linear"],
        ].map(([title, icon]) => ({
          title,
          icon,
          action: <SelectAction label={title} multiple />,
        }))}
      />
    </ItemCardGroup>
  </div>
);
