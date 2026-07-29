// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Developer Settings
import { Fragment } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { PressableFeedback } from "@thenamespace/uikit/pressable-feedback";
import { Separator } from "@thenamespace/uikit/separator";

import { Icon } from "@/demos/icon";

type Item = {
  action?: React.ReactNode;
  description?: string;
  descriptionClassName?: string;
  icon: string;
  title: string;
};

const Chevron = () => <Icon className="text-muted size-4" icon="solar:alt-arrow-right-linear" />;
const defaultRowAction = <Chevron />;

function Row({
  action = defaultRowAction,
  description,
  descriptionClassName,
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
      {pressable && <PressableFeedback.Ripple />}
      <ItemCard.Icon>
        <Icon icon={icon} />
      </ItemCard.Icon>
      <ItemCard.Content>
        <ItemCard.Title>{title}</ItemCard.Title>
        {description && (
          <ItemCard.Description className={descriptionClassName}>
            {description}
          </ItemCard.Description>
        )}
      </ItemCard.Content>
      <ItemCard.Action>{action}</ItemCard.Action>
    </ItemCard>
  );
}

function Rows({ items, pressable = false }: { items: Item[]; pressable?: boolean }) {
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
        <Dropdown>
          <Button size="sm" variant="outline">
            Add Provider
            <Icon className="size-3" icon="solar:alt-arrow-down-linear" />
          </Button>
          <Dropdown.Popover className="min-w-[180px]" placement="bottom end">
            <Dropdown.Menu>
              <Dropdown.Item textValue="GitHub Enterprise">
                <Icon className="size-4" icon="logos:github-icon" />
                <span>GitHub Enterprise</span>
              </Dropdown.Item>
              <Dropdown.Item textValue="GitLab Self Hosted">
                <Icon className="size-4" icon="logos:gitlab" />
                <span>GitLab Self Hosted</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </ItemCardGroup.Header>
      <ItemCardGroup className="overflow-hidden">
        <Rows
          items={[
            {
              title: "GitHub",
              description: "Connected as @jrgarciadev to repositories in organizations: heroui-inc",
              descriptionClassName: "max-w-xs",
              icon: "logos:github-icon",
              action: (
                <Button size="sm" variant="outline">
                  Manage
                  <Icon className="size-3" icon="solar:alt-arrow-down-linear" />
                </Button>
              ),
            },
            {
              title: "GitLab",
              description: "Connect GitLab for Cloud Agents, Bugbot and enhanced codebase context",
              descriptionClassName: "max-w-xs",
              icon: "logos:gitlab",
              action: (
                <Button size="sm" variant="outline">
                  Connect
                  <Icon className="size-3" icon="solar:alt-arrow-right-linear" />
                </Button>
              ),
            },
          ]}
        />
        <Separator />
        <Row
          description="Register a GitHub Enterprise App via Manifest"
          icon="logos:github-icon"
          pressable
          title="GitHub Enterprise"
        />
        <Separator />
        <Row
          description="Register a self-hosted GitLab instance"
          icon="logos:gitlab"
          pressable
          title="GitLab Self Hosted"
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
                  <Icon className="size-3" icon="solar:alt-arrow-right-linear" />
                </Button>
              ),
            },
            {
              title: "Linear",
              description: "Connect a Linear workspace to delegate issues to Cloud Agents",
              icon: "simple-icons:linear",
              action: (
                <Button size="sm" variant="outline">
                  Connect
                  <Icon className="size-3" icon="solar:alt-arrow-right-linear" />
                </Button>
              ),
            },
          ]}
        />
      </ItemCardGroup>
    </ItemCardGroup>
  </div>
);
