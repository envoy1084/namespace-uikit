"use client";

// @demo-title Icon Cards
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

import { Icon } from "@/demos/icon";

const securityFeatures = [
  {
    badge: "Recommended",
    description: "Two-factor authentication for all user accounts.",
    icon: "solar:lock-password-outline",
    title: "2FA",
    value: "2fa",
  },
  {
    description: "Encrypt data at rest and in transit.",
    icon: "solar:shield-keyhole-outline",
    title: "Encryption",
    value: "encryption",
  },
  {
    description: "Automated daily backups to secure cloud storage.",
    icon: "solar:cloud-outline",
    title: "Cloud Backup",
    value: "cloud-backup",
  },
  {
    description: "Real-time alerts for incidents and breaches.",
    icon: "solar:notification-unread-outline",
    title: "Alert System",
    value: "alerts",
  },
];

export const DemoIconCardsExample = () => (
  <CheckboxButtonGroup
    className="w-[520px]"
    defaultValue={["2fa", "encryption"]}
    name="security-features"
  >
    <Label>Security features</Label>
    {securityFeatures.map((feature) => (
      <CheckboxButtonGroup.Item
        className="bg-default"
        key={feature.value}
        value={feature.value}
      >
        <CheckboxButtonGroup.Indicator>
          <Icon icon="solar:check-circle-bold" />
        </CheckboxButtonGroup.Indicator>
        <CheckboxButtonGroup.ItemContent>
          <div className="flex items-center gap-3">
            <span className="bg-surface shadow-surface flex size-8 items-center justify-center rounded-lg">
              <Icon icon={feature.icon} />
            </span>
            <div className="flex gap-2">
              <Label className="text-sm font-semibold">{feature.title}</Label>
              {feature.badge ? (
                <Chip color="success" size="sm" variant="soft">
                  <Chip.Label>{feature.badge}</Chip.Label>
                </Chip>
              ) : null}
            </div>
          </div>
          <Description className="mt-2">{feature.description}</Description>
        </CheckboxButtonGroup.ItemContent>
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
