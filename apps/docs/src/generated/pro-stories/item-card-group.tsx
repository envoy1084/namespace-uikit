// @ts-nocheck -- Generated from the tested Storybook story for docs rendering.
"use client";
import type { Meta, StoryObj } from "@storybook/react";

import { Fragment, useState } from "react";

import { ItemCardGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { InlineSelect } from "@thenamespace/uikit/inline-select";
import { ItemCard } from "@thenamespace/uikit/item-card";
import { ListBox } from "@thenamespace/uikit/list-box";
import { Separator } from "@thenamespace/uikit/separator";
import { Switch } from "@thenamespace/uikit/switch";
import { Tooltip } from "@thenamespace/uikit/tooltip";

import { Icon } from "../../../../storybook/src/icon";

const meta = {
  component: ItemCardGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/ItemCardGroup",
} satisfies Meta<typeof ItemCardGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
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
const settings: Item[] = [
  {
    title: "Profile",
    description: "Update your personal information",
    icon: "solar:user-linear",
    action: (
      <Button size="sm" variant="outline">
        Update
      </Button>
    ),
  },
  {
    title: "Security",
    description: "Manage passwords and 2FA",
    icon: "solar:key-linear",
    action: (
      <Button size="sm" variant="outline">
        Manage
      </Button>
    ),
  },
  {
    title: "Language",
    description: "Choose your preferred language",
    icon: "solar:global-linear",
    action: (
      <Button size="sm" variant="outline">
        English
      </Button>
    ),
  },
];

export const List: Story = {
  render: () => (
    <ItemCardGroup className="w-[500px]">
      <Rows items={settings} />
    </ItemCardGroup>
  ),
};
export const Variants: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-6 p-6">
      {(
        ["default", "secondary", "tertiary", "outline", "transparent"] as const
      ).map((variant) => (
        <ItemCardGroup
          className="overflow-hidden"
          key={variant}
          variant={variant}
        >
          <ItemCardGroup.Header>
            <ItemCardGroup.Title>
              {variant[0].toUpperCase() + variant.slice(1)}
            </ItemCardGroup.Title>
            <ItemCardGroup.Description>
              {
                {
                  default: "Surface background with shadow",
                  secondary: "Secondary surface, no shadow",
                  tertiary: "Tertiary surface, no shadow",
                  outline: "Transparent with border, no shadow",
                  transparent: "No background, no border, no shadow",
                }[variant]
              }
            </ItemCardGroup.Description>
          </ItemCardGroup.Header>
          <Rows
            items={settings.slice(0, 2).map((item) => ({
              action: <Chevron />,
              description: item.description,
              icon: item.icon,
              title: item.title,
            }))}
            pressable
          />
        </ItemCardGroup>
      ))}
    </div>
  ),
};
function HeaderDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup>
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>General</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your basic account settings
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        <Row {...settings[2]} />
        <Row
          action={
            <Button size="sm" variant="outline">
              System
            </Button>
          }
          description="Choose light or dark mode"
          icon="solar:palette-linear"
          title="Theme"
        />
        <Row
          action={
            <Switch
              aria-label="Switch Dark mode"
              isSelected={dark}
              onChange={setDark}
            >
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          }
          description="Override system theme"
          icon="solar:moon-linear"
          title="Dark mode"
        />
      </ItemCardGroup>
    </div>
  );
}
export const WithHeader: Story = { render: () => <HeaderDemo /> };
export const Grid: Story = {
  render: () => (
    <div className="w-[600px] rounded-2xl p-6">
      <ItemCardGroup layout="grid">
        {settings.slice(0, 2).map((item) => (
          <Row {...item} action={undefined} key={item.title} />
        ))}
        <Row
          description="English (US)"
          icon="solar:global-linear"
          title="Language"
        />
        <Row
          description="Theme & colors"
          icon="solar:palette-linear"
          title="Appearance"
        />
      </ItemCardGroup>
    </div>
  ),
};
export const GridThreeColumns: Story = {
  render: () => (
    <div className="w-[720px] rounded-2xl p-6">
      <ItemCardGroup columns={3} layout="grid">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Devices</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your connected devices
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        {[
          ["MacBook Pro", "Active now", "solar:laptop-linear"],
          ["iMac", "3 days ago", "solar:monitor-linear"],
          ["iPhone 15", "1 hour ago", "solar:smartphone-linear"],
        ].map(([title, description, icon]) => (
          <Row
            description={description}
            icon={icon}
            key={title}
            title={title}
          />
        ))}
      </ItemCardGroup>
    </div>
  ),
};

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
export const LinkedAccounts: Story = {
  render: () => (
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
  ),
};
export const MultipleSections: Story = {
  render: () => (
    <div className="flex w-[600px] flex-col gap-6 p-6">
      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header className="mb-1 px-1.5">
          <ItemCardGroup.Title>Account</ItemCardGroup.Title>
        </ItemCardGroup.Header>
        <ItemCardGroup className="overflow-hidden">
          <Rows items={settings.slice(0, 2)} />
        </ItemCardGroup>
      </ItemCardGroup>
      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header className="mb-1 px-1.5">
          <ItemCardGroup.Title>Preferences</ItemCardGroup.Title>
        </ItemCardGroup.Header>
        <ItemCardGroup className="overflow-hidden">
          <Rows items={settings.slice(2)} />
        </ItemCardGroup>
      </ItemCardGroup>
    </div>
  ),
};
export const Pressable: Story = {
  render: () => (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup className="overflow-hidden">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Account</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Manage your account settings and preferences
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        <Rows
          items={[
            ...settings.slice(0, 2).map((item) => ({
              action: <Chevron />,
              description: item.description,
              icon: item.icon,
              title: item.title,
            })),
            {
              title: "Cloud sync",
              description: "Sync data across your devices",
              icon: "solar:cloud-linear",
            },
          ]}
          pressable
        />
      </ItemCardGroup>
    </div>
  ),
};

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
export const NotificationPreferences: Story = {
  render: () => (
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
  ),
};
export const PermissionLevels: Story = {
  render: () => (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header>
          <ItemCardGroup.Title>Permissions</ItemCardGroup.Title>
          <ItemCardGroup.Description>
            Control access levels for your team
          </ItemCardGroup.Description>
        </ItemCardGroup.Header>
        {[
          ["Documents", "Access to shared files", "solar:folder-open-linear"],
          ["Billing", "Payment and invoices", "solar:bill-list-linear"],
          ["Members", "Team member management", "solar:user-linear"],
        ].map(([title, description, icon]) => (
          <Row
            action={<SelectAction label={`${title} permission`} />}
            description={description}
            icon={icon}
            key={title}
            title={title}
          />
        ))}
      </ItemCardGroup>
    </div>
  ),
};

const wallets = [
  {
    address: "0x34E6...6255",
    icon: "gravity-ui:wallet",
    bg: "bg-neutral-800",
    eth: "0.0 ETH",
    name: "Funds",
    usd: "$0.00",
  },
  {
    address: "0xD9EA...f40e",
    icon: "gravity-ui:globe",
    bg: "bg-blue-500",
    eth: "0.0 ETH",
    name: "0xD9EA...f40e",
    usd: "$0.00",
  },
  {
    address: "0x9DC5...621a",
    icon: "gravity-ui:planet-earth",
    bg: "bg-green-500",
    eth: "0.021 ETH",
    name: "SLMobbin's",
    usd: "$37.09",
  },
  {
    address: "0xa98b...4daa",
    icon: "gravity-ui:person",
    bg: "bg-orange-400",
    eth: "0.0 ETH",
    name: "Sam Lee's Wallet",
    usd: "$0.00",
  },
];
export const WalletList: Story = {
  render: () => (
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
  ),
};
export const DeveloperSettings: Story = {
  render: () => (
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
  ),
};
