// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Select
import { useState } from "react";

import { ItemCard } from "@thenamespace/uikit";
import { InlineSelect } from "@thenamespace/uikit/inline-select";
import { ListBox } from "@thenamespace/uikit/list-box";

import { Icon } from "@/demos/icon";

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

function SelectCard({ multiple = false }: { multiple?: boolean }) {
  const [value, setValue] = useState<string | string[]>(
    multiple ? ["email", "push"] : "en",
  );
  const options = multiple
    ? [
        ["email", "Email"],
        ["whatsapp", "WhatsApp"],
        ["push", "Push Notification"],
      ]
    : [
        ["en", "English"],
        ["es", "Spanish"],
        ["fr", "French"],
        ["ja", "Japanese"],
      ];
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <Card
        action={
          <InlineSelect
            aria-label={multiple ? "Event Invites channels" : "Language"}
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
                {options.map(([id, label]) => (
                  <ListBox.Item id={id} key={id} textValue={label}>
                    {label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </InlineSelect.Popover>
          </InlineSelect>
        }
        description={
          multiple
            ? "Choose how you receive invitations"
            : "Choose your preferred language"
        }
        icon={multiple ? "solar:bell-linear" : "solar:global-linear"}
        title={multiple ? "Event Invites" : "Language"}
      />
    </div>
  );
}

export const DemoWithSelectExample = () => <SelectCard />;
