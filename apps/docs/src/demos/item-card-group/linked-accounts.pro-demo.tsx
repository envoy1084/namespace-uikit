// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Linked Accounts
import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { Tooltip } from "@thenamespace/uikit/tooltip";

import { Icon } from "@/demos/pro-icon";

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

const accounts = [
  {
    connected: true,
    description: "junior@namespace.ninja",
    icon: "logos:google-icon",
    name: "Google",
  },
  {
    connected: false,
    description: "Not Linked",
    icon: "logos:apple",
    name: "Apple",
  },
  {
    connected: false,
    description: "Not Linked",
    icon: "logos:github-icon",
    name: "Github",
  },
  {
    connected: true,
    description: "Account Linked",
    icon: "logos:linkedin-icon",
    name: "LinkedIn",
  },
  {
    connected: false,
    description: "Not Linked",
    icon: "simple-icons:notion",
    name: "Notion",
  },
];

export const ProLinkedAccountsExample = () => (
  <ItemCardGroup columns={3} layout="grid">
    {accounts.map((account) => (
      <Row
        action={
          account.connected ? (
            <Icon
              className="text-success size-5"
              icon="solar:check-circle-bold"
            />
          ) : (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Button
                  aria-label={`Link ${account.name}`}
                  isIconOnly
                  size="sm"
                  variant="secondary"
                >
                  <Icon icon="solar:add-circle-linear" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Link {account.name}</Tooltip.Content>
            </Tooltip>
          )
        }
        description={account.description}
        icon={account.icon}
        key={account.name}
        title={account.name}
      />
    ))}
  </ItemCardGroup>
);
