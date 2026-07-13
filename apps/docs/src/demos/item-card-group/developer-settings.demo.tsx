// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Developer Settings
import { Fragment } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";
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

export const DemoDeveloperSettingsExample = () => (
  <div className="flex w-[600px] flex-col gap-6 p-6">
    <ItemCardGroup variant="transparent">
      <ItemCardGroup.Header className="mb-1 flex items-center justify-between px-1.5">
        <ItemCardGroup.Title>Source Control</ItemCardGroup.Title>
        <Button size="sm" variant="outline">
          Add Provider
        </Button>
      </ItemCardGroup.Header>
      <ItemCardGroup className="overflow-hidden">
        <Rows
          items={[
            {
              title: "GitHub",
              description: "Connected as @jrgarciadev",
              icon: "logos:github-icon",
              action: (
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              ),
            },
            {
              title: "GitLab",
              description: "Connect GitLab for Cloud Agents",
              icon: "logos:gitlab",
              action: (
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              ),
            },
          ]}
        />
      </ItemCardGroup>
    </ItemCardGroup>
    <ItemCardGroup variant="transparent">
      <ItemCardGroup.Header className="mb-1 px-1.5">
        <ItemCardGroup.Title>Integrations</ItemCardGroup.Title>
      </ItemCardGroup.Header>
      <ItemCardGroup className="overflow-hidden">
        <Rows
          items={[
            {
              title: "Slack",
              description: "Work with Cloud Agents from Slack",
              icon: "logos:slack-icon",
              action: (
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              ),
            },
            {
              title: "Linear",
              description: "Connect a Linear workspace",
              icon: "simple-icons:linear",
              action: (
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              ),
            },
          ]}
        />
      </ItemCardGroup>
    </ItemCardGroup>
  </div>
);
